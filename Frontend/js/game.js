import data from "./variables.json" assert { type: "json" };

import { createInitialValues } from "./createInitialValues.js";
import { draw } from "./draw.js";
import { shuffle } from "./shuffle.js";

export function game() {
  if (data.state == 0) {
    data.values = createInitialValues();
    shuffle();
    draw();
  }
}
