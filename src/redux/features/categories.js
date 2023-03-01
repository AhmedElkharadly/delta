import { createSlice } from "@reduxjs/toolkit";
import { categories } from "../../data/categories";
const initialState = { categories: [...categories] };

export const Categories = createSlice({
  name: "assets",
  initialState,
  reducers: {
    addCategorie: (state, action) => {
      const uniqueId = parseInt(Date.now() * Math.random()).toString();
      state.categories.push({ ...action.payload, id: uniqueId });
    },
    deleteCategorie: (state, action) => {
      state.categories = state.categories.filter(
        (categorie) => categorie.id != action.payload
      );
    },
    editCategorie: (state, action) => {
      state.categories = state.categories.map((categorie) => {
        if (action.payload.id === categorie.id) {
          return { ...action.payload };
        }
        return categorie;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCategorie, deleteCategorie, editCategorie } =
  Categories.actions;

export default Categories.reducer;
