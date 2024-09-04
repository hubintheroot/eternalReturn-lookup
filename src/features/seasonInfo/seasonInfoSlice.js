import { createSlice } from "@reduxjs/toolkit";

export const seasonInfoSlice = createSlice({
  name: "seasonInfo",
  initialState: {
    data: null,
  },
  reducers: {
    setSeasonInfo: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setSeasonInfo } = seasonInfoSlice.actions;

export default seasonInfoSlice.reducer;
