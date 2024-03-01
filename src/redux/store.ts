import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slice";
import { boardReducer } from "./board/boardSlice";

export const store = configureStore({
  reducer: {
    todo: userReducer,
    board: boardReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
