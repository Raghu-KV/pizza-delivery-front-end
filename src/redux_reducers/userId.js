import { createSlice } from "@reduxjs/toolkit";

const userIdSlice = createSlice({
  name: "userId",
  initialState: { value: [] },
  reducers: {
    inputUserId: (state, action) => {
      state.value = state.value.push(action.payload);
    },
  },
});

export const { inputUserId } = userIdSlice.actions;

export default userIdSlice.reducer;
