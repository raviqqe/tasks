import type { DraggableSyntheticListeners } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import type { JSX } from "react";
import { MdCheck, MdDragHandle, MdEdit } from "react-icons/md";
import type * as domain from "../../domain.js";
import { todoTaskCompleter } from "../../main/todo-task-completer.js";
import { todoTaskUpdater } from "../../main/todo-task-updater.js";
import { boxShadow, white } from "../style.js";
import { IconButton } from "./IconButton.js";

// biome-ignore lint/style/useNamingConvention: Correct spelling
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
  editable?: boolean;
  task: domain.Task;
}

export const Task = ({ editable, task, ...restProps }: Props): JSX.Element => {
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
        {editable && (
          <>
            <IconButton
              aria-label="Done"
              onClick={() => todoTaskCompleter.complete(task)}
            >
              <MdCheck />
            </IconButton>
            <IconButton
              aria-label="Edit"
              onClick={async () => {
                const name = window.prompt("New task name?", task.name);

                if (name === null) {
                  return;
                }

                await todoTaskUpdater.update({ ...task, name });
              }}
            >
              <MdEdit />
            </IconButton>
            <DragHandle {...listeners} />
          </>
        )}
      </ButtonsContainer>
    </Container>
  );
};
