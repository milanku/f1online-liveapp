import {
  SESSION_NAMES,
  SESSION_DURATIONS,
  getSesDurationText,
} from "../../utils/sessions";

import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  font-family: "HK Grotesk";
  font-size: 13px;
  border-spacing: 0;
  color: ${props => props.theme.TEXT_COLOR_MILD};

  tr {
    margin: 0;
    padding: 6px 5px;
    height: 31px;

    &.noBorder td {
      border: none;
    }
  }

  th {
    height: 32px;
    text-align: start;
    background-color: ${props => props.theme.WIDGET_UNSELECT_BACK};

    &.position {
      text-align: center;
    }
  }
  td {
    border-top: 1px solid ${props => props.theme.WIDGET_DIVIDER_COLOR};
  }

  td span,
  th span {
    line-height: 30px;
  }
`;

const Caption = styled.caption`
  margin-left: 5px;
  padding: 5px;

  .venueTitle {
    display: block;
    font-size: 16px;
    font-weight: 600;
    text-align: start;
  }
  .venueDate {
    display: block;
    font-size: 14px;
    text-align: start;
  }
`;

const TBody = styled.tbody`
  .event {
    font-weight: 600;
    padding-left: 8px;
    width: 75px;

    @media only screen and (min-width: 340px) {
      width: 80px;
    }
    @media only screen and (min-width: 360px) {
      width: 90px;
    }
    @media only screen and (min-width: 380px) {
      width: 100px;
    }
    @media only screen and (min-width: 410px) {
      width: 110px;
    }
    @media only screen and (min-width: 600px) {
      width: 140px;
    }
    @media only screen and (min-width: 1024px) {
      width: 75px;
    }
    @media only screen and (min-width: 1280px) {
      width: 85px;
    }
  }

  .tv {
    width: 100px;

    @media only screen and (min-width: 340px) {
      width: 110px;
    }
    @media only screen and (min-width: 360px) {
      width: 110px;
    }
    @media only screen and (min-width: 380px) {
      width: 110px;
    }
    @media only screen and (min-width: 410px) {
      width: 125px;
    }
    @media only screen and (min-width: 600px) {
      width: 210px;
    }
    @media only screen and (min-width: 1024px) {
      width: 100px;
    }
    @media only screen and (min-width: 1280px) {
      width: 110px;
    }
    @media only screen and (min-width: 1366px) {
      width: 110px;
    }
  }
`;

const getTvText = tv => {
  return `${tv ? tv : "doplníme..."}`;
};

function CalendarWidget({ data }) {
  return (
    <Table>
      <Caption>
        <span className="venueTitle">VC {data.venue_name}</span>
        <span className="venueDate">{data.venue_date}</span>
      </Caption>
      <TBody>
        <tr>
          <th className="event">
            <span>Časť</span>
          </th>
          <th>
            <span>Čas</span>
          </th>
          <th className="tv">
            <span>Vysiela</span>
          </th>
        </tr>
        {data.fp1_time ? (
          <tr className="noBorder">
            <td className="event">{SESSION_NAMES.FP1}</td>
            <td>{getSesDurationText(data.fp1_time, SESSION_DURATIONS.FP1)}</td>
            <td className="tv">{getTvText(data.fp1_tv)}</td>
          </tr>
        ) : null}
        {data.fp2_time ? (
          <tr>
            <td className="event">{SESSION_NAMES.FP2}</td>
            <td>{getSesDurationText(data.fp2_time, SESSION_DURATIONS.FP2)}</td>
            <td className="tv">{getTvText(data.fp2_tv)}</td>
          </tr>
        ) : null}
        {data.fp3_time ? (
          <tr>
            <td className="event">{SESSION_NAMES.FP3}</td>
            <td>{getSesDurationText(data.fp3_time, SESSION_DURATIONS.FP3)}</td>
            <td className="tv">{getTvText(data.fp3_tv)}</td>
          </tr>
        ) : null}
        {data.q_time ? (
          <tr>
            <td className="event">{SESSION_NAMES.Q}</td>
            <td>{getSesDurationText(data.q_time, SESSION_DURATIONS.Q)}</td>
            <td className="tv">{getTvText(data.q_tv)}</td>
          </tr>
        ) : null}
        {data.r_time ? (
          <tr>
            <td className="event">{SESSION_NAMES.R}</td>
            <td>{data.r_time}</td>
            <td className="tv">{getTvText(data.r_tv)}</td>
          </tr>
        ) : null}
      </TBody>
    </Table>
  );
}

export default CalendarWidget;
