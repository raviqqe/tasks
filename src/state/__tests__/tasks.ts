import { actionCreators, initialState, reducer } from "../tasks";

import { emptyProject } from "../../domain/project";
import { createTask } from "../../domain/task";

test("Add a new project", () => {
    let state = initialState;
    expect(state.projects).toEqual({});

    state = reducer(state, actionCreators.addProject("foo"));
    expect(state.projects).toEqual({ foo: emptyProject });

    state = reducer(state, actionCreators.addProject("bar"));
    expect(state.projects).toEqual({ bar: emptyProject, foo: emptyProject });
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
    expect(state.projects).toEqual({ foo: { done: [], todo: [fooTask] } });
    state = reducer(state, actionCreators.addTask(barTask));
    expect(state.projects).toEqual({ foo: { done: [], todo: [barTask, fooTask] } });
});

test("Change a project name", () => {
    let state: typeof initialState = {
        ...initialState,
        currentProjectName: "foo",
        projects: { foo: emptyProject },
    };

    state = reducer(state, actionCreators.changeProjectName({ oldName: "foo", newName: "bar" }));
    expect(state.projects).toEqual({ bar: emptyProject });
});

test("Modify a task", () => {
    let state: typeof initialState = {
        ...initialState,
        currentProjectName: "foo",
        projects: {
            foo: { done: [], todo: [createTask("bar", "")] },
        },
    };

    const oldTask = state.projects.foo.todo[0];

    state = reducer(state, actionCreators.modifyTask({ ...oldTask, name: "baz" }));
    expect(state.projects).toEqual({ foo: { done: [], todo: [{ ...oldTask, name: "baz" }] } });
});

test("Set a current project", () => {
    expect(initialState.currentProjectName).toBe(null);
    const state = reducer(initialState, actionCreators.setCurrentProject("foo"));
    expect(state.currentProjectName).toBe("foo");
});

test("Toggle a task's state", () => {
    const fooTask = createTask("foo", "");

    let state: typeof initialState = {
        ...initialState,
        currentProjectName: "foo",
        projects: { foo: { done: [], todo: [fooTask] } },
    };

    state = reducer(state, actionCreators.toggleTaskState(fooTask.id));
    expect(state.projects).toEqual({ foo: { done: [fooTask], todo: [] } });

    state = reducer(state, actionCreators.toggleTaskState(fooTask.id));
    expect(state.projects).toEqual({ foo: { done: [], todo: [fooTask] } });
});
