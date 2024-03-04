import "./App.css";

import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import SharedLayout from "./components/SharedLayout/SharedLayout";

const BoardPage = lazy(() => import("./pages/Board/BoardPage"));
const DashboardPage = lazy(() => import("./pages/Dashboard/DashboardPage"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="/:board" element={<BoardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
