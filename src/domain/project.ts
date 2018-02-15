import { includeTaskInTasks, ITask } from "./task";

export interface IProject {
    done: ITask[];
    todo: ITask[];
}

export interface IProjects {
    [name: string]: IProject;
}

export const emptyProject: IProject = { done: [], todo: [] };

export function booleanToTaskState(done: boolean): "todo" | "done" {
    return done ? "done" : "todo";
}

export function isDoneTask(project: IProject, id: string): boolean {
    return includeTaskInTasks(id, project.done);
}
