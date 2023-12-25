export interface Task {
  id: string;
  name: string;
}

export function formatTask(task: Task): Task {
  return {
    ...task,
    name: task.name.trim(),
  };
}

export function validateTask(task: Task): void {
  if (task.name !== formatTask(task).name) {
    throw new Error("task name not formatted");
  } else if (!task.name) {
    throw new Error("task name cannot be empty");
  }
}
