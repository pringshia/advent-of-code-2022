const input = await Deno.readTextFile("input.txt");
const chars = input.split("");

let marker = -Infinity;
for (let [i, char] of chars.entries()) {
  if (i <= 13) continue;
  if (new Set(chars.slice(i-14, i)).size === 14) {
    marker = i;
    break;
  }
}

const result = marker
console.log("RESULT:", result);
