import styled from "styled-components";

export const FeedContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const LiveContainer = styled.div`
  height: calc(100vh - 60px);
  z-index: 4;
  //height: auto;
  height: ${props => `calc(100% - ${props.restHeight}px)`};
  @media only screen and (min-width: 1024px) {
    height: calc(100% - 37px);
  }

  .infinite-scroll-component__outerdiv {
    height: 100%;
    //
    overflow: auto;
  }
`;

export const ButtonsRow = styled.div`
  padding: 8px 10px;
  height: 21px;
  box-shadow: 0 4px 8px -8px rgba(0, 0, 0, 0.4);

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    bottom: 1px;
    z-index: -1;
    transform: scale(0.9);
    box-shadow: 0px 0px 8px 2px #000000;
  }
  span {
    display: inline-block;
    font-family: HK Grotesk;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    color: ${props => props.theme.TEXT_COLOR_MILD};
    text-transform: uppercase;
  }
`;

export const LiveIcon = styled.span`
  width: 25px;
  display: inline-block;
  font-family: HK Grotesk;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: ${props => props.theme.TEXT_COLOR_MILD};
  text-transform: uppercase;

  @keyframes example {
    0%,
    100% {
      left: -32px;
    }

    50% {
      left: -2px;
    }
  }
  &:after {
    font-style: regular;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    font-family: "Font Awesome 5 Free";
    font-weight: 400;
    font-size: 14px;

    content: "\f111";
    font-weight: 900;
    font-size: 4px;
    animation: example 3.2s linear infinite;
    position: relative;
    bottom: -8px;
  }
`;
