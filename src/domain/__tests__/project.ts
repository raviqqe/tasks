import { formatProject, validateProject } from "../project";

describe("formatProject", () => {
  it("removes extra spaces in a name", () => {
    expect(formatProject({ id: "", name: " foo\n" })).toEqual({
      id: "",
      name: "foo",
      tasks: []
    });
  });
});

describe("validateProject", () => {
  it("invalidates an unformatted name", () => {
    expect(() => validateProject({ id: "", name: " foo" })).toThrowError();
  });

  it("invalidates an empty name", () => {
    expect(() => validateProject({ id: "", name: "" })).toThrowError();
  });
});
