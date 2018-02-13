import nanoid = require("nanoid");

export interface ITask {
    id: string;
    name: string;
}

export function createTask(name: string): ITask {
    return { id: nanoid(), name };
}
