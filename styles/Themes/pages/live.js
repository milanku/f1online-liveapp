import styled from "styled-components";

const WIDTHS = {
  LEFT: {
    PC: "320px",
    PC_HD: "350px",
    MOB: "100%",
  },
  FEED: {
    PC: "68%",
    MOB: "100%",
  },
  BOTTOM_ROW_HEIGHT: "45px",
};

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const TopRow = styled.div`
  height: calc(100% - ${WIDTHS.BOTTOM_ROW_HEIGHT});
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  ${props => (props.overflowy ? "overflow-y: auto;" : "")}
  @media only screen and (min-width: 1024px) {
    height: 100%;
  }
`;

export const BottomRow = styled.div`
  position: relative;
  height: ${WIDTHS.BOTTOM_ROW_HEIGHT};

  @media only screen and (min-width: 1024px) {
    display: none;
  }
`;

export const PartnersPanel = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: ${props => (props.isPicked ? "0" : "100%")};
  height: 100%;

  @media only screen and (min-width: 1024px) {
    width: ${WIDTHS.LEFT.PC};
    left: 0;
    height: 100%;
  }
  @media only screen and (min-width: 1680px) {
    width: ${WIDTHS.LEFT.PC_HD};
  }
`;

export const FeedContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: ${props => (props.isPicked ? "0" : "100%")};
  height: 100%;
  @media only screen and (min-width: 1024px) {
    position: absolute;
    top: 0;
    left: ${WIDTHS.LEFT.PC};
    width: calc(${WIDTHS.FEED.PC} - ${WIDTHS.LEFT.PC});
    height: 100%;
  }
  @media only screen and (min-width: 1680px) {
    left: ${WIDTHS.LEFT.PC_HD};
    width: calc(${WIDTHS.FEED.PC} - ${WIDTHS.LEFT.PC_HD});
  }
`;

export const ChatContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: ${props => (props.isPicked ? "0" : "100%")};
  height: 100%;

  @media only screen and (min-width: 1024px) {
    position: absolute;
    left: ${WIDTHS.FEED.PC};
    top: 0;
    width: calc(100% - ${WIDTHS.FEED.PC});
    height: 100%;
  }
`;
