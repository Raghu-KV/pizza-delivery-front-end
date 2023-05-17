import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: { value: [] },
  reducers: {
    addItemToOrders: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addItemToOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
