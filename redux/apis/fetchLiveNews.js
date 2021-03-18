import { URLS } from "./urls";
const PER_PAGE = 15;
const FIELDS = "_fields=id,type,acf,date";

async function fetchLiveNews({
  before,
  after,
  start,
  end,
  initialLoad,
  adsID,
}) {
  const archiveLoading =
    before && start && before.length > 0 && start.length > 0;
  //if autoloading and not initial batch size 100
  const batchSize = initialLoad || archiveLoading ? PER_PAGE : 100;

  let timeBlock = archiveLoading
    ? `&before=${before}&after=${start}`
    : `${after && after.length > 0 ? `&after=${after}` : ""}${
        end && end.length > 0 ? `&before=${end}` : ""
      }`;

  try {
    let adsData = null;
    if (adsID) {
      adsData = await fetch(
        `${URLS.BASE}${URLS.LIVE_ADS_DATA_ENDPOINT}${adsID}`
      )
        .then((res) => res.json())
        .then((res) => res);
    }

    return await fetch(
      `${URLS.BASE}${URLS.LIVE_ENDPOINT}?per_page=${batchSize}&${FIELDS}${timeBlock}`
    )
      .then((res) =>
        res.json().then((json) => ({
          headers: res.headers,
          json,
        }))
      )
      .then(({ headers, json }) => ({
        news: json,
        adsData: adsData,
        totalNewsCount: headers.get("x-wp-total"),
      }));
  } catch (e) {
    throw new Error(e.response.data.Error);
  }
}

export { PER_PAGE };
export default fetchLiveNews;
