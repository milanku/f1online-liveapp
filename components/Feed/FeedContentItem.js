import formatDate, { formatDateToHHmm } from "../../utils/dateFormatter.js";
import EmbedContainer from "react-oembed-container";

import styled from "styled-components";

import { useEffect } from "react";

const Container = styled.div`
  margin: 12px 8px 0 5px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

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

  .text {
    font-family: "HK Grotesk";
    font-size: 14px;
    color: ${props => props.theme.TEXT_COLOR_MILD};
  }
  .embed {
    width: 100%;
    margin: 10px 0;
    iframe {
      width: calc(100% - 42px) !important;
      min-width: 0 !important;
    }

    .isStreamable {
      margin: auto;
      position: relative !important;
      padding-bottom: 56.25% !important;
      height: 0 !important;
      > iframe {
        position: absolute !important;
        //position: relative !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
      }
    }

    .wp-block-embed-youtube div {
      position: relative !important;
      padding-bottom: 56.25% !important;
      height: 0 !important;
    }
    .wp-block-embed-youtube div iframe {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
    }
  }
  .img {
    width: 100%;
    margin: 10px 0;
  }

  @media only screen and (min-width: 1024px) {
    .embed {
      width: 370px;
      margin-left: 47px;
    }
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

function PostItem({ post }) {
  const { date, acf } = post;

  useEffect(() => {
    console.log("INITIAL RENDER - useEffect", post.id);
  }, []);

  console.log("INITIAL RENDER - function", post.id);

  return (
    <Container>
      <div className="textContainer">
        <div className="postTime">
          <span>{formatDateToHHmm(date)}</span>
        </div>
        <div className="postTextContent text">{acf.sprava}</div>
      </div>
      {acf.embed ? (
        <EmbedContainer markup={acf.embed} className="embed">
          <div
            className={
              acf.embed.includes("//streamable.com") ||
              acf.embed.includes("youtu")
                ? "isStreamable"
                : ""
            }
            dangerouslySetInnerHTML={{ __html: acf.embed }}
          />
        </EmbedContainer>
      ) : (
        ""
      )}
      {acf.foto ? <img className="img" src={acf.foto}></img> : ""}
    </Container>
  );
}

export default PostItem;
