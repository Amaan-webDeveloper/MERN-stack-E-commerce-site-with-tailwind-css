import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdmin:false,
  status: false,
  userData: null,
  orderItems:null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    adminLogin: (state, action) => {
      state.isAdmin = true
      state.status = true;
      state.userData = action.payload;
    },
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    orderItems: (state, action) => {
      state.orderItems=action.payload;
    },
    logout: (state) => {
      state.isAdmin=false;
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout,adminLogin,orderItems } = authSlice.actions;

export default authSlice.reducer;
