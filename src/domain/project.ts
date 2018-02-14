import { find } from "lodash";
import { ITask } from "./task";

export interface IProject {
    done: ITask[];
    todo: ITask[];
}

export const emptyProject: IProject = { done: [], todo: [] };

export function booleanToTaskState(todo: boolean): "todo" | "done" {
    return todo ? "todo" : "done";
}

export function isTodoTask(project: IProject, id: string): boolean {
    return !!find(project.todo, { id });
}
