import { useEffect, useState } from "react";

import { BoardList } from "./Dashboard.styled";

import DashboardItem from "../DashboardItem/DashboardItem";

import { useDispatch, useSelector } from "react-redux";
import { createBoardd, getData, deleteBoardd } from "../../redux/operations";
import { dataSelector } from "../../redux/selectors";

const Dashboard = () => {
  const [creating, setCreating] = useState(false);

  const data = useSelector(dataSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const createBoard = (e) => {
    e.preventDefault();

    dispatch(createBoardd(e.target.input.value));
  };

  const deleteBoard = (boardId: string) => {
    dispatch(deleteBoardd(boardId));
  };

  return (
    <div>
      <BoardList>
        {data.map((board) => (
          <DashboardItem
            key={board._id}
            board={board}
            deleteBoard={deleteBoard}
          />
        ))}
      </BoardList>
      {creating ? (
        <form onSubmit={createBoard}>
          <input placeholder="Name of board" name="input" />
          <button type="submit">Add</button>
          <button type="button" onClick={() => setCreating((prev) => !prev)}>
            Close
          </button>
        </form>
      ) : (
        <button onClick={() => setCreating(true)}>Create new board</button>
      )}
    </div>
  );
};

export default Dashboard;
