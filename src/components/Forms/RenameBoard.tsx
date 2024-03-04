import { useState } from "react";
import toast from "react-hot-toast";
import { Check, X } from "lucide-react";
import { useDispatch } from "react-redux";

import { ButtonWrapper, RenameStyledForm } from "./Forms.styled";

import { AppDispatch } from "../../redux/store";
import { updateCardName } from "../../redux/board/boardOperations";

const RenameBoard = ({ board, item, setIsEditing }) => {
  const [editedTitle, setEditedTitle] = useState(item.title);
  const [editedDescription, setEditedDescription] = useState(item.description);

  const dispatch = useDispatch<AppDispatch>();

  const handleUpdateCardName = (e: React.SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      updateCardName({
        dashboardId: board,
        itemId: item._id,
        newTitle: editedTitle,
        newDescription: editedDescription,
      })
    )
      .then(() => toast.success("Card renamed succesfully"))
      .finally(() => setIsEditing((prev) => !prev));
  };

  return (
    <RenameStyledForm onSubmit={handleUpdateCardName}>
      <div>
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />

        <input
          type="text"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
        />
      </div>
      <ButtonWrapper>
        <button type="submit">
          <Check />
        </button>
        <button type="button" onClick={() => setIsEditing((prev) => !prev)}>
          <X />
        </button>
      </ButtonWrapper>
    </RenameStyledForm>
  );
};

export default RenameBoard;
