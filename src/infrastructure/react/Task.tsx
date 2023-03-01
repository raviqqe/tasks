import { DraggableSyntheticListeners } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdCheck, MdEdit, MdDragHandle } from "react-icons/md/index.js";
import styled from "styled-components";
import { ITask } from "../../domain/task.js";
import { IconButton } from "./IconButton.js";
import { white } from "./style/colors.js";
import { boxShadow } from "./style/index.js";

const maxZIndex = 10000;

const Container = styled.default.div`
  ${boxShadow};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${white};
  padding: 0.8em;
  border-radius: 0.5em;
`;

const Name = styled.default.div`
  word-break: break-word;
  margin-right: 0.5ex;
`;

const ButtonsContainer = styled.default.div`
  display: flex;
  align-items: center;

  > :not(:first-child) {
    margin-left: 0.25rem;
  }
`;

const StyledIconButton = styled.default(IconButton)`
  touch-action: none;
`;

const DragHandle = (props: DraggableSyntheticListeners) => (
  <StyledIconButton onClick={() => undefined} {...props}>
    <MdDragHandle />
  </StyledIconButton>
);

interface IProps {
  completeTask?: (task: ITask) => Promise<void>;
  dragHandleEnabled?: boolean;
  task: ITask;
  updateTask?: (task: ITask) => Promise<void>;
  className?: string;
}

export const Task = ({
  completeTask,
  dragHandleEnabled,
  task,
  updateTask,
  ...restProps
}: IProps): JSX.Element => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable(task);

  return (
    <Container
      {...restProps}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform && { ...transform, x: 0 }),
        transition,
        zIndex: isDragging ? maxZIndex : undefined,
      }}
      {...attributes}
    >
      <Name>{task.name}</Name>
      <ButtonsContainer>
        {completeTask && (
          <IconButton aria-label="Done" onClick={() => completeTask(task)}>
            <MdCheck />
          </IconButton>
        )}
        {updateTask && (
          <IconButton
            aria-label="Edit"
            onClick={async () => {
              const name = window.prompt("New task name?", task.name);

              if (name === null) {
                return;
              }

              await updateTask({ ...task, name });
            }}
          >
            <MdEdit />
          </IconButton>
        )}
        {dragHandleEnabled && <DragHandle {...listeners} />}
      </ButtonsContainer>
    </Container>
  );
};
