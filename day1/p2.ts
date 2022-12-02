const input = await Deno.readTextFile("input.txt");
const lines = input.split("\n");

// descending order
let top = [-Infinity, -Infinity, -Infinity];

let current_total = 0;

for (let line of lines) {
  if (line !== "") {
    current_total += parseInt(line, 10);
    continue;
  }
  // if we're higher than the lowest, we have a new top entry
  const lowestTop = top[top.length - 1];
  // console.log(current_total, lowestTop, current_total > lowestTop)
  if (current_total > lowestTop) {
    // we have a new top, let's place it where it belongs
    for (let [i, candidate] of top.entries()) {
      if (current_total > candidate) {
        top.splice(i, 0, current_total);
        top.pop();
        break;
      }
    }
  //c onsole.log("NEW TOP: ", top[0], top[1], top[2])

  }
  current_total = 0;
}

console.log(top.reduce((a, b) => a + b, 0));
