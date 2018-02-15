import * as React from "react";

import CreateTask from "./CreateTask";
import ItemsMenu from "./ItemsMenu";

interface IProps {
    done: boolean;
    makeTaskListSortable: () => void;
    onTasksStateChange: (done: boolean) => void;
}

export default class extends React.Component<IProps> {
    public render() {
        return <ItemsMenu {...this.props} />;
    }
}
