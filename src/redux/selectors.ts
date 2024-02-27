import { store } from "./store";

type RootState = ReturnType<typeof store.getState>;

export const userSelector = (state: RootState) => state.user;
