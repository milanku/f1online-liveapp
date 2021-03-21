import React from "react";
import TrackVisibility from "react-on-screen";
import BannerPanel from "../BannerPanel";
import styled from "styled-components";
import onMobile from "../../../utils/onMobile";

const BasicContainer = styled.div`
  width: 100%;
`;

const InsetContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const TYPES = {
  LEADERBOARD: "LEADERBOARD",
  BASIC: "BASIC",
  INSET: "INSET",
};

function TrackedPanel(props) {
  const { position, type, sidebar } = props;

  switch (type) {
    case TYPES.BASIC:
      return (
        <BasicContainer>
          <TrackVisibility partialVisibility style={{ width: "100%" }}>
            <BannerPanel slot={position} />
          </TrackVisibility>
        </BasicContainer>
      );
    case TYPES.INSET:
      return (
        <InsetContainer>
          <TrackVisibility
            partialVisibility
            style={{ width: "100%", height: "100%" }}
          >
            <BannerPanel inset={true} />
          </TrackVisibility>
        </InsetContainer>
      );
  }
  return null;
}

export { TYPES };
export default TrackedPanel;
