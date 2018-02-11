import * as React from "react";

import { ITask } from "../domain/task";

export default class extends React.Component<ITask> {
    public render() {
        const { name } = this.props;

        return <div>{name}</div>;
    }
}
