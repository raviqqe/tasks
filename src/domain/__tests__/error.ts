import { formatErrorMessage } from "../error";

describe("formatErrorMessage", () => {
  it("formats a message", () => {
    expect(formatErrorMessage(new Error("foo"))).toBe("Foo!");
  });
});
