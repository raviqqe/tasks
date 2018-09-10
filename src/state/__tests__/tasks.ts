import { createStore } from "..";
import { emptyProject, IProject } from "../../domain/project";
import { createTask } from "../../domain/task";
import { actionCreators, initialState, reducer } from "../tasks";

function getProject(store): IProject {
  const { currentProjectName, projects } = store.getState().tasks;

  return projects[currentProjectName];
}

jest.mock("../../domain/utils", () => ({ getUnixTimeStamp: () => 42 }));

test("Add a new project", () => {
  const { store } = createStore();

  store.dispatch(actionCreators.addProject("foo"));
  expect(store.getState().tasks.currentProjectName).toBe("foo");
  expect(store.getState().tasks.projects).toEqual({
    ...initialState.projects,
    foo: emptyProject
  });

  store.dispatch(actionCreators.addProject("bar"));
  expect(store.getState().tasks.currentProjectName).toBe("bar");
  expect(store.getState().tasks.projects).toEqual({
    ...initialState.projects,
    bar: emptyProject,
    foo: emptyProject
  });
});

test("Add a invalid project", () => {
  const { store } = createStore();

  store.dispatch(actionCreators.addProject(""));
  expect(store.getState().tasks).toEqual(initialState);
});

test("Add a new task", () => {
  const { store } = createStore();

  const fooTask = createTask("foo", "");
  const barTask = createTask("bar", "");

  store.dispatch(actionCreators.addTask(fooTask));
  expect(store.getState().tasks.currentTaskId).toEqual(fooTask.id);
  expect(store.getState().tasks.projects).toEqual({
    default: { archived: false, doneTasks: [], todoTasks: [fooTask] }
  });

  store.dispatch(actionCreators.addTask(barTask));
  expect(store.getState().tasks.currentTaskId).toEqual(barTask.id);
  expect(store.getState().tasks.projects).toEqual({
    default: { archived: false, doneTasks: [], todoTasks: [barTask, fooTask] }
  });
});

test("Add a invalid task", () => {
  const { store } = createStore();

  store.dispatch(actionCreators.addTask(createTask("", "")));
  expect(store.getState().tasks).toEqual(initialState);
});

test("Rename a project", () => {
  const { store } = createStore();

  store.dispatch(actionCreators.renameCurrentProject("foo"));
  expect(store.getState().tasks.projects).toEqual({ foo: emptyProject });
});

test("Modify a task", () => {
  const { store } = createStore();

  const fooTask = createTask("foo", "");
  const barTask = createTask("bar", "");

  store.dispatch(actionCreators.addTask(barTask));
  store.dispatch(actionCreators.addTask(fooTask));
  expect(store.getState().tasks.projects.default).toEqual({
    archived: false,
    doneTasks: [],
    todoTasks: [fooTask, barTask]
  });

  const newFooTask = { ...fooTask, name: "baz" };

  store.dispatch(actionCreators.modifyTask(newFooTask));
  expect(store.getState().tasks.projects.default).toEqual({
    archived: false,
    doneTasks: [],
    todoTasks: [newFooTask, barTask]
  });
});

test("Remove a project", () => {
  const { store } = createStore();

  expect(store.getState().tasks).toEqual(initialState);

  store.dispatch(actionCreators.removeProject("default"));
  expect(store.getState().tasks.projects).toEqual(initialState.projects);
  expect(store.getState().tasks.currentProjectName).toBe(
    initialState.currentProjectName
  );

  store.dispatch(actionCreators.addProject("foo"));

  store.dispatch(actionCreators.removeProject("foo"));
  expect(store.getState().tasks.projects).toEqual(initialState.projects);
  expect(store.getState().tasks.currentProjectName).toBe(
    initialState.currentProjectName
  );
});

test("Remove a task", () => {
  const { store } = createStore();

  const fooTask = createTask("foo", "");
  const barTask = createTask("bar", "");

  store.dispatch(actionCreators.addTask(barTask));
  store.dispatch(actionCreators.addTask(fooTask));
  expect(store.getState().tasks.projects.default).toEqual({
    archived: false,
    doneTasks: [],
    todoTasks: [fooTask, barTask]
  });

  store.dispatch(actionCreators.removeTask(fooTask.id));
  expect(store.getState().tasks.projects.default).toEqual({
    archived: false,
    doneTasks: [],
    todoTasks: [barTask]
  });
});

test("Set a current project", () => {
  const state = reducer(
    initialState,
    actionCreators.setCurrentProjectName("foo")
  );
  expect(state.currentProjectName).toBe("foo");
});

test("Set a current task", () => {
  expect(initialState.currentTaskId).toBe(null);
  const state = reducer(initialState, actionCreators.setCurrentTaskId("foo"));
  expect(state.currentTaskId).toBe("foo");
});

test("Set tasks", () => {
  const { store } = createStore();

  const fooTask = createTask("foo", "");
  const barTask = createTask("bar", "");

  store.dispatch(actionCreators.addTask(barTask));
  store.dispatch(actionCreators.addTask(fooTask));
  expect(store.getState().tasks.projects.default).toEqual({
    archived: false,
    doneTasks: [],
    todoTasks: [fooTask, barTask]
  });

  store.dispatch(actionCreators.setTasks([barTask, fooTask]));
  expect(store.getState().tasks.projects.default).toEqual({
    archived: false,
    doneTasks: [],
    todoTasks: [barTask, fooTask]
  });
});

test("Toggle a task's state", () => {
  const { store } = createStore();

  const fooTask = createTask("foo", "");

  store.dispatch(actionCreators.addTask(fooTask));
  store.dispatch(actionCreators.toggleTaskState(fooTask.id));
  expect(store.getState().tasks.projects.default).toEqual({
    archived: false,
    doneTasks: [fooTask],
    todoTasks: []
  });

  store.dispatch(actionCreators.toggleTaskState(fooTask.id));
  expect(store.getState().tasks.projects.default).toEqual({
    archived: false,
    doneTasks: [],
    todoTasks: [fooTask]
  });
});

test("Toggle a project's state", () => {
  const { store } = createStore();

  store.dispatch(actionCreators.addProject("foo"));

  expect(getProject(store).archived).toBeFalsy();

  store.dispatch(actionCreators.archiveProject("foo"));

  expect(getProject(store).archived).toBeFalsy();
  expect(store.getState().tasks.projects.foo.archived).toBeTruthy();

  store.dispatch(actionCreators.unarchiveProject("foo"));

  expect(getProject(store).archived).toBeFalsy();
  expect(store.getState().tasks.projects.foo.archived).toBeFalsy();
});

test("Don't archive the last project", () => {
  const { store } = createStore();

  expect(getProject(store).archived).toBeFalsy();

  store.dispatch(
    actionCreators.archiveProject(store.getState().tasks.currentProjectName)
  );

  expect(getProject(store).archived).toBeFalsy();
});
