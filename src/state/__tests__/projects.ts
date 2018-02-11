import { actionCreators, initialState, reducer } from "../projects";

test("Create a new project", () => {
    expect(initialState.projects).toEqual([]);
    const state = reducer(initialState, actionCreators.addProject("foo"));
    expect(state.projects).toEqual([{ name: "foo", tasks: [] }]);
});

test("Set a current project", () => {
    expect(initialState.currentProject).toBe(null);
    const state = reducer(initialState, actionCreators.setCurrentProject("foo"));
    expect(state.currentProject).toBe("foo");
});
