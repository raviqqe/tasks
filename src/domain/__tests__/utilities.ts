import { sleep } from "../utilities";

describe("sleep", () => {
  it("sleeps", async () => {
    await sleep(1);
  });
});
