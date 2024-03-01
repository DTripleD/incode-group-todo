import Card from "../Card/Card";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import {
  ButtonWrapper,
  Container,
  StyledForm,
  TaskColumnStyles,
  TaskList,
  Title,
} from "./Board.styled";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Check, Plus, X } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { addCard, getColums } from "../../redux/board/boardOperations";
import { boardSelector } from "../../redux/selectors";
import { AppDispatch } from "../../redux/store";

const Board = () => {
  const { board } = useParams();

  const [isEditing, setIsEditing] = useState(false);

  const [d, setColumns] = useState([]);

  const dispatch = useDispatch<AppDispatch>();

  const columns = useSelector(boardSelector);

  useEffect(() => {
    dispatch(getColums(board));
  }, [board, dispatch]);

  useEffect(() => {
    fetch("https://incode-group-server.onrender.com/dashboard/updateBoards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dashboardId: board, newBoards: columns }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data.dashboard.boards))
      .catch((error) => console.log(error));
  }, [columns, board]);

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

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      // напрямую диспатчить то что делаеться в useEffect
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      <Container>
        <TaskColumnStyles>
          {Object.entries(columns).map(([columnId, column]) => {
            return (
              <Droppable key={column.id} droppableId={columnId}>
                {(provided) => (
                  <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <Title>{column.title}</Title>

                    {column?.items?.map((item, index) => (
                      <Card
                        key={item.id}
                        item={item}
                        index={index}
                        board={board}
                      />
                    ))}
                    {provided.placeholder}
                    {column.title === "To Do" &&
                      (isEditing ? (
                        <StyledForm onSubmit={addNewCard}>
                          <input
                            type="text"
                            placeholder="Title of card"
                            name="title"
                          />
                          <input
                            type="text"
                            placeholder="Description of card"
                            name="description"
                          />
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
                        <button
                          type="button"
                          onClick={() => setIsEditing(true)}
                        >
                          <Plus />
                        </button>
                      ))}
                  </TaskList>
                )}
              </Droppable>
            );
          })}
        </TaskColumnStyles>
      </Container>
    </DragDropContext>
  );
};

export default Board;
