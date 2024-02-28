import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [creating, setCreating] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://incode-group-server.onrender.com/users/dashboard")
      .then((res) => res.json())
      .then((data) => setData(data.dashboards))
      .catch((error) => console.log(error));
  }, []);

  const createBoard = (e) => {
    e.preventDefault();

    fetch("https://incode-group-server.onrender.com/users/dashboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: e.target.input.value }),
    })
      .then((res) => res.json())
      .then((data) =>
        setData((prev) => {
          return [...prev, data.dashboard];
        })
      )
      .catch((error) => console.log(error));
  };

  console.log(data);

  return (
    <div>
      {data.map((board) => (
        <Link key={board._id} to={board._id}>
          <p>{board.title}</p>
        </Link>
      ))}
      {creating ? (
        <form onSubmit={createBoard}>
          <input placeholder="Name of board" name="input" />
          <button type="submit">Add</button>
        </form>
      ) : (
        <button onClick={() => setCreating(true)}>Create new board</button>
      )}
    </div>
  );
};

export default Dashboard;
