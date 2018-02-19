import { createStore } from "..";
import { emptyProject } from "../../domain/project";
import { createTask } from "../../domain/task";
import { actionCreators, initialState, reducer } from "../tasks";

function getState(store): typeof initialState {
    return store.getState().tasks;
}

test("Add a new project", () => {
    let state = initialState;

    state = reducer(state, actionCreators.addProject("foo"));
    expect(state.projects).toEqual({ ...initialState.projects, foo: emptyProject });

    state = reducer(state, actionCreators.addProject("bar"));
    expect(state.projects).toEqual({
        ...initialState.projects,
        bar: emptyProject,
        foo: emptyProject,
    });
});

test("Add a new task", () => {
    let state: typeof initialState = {
        ...initialState,
        currentProjectName: "foo",
        projects: { foo: emptyProject },
    };

    const fooTask = createTask("foo", "");
    const barTask = createTask("bar", "");

    state = reducer(state, actionCreators.addTask(fooTask));
    expect(state.projects).toEqual({ foo: { doneTasks: [], todoTasks: [fooTask] } });
    state = reducer(state, actionCreators.addTask(barTask));
    expect(state.projects).toEqual({ foo: { doneTasks: [], todoTasks: [barTask, fooTask] } });
});

test("Rename a project", () => {
    let state: typeof initialState = {
        ...initialState,
        currentProjectName: "foo",
        projects: { foo: emptyProject },
    };

    state = reducer(state, actionCreators.renameProject("bar"));
    expect(state.projects).toEqual({ bar: emptyProject });
});

test("Modify a task", () => {
    let state: typeof initialState = {
        ...initialState,
        currentProjectName: "foo",
        projects: {
            foo: { doneTasks: [], todoTasks: [createTask("bar", "")] },
        },
    };

    const oldTask = state.projects.foo.todoTasks[0];

    state = reducer(state, actionCreators.modifyTask({ ...oldTask, name: "baz" }));
    expect(state.projects).toEqual({ foo: { doneTasks: [], todoTasks: [{ ...oldTask, name: "baz" }] } });
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
    const fooTask = createTask("foo", "");
    const barTask = createTask("bar", "");

    let state: typeof initialState = {
        ...initialState,
        currentProjectName: "foo",
        projects: {
            foo: { doneTasks: [], todoTasks: [fooTask, barTask] },
        },
    };

    state = reducer(state, actionCreators.removeTask(fooTask.id));
    expect(state.projects.foo).toEqual({ doneTasks: [], todoTasks: [barTask] });
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

test("Set tasks", () => {
    const fooTask = createTask("foo", "");
    const barTask = createTask("bar", "");

    let state: typeof initialState = {
        ...initialState,
        currentProjectName: "foo",
        projects: {
            foo: { doneTasks: [], todoTasks: [fooTask, barTask] },
        },
    };

    state = reducer(state, actionCreators.setTasks([barTask, fooTask]));
    expect(state.projects.foo).toEqual({ doneTasks: [], todoTasks: [barTask, fooTask] });
});

test("Toggle a task's state", () => {
    const fooTask = createTask("foo", "");

    let state: typeof initialState = {
        ...initialState,
        currentProjectName: "foo",
        projects: { foo: { doneTasks: [], todoTasks: [fooTask] } },
    };

    state = reducer(state, actionCreators.toggleTaskState(fooTask.id));
    expect(state.projects).toEqual({ foo: { doneTasks: [fooTask], todoTasks: [] } });

    state = reducer(state, actionCreators.toggleTaskState(fooTask.id));
    expect(state.projects).toEqual({ foo: { doneTasks: [], todoTasks: [fooTask] } });
});
