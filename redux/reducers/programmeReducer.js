import { TYPES } from "../actions/programmeActions";
import { HYDRATE } from "next-redux-wrapper";

const defaultState = {
  eventCalendarId: null,
  event: {},
  error: null,
  isLoading: true
};

const programmeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case HYDRATE: {
      //hydrate only if server sends new programme and client does not have one
      if (Object.keys(action.payload.programme.event).length !== 0) {
        return {
          ...action.payload.programme
        };
      } else {
        return {
          ...state,
          isLoading: true
        }
      }
    }
    case TYPES.FETCH:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case TYPES.SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        event: action.event,
        eventCalendarId: action.eventCalendarId
      };
    }
    case TYPES.ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    }
  }
  return state;
};

export default programmeReducer;
