import { createSlice } from "@reduxjs/toolkit";

import { v4 as uuidv4 } from "uuid";

const data = [
  {
    id: "1",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent.",
    description: "25-May-2020",
  },
  {
    id: "2",
    title: "Fix Styling",
    description: "26-May-2020",
  },
  {
    id: "3",
    title: "Handle Door Specs",
    description: "27-May-2020",
  },
  {
    id: "4",
    title: "morbi",
    description: "23-Aug-2020",
  },
  {
    id: "5",
    title: "proin",
    description: "05-Jan-2021",
  },
];

const initialState = {
  toDo: {
    title: "To Do",
    items: data,
    id: uuidv4(),
  },
  inProgress: {
    title: "In Progress",
    items: [],
    id: uuidv4(),
  },
  done: {
    title: "Done",
    items: [],
    id: uuidv4(),
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addNew: (state, action) => {
      const columnId = action.payload;
      state[columnId].items.push({
        id: uuidv4(),
        title: "New Task",
        description: "New Due Date",
      });
    },
    moveCard: (state, action) => {
      const { source, destination, index } = action.payload;
      const sourceColumn = state[source];
      const destColumn = state[destination];

      console.log(sourceColumn);

      const [movedCard] = sourceColumn.items.splice(index, 1);

      destColumn.items.splice(destination.index, 0, movedCard);
    },
  },
});

export const userReducer = userSlice.reducer;
export const { addNew, moveCard } = userSlice.actions;
