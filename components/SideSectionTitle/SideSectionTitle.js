import styled from "styled-components";

const Title = styled.h2`
  margin: 0;
  padding: 7px;
  padding-left: 12px;

  font-weight: 600;
  font-size: 16px;
  font-family: "HK Grotesk", "Source Sans Pro";
  text-transform: uppercase;

  background-color: ${(props) => props.theme.SIDESECTION_TITLE_BACK};
  color: ${(props) => props.theme.TEXT_COLOR};
  border-left: 5px solid #e10600;

  display: block;
`;

function SideSectionTitle({ title }) {
  return <Title>{title}</Title>;
}

export default SideSectionTitle;
