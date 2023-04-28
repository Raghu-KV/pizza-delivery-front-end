import { createSlice } from "@reduxjs/toolkit";

const cartSilce = createSlice({
  name: "cartData",
  initialState: { value: [] },
  reducers: {
    addToCart: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { addToCart } = cartSilce.actions;

export default cartSilce.reducer;
