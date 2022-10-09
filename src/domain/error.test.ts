import { formatErrorMessage } from "../error";

describe("formatErrorMessage", () => {
  it("formats a message", () => {
    expect(formatErrorMessage(new Error("foo"))).toBe("Foo!");
  });

  it("throws an error with an empty message", () => {
    expect(() => formatErrorMessage(new Error(""))).toThrow();
  });
});
