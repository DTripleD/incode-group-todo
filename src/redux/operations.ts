import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const instance = axios.create({
  baseURL: "https://incode-group-server.onrender.com",
});

export const createBoardd = createAsyncThunk(
  "todo/createBoard",
  async (title, { rejectWithValue }) => {
    try {
      const response = await instance.post("dashboard", { title });

      if (response.status === 201) {
        return response.data.dashboard;
      } else {
        return rejectWithValue("Failed to delete cocktail");
      }
    } catch (error) {
      return rejectWithValue(error.message);
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
        return rejectWithValue("Failed to delete cocktail");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBoardd = createAsyncThunk(
  "todo/deleteBoardd",
  async (dashboardId, { rejectWithValue }) => {
    try {
      const response = await instance.delete(`dashboard/${dashboardId}`);

      if (response.status === 200) {
        return dashboardId;
      } else {
        return rejectWithValue("Failed to delete cocktail");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBoardNamee = createAsyncThunk(
  "todo/updateBoardNamee",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instance.put("dashboard", data);

      console.log(response.data);

      if (response.status === 200) {
        return response.data.dashboard;
      } else {
        return rejectWithValue("Failed to delete cocktail");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
