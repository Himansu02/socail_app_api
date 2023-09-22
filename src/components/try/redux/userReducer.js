import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
  name: "activeUser",
  initialState: {
    user: null,
  },
  reducers: {
    getCurrentUser: (state, action) => {
      state.user = action.payload;
    },
    updateCurrentUser: (state, action) => {
      state.user=action.payload
    },
  },
});

export const { getCurrentUser,updateCurrentUser } = userReducer.actions;
export default userReducer.reducer;
