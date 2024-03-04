import { store } from "./store";

type RootState = ReturnType<typeof store.getState>;

export const dataSelector = (state: RootState) => state.todo.dashboards;

export const boardSelector = (state: RootState) => state.board.boards;

export const isLoadingBoardSelector = (state: RootState) =>
  state.todo.isLoading;

export const isLoadingCardSelector = (state: RootState) =>
  state.board.isLoading;
