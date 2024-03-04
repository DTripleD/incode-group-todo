import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../dashboard/dashboardOperations";

export const getColums = createAsyncThunk(
  "board/getColums",
  async (boardId: string, { rejectWithValue }) => {
    try {
      const response = await instance.get(`dashboard/${boardId}`);

      if (response.status === 200) {
        return response.data.dashboard;
      } else {
        return console.log("Failed to fetch data");
      }
    } catch (error) {
      return rejectWithValue({
        payload: (error as { message: string }).message,
      });
    }
  }
);

export const addCard = createAsyncThunk(
  "board/addCard",
  async (
    data: {
      dashboardId: string;
      newData: {
        title: string;
        description: string;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await instance.post(
        "https://incode-group-server.onrender.com/dashboard/addDataToBoard",
        data
      );

      if (response.status === 200) {
        return response.data.dashboard;
      } else {
        return console.log("Failed to fetch data");
      }
    } catch (error) {
      return rejectWithValue({
        payload: (error as { message: string }).message,
      });
    }
  }
);

export const deleteCard = createAsyncThunk(
  "board/deleteCard",
  async (
    data: {
      dashboardId: string | undefined;
      itemId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await instance.delete("/dashboard/deleteItem", { data });

      if (response.status === 200) {
        return response.data.dashboard;
      } else {
        return console.log("Failed to fetch data");
      }
    } catch (error) {
      return rejectWithValue({
        payload: (error as { message: string }).message,
      });
    }
  }
);

export const updateOnDragEnd = createAsyncThunk(
  "todo/updateOnDragEnd",
  async (
    data: { dashboardId: string; newBoards: object },
    { rejectWithValue }
  ) => {
    try {
      const response = await instance.post("/dashboard/updateBoards", data);

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

export const updateCardName = createAsyncThunk(
  "todo/updateCardName",
  async (
    data: {
      dashboardId: string;
      itemId: string;
      newTitle: string;
      newDescription: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await instance.put("dashboard/updateItemTitle", data);

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
