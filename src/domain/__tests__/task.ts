import { formatTask, validateTask } from "../task";

describe("formatTask", () => {
  it("removes extra spaces in a name", () => {
    expect(formatTask({ id: "", name: " foo\n" })).toEqual({
      id: "",
      name: "foo",
    });
  });
});

describe("validateTask", () => {
  it("throws an error with an unformatted name", () => {
    expect(() => validateTask({ id: "", name: " foo" })).toThrow();
  });

  it("throws an error with an empty name", () => {
    expect(() => validateTask({ id: "", name: "" })).toThrow();
  });
});
