import { createSlice } from "@reduxjs/toolkit";
import { userDataType } from "../type/userDataType";

export type userDatainitialType = {
  fireBaseLocation: string;
  data: userDataType;
};

const userDatainitialState: userDatainitialType = {
  fireBaseLocation: "",
  data: {
    email: "",
    balance: 0,
    thisMonth: { limit: 0, spending: 0 },
    lastMonth: { limit: 0, spending: 0 },
    user: "",
    expense: [],
    toBuy: [],
    income: 0,
  },
};

const userDataStore = createSlice({
  name: "userData",
  initialState: userDatainitialState,
  reducers: {
    clearUserStateOnlogout(state) {
      state.data = {
        email: "",
        balance: 0,
        thisMonth: { limit: 0, spending: 0 },
        lastMonth: { limit: 0, spending: 0 },
        user: "",
        expense: [],
        toBuy: [],
        income: 0,
      };
      state.fireBaseLocation = "";
    },

    setFireBaseLocation(state, action: { payload: string }) {
      state.fireBaseLocation = action.payload;
    },

    setUserData(state, action) {
      state.data = { ...action.payload };
    },

    updateIncome(state, action: { payload: number }) {
      state.data.income = action.payload;
    },

    updateBalance(state, action: { payload: number }) {
      state.data.balance = action.payload;
    },

    updateLimit(state, action: { payload: number }) {
      state.data.thisMonth.limit = action.payload;
    },

    addNewExpense(
      state,
      action: { payload: { for: string; cost: number; date: string } }
    ) {
      if (state.data.expense === undefined) {
        state.data.expense = [action.payload];
      } else {
        state.data.expense.unshift(action.payload);
      }

      state.data.thisMonth.spending += action.payload.cost;

      state.data.balance -= action.payload.cost;
    },

    removeExpense(state, action: { payload: { index: number; cost: number } }) {
      const filter = state.data.expense.filter(
        (x, index) => index !== action.payload.index
      );

      state.data.expense = filter;

      state.data.thisMonth.spending -= action.payload.cost;

      state.data.balance += action.payload.cost;
    },

    addNewToBuy(state, action: { payload: { for: string } }) {
      if (state.data.toBuy === undefined) {
        state.data.toBuy = [action.payload];
      } else {
        state.data.toBuy.unshift(action.payload);
      }
    },

    MonthlyUpdateTest(state) {
      const oldData = { ...state.data };
      const oldthisMonthData = { ...state.data.thisMonth };

      state.data.lastMonth = oldthisMonthData;
      state.data.balance = oldData.balance + oldData.income;

      state.data.thisMonth.spending = 0;
      state.data.thisMonth.limit = oldthisMonthData.limit;

      state.data.expense = [];
    },
  },
});

export const userDataStoreAction = userDataStore.actions;
export default userDataStore.reducer;
