import * as React from "react";
import { connect } from "react-redux";

import Task from "../component/task";
import { booleanToTaskState } from "../domain/project";
import { actionCreators, initialState } from "../state/tasks";

class Tasks extends React.Component<typeof initialState> {
    public render() {
        const { currentProjectName, projects, todo } = this.props;

        if (currentProjectName === null) {
            return <div>Create a project.</div>;
        }

        return projects[currentProjectName][booleanToTaskState(todo)].map((task, key) => <Task key={key} {...task} />);
    }
}

export default connect(({ tasks }) => tasks, actionCreators)(Tasks);
