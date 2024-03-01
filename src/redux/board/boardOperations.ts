import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../operations";

export const getColums = createAsyncThunk(
  "board/getColums",
  async (boardId: string, { rejectWithValue }) => {
    try {
      const response = await instance.get(`dashboard/${boardId}`);

      console.log(response.data.dashboard);

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

      console.log(response.data.dashboard);

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
      dashboardId: string;
      itemId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      console.log(data);
      const response = await instance.delete("/dashboard/deleteItem", { data });

      console.log(response);

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

// export const deleteCardd = async (data) => {
//   return fetch(
//     "https://incode-group-server.onrender.com/dashboard/deleteItem",
//     {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     }
//   ).then((res) => res.json());
// };
