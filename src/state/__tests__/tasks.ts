import { createStore } from "..";
import { emptyProject, IProject } from "../../domain/project";
import { createTask } from "../../domain/task";
import { actionCreators, initialState, reducer } from "../tasks";

function getState(store): typeof initialState {
  return store.getState().tasks;
}

function getProject(store): IProject {
  const { currentProjectName, projects } = getState(store);

  return projects[currentProjectName];
}

jest.mock("../../domain/utils", () => ({ getUnixTimeStamp: () => 42 }));

test("Add a new project", () => {
  const { store } = createStore();

  store.dispatch(actionCreators.addProject("foo"));
  expect(getState(store).currentProjectName).toBe("foo");
  expect(getState(store).projects).toEqual({
    ...initialState.projects,
    foo: emptyProject
  });

  store.dispatch(actionCreators.addProject("bar"));
  expect(getState(store).currentProjectName).toBe("bar");
  expect(getState(store).projects).toEqual({
    ...initialState.projects,
    bar: emptyProject,
    foo: emptyProject
  });
});

test("Add a invalid project", () => {
  const { store } = createStore();

  store.dispatch(actionCreators.addProject(""));
  expect(getState(store)).toEqual(initialState);
});

test("Add a new task", () => {
  const { store } = createStore();

  const fooTask = createTask("foo", "");
  const barTask = createTask("bar", "");

  store.dispatch(actionCreators.addTask(fooTask));
  expect(getState(store).currentTaskId).toEqual(fooTask.id);
  expect(getState(store).projects).toEqual({
    default: { archived: false, doneTasks: [], todoTasks: [fooTask] }
  });

  store.dispatch(actionCreators.addTask(barTask));
  expect(getState(store).currentTaskId).toEqual(barTask.id);
  expect(getState(store).projects).toEqual({
    default: { archived: false, doneTasks: [], todoTasks: [barTask, fooTask] }
  });
});

test("Add a invalid task", () => {
  const { store } = createStore();

  store.dispatch(actionCreators.addTask(createTask("", "")));
  expect(getState(store)).toEqual(initialState);
});

test("Rename a project", () => {
  const { store } = createStore();

  store.dispatch(actionCreators.renameCurrentProject("foo"));
  expect(getState(store).projects).toEqual({ foo: emptyProject });
});

test("Modify a task", () => {
  const { store } = createStore();

  const fooTask = createTask("foo", "");
  const barTask = createTask("bar", "");

  store.dispatch(actionCreators.addTask(barTask));
  store.dispatch(actionCreators.addTask(fooTask));
  expect(getState(store).projects.default).toEqual({
    archived: false,
    doneTasks: [],
    todoTasks: [fooTask, barTask]
  });

  const newFooTask = { ...fooTask, name: "baz" };

  store.dispatch(actionCreators.modifyTask(newFooTask));
  expect(getState(store).projects.default).toEqual({
    archived: false,
    doneTasks: [],
    todoTasks: [newFooTask, barTask]
  });
});

test("Remove a project", () => {
  const { store } = createStore();

  expect(getState(store)).toEqual(initialState);

  store.dispatch(actionCreators.removeProject("default"));
  expect(getState(store).projects).toEqual(initialState.projects);
  expect(getState(store).currentProjectName).toBe(
    initialState.currentProjectName
  );

  store.dispatch(actionCreators.addProject("foo"));

  store.dispatch(actionCreators.removeProject("foo"));
  expect(getState(store).projects).toEqual(initialState.projects);
  expect(getState(store).currentProjectName).toBe(
    initialState.currentProjectName
  );
});

test("Remove a task", () => {
  const { store } = createStore();

  const fooTask = createTask("foo", "");
  const barTask = createTask("bar", "");

  store.dispatch(actionCreators.addTask(barTask));
  store.dispatch(actionCreators.addTask(fooTask));
  expect(getState(store).projects.default).toEqual({
    archived: false,
    doneTasks: [],
    todoTasks: [fooTask, barTask]
  });

  store.dispatch(actionCreators.removeTask(fooTask.id));
  expect(getState(store).projects.default).toEqual({
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
  expect(getState(store).projects.default).toEqual({
    archived: false,
    doneTasks: [],
    todoTasks: [fooTask, barTask]
  });

  store.dispatch(actionCreators.setTasks([barTask, fooTask]));
  expect(getState(store).projects.default).toEqual({
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
  expect(getState(store).projects.default).toEqual({
    archived: false,
    doneTasks: [fooTask],
    todoTasks: []
  });

  store.dispatch(actionCreators.toggleTaskState(fooTask.id));
  expect(getState(store).projects.default).toEqual({
    archived: false,
    doneTasks: [],
    todoTasks: [fooTask]
  });
});

test("Toggle a project's state", () => {
  const { store } = createStore();

  store.dispatch(actionCreators.addProject("foo"));

  expect(getProject(store).archived).toBeFalsy();

  store.dispatch(
    actionCreators.toggleProjectState(getState(store).currentProjectName)
  );

  expect(getProject(store).archived).toBeFalsy();
  expect(getState(store).projects.foo.archived).toBeTruthy();
});

test("Don't archive the last project", () => {
  const { store } = createStore();

  expect(getProject(store).archived).toBeFalsy();

  store.dispatch(
    actionCreators.toggleProjectState(getState(store).currentProjectName)
  );

  expect(getProject(store).archived).toBeFalsy();
});
