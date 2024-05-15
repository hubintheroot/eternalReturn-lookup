import { configureStore } from '@reduxjs/toolkit';
import characterDataReducer from '../features/characterInfo/characterInfoSlice';
import sortOptionSliceReducer from '../features/sortOption/sortOptionSlice';
import imageLoadedSlice from '../features/imageLoaded/imageLoadedSlice';

export default configureStore({
    reducer: {
        characterData: characterDataReducer,
        sortOption: sortOptionSliceReducer,
        imageLoaded: imageLoadedSlice,
    }
})