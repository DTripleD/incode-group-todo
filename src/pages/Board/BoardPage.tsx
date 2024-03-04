import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";

import {
  Container,
  TaskColumnStyles,
  TaskList,
  Title,
} from "./BoardPage.styled";
import Card from "../../components/Card/Card";
import CreateNewCard from "../../components/Forms/CreateNewCard";

import { EntriesType } from "../../types/types";

import { AppDispatch } from "../../redux/store";
import { boardSelector } from "../../redux/selectors";
import { getColums, updateOnDragEnd } from "../../redux/board/boardOperations";

const Board = () => {
  const { board } = useParams();

  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const columns = useSelector(boardSelector);

  useEffect(() => {
    dispatch(getColums(board));
  }, [board, dispatch]);

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
      dispatch(
        updateOnDragEnd({
          dashboardId: board,
          newBoards: {
            ...columns,
            [source.droppableId]: {
              ...sourceColumn,
              items: sourceItems,
            },
            [destination.droppableId]: {
              ...destColumn,
              items: destItems,
            },
          },
        })
      );
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      dispatch(
        updateOnDragEnd({
          dashboardId: board,
          newBoards: {
            ...columns,
            [source.droppableId]: {
              ...column,
              items: copiedItems,
            },
          },
        })
      );
    }
  };

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      <Container>
        <TaskColumnStyles>
          {Object.entries(columns).map(([columnId, column]: EntriesType) => {
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
                        <CreateNewCard
                          setIsEditing={setIsEditing}
                          board={board}
                        />
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
