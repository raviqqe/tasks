import { type DraggableSyntheticListeners } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { MdCheck, MdDragHandle, MdEdit } from "react-icons/md";
import type * as domain from "../../domain.js";
import { IconButton } from "./IconButton.js";
import { white } from "./style/colors.js";
import { boxShadow } from "./style.js";

const maxZIndex = 10000;

const Container = styled.div`
  ${boxShadow};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${white};
  padding: 0.8em;
  border-radius: 0.5em;
`;

const Name = styled.div`
  word-break: break-word;
  margin-right: 0.5ex;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;

  > :not(:first-child) {
    margin-left: 0.25rem;
  }
`;

const DragHandle = (props: DraggableSyntheticListeners) => (
  <IconButton
    className={css`
      touch-action: none;
    `}
    onClick={() => undefined}
    {...props}
  >
    <MdDragHandle />
  </IconButton>
);

interface Props {
  className?: string;
  completeTask?: (task: domain.Task) => Promise<void>;
  dragHandleEnabled?: boolean;
  task: domain.Task;
  updateTask?: (task: domain.Task) => Promise<void>;
}

export const Task = ({
  completeTask,
  dragHandleEnabled,
  task,
  updateTask,
  ...restProps
}: Props): JSX.Element => {
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
