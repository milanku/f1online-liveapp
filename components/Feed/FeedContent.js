import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import FeedContentItem from "./FeedContentItem";
import Filler from "../Filler";
import TrackVisibility from "react-on-screen";
import { fetchLiveNewsArchive } from "../../redux/actions/liveActions";
import Divider from "../Divider";
import InLivePartnerMessage from "./InLivePartnerMessage";
import TrackedPanel, { TYPES } from "../Ads/TrackedPanel";
import { POSITION } from "../Ads/positions";

import { reportClick, reportImp } from "./gaUtils";

const Loader = () => {
  return [0, 1, 2, 3, 4, 5, 6].map((item, i) => (
    <Filler key={i} height="30px" width="100%" />
  ));
};

let reportedImps = new Set();
let loadedNodesIds = new Set();
const AD_FREQUENCY = 10;

function FeedContent({ ended }) {
  const [cNodes, setCNodes] = useState([]);
  const dispatch = useDispatch();
  const state = useSelector(state => state.live);
  const { news, isLoading, error, hasMore, adsData } = state;

  let partnerMessages =
    adsData && adsData.content
      ? adsData.content.rendered.split("\n\n\n\n")
      : null;

  const fetchMore = () => {
    dispatch(fetchLiveNewsArchive());
  };

  useEffect(() => {
    if (
      !isLoading &&
      hasMore &&
      document.getElementsByClassName("infinite-scroll-component")[0]
        .scrollHeight <=
        document.getElementsByClassName(
          "infinite-scroll-component__outerdiv"
        )[0].clientHeight
    ) {
      fetchMore();
    }
  }, [isLoading]);

  const report = (targetIndex, targetLink, partner_name) => {
    reportedImps = reportImp({
      link: targetLink,
      index: targetIndex,
      partner: partner_name,
      reportedImpressions: reportedImps,
    });
  };

  let inject = item => {
    if (Math.abs(item.adIndex) % AD_FREQUENCY === 0) {
      if (Math.random() > 0.6) {
        return (
          <>
            <TrackedPanel
              type={TYPES.BASIC}
              position={POSITION.LIVE_FEED_CONTENT}
              sidebar={true}
            />
            <Divider height="30px" />
          </>
        );
      }

      let pickedIndex = null;
      if (item.adIndex > 0) {
        pickedIndex =
          partnerMessages.length -
          (Math.abs(Math.floor(item.adIndex / AD_FREQUENCY)) %
            partnerMessages.length);
      } else {
        pickedIndex =
          Math.abs(Math.floor(item.adIndex / AD_FREQUENCY)) %
          partnerMessages.length;
      }
      pickedIndex = Math.floor(Math.random() * partnerMessages.length);

      // return null;
      return (
        <TrackVisibility style={{ width: "100%" }} partialVisibility>
          <InLivePartnerMessage
            onClick={targetLink =>
              reportClick({
                link: targetLink,
                index: pickedIndex,
                partner: adsData.acf.partner_name,
              })
            }
            onImpression={(targetIndex, targetLink) =>
              report(targetIndex, targetLink, adsData.acf.partner_name)
            }
            message={partnerMessages[pickedIndex]}
            index={pickedIndex}
            {...adsData.acf}
          />
        </TrackVisibility>
      );
    }
    return null;
  };

  useEffect(() => {
    let newNewItems = [],
      newOldItems = [];
    let middleFound = false;

    news.forEach(item => {
      if (!loadedNodesIds.has(item.id)) {
        loadedNodesIds.add(item.id);
        if (middleFound) {
          newOldItems.push(
            <div key={item.id}>
              <FeedContentItem post={item} />
              <div>{adsData && inject(item)}</div>
            </div>
          );
        } else {
          newNewItems.push(
            <div key={item.id}>
              <FeedContentItem post={item} />
              <div>{adsData && inject(item)}</div>
            </div>
          );
        }
      } else {
        middleFound = true;
      }
    });

    setCNodes(old => [...newNewItems, ...old, ...newOldItems]);
  }, [news]);

  return (
    <InfiniteScroll
      dataLength={news.length}
      next={fetchMore}
      hasMore={hasMore}
      height="100%"
      endMessage={
        <p
          style={{
            fontFamily: "HK Grotesk",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          {ended
            ? "To bolo všetko v rámci tohto LIVE prenosu."
            : "LIVE sa práve začal."}
        </p>
      }
      style={{ padding: "0 10px" }}
      children={cNodes}
      loader={Loader()}
      scrollThreshold="200px"
    />
  );
}

export default FeedContent;
