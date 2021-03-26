import { useContext } from "react";
import { useSelector } from "react-redux";
import styled, { ThemeContext } from "styled-components";
import PartnerStripe from "./PartnerStripe";
import SideSectionTitle from "../SideSectionTitle";
import Calendar from "./Calendar";
import Divider from "../Divider";
import LinkAsButton from "../LinkAsButton/LinkAsButton";

const Container = styled.div`
  height: calc(100% - 10px);
  width: calc(100% - 10px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-content: flex-start;
  align-items: center;
  overflow: auto;
  padding: 5px;
`;

const Title = styled.h1`
  font-family: "Cabin";
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  margin-left: 15px;
  color: ${props => props.theme.TEXT_COLOR};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
const LogosContainer = styled.div`
  padding-left: 5px;
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Logo = styled.img`
  margin: auto 0;
  height: 40px;
`;

const PartnerCar = styled.img`
  width: 100%;
  margin-top: auto;
  margin-bottom: 0;
  // &:first-of-type {
  //   margin-top: 10px;
  // }
  // @media only screen and (min-width: 1440px) {
  //   &:first-of-type {
  //     margin-top: 20px;
  //   }
  // }
`;

const Menu = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
  padding: 2px 0;
  margin: 0;
`;

const MenuItem = styled.li`
  padding: 5px 10px;
  margin: 2px 0;
  width: calc(100% - 20px);
  font-family: HK Grotesk;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;

  background-color: ${props => props.theme.SUBTITLE_COLOR};
  color: ${props => props.theme.PAGE_BACK_COLOR};
  cursor: pointer;
`;

const MenuItems = [
  { title: "Späť na hlavný článok", link: "https://f1online.sk/" },
  //{title: "", link: "",}
];

function PartnerPanel({ articleTitle, id, slug }) {
  const themeContext = useContext(ThemeContext);
  const state = useSelector(state => state.live);
  const programmeState = useSelector(state => state.programme);
  const { adsData } = state;
  const { isLoading, event } = programmeState;

  //console.log(programmeState);

  if (!adsData) return null;
  return (
    <Container>
      {/* <span>{articleTitle}</span> */}

      <LogosContainer>
        <a href="https://f1online.sk/">
          <Logo src={themeContext.LOGO_URL} />
        </a>
        <a href={`https://f1online.sk/clanky/${id}/${slug}`}>
          <Title>{articleTitle}</Title>
        </a>
      </LogosContainer>
      <Divider height="10px" />

      <Menu>
        <LinkAsButton
          target={`https://f1online.sk/clanky/${id}/${slug}`}
          title={"Späť na hlavný článok"}
        />
      </Menu>
      <Divider height="15px" />
      <Calendar data={event} />
      <div style={{ marginTop: "15px" }}></div>
      <PartnerStripe />
      <PartnerCar src={adsData.acf.partner_car} />
      <PartnerCar src={adsData.acf.partner_car2} />
      <PartnerCar src={adsData.acf.partner_car3} />
    </Container>
  );
}

export default PartnerPanel;
