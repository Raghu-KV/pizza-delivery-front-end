import { createSlice } from "@reduxjs/toolkit";

const cartSilce = createSlice({
  name: "cartData",
  initialState: { value: [] },
  reducers: {
    addToCart: (state, action) => {
      state.value = action.payload;
    },
    deleteItemFromCart: (state, action) => {
      state.value = action.payload;
    },
    changeQuantity: (state, action) => {
      console.log(action);
      state.value.map((data) => {
        if (data._id === action.payload._id) {
          data.quantity = action.payload.quantity;
        }
      });
    },
  },
});

export const { addToCart, deleteItemFromCart, changeQuantity } =
  cartSilce.actions;

export default cartSilce.reducer;
