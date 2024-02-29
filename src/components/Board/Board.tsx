import Card from "../Card/Card";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import { Container, TaskColumnStyles, TaskList, Title } from "./Board.styled";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Plus } from "lucide-react";

const Board = () => {
  const { board } = useParams();

  const [isEditing, setIsEditing] = useState(false);

  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetch(`https://incode-group-server.onrender.com/dashboard/${board}`)
      .then((res) => res.json())
      .then((data) => setColumns(data.dashboard.boards))
      .catch((error) => console.log(error));
  }, [board]);

  // useEffect(() => {
  //   fetch("https://incode-group-server.onrender.com/dashboard/updateBoards", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ dashboardId: board, newBoards: columns }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((error) => console.log(error));
  // }, [columns, board]);

  const addNewCard = (e) => {
    e.preventDefault();

    fetch("https://incode-group-server.onrender.com/dashboard/addDataToBoard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dashboardId: board,
        newData: {
          id: "5",
          title: e.target.title.value,
          description: e.target.description.value || "",
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => setColumns(data.dashboard.boards))
      .catch((error) => console.log(error))
      .finally(() => {
        setIsEditing(false);
        e.target.reset();
      });
  };

  const deleteCard = (cardId) => {
    fetch("https://incode-group-server.onrender.com/dashboard/deleteItem", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dashboardId: board,
        itemId: cardId,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
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
                        deleteCard={deleteCard}
                        board={board}
                      />
                    ))}
                    {provided.placeholder}
                    {column.title === "To Do" &&
                      (isEditing ? (
                        <form onSubmit={addNewCard}>
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
                          <button type="submit">Add</button>
                        </form>
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
