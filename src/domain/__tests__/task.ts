import { ITask, formatTask, validateTask } from "../task";

describe("formatTask", () => {
  it("removes extra spaces in a name", () => {
    expect(formatTask({ id: "", name: " foo\n" })).toEqual({
      id: "",
      name: "foo"
    });
  });
});

describe("validateTask", () => {
  it("validates names", () => {
    expect(() => validateTask({ name: "" } as ITask)).toThrowError();
  });
});
