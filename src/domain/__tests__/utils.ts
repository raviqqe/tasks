import { getUnixTimeStamp, unixTimeStampToString } from "../utils";

test("Get a time stamp", () => {
    const timeStamp = getUnixTimeStamp();

    expect(timeStamp).toBeGreaterThan(1000000000);
    expect(timeStamp).toBeLessThan(2000000000);
});

test("Format a date", () => {
    expect(unixTimeStampToString(0)).toBe("1970-1-1");
});
