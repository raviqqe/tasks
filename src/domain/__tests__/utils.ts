import { getUnixTimeStamp } from "../utils";

test("Get a time stamp", () => {
  const timeStamp = getUnixTimeStamp();

  expect(timeStamp).toBeGreaterThan(1000000000);
  expect(timeStamp).toBeLessThan(2000000000);
});
