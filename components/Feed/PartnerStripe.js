import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ReactGA from "react-ga";

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 10px 20px;

  @media only screen and (min-width: 1024px) {
    flex-direction: row;
  }

  color: ${props => props.fgColor};
  background-color: ${props => props.bgColor};
  font-family: HK Grotesk;
  font-size: 12px;

  img {
    margin: 0;

    width: auto;
    height: 25px;
    @media only screen and (min-width: 1024px) {
      margin-left: 15px;
      height: 35px;
    }
  }
  a {
    color: ${props => props.fgColor};
  }
`;
const Message = styled.span`
  color: white;
  text-align: center;
  margin: 0;
  font-weight: 600;
  display: inline-block;
  &:hover {
    text-decoration: underline;
  }
`;

function PartnerStripe() {
  const state = useSelector(state => state.live);
  const { adsData } = state;

  if (!adsData) return null;
  const title = adsData.title.rendered;
  const {
    logo,
    partner_main_color: bgColor,
    partner_font_color: fgColor,
    title: stripeMessage,
    partner_homepage: partnerHomepage,
  } = adsData.acf;

  const stripeClick = targetLink => {
    // console.log("CLICKED", {
    //   category: "online-click",
    //   action: `${title.replace(" ", "-")}`,
    //   label: `STRIPE-${targetLink}`,
    //   nonInteraction: false,
    // });
    ReactGA.event({
      category: "online-click",
      action: `${title.replace(" ", "-")}`,
      label: `STRIPE-${targetLink}`,
      nonInteraction: false,
    });
  };

  return (
    <Container bgColor={bgColor} fgColor={fgColor}>
      <a
        target="_blank"
        onClick={() => stripeClick(partnerHomepage)}
        href={partnerHomepage}
      >
        <Message>Hrdý partner komunity F1 a dnešného LIVE prenosu</Message>
      </a>
      <a
        target="_blank"
        onClick={() => stripeClick(partnerHomepage)}
        href={partnerHomepage}
      >
        <img src={logo} />
      </a>
    </Container>
  );
}

export default PartnerStripe;
