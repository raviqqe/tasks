import { formatProject, validateProject } from "../project";

describe("formatProject", () => {
  it("removes extra spaces in a name", () => {
    expect(formatProject({ archived: false, id: "", name: " foo\n" })).toEqual({
      archived: false,
      id: "",
      name: "foo"
    });
  });
});

describe("validateProject", () => {
  it("throws an error with an unformatted name", () => {
    expect(() =>
      validateProject({ archived: false, id: "", name: " foo" })
    ).toThrowError();
  });

  it("throws an error with an empty name", () => {
    expect(() =>
      validateProject({ archived: false, id: "", name: "" })
    ).toThrowError();
  });
});
