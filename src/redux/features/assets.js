import { createSlice } from "@reduxjs/toolkit";
import { assets } from "../../data/assets";
const initialState = {
  assets: [...assets],
  getAssets: [],
};

export const Assets = createSlice({
  name: "assets",
  initialState,
  reducers: {
    addAsset: (state, action) => {
      const uniqueId = parseInt(Date.now() * Math.random()).toString();
      state.assets.push({ ...action.payload, id: uniqueId });
    },
    deleteAsset: (state, action) => {
      state.assets = state.assets.filter((asset) => {
        return asset.id !== action.payload;
      });    },
    editAsset: (state, action) => {
      state.assets = state.assets?.map((asset) => {
        if (action.payload.id === asset.id) {
          return { ...action.payload };
        }
        return asset;
      });
    },
    getAssetaByCatId: (state, action) => {
      state.getAssets = state?.assets?.filter((asset) => {
        return asset.catId == action.payload;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addAsset, deleteAsset, editAsset, getAssetaByCatId } =
  Assets.actions;

export default Assets.reducer;
