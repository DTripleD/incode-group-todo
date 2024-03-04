import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const instance = axios.create({
  baseURL: "https://incode-group-server.onrender.com",
});

export const createBoard = createAsyncThunk(
  "todo/createBoard",
  async (title: string, { rejectWithValue }) => {
    try {
      const response = await instance.post("dashboard", { title });

      if (response.status === 201) {
        return response.data.dashboard;
      } else {
        return rejectWithValue("Failed to delete cocktail");
      }
    } catch (error) {
      return rejectWithValue({
        payload: (error as { message: string }).message,
      });
    }
  }
);

export const getData = createAsyncThunk(
  "todo/getData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("dashboard");

      if (response.status === 200) {
        return response.data.dashboards;
      } else {
        return rejectWithValue({ payload: "Failed to get info" });
      }
    } catch (error) {
      return rejectWithValue({
        payload: (error as { message: string }).message,
      });
    }
  }
);

export const deleteBoard = createAsyncThunk(
  "todo/deleteBoard",
  async (dashboardId: string, { rejectWithValue }) => {
    try {
      const response = await instance.delete(`dashboard/${dashboardId}`);

      if (response.status === 200) {
        return dashboardId;
      } else {
        return rejectWithValue("Failed to delete cocktail");
      }
    } catch (error) {
      return rejectWithValue({
        payload: (error as { message: string }).message,
      });
    }
  }
);

export const updateBoardName = createAsyncThunk(
  "todo/updateBoardName",
  async (
    data: {
      dashboardId: string;
      newTitle: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await instance.put("dashboard", data);

      if (response.status === 200) {
        return response.data.dashboard;
      } else {
        return rejectWithValue("Failed to delete cocktail");
      }
    } catch (error) {
      return rejectWithValue({
        payload: (error as { message: string }).message,
      });
    }
  }
);
