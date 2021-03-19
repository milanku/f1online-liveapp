import { useSelector, useDispatch } from 'react-redux'
import { setTheme } from '../../redux/actions/themeActions'
import { THEMES } from '../../constants/themes-names'

import styled from 'styled-components'

const Container = styled.div`
  height: 30px;
  width: 150px;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  a {
    display: inline-block;
  }
`

const ThemeSWButton = styled.button`
  height: 25px;
  width: 58px;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: lightgray;
  padding: 0;
  border: none;
  margin-left: 10px;

  img {
    padding: 5px 7px;
    height: calc(100% - 12px);
    width: 13px;
  }
`

const DonateLink = styled.a`
  margin-right: 4px;
  font-family: 'HK Grotesk';
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.TEXT_COLOR};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
  &::after {
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    margin-right: 4px;
    font-family: 'Font Awesome 5 Free';
    font-weight: 700;
    content: '\f35d';
    margin-left: 5px;
    font-size: 12px;
  }
`

const LIGHT_PICK = styled.img`
  display: inline-block;
  border: 1px solid #e0e0e0;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.12);
  background-color: #f5f5f5;

  content: url(${props => props.theme.SUN});
`

const DARK_PICK = styled.img`
  display: inline-block;
  border: 1px solid #7a7a7a;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.35);
  background-color: #a0a0a0;

  content: url(${props => props.theme.MOON});
`

const Img = styled.img`
  height: 15px;
  margin-right: 5px;
`

const Notes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const getOtherTheme = theme => {
  switch (theme) {
    case THEMES.LIGHT:
      return THEMES.DARK
    case THEMES.DARK:
      return THEMES.LIGHT

    default:
      THEMES.LIGHT
  }
}

function ThemeSwitcher() {
  const dispatch = useDispatch()
  const theme = useSelector(({ theme }) => theme.theme)

  return (
    <Container>
      <ThemeSWButton onClick={() => dispatch(setTheme(getOtherTheme(theme)))}>
        <LIGHT_PICK alt="Light theme icon" />
        <DARK_PICK alt="Dark theme icon" />
      </ThemeSWButton>
    </Container>
  )
}

export default ThemeSwitcher
