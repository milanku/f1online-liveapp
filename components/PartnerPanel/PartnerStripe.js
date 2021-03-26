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
    // flex-direction: row;
    // display: none;
  }

  color: ${props => props.fgColor};
  background-color: ${props => props.bgColor};
  font-family: HK Grotesk;
  font-size: 14px;

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

  const reportClick = ({ link, partner }) => {
    // console.log("IMP CLICK", {
    //   category: "Stripe-click",
    //   action: partner,
    //   label: window.location.href,
    //   dimension1: link,
    //   dimension2: window.innerWidth < 1024 ? "m" : "pc",
    // });
    ReactGA.event({
      category: "Stripe-click",
      action: partner,
      label: window.location.href,
      dimension1: link,
      dimension2: window.innerWidth < 1024 ? "m" : "pc",
    });
  };

  if (!adsData) return null;
  const {
    title,
    logo,
    partner_name,
    partner_main_color,
    partner_font_color,
    partner_homepage,
  } = adsData.acf;
  return (
    <Container bgColor={partner_main_color} fgColor={partner_font_color}>
      <a
        target="_blank"
        onClick={() =>
          reportClick({
            link: partner_homepage,
            partner: partner_name,
          })
        }
        href={partner_homepage}
      >
        <Message>{title}</Message>
      </a>
      <a
        target="_blank"
        onClick={() =>
          reportClick({
            link: partner_homepage,
            partner: partner_name,
          })
        }
        href={partner_homepage}
      >
        <img src={logo} />
      </a>
    </Container>
  );
}

export default PartnerStripe;
