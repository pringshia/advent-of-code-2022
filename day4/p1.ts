const input = await Deno.readTextFile("input.txt");

const lines = input.split("\n").filter(line => line !== "");
const createAssmt = ([start, end]) => ({start, end});
const pairs = lines.map(str => str.split(",")
                        .map(range => range.split("-").map(v => parseInt(v, 10))).map(createAssmt));



const fullyOverlaps = function(innerElf, outerElf) {
  return outerElf.start <= innerElf.start && outerElf.end >= innerElf.end;
}

let overlaps = 0;
for (let [index, [elf1, elf2]] of pairs.entries()) {
  if (fullyOverlaps(elf1, elf2) || fullyOverlaps(elf2, elf1)) {
    overlaps += 1;
  }
}


const result = overlaps;
console.log("RESULT:", result);
