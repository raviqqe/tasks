import { includeTaskInTasks, ITask } from "./task";

export interface IProject {
    doneTasks: ITask[];
    todoTasks: ITask[];
}

export interface IProjects {
    [name: string]: IProject;
}

export const emptyProject: IProject = { doneTasks: [], todoTasks: [] };

function booleanToTaskState(done: boolean): "todoTasks" | "doneTasks" {
    return done ? "doneTasks" : "todoTasks";
}

export function getTasksFromProject(project: IProject, done: boolean): ITask[] {
    return project[booleanToTaskState(done)];
}

export function setTasksToProject(project: IProject, tasks: ITask[], done: boolean): IProject {
    return {
        ...project,
        [booleanToTaskState(done)]: tasks,
    };
}

export function isDoneTask(project: IProject, id: string): boolean {
    return includeTaskInTasks(id, project.doneTasks);
}
