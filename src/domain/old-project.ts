import { ITask } from "./task";

export interface IOldProject {
  name: string;
  archived?: boolean;
  doneTasks: ITask[];
  todoTasks: ITask[];
  migrated?: boolean;
}
