// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../root/addToCardSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
