import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Board from "./components/Board/Board";
import Dashboard from "./components/Dashboards/Dashboard";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://incode-group-server.onrender.com/users/dashboard")
      .then((res) => res.json())
      .then((data) => setData(data.dashboards))
      .catch((error) => console.log(error));
  }, []);

  return (
    // <div className="App">
    //   <Board />
    // </div>

    <Routes>
      <Route index element={<Dashboard data={data} />} />

      <Route path="/:board" element={<Board />} />
      {/* <Route path="/:category" element={<CategoryPage />} /> */}
    </Routes>
  );
}

export default App;
