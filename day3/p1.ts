const input = await Deno.readTextFile("input.txt");

function findCommon(c1, c2) {
  for (let item of c2) {
    if (c1.indexOf(item) < 0) continue;
    return item;
  }
}

const lines = input.split("\n");
let sum = 0;

for (let line of lines) {
  if (line === "") continue;
  line = line.split("");
  let c2 = line.splice(line.length/2, line.length/2);
  let c1 = line;

  let common = findCommon(c1, c2);
  let prio = common.charCodeAt() - (common.toLowerCase() === common ? 96 : 38);
  sum += prio;
}

const result = "<?>"
console.log("RESULT:", sum);
