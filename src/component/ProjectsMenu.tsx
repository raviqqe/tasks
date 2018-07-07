import * as React from "react";
import { connect } from "react-redux";

import { IProject, IProjects } from "../domain/project";
import * as tasks from "../state/tasks";
import TextButton from "./TextButton";

import "./style/ProjectsMenu.css";

interface IState {
  opened: boolean;
}

class ProjectsMenu extends React.Component<
  tasks.IState & tasks.IActionCreators,
  IState
> {
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
            {Object.keys(projects)
              .sort()
              .map(name => (
                <TextButton
                  key={name}
                  disabled={name === currentProjectName}
                  onClick={() => {
                    setCurrentProjectName(name);
                    this.setState({ opened: false });
                  }}
                >
                  {name}
                </TextButton>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ tasks }) => tasks,
  tasks.actionCreators
)(ProjectsMenu);
