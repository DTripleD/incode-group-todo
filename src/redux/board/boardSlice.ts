import { createSlice } from "@reduxjs/toolkit";
import {
  addCard,
  deleteCard,
  getColums,
  updateCardName,
  updateOnDragEnd,
} from "./boardOperations";

const initialState = {
  boards: {},
  isLoading: false,
  error: "",
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = "";
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getColums.fulfilled, (state, action) => {
        state.boards = action.payload.boards;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.boards = action.payload.boards;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.boards = action.payload.boards;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(updateOnDragEnd.fulfilled, (state, action) => {
        state.boards = action.payload.boards;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(updateCardName.fulfilled, (state, action) => {
        state.boards = action.payload.boards;
        state.isLoading = false;
        state.error = "";
      })
      .addMatcher((action) => action.type.endsWith("/pending"), handlePending)
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        handleRejected
      ),
});

export const boardReducer = boardSlice.reducer;
