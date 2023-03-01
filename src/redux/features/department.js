import { createSlice } from "@reduxjs/toolkit";
import { departments } from "../../data/departments";

const initialState = { ...departments };

export const department = createSlice({
  name: "department",
  initialState,
  reducers: {
    addDepartment: (state, action) => {
      const uniqueId = parseInt(Date.now() * Math.random()).toString();
      state.departments.push({ ...action.payload, id: uniqueId });
    },
    deleteDepartment: (state, action) => {
      state.departments = state.departments.filter(
        (dep) => dep.id != action.payload
      );
    },
    editDepartment: (state, action) => {
      state.departments = state.departments.map((dep) => {
        if (action.payload.id === dep.id) {
          return { ...action.payload };
        }
        return dep;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addAsset, deleteAsset, editAsset } = department.actions;

export default department.reducer;
