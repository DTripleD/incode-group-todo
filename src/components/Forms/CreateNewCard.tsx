import { Check, X } from "lucide-react";
import { useDispatch } from "react-redux";

import { ButtonWrapper, CreateCardStyledForm } from "./Forms.styled";

import { AppDispatch } from "../../redux/store";
import { addCard } from "../../redux/board/boardOperations";

const CreateNewCard = ({ setIsEditing, board }) => {
  const dispatch = useDispatch<AppDispatch>();

  const addNewCard = (e) => {
    e.preventDefault();

    dispatch(
      addCard({
        dashboardId: board,
        newData: {
          title: e.target.title.value,
          description: e.target.description.value || "",
        },
      })
    ).finally(() => {
      setIsEditing(false);
      e.target.reset();
    });
  };

  return (
    <CreateCardStyledForm onSubmit={addNewCard}>
      <input type="text" placeholder="Title of card" name="title" />
      <input type="text" placeholder="Description of card" name="description" />
      <ButtonWrapper>
        <button type="submit">
          <Check />
        </button>
        <button type="button" onClick={() => setIsEditing((prev) => !prev)}>
          <X />
        </button>
      </ButtonWrapper>
    </CreateCardStyledForm>
  );
};

export default CreateNewCard;
