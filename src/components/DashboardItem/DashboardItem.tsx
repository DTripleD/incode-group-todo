import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Check, SquarePen, Trash2, X } from "lucide-react";

import Loader from "../Loader/Loader";
import { BoardItem, StyledForm, StyledInput } from "./DashboardItem.styled";

import { DashboardItemProps } from "../../types/types";

import {
  deleteBoard,
  updateBoardName,
} from "../../redux/dashboard/dashboardOperations";
import { isLoadingBoardSelector } from "../../redux/selectors";
import { AppDispatch } from "../../redux/store";

const DashboardItem = ({ board }: DashboardItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const [editedTitle, setEditedTitle] = useState(board.title);

  const dispatch = useDispatch<AppDispatch>();

  const isLoading = useSelector(isLoadingBoardSelector);

  const handleUpdateBoardName = (e) => {
    e.preventDefault();

    dispatch(
      updateBoardName({
        dashboardId: board._id,
        newTitle: e.target.elements.input.value,
      })
    ).then(() => {
      setIsEditing((prev) => !prev);
      toast.success("Board rename sucesfully");
    });
  };

  return (
    <BoardItem>
      {isEditing ? (
        <StyledForm onSubmit={handleUpdateBoardName}>
          <StyledInput
            name="input"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          {isLoading ? (
            <Loader />
          ) : (
            <button type="submit">
              <Check />
            </button>
          )}
          {isLoading ? (
            <Loader />
          ) : (
            <button type="button" onClick={() => setIsEditing((prev) => !prev)}>
              <X />
            </button>
          )}
        </StyledForm>
      ) : (
        <>
          <Link to={board._id}>
            <p>{board.title}</p>
          </Link>
          <button onClick={() => setIsEditing((prev) => !prev)}>
            <SquarePen />
          </button>
          <button
            onClick={() =>
              dispatch(deleteBoard(board._id)).then(() =>
                toast.success("Dasbord deleted succesfully")
              )
            }
          >
            <Trash2 />
          </button>
        </>
      )}
    </BoardItem>
  );
};

export default DashboardItem;
