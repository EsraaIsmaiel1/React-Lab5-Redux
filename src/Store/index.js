import { configureStore } from "@reduxjs/toolkit";
import { bookReducer } from "./Slices/bookSlice";
export const store = configureStore({
  reducer: {
    bookList: bookReducer,
  },
});
