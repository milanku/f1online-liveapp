import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'

import FeedContentItem from './FeedContentItem'
import Filler from '../Filler'
import TrackVisibility from 'react-on-screen'
// import ReactGA from "react-ga";
import {
  fetchLiveNewsArchive,
  initialize,
  pauseLiveAutofetch,
  startLiveAutofetch
} from '../../redux/actions/liveActions'
import Divider from '../Divider'
// import InLivePartnerMessage from "./InLivePartnerMessage";
// import TrackedPanel, { TYPES } from "../Ads/TrackedPanel";
// import { POSITION } from "../Ads/positions";

const Loader = () => {
  return [0, 1, 2, 3, 4, 5, 6].map((item, i) => (
    <Filler key={i} height="30px" width="100%" />
  ))
}
const reportedImpressions = new Set()
const AD_FREQUENCY = 10

function FeedContent({ isVisible, startTime, endTime, adsID, state }) {
  const dispatch = useDispatch()
  const { news, isLoading, error, hasMore, hasEnded, adsData } = state
  const ended = hasEnded || (startTime && endTime)

  let counter = 0
  let partnerMessages =
    adsData && adsData.content
      ? adsData.content.rendered
          //.replace(/\n/g, "")
          .split('\n\n\n\n')
      : null

  const getNextPartnerMessage = () => {
    let item = null
    let index = 0
    if (partnerMessages) {
      index = counter % partnerMessages.length
      item = partnerMessages[counter % partnerMessages.length]
      counter++
    }
    return { message: item, index: index }
  }

  const fetchMore = () => {
    dispatch(fetchLiveNewsArchive())
  }

  const onBlur = () => {
    dispatch(pauseLiveAutofetch())
  }

  const onFocus = () => {
    dispatch(startLiveAutofetch())
  }

  const repCli = (title, targetLink) => {
    /*console.log("CLICKED", {
      category: "online-click",
      action: title.replace(" ", "-"),
      label: targetLink,
      nonInteraction: false,
    });*/
    ReactGA.event({
      category: 'online-click',
      action: title.replace(' ', '-'),
      label: targetLink,
      nonInteraction: false
    })
  }

  const repImp = (title, targetIndex, targetLink) => {
    if (!reportedImpressions.has(targetIndex)) {
      reportedImpressions.add(targetIndex)
      // console.log("IMPRESSION", {
      //   category: "online-impression",
      //   action: `${targetIndex}`,
      //   label: targetLink,
      //   nonInteraction: true,
      // });
      ReactGA.event({
        category: 'online-impression',
        action: `${targetIndex}`,
        label: targetLink,
        nonInteraction: true
      })
    }
  }

  useEffect(() => {
    isVisible ? onFocus() : onBlur()
    return () => onBlur()
  }, [isVisible])

  useEffect(() => {
    dispatch(
      initialize({
        start: startTime,
        end: endTime,
        adsID: adsID
      })
    )
    if (ended) {
      fetchMore()
    } else {
      dispatch(startLiveAutofetch())
    }
    return () => dispatch(pauseLiveAutofetch())
  }, [])

  useEffect(() => {
    if (
      !isLoading &&
      hasMore &&
      document.getElementById('scrollerContainer').clientHeight >=
        document.getElementById('innerDataBlock').clientHeight
    ) {
      fetchMore()
    }
  }, [isLoading])

  const injectAd = item => {
    if (Math.abs(item.adIndex) % AD_FREQUENCY === 0) {
      // if (Math.random() > 0.6) {
      //   return (
      //     <>
      //       <TrackedPanel
      //         type={TYPES.BASIC}
      //         position={POSITION.LIVE_FEED_CONTENT}
      //         sidebar={true}
      //       />
      //       <Divider height="30px" />
      //     </>
      //   );
      // }

      let pickedIndex = null
      if (item.adIndex > 0) {
        pickedIndex =
          partnerMessages.length -
          (Math.abs(Math.floor(item.adIndex / AD_FREQUENCY)) %
            partnerMessages.length)
      } else {
        pickedIndex =
          Math.abs(Math.floor(item.adIndex / AD_FREQUENCY)) %
          partnerMessages.length
      }
      // pickedIndex = Math.floor(Math.random() * partnerMessages.length);

      return null
      // <TrackVisibility style={{ width: '100%' }} partialVisibility once>
      //   <InLivePartnerMessage
      //     onClick={targetLink => repCli(adsData.title.rendered, targetLink)}
      //     onImpression={(targetIndex, targetLink) =>
      //       repImp(adsData.title.rendered, targetIndex, targetLink)
      //     }
      //     message={partnerMessages[pickedIndex]}
      //     index={pickedIndex}
      //     {...adsData.acf}
      //   />
      // </TrackVisibility>
    }
    return null
  }

  return (
    <InfiniteScroll
      dataLength={news.length}
      next={fetchMore}
      hasMore={hasMore}
      height="100%"
      endMessage={
        <p
          style={{
            fontFamily: 'HK Grotesk',
            textAlign: 'center',
            fontWeight: '600'
          }}
        >
          {ended
            ? 'To bolo všetko v rámci tohto LIVE prenosu.'
            : 'LIVE sa práve začal.'}
        </p>
      }
      style={{ padding: '0 10px' }}
    >
      <div id="innerDataBlock">
        {news.map((item, index) => (
          <div key={item.id}>
            <FeedContentItem key={item.id} post={item} />
            <div key={item.id + 1000000}>{adsData && injectAd(item)}</div>
          </div>
        ))}
        {isLoading ? (
          Loader()
        ) : (
          <button onClick={fetchMore}>Načítať viac</button>
        )}
        <Divider height="10px" />
      </div>
    </InfiniteScroll>
  )
}

export default FeedContent
