const input = await Deno.readTextFile("input.txt");
const lines = input.split("\n");

// descending order
let top = -Infinity;

let current_total = 0;

for (let line of lines) {
  if (line !== "") {
    current_total += parseInt(line, 10);
    continue;
  }
  if (current_total > top) {
    top = current_total;
  }
  current_total = 0;
}

console.log(top);
