import { createSlice } from "@reduxjs/toolkit";

let token = localStorage.getItem("token");

const loginStoreInitial = {
  isLogin: token ? true : false,
  token: token ? token : "",
};

const loginStore = createSlice({
  name: "login",
  initialState: loginStoreInitial,
  reducers: {
    signUp(state, action: { payload: { email: string; userName: string } }) {},
    login(state, action: { payload: { token: string; email: string } }) {
      state.isLogin = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
    },

    logout(state) {
      state.isLogin = false;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
});

export const loginStoreAction = loginStore.actions;
export default loginStore.reducer;
