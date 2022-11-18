import data from "./variables.json" assert { type: "json" };

export function gameOver() {
  var expectedValue = 1;
  for (var y = 0; y < data.size; y++) {
    for (var x = 0; x < data.size; x++) {
      if (data.values[y][x] == expectedValue) {
        expectedValue++;
      } else {
        if (
          x == data.size - 1 &&
          y == data.size - 1 &&
          data.values[y][x] == 0
        ) {
          return true;
        }
        return false;
      }
    }
  }
  return true;
}
