import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { wrapper } from "../redux/store/store";

import { fetchProgramme } from "../redux/actions/programmeActions";
import ReactGA from "react-ga";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../styles/Themes";
import { THEMES } from "../constants/themes-names.js";

import "./index.css";

const WIDTHS = {
  LEFT: {
    PC: "250px",
    MOB: "100%",
  },
  FEED: {
    PC: "600px",
    MOB: "100%",
  },
};

const GlobalStyle = createGlobalStyle`
    *,
  input,
  button {
    outline: none !important;
  }
  a {
    text-decoration: none;
  }

  html,
  body {
    margin: 0;
    height: 100%;
  }

  .noOutline {
    text-decoration: none;
    outline: none;
  }

  #__next {
    height: 100%;
    width: 100%;
    // min-height: calc(100% - 60px);
    // padding-bottom: 60px;
    // position: relative;

    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: ${props => props.theme.PAGE_BACK_COLOR}
  }
`;

const Page = styled.div`
  width: calc(100% - ${WIDTHS.LEFT.PC});
  height: 100%;
`;

function App({ Component, pageProps }) {
  const dispatch = useDispatch();
  const theme = useSelector(({ theme }) => theme.theme);

  useEffect(() => {
    const trackingId = "UA-166048655-1";
    ReactGA.initialize(trackingId);
    ReactGA.pageview(window.location.pathname);
    dispatch(fetchProgramme());
  }, []);

  return (
    <ThemeProvider theme={theme === THEMES.DARK ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default wrapper.withRedux(App);
