import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  subscription: "free", // 'free' or 'pro'
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.subscription = "free";
    },
    register: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    upgradeToPro: (state) => {
      state.subscription = "pro";
    },
  },
});

export const { login, logout, register, upgradeToPro } = authSlice.actions;
export default authSlice.reducer;
