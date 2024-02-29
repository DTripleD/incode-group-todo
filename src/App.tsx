import { Route, Routes } from "react-router-dom";
import "./App.css";
import Board from "./components/Board/Board";
import Dashboard from "./components/Dashboards/Dashboard";

function App() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="/:board" element={<Board />} />
    </Routes>
  );
}

export default App;
