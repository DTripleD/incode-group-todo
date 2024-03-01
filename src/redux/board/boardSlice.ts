import { createSlice } from "@reduxjs/toolkit";
import { addCard, deleteCard, getColums } from "./boardOperations";

const initialState = {
  boards: {},
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getColums.fulfilled, (state, action) => {
        state.boards = action.payload.boards;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.boards = action.payload.boards;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.boards = action.payload.boards;
      }),
});

export const boardReducer = boardSlice.reducer;
