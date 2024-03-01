import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, SquarePen, Trash2, X } from "lucide-react";
import { BoardItem, StyledForm, StyledInput } from "./DashboardItem.styled";
import { useDispatch } from "react-redux";
import { updateBoardNamee } from "../../redux/operations";

const DashboardItem = ({ board, deleteBoard }) => {
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

  return (
    <BoardItem>
      {isEditing ? (
        <StyledForm onSubmit={updateBoardName}>
          <StyledInput
            name="input"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <button type="submit">
            <Check />
          </button>
          <button type="button" onClick={() => setIsEditing((prev) => !prev)}>
            <X />
          </button>
        </StyledForm>
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
