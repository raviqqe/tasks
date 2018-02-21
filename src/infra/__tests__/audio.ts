import { playAlarm } from "../audio";

test("Play an alarm", async () => {
    await playAlarm(0.5);
});
