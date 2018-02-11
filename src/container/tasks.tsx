import * as React from "react";
import { connect } from "react-redux";

import Task from "../component/task";
import { actionCreators, initialState } from "../state/projects";

class Tasks extends React.Component<typeof initialState> {
    public render() {
        const { currentProject, projects } = this.props;

        if (currentProject === null) {
            return <div>Create a project.</div>;
        }

        return projects[currentProject].map((task, key) => <Task key={key} {...task} />);
    }
}

export default connect(({ projects }) => projects, actionCreators)(Tasks);
