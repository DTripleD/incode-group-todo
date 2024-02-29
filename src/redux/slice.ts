import { createSlice } from "@reduxjs/toolkit";

import {
  createBoardd,
  deleteBoardd,
  getData,
  updateBoardNamee,
} from "./operations";

const initialState = {
  dashboards: [{ _id: null, title: null }],
};

const userSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(createBoardd.fulfilled, (state, action) => {
        state.dashboards.push(action.payload);
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.dashboards = action.payload;
      })
      .addCase(deleteBoardd.fulfilled, (state, action) => {
        state.dashboards = state.dashboards.filter(
          (dashboard) => dashboard._id !== action.payload
        );
      })
      .addCase(updateBoardNamee.fulfilled, (state, action) => {
        state.dashboards = state.dashboards.map((dashboard) => {
          return dashboard._id === action.payload._id
            ? { ...dashboard, title: action.payload.title }
            : dashboard;
        });
      }),
});

export const userReducer = userSlice.reducer;
