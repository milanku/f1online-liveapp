import { takeLatest } from "redux-saga/effects";
import liveSaga from "./handlers/liveSaga";
import { TYPES as LIVE } from "../actions/liveActions";

//watcher
function* rootSaga() {
  yield takeLatest(LIVE.INITIALIZE, liveSaga);
}

export default rootSaga;
