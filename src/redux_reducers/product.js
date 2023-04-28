import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: { value: [] },
  reducers: {
    saveAllProducts: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { saveAllProducts } = productsSlice.actions;

export default productsSlice.reducer;
