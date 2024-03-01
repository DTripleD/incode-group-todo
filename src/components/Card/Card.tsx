import { Draggable } from "@hello-pangea/dnd";
import {
  ButtonWrapper,
  StyledForm,
  StyledInput,
  TaskInformation,
} from "./Card.styled";
import { useState } from "react";
import { Check, SquarePen, Trash2, X } from "lucide-react";
import { deleteCard } from "../../redux/board/boardOperations";
import { useDispatch } from "react-redux";

interface CardProps {
  item: {
    id: string;
    title: string;
    description: string;
    _id: string;
  };
  index: number;
  board: string | undefined;
}

const Card = ({ item, index, board }: CardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);
  const [editedDescription, setEditedDescription] = useState(item.description);

  const dispatch = useDispatch();

  const updateCardName = (e: React.SyntheticEvent) => {
    e.preventDefault();

    fetch(
      "https://incode-group-server.onrender.com/dashboard/updateItemTitle",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dashboardId: board,
          itemId: item._id,
          newTitle: editedTitle,
          newDescription: editedDescription,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
      .finally(() => setIsEditing((prev) => !prev));
  };

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TaskInformation>
            {isEditing ? (
              <StyledForm onSubmit={updateCardName}>
                <div>
                  <StyledInput
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />

                  <StyledInput
                    type="text"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                  />
                </div>
                <ButtonWrapper>
                  <button type="submit">
                    <Check />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing((prev) => !prev)}
                  >
                    <X />
                  </button>
                </ButtonWrapper>
              </StyledForm>
            ) : (
              <>
                <div>
                  <p>{item.title}</p>
                  <span className="secondary-details">{item.description}</span>
                </div>

                <ButtonWrapper>
                  <button onClick={() => setIsEditing((prev) => !prev)}>
                    <SquarePen />
                  </button>
                  <button
                    onClick={() => {
                      dispatch(
                        deleteCard({
                          dashboardId: board,
                          itemId: item._id,
                        })
                      );
                    }}
                  >
                    <Trash2 />
                  </button>
                </ButtonWrapper>
              </>
            )}
          </TaskInformation>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
