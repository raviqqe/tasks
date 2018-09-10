import { secondsToPomodoros } from "../pomodoro-timer";

test("Converts seconds into pomodoros", () => {
  for (const [seconds, pomodoros] of [[60, 1 / 25], [25 * 60, 1]]) {
    expect(secondsToPomodoros(seconds)).toBe(pomodoros);
  }
});
