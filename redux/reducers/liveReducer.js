import { startLiveAutofetch, TYPES } from "../actions/liveActions";

const defaultState = {
  news: [],
  oldestItemTime: null,
  latestItemTime: null,
  start: null,
  end: null,
  isLoading: true,
  error: null,
  hasMore: true,
  hasEnded: false,
  adsData: null,
  adsID: null,
};

const liveReducer = (state = defaultState, action) => {
  //console.log(action);
  switch (action.type) {
    case TYPES.INITIALIZE:
      return {
        ...defaultState,
        start: action.start,
        end: action.end,
        adsID: action.adsID,
        oldestItemTime: action.end,
        latestItemTime: action.start,
        error: null,
        hasEnded:
          action.start &&
          action.end &&
          action.start.length > 0 &&
          action.end.length > 0,
      };
    case TYPES.AUTO_SUCCESS:
      let newArray;
      if (state.news.length === 0) {
        newArray = action.news.map((item, index) => ({
          ...item,
          adIndex: index === 0 ? index : -index,
        }));
      } else {
        const topIndex = state.news[0].adIndex;
        const freshNews = action.news
          .reverse()
          .map((item, index) => ({ ...item, adIndex: topIndex + index + 1 }))
          .reverse();
        newArray = [...freshNews, ...state.news];
      }
      return {
        ...state,
        isLoading: false,
        news: newArray,
        adsData: action.adsData ? action.adsData : null,
        latestItemTime: newArray[0] ? newArray[0].date : state.latestItemTime,
        oldestItemTime: newArray[newArray.length - 1]
          ? newArray[newArray.length - 1].date
          : state.oldestItemTime,
        hasEnded:
          state.hasEnded || (newArray[0] ? newArray[0].acf.hasEnded : false),
        hasMore: newArray.length !== 0,
        error: null,
      };
    case TYPES.AUTO_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case TYPES.FETCH_ARCHIVE:
      return {
        ...state,
        isLoading: true,
      };
    case TYPES.FETCH_ARCHIVE_SUCCESS:
      let newArray2;
      if (state.news.length === 0) {
        newArray2 = action.news.map((item, index) => ({
          ...item,
          adIndex: index === 0 ? index : -index,
        }));
      } else {
        const lowIndex = state.news[state.news.length - 1].adIndex;
        const oldNews = action.news.map((item, index) => ({
          ...item,
          adIndex: lowIndex - index - 1,
        }));
        newArray2 = [...state.news, ...oldNews];
      }
      return {
        ...state,
        news: newArray2,
        adsData: action.adsData ? action.adsData : null,
        isLoading: false,
        error: null,
        latestItemTime: newArray2[0] ? newArray2[0].date : state.latestItemTime,
        oldestItemTime: newArray2[newArray2.length - 1]
          ? newArray2[newArray2.length - 1].date
          : state.oldestItemTime,
        hasEnded:
          state.hasEnded || (newArray2[0] ? newArray2[0].acf.hasEnded : false),
        hasMore: parseInt(action.totalNewsCount) !== 0,
      };
    case TYPES.FETCH_ARCHIVE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
  }
  return state;
};

export default liveReducer;
