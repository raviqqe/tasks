import { sleep } from "./utilities";
import { describe, it } from "vitest";

describe("sleep", () => {
  it("sleeps", async () => {
    await sleep(1);
  });
});
