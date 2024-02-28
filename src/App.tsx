import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Board from "./components/Board/Board";
import Dashboard from "./components/Dashboards/Dashboard";

function App() {
  return (
    // <div className="App">
    //   <Board />
    // </div>

    <Routes>
      <Route index element={<Dashboard />} />

      <Route path="/:board" element={<Board />} />
      {/* <Route path="/:category" element={<CategoryPage />} /> */}
    </Routes>
  );
}

export default App;
