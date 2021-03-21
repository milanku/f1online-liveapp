import { useState, useEffect } from "react";
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
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import * as S from "./styled";

function Feed({ acf }) {
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
    return () => onBlur();
  }, []);

  const onBlur = () => {
    console.log("ON BLUR");
    dispatch(pauseLiveAutofetch());
  };

  const onFocus = () => {
    console.log("ON FOCUS");
    !ended && dispatch(startLiveAutofetch());
  };

  useEffect(() => {
    isVisible ? onFocus() : onBlur();
    return () => onBlur();
  }, [isVisible]);

  //if (!state.isLoading) console.log(state);
  return (
    <>
      {/* {!state.isLoading && (
        <img style={{ width: '100%' }} src={state.adsData.acf.partner_car} />
      )} */}
      <S.FeedContainer>
        {/* <PartnerStripe state={state} /> */}

        <S.ButtonsRow>
          {ended ? (
            <span>Live sa skončil</span>
          ) : (
            <S.LiveIcon> Live</S.LiveIcon>
          )}
          <ThemeSwitcher />
        </S.ButtonsRow>
        <S.LiveContainer id="scrollerContainer">
          <FeedContent ended={ended} />
        </S.LiveContainer>
      </S.FeedContainer>
    </>
  );
}

export default Feed;
