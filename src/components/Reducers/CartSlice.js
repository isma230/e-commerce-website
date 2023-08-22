// cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    setCartData: (state, action) => {
      return action.payload;
    },
    addToCart: (state, action) => {
      const product = action.payload;
      state.push(product);
    },
  },
});

export const { setCartData, addToCart } = cartSlice.actions;

export default cartSlice.reducer;
