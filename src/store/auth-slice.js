import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userAuth: false,
    checkingAuth: true,
  },
  reducers: {
    setAuth(state, action) {
      state.userAuth = action.payload;
    },
    setCheckingAuth(state, action) {
      state.checkingAuth = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
