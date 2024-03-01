import { useEffect, useState } from "react";

import {
  BoardList,
  CreateButton,
  CreateWrapper,
  StyledForm,
} from "./Dashboard.styled";

import DashboardItem from "../DashboardItem/DashboardItem";

import { useDispatch, useSelector } from "react-redux";
import { createBoardd, getData, deleteBoardd } from "../../redux/operations";
import { dataSelector } from "../../redux/selectors";
import { Check, X } from "lucide-react";

const Dashboard = () => {
  const [creating, setCreating] = useState(false);

  const data = useSelector(dataSelector);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const createBoard = (e) => {
    e.preventDefault();

    dispatch(createBoardd(e.target.input.value)).then(() => {
      setCreating(false);
      e.target.reset();
    });
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
      <CreateWrapper>
        {creating ? (
          <StyledForm onSubmit={createBoard}>
            <input placeholder="Name of board" name="input" />
            <button type="submit">
              <Check />
            </button>
            <button type="button" onClick={() => setCreating((prev) => !prev)}>
              <X />
            </button>
          </StyledForm>
        ) : (
          <CreateButton onClick={() => setCreating(true)}>
            Create new board
          </CreateButton>
        )}
      </CreateWrapper>
    </div>
  );
};

export default Dashboard;
