import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { usePageVisibility } from "react-page-visibility";
import onMobile from "../../utils/onMobile";
import {
  initialize,
  pauseLiveAutofetch,
  startLiveAutofetch,
} from "../../redux/actions/liveActions";
import { fetchLiveNewsArchive } from "../../redux/actions/liveActions";

import FeedContent from "./FeedContent";
import PartnerStripe from "./PartnerStripe";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import * as S from "./styled";
import TrackVisibility from "react-on-screen";

function Feed({ acf }) {
  const stripeRef = useRef();
  const buttonsRef = useRef();
  const [butsHeight, setButsHeight] = useState(0);
  const [stripeHeight, setStripeHeight] = useState(0);

  const dispatch = useDispatch();
  const isVisible = usePageVisibility();

  const state = useSelector(state => state.live);
  const { hasEnded } = state;

  const startTime = acf.start_time.replace(" ", "T");
  const endTime = acf.end_time.replace(" ", "T");
  const ended = hasEnded || (startTime && endTime);

  useEffect(() => {
    dispatch(
      initialize({
        start: startTime,
        end: endTime,
        adsID: acf.reklamy && acf.reklamy !== "" ? acf.reklamy : null,
      })
    );
    if (ended) {
      dispatch(fetchLiveNewsArchive());
    } else {
      dispatch(startLiveAutofetch());
    }

    setButsHeight(buttonsRef.current.clientHeight);
    setStripeHeight(stripeRef.current.clientHeight);

    return () => onBlur();
  }, []);

  const onBlur = () => {
    dispatch(pauseLiveAutofetch());
  };

  const onFocus = () => {
    !ended && dispatch(startLiveAutofetch());
  };

  useEffect(() => {
    isVisible ? onFocus() : onBlur();
    return () => onBlur();
  }, [isVisible]);

  return (
    <>
      <S.FeedContainer>
        <div ref={stripeRef}>
          {onMobile() && (
            <TrackVisibility style={{ width: "100%" }} partialVisibility once>
              <PartnerStripe />
            </TrackVisibility>
          )}
        </div>
        <div ref={buttonsRef}>
          <S.ButtonsRow>
            {ended ? (
              <span>Live sa skončil</span>
            ) : (
              <S.LiveIcon> Live</S.LiveIcon>
            )}
            <ThemeSwitcher />
          </S.ButtonsRow>
        </div>
        <S.LiveContainer
          restHeight={stripeHeight + butsHeight}
          id="scrollerContainer"
        >
          <FeedContent ended={ended} />
        </S.LiveContainer>
      </S.FeedContainer>
    </>
  );
}

export default Feed;
