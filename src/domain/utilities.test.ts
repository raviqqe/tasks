import { describe, it } from "vitest";
import { sleep } from "./utilities.js";

describe("sleep", () => {
  it("sleeps", async () => {
    await sleep(1);
  });
});
