import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import loginStoreReducer from "./loginStore";
import userDataStoreReducer from "./userDataStore";
import createSagaMiddleware from "@redux-saga/core";
import { rootsaga } from "./saga/rootsaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    Login: loginStoreReducer,
    userData: userDataStoreReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootsaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
