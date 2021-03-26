import { call, put } from "redux-saga/effects";
import fetchProgramme from "../../apis/fetchProgramme";
import {
  setProgramme,
  setProgrammeError
} from "../../actions/programmeActions";

function* fetchProgrammeSaga() {
  try {
    const data = yield call(fetchProgramme);
    yield put(setProgramme(data));
  } catch (err) {
    yield put(setProgrammeError(err.toString()));
  }
}

export default fetchProgrammeSaga;
