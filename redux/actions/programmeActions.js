const TYPES = {
  FETCH: "PROGRAMME_FETCH",
  SUCCESS: "PROGRAMME_SUCCESS",
  ERROR: "PROGRAMME_ERROR",
};

const fetchProgramme = () => ({
  type: TYPES.FETCH,
});

const setProgramme = ({ event, eventCalendarId }) => ({
  type: TYPES.SUCCESS,
  event,
  eventCalendarId,
});

const setProgrammeError = (error) => ({
  type: TYPES.ERROR,
  error,
});

export { TYPES, fetchProgramme, setProgramme, setProgrammeError };
