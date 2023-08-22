import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../Reducers/AuthSlice";
import CartSlice from "../Reducers/CartSlice";
const store = configureStore({
  reducer: {
    auth: AuthSlice,
    cart:CartSlice
  },
});

export default store;
