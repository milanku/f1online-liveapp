import { takeLatest } from "redux-saga/effects";
import liveSaga from "./handlers/liveSaga";
import fetchProgrammeSaga from "./handlers/fetchProgrammeSaga";

import { TYPES as LIVE } from "../actions/liveActions";
import { TYPES as PROGRAMME } from "../actions/programmeActions";

//watcher
function* rootSaga() {
  yield takeLatest(LIVE.INITIALIZE, liveSaga);
  yield takeLatest(PROGRAMME.FETCH, fetchProgrammeSaga);
}

export default rootSaga;
