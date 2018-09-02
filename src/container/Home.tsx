import { find } from "lodash";
import * as React from "react";
import { MdSave } from "react-icons/md";
import { connect } from "react-redux";
import styled from "styled-components";

import CircleButton from "../component/CircleButton";
import Menu from "../component/Menu";
import Task from "../component/Task";
import TaskList from "../component/TaskList";
import { getTasksFromProject, IProject, IProjects } from "../domain/project";
import { includeTaskInTasks, ITask } from "../domain/task";
import * as environment from "../state/environment";
import * as settings from "../state/settings";
import * as tasks from "../state/tasks";
import * as timer from "../state/timer";
import Timer from "./Timer";

const Home = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow-y: hidden;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: 100em;
`;

const Tasks = styled.div`
  display: flex;
  flex: 1;

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
  bottom: 1em;
  right: 1em;
`;

interface IProps
  extends environment.IState,
    settings.IActionCreators,
    settings.IState,
    tasks.IActionCreators,
    tasks.IState {
  timer: timer.IState;
}

interface IState {
  done: boolean;
  listsFixed: boolean;
}

@connect(
  ({ environment, settings, tasks, timer }) => ({
    ...environment,
    ...settings,
    ...tasks,
    timer
  }),
  { ...settings.actionCreators, ...tasks.actionCreators }
)
export default class extends React.Component<Partial<IProps>, IState> {
  public state: IState = { done: false, listsFixed: false };

  public render() {
    const {
      currentProjectName,
      currentTaskId,
      windowSmall,
      pointerAvailable,
      timer,
      touchable
    } = this.props;
    const currentTask = find(this.currentTasks, { id: currentTaskId });

    if (timer.on) {
      return <Timer currentTask={currentTask} />;
    }

    const { done, listsFixed } = this.state;

    const sorting = touchable && !listsFixed;

    return (
      <Home>
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
              tasks={
                done
                  ? this.currentProject.doneTasks
                  : this.currentProject.todoTasks
              }
              fixed={listsFixed}
              sorting={sorting}
              {...this.props as IProps}
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
      </Home>
    );
  }

  public componentDidMount() {
    if (this.props.touchable) {
      this.setState({ listsFixed: true });
    }

    this.componentDidUpdate(this.props);
  }

  public componentDidUpdate(props) {
    const { currentProjectName, currentTaskId, setCurrentTaskId } = this.props;

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

  private get currentProject(): IProject {
    const { currentProjectName, projects } = this.props;

    return projects[currentProjectName];
  }

  private get currentTasks(): ITask[] {
    return getTasksFromProject(this.currentProject, this.state.done);
  }
}
