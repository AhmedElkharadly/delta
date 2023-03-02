import { createSlice } from "@reduxjs/toolkit";
import { user } from "../../data/currentUser";
const initialState = {
  user: [user],
};

export const Login = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
        state.user = [({ ...action.payload })];
    },
    deleteUser: (state, action) => {
      state.user = state.user.filter((user) => {
        return user.id !== action.payload;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, deleteUser } =
  Login.actions;

export default Login.reducer;
