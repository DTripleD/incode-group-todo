import { useState } from "react";
import { Link } from "react-router-dom";
import { SquarePen, Trash2 } from "lucide-react";
import { BoardItem } from "./DashboardItem.styled";
import { useDispatch } from "react-redux";
import { updateBoardNamee } from "../../redux/operations";

const DashboardItem = ({
  board,
  deleteBoard,
}: {
  board: any;
  deleteBoard: (boardId: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const [editedTitle, setEditedTitle] = useState(board.title);

  const dispatch = useDispatch();

  const updateBoardName = (e) => {
    e.preventDefault();

    dispatch(
      updateBoardNamee({
        dashboardId: board._id,
        newTitle: e.target.input.value,
      })
    ).then(() => setIsEditing((prev) => !prev));
  };

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  return (
    <BoardItem>
      {isEditing ? (
        <form onSubmit={updateBoardName}>
          <input
            name="input"
            value={editedTitle}
            onChange={handleTitleChange}
          />
          <button type="submit">Upd</button>
          <button type="button" onClick={() => setIsEditing((prev) => !prev)}>
            close
          </button>
        </form>
      ) : (
        <>
          <Link to={board._id}>
            <p>{board.title}</p>
          </Link>
          <button onClick={() => setIsEditing((prev) => !prev)}>
            <SquarePen />
          </button>
          <button onClick={() => deleteBoard(board._id)}>
            <Trash2 />
          </button>
        </>
      )}
    </BoardItem>
  );
};

export default DashboardItem;
