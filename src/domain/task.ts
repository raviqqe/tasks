export interface ITask {
  id: string;
  name: string;
}

export function formatTask(task: ITask): ITask {
  return {
    ...task,
    name: task.name.trim()
  };
}

export function validateTask(task: ITask): void {
  if (!task.name) {
    throw new Error("task name cannot be empty");
  }
}
