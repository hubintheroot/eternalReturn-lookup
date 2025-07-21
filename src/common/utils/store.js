import { configureStore } from '@reduxjs/toolkit';
import characterDataReducer from '../../features/character/characterInfoSlice';
import sortOptionSliceReducer from '../../features/sortOption/sortOptionSlice';
import imageLoadedSlice from '../../features/imageLoaded/imageLoadedSlice';
import seasonInfoSlice from '../../features/season/seasonInfoSlice';
import userInfoSlice from '../../features/login/userInfoSlice';

export default configureStore({
  reducer: {
    characterData: characterDataReducer,
    sortOption: sortOptionSliceReducer,
    imageLoaded: imageLoadedSlice,
    seasonInfo: seasonInfoSlice,
    userInfo: userInfoSlice,
  },
});
