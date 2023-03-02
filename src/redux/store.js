import { configureStore } from "@reduxjs/toolkit";
import AssetsReducer from "./features/assets";
import CategoriesReducer from "./features/categories";
import departmentReducer from "./features/department";
import registerReducer from './features/register'
import LoginReducer from './features/user'

export const store = configureStore({
  reducer: {
    assets: AssetsReducer,
    Categories: CategoriesReducer,
    department: departmentReducer,
    register: registerReducer,
    login: LoginReducer,
  },
});
