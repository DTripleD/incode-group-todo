import { configureStore } from "@reduxjs/toolkit";
import { boardReducer } from "./board/boardSlice";
import { todoReducer } from "./dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    board: boardReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
