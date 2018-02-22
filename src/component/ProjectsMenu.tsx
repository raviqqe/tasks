import * as React from "react";
import { connect } from "react-redux";

import { IProject, IProjects } from "../domain/project";
import * as tasks from "../state/tasks";
import CreateProject from "./CreateProject";
import Project from "./Project";

import "./style/ProjectsMenu.css";

interface IProps extends tasks.IActionCreators, tasks.IState { }

interface IState {
    opened: boolean;
}

class ProjectsMenu extends React.Component<IProps, IState> {
    public state: IState = { opened: false };

    public render() {
        const { currentProjectName, projects, setCurrentProjectName } = this.props;
        const { opened } = this.state;

        return (
            <div className="ProjectsMenu">
                <div
                    className="current-project-name"
                    onClick={() => this.setState({ opened: !opened })}
                >
                    {currentProjectName}
                </div>
                <div
                    className="background"
                    data-hidden={!opened}
                    onClick={() => this.setState({ opened: false })}
                />
                <div className="box" data-hidden={!opened}>
                    <div className="projects">
                        {Object.keys(projects).map((name, index) =>
                            <Project
                                key={index}
                                disabled={name === currentProjectName}
                                name={name}
                                onClick={() => {
                                    setCurrentProjectName(name);
                                    this.setState({ opened: false });
                                }}
                            />)}
                    </div>
                    <CreateProject />
                </div>
            </div>
        );
    }
}

export default connect(({ tasks }) => tasks, tasks.actionCreators)(ProjectsMenu);
