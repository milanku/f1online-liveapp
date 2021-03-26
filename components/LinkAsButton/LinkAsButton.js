import Link from "next/link";
import styled from "styled-components";

const ARROW_RIGHT = styled.img.attrs(props => ({
  src: props.theme.ARR_IMG,
}))`
  margin-bottom: -1px;
  height: 11px;
  width: 11px;
  padding-left: 2px;
  display: inline-block;
`;

const Container = styled.div`
  margin-right: 0px;
  margin-left: auto;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;

  a {
    font-size: 14px;
    text-decoration: none;
    color: ${props => props.theme.SUBTITLE_COLOR};
    font-family: "Cabin", "Source Sans Pro";
    font-weight: 700;

    &:hover {
      text-decoration: underline;
      color: ${props => props.theme.TEXT_COLOR};
    }
  }
`;

function LinkAsButton({ target, title }) {
  return (
    <Container>
      <Link href={`${target}`} as={`${target}`}>
        <a>{title}</a>
      </Link>
      <ARROW_RIGHT />
    </Container>
  );
}

export default LinkAsButton;
