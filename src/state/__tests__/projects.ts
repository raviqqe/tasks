import { actionCreators, initialState, reducer } from "../projects";

test("Create a new project", () => {
    expect(initialState.projects).toEqual([]);
    const state = reducer(initialState, actionCreators.addProject("foo"));
    expect(state.projects).toEqual([{ name: "foo", tasks: [] }]);
});
