import { call, select, takeEvery, takeLatest } from "redux-saga/effects";
import { userDataStoreAction } from "../userDataStore";
import axios from "axios";
import { getUserDataStore } from "./selector";
import { userDatainitialType } from "../userDataStore";
import { loginStoreAction } from "../loginStore";

function* createUserDataOnSignUp(action: {
  payload: { email: string; userName: string };
  type: string;
}) {
  const { email, userName } = action.payload;
  const newEmailRemove = email.split("@")[0];
  const PlankuserData = {
    email: email,
    balance: 0,
    thisMonth: { limit: 0, spending: 0 },
    lastMonth: { limit: 0, spending: 0 },
    user: userName,
    income: 0,
  };

  yield call(() => {
    axios.post(
      `https://react-test-7684d-default-rtdb.asia-southeast1.firebasedatabase.app/userData/${newEmailRemove}.json`,
      PlankuserData
    );
  });
}

function* uploadData() {
  const localEmail = localStorage?.getItem("email");
  const emailRemove = localEmail?.split("@")[0];
  const userData: userDatainitialType = yield select(getUserDataStore);

  yield call(() =>
    axios.put(
      `https://react-test-7684d-default-rtdb.asia-southeast1.firebasedatabase.app/userData/${emailRemove}/${userData.fireBaseLocation}.json`,
      userData.data
    )
  );
}

export function* rootsaga() {
  // update userdata
  yield takeEvery(userDataStoreAction.addNewExpense.type, uploadData);
  yield takeLatest(userDataStoreAction.MonthlyUpdateTest.type, uploadData);
  yield takeEvery(userDataStoreAction.removeExpense.type, uploadData);
  yield takeEvery(userDataStoreAction.addNewToBuy.type, uploadData);
  yield takeEvery(userDataStoreAction.updateIncome, uploadData);
  yield takeEvery(userDataStoreAction.updateBalance, uploadData);
  yield takeEvery(userDataStoreAction.updateLimit, uploadData);

  // signup action
  yield takeLatest(loginStoreAction.signUp.type, createUserDataOnSignUp);
}
