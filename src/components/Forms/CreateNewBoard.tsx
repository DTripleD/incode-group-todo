import { Check, X } from "lucide-react";
import { useDispatch } from "react-redux";

import { CreateBoardStyledForm } from "./Forms.styled";

import { AppDispatch } from "../../redux/store";
import { createBoard } from "../../redux/dashboard/dashboardOperations";

const CreateNewBoard = ({ setCreating }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleCreateBoard = (e) => {
    e.preventDefault();
    dispatch(createBoard(e.target.input.value)).then(() => {
      setCreating(false);
      e.target.reset();
    });
  };

  return (
    <CreateBoardStyledForm onSubmit={handleCreateBoard}>
      <input placeholder="Name of board" name="input" />
      <button type="submit">
        <Check />
      </button>
      <button type="button" onClick={() => setCreating((prev) => !prev)}>
        <X />
      </button>
    </CreateBoardStyledForm>
  );
};

export default CreateNewBoard;
