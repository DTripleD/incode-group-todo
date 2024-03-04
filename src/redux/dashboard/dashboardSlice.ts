import { createSlice } from "@reduxjs/toolkit";

import {
  createBoard,
  deleteBoard,
  getData,
  updateBoardName,
} from "./dashboardOperations";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = "";
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const initialState = {
  dashboards: [{ _id: null, title: null, boards: [{}] }],
  isLoading: false,
  error: "",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(createBoard.fulfilled, (state, action) => {
        state.dashboards.push(action.payload);
        state.isLoading = false;
        state.error = "";
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.dashboards = action.payload;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.dashboards = state.dashboards.filter(
          (dashboard) => dashboard._id !== action.payload
        );
        state.isLoading = false;
        state.error = "";
      })
      .addCase(updateBoardName.fulfilled, (state, action) => {
        state.dashboards = state.dashboards.map((dashboard) => {
          return dashboard._id === action.payload._id
            ? { ...dashboard, title: action.payload.title }
            : dashboard;
        });
        state.isLoading = false;
        state.error = "";
      })
      .addMatcher((action) => action.type.endsWith("/pending"), handlePending)
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        handleRejected
      ),
});

export const todoReducer = todoSlice.reducer;
