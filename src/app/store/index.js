import { configureStore } from '@reduxjs/toolkit';
import characterDataReducer from '@/entities/character/model/characterInfoSlice';
import sortOptionSliceReducer from '@/entities/sort-option/model/sortOptionSlice';
import imageLoadedSlice from '@/entities/image-loaded/model/imageLoadedSlice';
import seasonInfoSlice from '@/entities/season/model/seasonInfoSlice';
import userInfoSlice from '@/entities/user/model/userInfoSlice';

export default configureStore({
  reducer: {
    characterData: characterDataReducer,
    sortOption: sortOptionSliceReducer,
    imageLoaded: imageLoadedSlice,
    seasonInfo: seasonInfoSlice,
    userInfo: userInfoSlice,
  },
});