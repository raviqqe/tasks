import Pizzicato = require("pizzicato");

import { sleep } from "./utils";

export async function playAlarm(volume: number): Promise<void> {
  const sound = new Pizzicato.Sound({
    options: { release: 3, volume },
    source: "wave"
  });
  sound.play();
  await sleep(500);
  sound.stop();
}
