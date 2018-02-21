import Pizzicato = require("pizzicato");

import { sleep } from "./utils";

export async function playAlarm(volume: number = 1): Promise<void> {
    const sound = new Pizzicato.Sound({ source: "wave", options: { release: 3, volume } });
    sound.play();
    await sleep(500);
    sound.stop();
}
