import { find } from "lodash";
import nanoid from "nanoid";

import { getUnixTimeStamp } from "./utils";

export interface ITask {
  createdAt: number;
  description: string;
  id: string;
  name: string;
  spentSeconds: number;
  updatedAt: number;
}

export function createTask(name: string, description: string): ITask {
  const now = getUnixTimeStamp();

  return {
    createdAt: now,
    description,
    id: nanoid(),
    name,
    spentSeconds: 0,
    updatedAt: now
  };
}

export function updateTask(task: ITask): ITask {
  return { ...task, updatedAt: getUnixTimeStamp() };
}

export function includeTaskInTasks(id: string, tasks: ITask[]): boolean {
  return !!find(tasks, { id });
}
