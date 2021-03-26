import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 12px 8px 0 5px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${props => props.backColor};

  .textContainer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .postTime {
    font-family: "HK Grotesk";
    font-size: 14px;
    font-weight: 600;
    width: 40px;
    flex-shrink: 0;
    color: ${props => props.theme.TEXT_COLOR_MILD};
  }
  .postTextContent {
    width: calc(100% - 40px);
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .text,
  a {
    font-family: "HK Grotesk";
    font-size: 14px;
    color: ${props => props.fontColor};
    font-weight: 600;
  }
  a {
    text-decoration: underline;
  }
  .img {
    width: 100%;
    margin: 10px 0;
  }

  @media only screen and (min-width: 1024px) {
    .img {
      width: 450px;
      margin-left: 47px;
    }
  }

  @media only screen and (min-width: 1120px) {
    .embed {
      width: 410px;
    }
  }

  @media only screen and (min-width: 1280px) {
    .embed {
      width: 450px;
    }
  }
`;

function InLivePartnerMessage({
  message,
  index,
  partner_main_color,
  partner_font_color,
  onImpression,
  onClick,
  partner_name,
  isVisible,
}) {
  const [reported, setReported] = useState(false);
  const containerRef = useRef();
  const targetLink = message.split('href="')[1]
    ? message.split('href="')[1].split('"')[0]
    : "https://f1online.sk/";

  const handleClick = e => {
    if (e.target.nodeName === "A") {
      onClick(e.target.attributes.href.value);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener("click", handleClick);
    }
    return () => {
      containerRef &&
        containerRef.current &&
        containerRef.current.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    if (!reported) {
      setReported(true);
      onImpression(index, targetLink);
    }
  }, [isVisible]);

  return (
    <Container backColor={partner_main_color} fontColor={partner_font_color}>
      <div className="textContainer">
        <div className="postTime">
          <span></span>
        </div>
        <div
          ref={containerRef}
          className="postTextContent text"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </div>
    </Container>
  );
}

export default InLivePartnerMessage;
