const input = await Deno.readTextFile("input.txt");

const lines = input.split("\n").filter(line => line !== "");
const createAssmt = ([start, end]) => ({start, end});
const pairs = lines.map(str => str.split(",")
                        .map(range => range.split("-").map(v => parseInt(v, 10))).map(createAssmt));



const fullyOverlaps = function(innerElf, outerElf) {
  return outerElf.start <= innerElf.start && outerElf.end >= innerElf.end;
}
const anyOverlaps = function(elf1, elf2) {
  const elf1sections = elf1.end - elf1.start + 1;
  const elf2sections = elf2.end - elf2.start + 1;
  const minStart = Math.min(elf1.start, elf2.start);
  const maxEnd = Math.max(elf1.end, elf2.end);
  const boundedRange = maxEnd - minStart + 1;
  return boundedRange < (elf1sections + elf2sections);
}

let overlaps = 0;
for (let [index, [elf1, elf2]] of pairs.entries()) {
  if (anyOverlaps(elf1, elf2)) {
    overlaps += 1;
  }
}


const result = overlaps;
console.log("RESULT:", result);
