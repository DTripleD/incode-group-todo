import { Draggable } from "@hello-pangea/dnd";
import { TaskInformation } from "./Card.styled";

const Card = ({
  item,
  index,
}: {
  item: {
    id: string;
    title: string;
    description: string;
  };
  index: number;
}) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TaskInformation>
            <p>{item.title}</p>
            <div className="secondary-details">
              <p>
                <span>{item.description}</span>
              </p>
            </div>
          </TaskInformation>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
