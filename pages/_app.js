import { useSelector, useDispatch } from 'react-redux'
import { wrapper } from '../redux/store/store'

import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from '../styles/Themes'
import { THEMES } from '../constants/themes-names.js'

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
    // min-height: calc(100% - 60px);
    // padding-bottom: 60px;
    // position: relative;

    // display: flex;
    // flex-direction: column;
    // align-items: center;
    background-color: ${props => props.theme.PAGE_BACK_COLOR}
  }
`

function App({ Component, pageProps }) {
  const theme = useSelector(({ theme }) => theme.theme)

  return (
    <ThemeProvider theme={theme === THEMES.DARK ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default wrapper.withRedux(App)
