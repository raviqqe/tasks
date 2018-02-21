import { createStore } from "..";
import { emptyProject } from "../../domain/project";
import { createTask } from "../../domain/task";
import { actionCreators, initialState, reducer } from "../tasks";

function getState(store): typeof initialState {
    return store.getState().tasks;
}

test("Add a new project", () => {
    const { store } = createStore();

    store.dispatch(actionCreators.addProject("foo"));
    expect(getState(store).currentProjectName).toBe("foo");
    expect(getState(store).projects).toEqual({ ...initialState.projects, foo: emptyProject });

    store.dispatch(actionCreators.addProject("bar"));
    expect(getState(store).currentProjectName).toBe("bar");
    expect(getState(store).projects).toEqual({
        ...initialState.projects,
        bar: emptyProject,
        foo: emptyProject,
    });
});

test("Add a new task", () => {
    const { store } = createStore();

    const fooTask = createTask("foo", "");
    const barTask = createTask("bar", "");

    store.dispatch(actionCreators.addTask(fooTask));
    expect(getState(store).currentTaskId).toEqual(fooTask.id);
    expect(getState(store).projects).toEqual({ default: { doneTasks: [], todoTasks: [fooTask] } });

    store.dispatch(actionCreators.addTask(barTask));
    expect(getState(store).currentTaskId).toEqual(barTask.id);
    expect(getState(store).projects).toEqual({ default: { doneTasks: [], todoTasks: [barTask, fooTask] } });
});

test("Rename a project", () => {
    const { store } = createStore();

    store.dispatch(actionCreators.renameProject("foo"));
    expect(getState(store).projects).toEqual({ foo: emptyProject });
});

test("Modify a task", () => {
    const { store } = createStore();

    const fooTask = createTask("foo", "");
    const barTask = createTask("bar", "");

    store.dispatch(actionCreators.addTask(barTask));
    store.dispatch(actionCreators.addTask(fooTask));
    expect(getState(store).projects.default).toEqual({ doneTasks: [], todoTasks: [fooTask, barTask] });

    const newFooTask = { ...fooTask, name: "baz" };

    store.dispatch(actionCreators.modifyTask(newFooTask));
    expect(getState(store).projects.default).toEqual({ doneTasks: [], todoTasks: [newFooTask, barTask] });
});

test("Remove a project", () => {
    const { store } = createStore();

    expect(getState(store)).toEqual(initialState);

    store.dispatch(actionCreators.removeProject("default"));
    expect(getState(store).projects).toEqual(initialState.projects);
    expect(getState(store).currentProjectName).toBe(initialState.currentProjectName);

    store.dispatch(actionCreators.addProject("foo"));

    store.dispatch(actionCreators.removeProject("foo"));
    expect(getState(store).projects).toEqual(initialState.projects);
    expect(getState(store).currentProjectName).toBe(initialState.currentProjectName);
});

test("Remove a task", () => {
    const { store } = createStore();

    const fooTask = createTask("foo", "");
    const barTask = createTask("bar", "");

    store.dispatch(actionCreators.addTask(barTask));
    store.dispatch(actionCreators.addTask(fooTask));
    expect(getState(store).projects.default).toEqual({ doneTasks: [], todoTasks: [fooTask, barTask] });

    store.dispatch(actionCreators.removeTask(fooTask.id));
    expect(getState(store).projects.default).toEqual({ doneTasks: [], todoTasks: [barTask] });
});

test("Set a current project", () => {
    const state = reducer(initialState, actionCreators.setCurrentProjectName("foo"));
    expect(state.currentProjectName).toBe("foo");
});

test("Set a current task", () => {
    expect(initialState.currentTaskId).toBe(null);
    const state = reducer(initialState, actionCreators.setCurrentTaskId("foo"));
    expect(state.currentTaskId).toBe("foo");
});

test("Set tasks", async () => {
    const { store } = createStore();

    const fooTask = createTask("foo", "");
    const barTask = createTask("bar", "");

    store.dispatch(actionCreators.addTask(barTask));
    store.dispatch(actionCreators.addTask(fooTask));
    expect(getState(store).projects.default).toEqual({ doneTasks: [], todoTasks: [fooTask, barTask] });

    store.dispatch(actionCreators.setTasks([barTask, fooTask]));
    expect(getState(store).projects.default).toEqual({ doneTasks: [], todoTasks: [barTask, fooTask] });
});

test("Toggle a task's state", () => {
    const { store } = createStore();

    const fooTask = createTask("foo", "");

    store.dispatch(actionCreators.addTask(fooTask));
    store.dispatch(actionCreators.toggleTaskState(fooTask.id));
    expect(getState(store).projects.default).toEqual({ doneTasks: [fooTask], todoTasks: [] });

    store.dispatch(actionCreators.toggleTaskState(fooTask.id));
    expect(getState(store).projects.default).toEqual({ doneTasks: [], todoTasks: [fooTask] });
});
