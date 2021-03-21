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

import { repCli, repImp } from "./gaUtils";

const Loader = () => {
  return [0, 1, 2, 3, 4, 5, 6].map((item, i) => (
    <Filler key={i} height="30px" width="100%" />
  ));
};

let repImps = new Set();
let loadedNodesIds = new Set();
const AD_FREQUENCY = 10;

function FeedContent({ ended }) {
  const [cNodes, setCNodes] = useState([]);
  const dispatch = useDispatch();
  const state = useSelector(state => state.live);
  const { news, isLoading, error, hasMore, adsData } = state;

  console.log(adsData);

  let counter = 0;
  let partnerMessages =
    adsData && adsData.content
      ? adsData.content.rendered.split("\n\n\n\n")
      : null;

  const fetchMore = () => {
    dispatch(fetchLiveNewsArchive());
  };

  useEffect(() => {
    /*if (
      !isLoading &&
      hasMore &&
      document.getElementById("scrollerContainer").clientHeight >=
        document.getElementById("innerDataBlock").clientHeight
    ) {
      fetchMore();
    }*/
  }, [isLoading]);

  const getNextPartnerMessage = () => {
    let item = null;
    let index = 0;
    if (partnerMessages) {
      index = counter % partnerMessages.length;
      item = partnerMessages[counter % partnerMessages.length];
      counter++;
    }
    return { message: item, index: index };
  };

  const report = (title, targetIndex, targetLink) => {
    repImps = repImp(title, targetIndex, targetLink, repImps);
  };

  const inject = item => {
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
        <TrackVisibility style={{ width: "100%" }} partialVisibility once>
          <InLivePartnerMessage
            onClick={targetLink => repCli(adsData.title.rendered, targetLink)}
            onImpression={(targetIndex, targetLink) =>
              report(adsData.title.rendered, targetIndex, targetLink)
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

  console.log("NODES", cNodes);

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
      // children={newsNodes}
      children={cNodes}
      loader={Loader()}
    >
      {/* <div id="innerDataBlock">
        {news.map((item, index) => (
          <div key={item.id}>
            <FeedContentItem post={item} />
            <div>{adsData && inject(item)}</div>
          </div>
        ))}
        {isLoading ? (
          Loader()
        ) : (
          <button onClick={fetchMore}>Načítať viac</button>
        )}
        <Divider height="10px" />
      </div> */}
    </InfiniteScroll>
  );
}

export default FeedContent;
