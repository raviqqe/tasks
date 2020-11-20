import {
  formatProject,
  validateProject,
  sortProjects,
  IProject,
  getFirstProject,
} from "../project";

const dummyProject: IProject = { archived: false, id: "", name: "" };

describe("formatProject", () => {
  it("removes extra spaces in a name", () => {
    expect(formatProject({ ...dummyProject, name: " foo\n" })).toEqual({
      ...dummyProject,
      name: "foo",
    });
  });
});

describe("validateProject", () => {
  it("throws an error with an unformatted name", () => {
    expect(() =>
      validateProject({ ...dummyProject, name: " foo" })
    ).toThrowError();
  });

  it("throws an error with an empty name", () => {
    expect(() => validateProject(dummyProject)).toThrowError();
  });
});

describe("sortProjects", () => {
  it("sorts no projects", () => {
    expect(sortProjects([])).toEqual([]);
  });

  it("sorts projects", () => {
    expect(
      sortProjects([
        { ...dummyProject, name: "B" },
        { ...dummyProject, name: "a" },
      ])
    ).toEqual([
      { ...dummyProject, name: "a" },
      { ...dummyProject, name: "B" },
    ]);
  });
});

describe("getFirstProject", () => {
  it("gets the first project", () => {
    expect(
      getFirstProject([
        { ...dummyProject, name: "B" },
        { ...dummyProject, name: "a" },
      ])
    ).toEqual({ ...dummyProject, name: "a" });
  });

  it("throws an error if no project is found", () => {
    expect(() => getFirstProject([])).toThrow();
  });
});
