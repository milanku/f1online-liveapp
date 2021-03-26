import { URLS } from "./urls";
const FIELDS = "&_fields=acf,type,id";

export default async function fetchProgramme() {
  try {
    const calendarID = await fetch(
      `${URLS.BASE}${URLS.NEXT_VENUE_ID_ENDPOINT}?per_page=1${FIELDS}`
    )
      .then(res => res.json())
      .then(res => res[0].acf.calendar_gp_id);

    return await fetch(`${URLS.BASE}${URLS.CALENDAR_ENDPOINT}${calendarID}`)
      .then(res => res.json())
      .then(res => ({ event: res.acf, eventCalendarId: calendarID }));
  } catch (e) {
    throw new Error(e.response.data.Error);
  }
}
