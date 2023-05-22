import { createSlice } from "@reduxjs/toolkit";

const allOrders = createSlice({
  name: "allOrders",
  initialState: { value: [] },
  reducers: {
    reduxAddAllOrders: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { reduxAddAllOrders } = allOrders.actions;

export default allOrders.reducer;
