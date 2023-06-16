import { createSlice } from "@reduxjs/toolkit";

const customPizzaSlice = createSlice({
  name: "customPizzaData",
  initialState: { value: [] },
  reducers: {
    addCustomPizzaData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addCustomPizzaData } = customPizzaSlice.actions;

export default customPizzaSlice.reducer;
