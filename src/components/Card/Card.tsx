import { useState } from "react";
import toast from "react-hot-toast";
import { Draggable } from "@hello-pangea/dnd";
import { SquarePen, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../Loader/Loader";
import RenameBoard from "../Forms/RenameBoard";
import { ButtonWrapper, TaskInformation } from "./Card.styled";

import { CardProps } from "../../types/types";

import { AppDispatch } from "../../redux/store";
import { isLoadingCardSelector } from "../../redux/selectors";
import { deleteCard } from "../../redux/board/boardOperations";

const Card = ({ item, index, board }: CardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const isLoading = useSelector(isLoadingCardSelector);

  return isLoading ? (
    <Loader />
  ) : (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TaskInformation>
            {isEditing ? (
              <RenameBoard
                board={board}
                item={item}
                setIsEditing={setIsEditing}
              />
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
                      ).then(() => toast.success("Card deleted succesfully"));
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
