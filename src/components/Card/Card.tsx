import { Draggable } from "@hello-pangea/dnd";
import { TaskInformation } from "./Card.styled";
import { useState } from "react";
import { Check, SquarePen, Trash2, X } from "lucide-react";

interface CardProps {
  item: {
    id: string;
    title: string;
    description: string;
  };
  index: number;
  board: string;
  deleteCard: (cardId: number) => void;
}

const Card = ({ item, index, deleteCard, board }: CardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const [editedTitle, setEditedTitle] = useState(item.title);

  const [editedDescription, setEditedDescription] = useState(item.description);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const updateCardName = (e) => {
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

  console.log(editedTitle);

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
              <form onSubmit={updateCardName}>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={handleTitleChange}
                />

                <input
                  type="text"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />

                <button type="submit">
                  <Check />
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing((prev) => !prev)}
                >
                  <X />
                </button>
              </form>
            ) : (
              <>
                <p>{item.title}</p>
                <div className="secondary-details">
                  <p>
                    <span>{item.description}</span>
                  </p>
                </div>
                <button onClick={() => setIsEditing((prev) => !prev)}>
                  <SquarePen />
                </button>
                <button onClick={() => deleteCard(item._id)}>
                  <Trash2 />
                </button>
              </>
            )}
          </TaskInformation>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
