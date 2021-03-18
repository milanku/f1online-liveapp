import { combineReducers } from "redux";
//import panelReducer from "./panelReducer";
import themeReducer from "./themeReducer";
import liveReducer from "./liveReducer";

//import { persistReducer } from 'redux-persist'
const { persistReducer } = require("redux-persist");
const storage = require("redux-persist/lib/storage").default;

const panelPersistConfig = {
  key: "panels",
  storage: storage,
  whitelist: ["lastReset", "impressionsCounter"],
};

export default combineReducers({
  //panels: persistReducer(panelPersistConfig, panelReducer),
  theme: themeReducer,
  live: liveReducer,
});
