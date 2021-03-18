const TYPES = {
  INITIALIZE: "LIVE_INITIALIZE",
  START_AUTOFETCH: "LIVE_START_AUTOFETCH",
  PAUSE_AUTOFETCH: "LIVE_PAUSE_AUTOFETCH",

  AUTO_SUCCESS: "LIVE_SUCCESS",
  AUTO_FAIL: "LIVE_FAIL",

  FETCH_ARCHIVE: "LIVE_FETCH_ARCHIVE",
  FETCH_ARCHIVE_SUCCESS: "LIVE_FETCH_ARCHIVE_SUCCESS",
  FETCH_ARCHIVE_FAIL: "LIVE_FETCH_ARCHIVE_FAIL",
};

const initialize = (payload) => ({
  type: TYPES.INITIALIZE,
  start: payload.start,
  end: payload.end,
  adsID: payload.adsID,
});

const startLiveAutofetch = () => ({
  type: TYPES.START_AUTOFETCH,
});

const pauseLiveAutofetch = () => ({
  type: TYPES.PAUSE_AUTOFETCH,
});

const addLiveNews = (payload) => ({
  type: TYPES.AUTO_SUCCESS,
  news: payload.news,
  adsData: payload.adsData,
  totalNewsCount: payload.totalNewsCount,
});

const setLiveNewsError = (error) => ({
  type: TYPES.AUTO_FAIL,
  error,
});

// actions for fetching older items on scroll
const fetchLiveNewsArchive = () => ({
  type: TYPES.FETCH_ARCHIVE,
});

const addLiveNewsArchive = (payload) => ({
  type: TYPES.FETCH_ARCHIVE_SUCCESS,
  news: payload.news,
  adsData: payload.adsData,
  totalNewsCount: payload.totalNewsCount,
});

const setLiveNewsArchiveError = (error) => ({
  type: TYPES.FETCH_ARCHIVE_FAIL,
  error,
});

export {
  TYPES,
  initialize,
  startLiveAutofetch,
  pauseLiveAutofetch,
  addLiveNews,
  setLiveNewsError,
  fetchLiveNewsArchive,
  addLiveNewsArchive,
  setLiveNewsArchiveError,
};
