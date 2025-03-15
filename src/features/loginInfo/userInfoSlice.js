import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
  name: "userInfo",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userDataSlice.actions;

export default userDataSlice.reducer;
