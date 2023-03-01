import { createSlice } from "@reduxjs/toolkit";
import { users } from "../../data/users";
const initialState = { users: [...users] };

export const register = createSlice({
  name: "register",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const token =
        parseInt(Date.now() * Math.random()).toString() +
        "Delta" +
        parseInt(Date.now() * Math.random()).toString();
      state.users.push({ ...action.payload, token: token });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser } = register.actions;

export default register.reducer;
