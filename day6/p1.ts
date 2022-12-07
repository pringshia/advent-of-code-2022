const input = await Deno.readTextFile("input.txt");
const chars = input.split("");

let marker = -Infinity;
for (let [i, char] of chars.entries()) {
  if (i <= 3) continue;
  if (new Set(chars.slice(i-4, i)).size === 4) {
    marker = i;
    break;
  }
}

const result = marker
console.log("RESULT:", result);
