import { v4 as uuidv4 } from "uuid";
export const data = [
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

export const columnsFromBackend = {
  [uuidv4()]: {
    title: "To Do",
    items: data,
  },
  [uuidv4()]: {
    title: "In Progress",
    items: [],
  },
  [uuidv4()]: {
    title: "Done",
    items: [],
  },
};
