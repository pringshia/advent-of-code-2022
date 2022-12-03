const input = await Deno.readTextFile("input.txt");

function findCommon(c1, c2) {
  let result = [];
  for (let item of c2) {
    if (c1.indexOf(item) < 0) continue;
    result.push(item);
  }
  return result;
}

const lines = input.split("\n").filter(line => line !== "");
let sum = 0;

for (let i = 0; i < lines.length; i += 3) {
  let elf1 = lines[i];
  let elf2 = lines[i+1];
  let elf3 = lines[i+2];

  let common = findCommon(elf1, elf2);
  common = findCommon(common, elf3)[0];

  let prio = common.charCodeAt() - (common.toLowerCase() === common ? 96 : 38);
  sum += prio;
}

const result = "<?>"
console.log("RESULT:", sum);
