import { ITask } from "./task";

export interface IProject {
    name: string;
    tasks: ITask[];
}
