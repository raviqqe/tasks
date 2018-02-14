import { find } from "lodash";
import nanoid = require("nanoid");

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
        updatedAt: now,
    };
}

export function modifyTask(task: ITask, newFields: Partial<ITask>): ITask {
    return Object.assign(task, newFields);
}

export function includeTaskInTasks(id: string, tasks: ITask[]): boolean {
    return !!find(tasks, { id });
}
