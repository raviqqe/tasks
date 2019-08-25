import { find } from "lodash";
import React, { Component } from "react";
import { MdSave } from "react-icons/md";
import { connect } from "react-redux";
import styled from "styled-components";
import CircleButton from "../components/CircleButton";
import Menu from "../components/Menu";
import Task from "../components/Task";
import TaskList from "../components/TaskList";
import { getTasksFromProject, IProject } from "../domain/project";
import { includeTaskInTasks, ITask } from "../domain/task";
import { IGlobalState } from "../state";
import * as environment from "../state/environment";
import * as settings from "../state/settings";
import * as tasks from "../state/tasks";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow-y: hidden;
`;

const Content = styled.div`
  display: flex;
  max-width: 100%;
`;

const Tasks = styled.div`
  display: flex;
  flex: 1;
  width: 100vw;
  max-width: 90em;

  > * {
    flex: 1;
  }
`;

const CurrentTask = styled.div`
  overflow-y: auto;
  padding: 1em;
`;

const FixListButton = styled(CircleButton)`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
`;

interface IProps
  extends environment.IState,
    settings.IActionCreators,
    settings.IState,
    tasks.IActionCreators,
    tasks.IState {}

interface IState {
  done: boolean;
  listsFixed: boolean;
}

class Home extends Component<IProps, IState> {
  public state: IState = { done: false, listsFixed: false };

  public render() {
    const {
      currentTaskId,
      windowSmall,
      pointerAvailable,
      touchable
    } = this.props;

    if (!this.currentProject) {
      return null;
    }

    const { doneTasks, todoTasks } = this.currentProject;
    const currentTask = find(
      this.currentTasks,
      ({ id }) => id === currentTaskId
    );

    const { done, listsFixed } = this.state;

    const sorting = touchable && !listsFixed;

    return (
      <Wrapper>
        <Content>
          <Menu
            done={done}
            hidden={sorting}
            windowSmall={windowSmall}
            makeTaskListSortable={() => this.setState({ listsFixed: false })}
            changeTasksState={done => this.setState({ done })}
            pointerAvailable={pointerAvailable}
          />
          <Tasks>
            <TaskList
              done={done}
              tasks={done ? doneTasks : todoTasks}
              fixed={listsFixed}
              sorting={sorting}
              {...(this.props as IProps)}
            />
            {!windowSmall && (
              <CurrentTask>
                {currentTask && (
                  <Task detailed={true} done={done} {...currentTask} />
                )}
              </CurrentTask>
            )}
            {sorting && (
              <FixListButton
                onClick={() => this.setState({ listsFixed: true })}
              >
                <MdSave />
              </FixListButton>
            )}
          </Tasks>
        </Content>
      </Wrapper>
    );
  }

  public componentDidMount() {
    if (this.props.touchable) {
      this.setState({ listsFixed: true });
    }

    this.componentDidUpdate(this.props);
  }

  public componentDidUpdate(props) {
    const {
      currentProjectName,
      currentTaskId,
      setCurrentTaskId,
      touchable
    } = this.props;

    if (!props.touchable && touchable) {
      this.setState({ listsFixed: true });
    }

    if (props.currentProjectName !== currentProjectName) {
      this.setState({ done: false });
    }

    const tasks = this.currentTasks;

    if (tasks.length === 0) {
      setCurrentTaskId(null);
    } else if (
      currentTaskId === null ||
      !includeTaskInTasks(currentTaskId, tasks)
    ) {
      setCurrentTaskId(tasks[0].id);
    }
  }

  private get currentProject(): IProject | null {
    const { currentProjectName, projects } = this.props;

    return projects[currentProjectName] || null;
  }

  private get currentTasks(): ITask[] {
    if (!this.currentProject) {
      return [];
    }

    return getTasksFromProject(this.currentProject, this.state.done);
  }
}

export default connect(
  ({ environment, settings, tasks }: IGlobalState) => ({
    ...environment,
    ...settings,
    ...tasks
  }),
  { ...settings.actionCreators, ...tasks.actionCreators }
)(Home);
