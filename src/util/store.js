import { configureStore } from "@reduxjs/toolkit";
import characterDataReducer from "../features/characterInfo/characterInfoSlice";
import sortOptionSliceReducer from "../features/sortOption/sortOptionSlice";
import imageLoadedSlice from "../features/imageLoaded/imageLoadedSlice";
import seasonInfoSlice from "../features/seasonInfo/seasonInfoSlice";
import userInfoSlice from "../features/loginInfo/userInfoSlice";

export default configureStore({
  reducer: {
    characterData: characterDataReducer,
    sortOption: sortOptionSliceReducer,
    imageLoaded: imageLoadedSlice,
    seasonInfo: seasonInfoSlice,
    userInfo: userInfoSlice,
  },
});
