import Card from "../Card/Card";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import { Container, TaskColumnStyles, TaskList, Title } from "./Board.styled";

import { userSelector } from "../../redux/selectors";

import { useDispatch, useSelector } from "react-redux";
import { addNew, moveCard } from "../../redux/slice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Board = () => {
  const { board } = useParams();

  const columnsFromBackend = useSelector(userSelector);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetch(`https://incode-group-server.onrender.com/users/dashboard/${board}`)
      .then((res) => res.json())
      .then((data) => setColumns(data.dashboard.boards))
      .catch((error) => console.log(error));
  }, [board]);

  useEffect(() => {
    fetch(
      "https://incode-group-server.onrender.com/users/dashboard/updateBoards",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dashboardId: board, newBoards: columns }),
      }
    )
      .then((res) => res.json())
      .then((data) => console.log("Backend updated:", data))
      .catch((error) => console.log(error));
  }, [columns, board]);

  console.log(columns);

  const dispatch = useDispatch();

  const addNewCard = (columnId: string) => {
    dispatch(addNew(columnId));
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
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  // const onDragEnd = (result: DropResult) => {
  //   if (!result.destination) return;

  //   console.log(result);

  //   const { source, destination } = result;

  //   console.log(destination);

  //   const sourceColumnId = source.droppableId;
  //   const destColumnId = destination.droppableId;

  //   if (sourceColumnId !== destColumnId) {
  //     dispatch(
  //       moveCard({
  //         source: sourceColumnId,
  //         destination: destColumnId,
  //         index: destination.index,
  //       })
  //     );
  //   } else {
  //     dispatch(
  //       moveCard({
  //         source: sourceColumnId,
  //         destination: destColumnId,
  //         index: source.index,
  //       })
  //     );
  //   }
  // };

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      <Container>
        <TaskColumnStyles>
          {Object.entries(columns).map(([columnId, column]) => {
            return (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided) => (
                  <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <Title>{column.title}</Title>

                    {column?.items?.map((item, index) => (
                      <Card key={item.id} item={item} index={index} />
                    ))}
                    {provided.placeholder}
                    {column.title === "To Do" && (
                      <button
                        type="button"
                        onClick={() => addNewCard(columnId)}
                      >
                        +
                      </button>
                    )}
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
