import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  background-color: ${props => props.theme.PAGE_BACK_COLOR};
`;

const Button = styled.div`
  width: 33%;
  display: flex;
  justify-content: center;
  align-items: center;

  /*color: ${props =>
    props.picked ? props.theme.TEXT_COLOR : props.theme.BASIC_LINE_COLOR};
  background-color: ${props =>
    props.picked ? props.theme.SUBTITLE_COLOR : props.theme.PAGE_BACK_COLOR};
*/
  color: ${props =>
    props.picked && props.fgColorSelected
      ? props.fgColorSelected
      : props.picked
      ? props.theme.TEXT_COLOR
      : props.theme.BASIC_LINE_COLOR};
  background-color: ${props =>
    props.picked && props.bgColorSelected
      ? props.bgColorSelected
      : props.picked
      ? props.theme.SUBTITLE_COLOR
      : props.theme.PAGE_BACK_COLOR};
`;

const Icon = styled.span`
  &:after {
    display: inline-block;
    font-style: regular;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    font-size: 16px;
    content: "\f${props => props.code}";

    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    margin: 5px 15px;
    font-family: "Font Awesome 5 Free";
    font-weight: ${props => props.code.WEIGHT};
    content: "\f${props => props.code.CODE}";
  }
`;

const ICONS = [
  { CODE: "015", WEIGHT: "900" },
  { CODE: "1ea", WEIGHT: "400" },
  { CODE: "075", WEIGHT: "400" },
];

export default function LiveBottomButtons({ onSitePicked, pickedIndex }) {
  const state = useSelector(state => state.live);
  const { news, isLoading, adsData } = state;
  //backColor={partner_main_color} fontColor={partner_font_color}
  const fgColorSelected = adsData ? adsData.acf.partner_font_color : null;
  const bgColorSelected = adsData ? adsData.acf.partner_main_color : null;
  return (
    <Container>
      <Button
        onClick={() => onSitePicked(0)}
        picked={pickedIndex === 0}
        fgColorSelected={fgColorSelected}
        bgColorSelected={bgColorSelected}
      >
        <Icon code={ICONS[0]} />
      </Button>
      <Button
        onClick={() => onSitePicked(1)}
        picked={pickedIndex === 1}
        fgColorSelected={fgColorSelected}
        bgColorSelected={bgColorSelected}
      >
        <Icon code={ICONS[1]} />
      </Button>
      <Button
        onClick={() => onSitePicked(2)}
        picked={pickedIndex === 2}
        fgColorSelected={fgColorSelected}
        bgColorSelected={bgColorSelected}
      >
        <Icon code={ICONS[2]} />
      </Button>
    </Container>
  );
}
