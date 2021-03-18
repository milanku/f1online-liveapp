import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore } from "redux-persist";
import { createWrapper } from "next-redux-wrapper";
import reducer from "../reducers";
import saga from "../sagas";

export const makeStore = (context) => {
  let store;
  const sagaMiddleware = createSagaMiddleware();

  const isClient = typeof window !== "undefined";

  if (isClient) {
    const { persistReducer } = require("redux-persist");
    const storage = require("redux-persist/lib/storage").default;

    const persistConfig = {
      key: "root",
      whitelist: ["theme"],
      storage,
    };

    store = createStore(
      persistReducer(persistConfig, reducer),
      applyMiddleware(sagaMiddleware)
    );

    store.__PERSISTOR = persistStore(store);
  } else {
    store = createStore(reducer, /*context, */ applyMiddleware(sagaMiddleware));
  }
  store.sagaTask = sagaMiddleware.run(saga);

  return store;
};

//changed debug to false
export const wrapper = createWrapper(makeStore, { debug: false });
