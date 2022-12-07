const input = await Deno.readTextFile("input.txt");

let [initialSetup, moves] = input.split("\n\n").filter(l => l !== "");

function parseMoves(moves) {
  let regex = /move (\d+) from (\d+) to (\d+)/g;
  let matches = [ ...moves.matchAll(regex)];
  return matches.map((move) => {
    let [_, amt, from, to] = move;
    return {
      amt, from: String(from), to: String(to)
    };
  })
}
function parseInitialSetup(initialSetup) {
  // let numStacks = 3;
  // let stacks = Array.from(Array(numStacks)).reduce((acc, _, idx) => ({...acc, [idx+1]: []}) , {});
  let stacks = {};

  const lines = initialSetup.split("\n");
  for (let line of lines) {
    if (isNaN(parseInt(line[1], 10))) {
      let chars = line.split("");
      for (let charIdx = 1; charIdx <= chars.length; charIdx += 4) {
        let stackNum = (charIdx-1)/4 + 1;
        let crate = chars[charIdx];
        if (crate === " ") continue;
        if (stacks[stackNum] && stacks[stackNum].length > 0) {
          stacks[stackNum].push(crate);
        } else {
          stacks[stackNum] = [ crate ];
        }
      }
    }
  }
  return stacks;
}

const stacks = parseInitialSetup(initialSetup);
const instructions = parseMoves(moves);

// process

for (let [i, ins] of instructions.entries()) {
  // console.log(stacks);
  const frame = {
    i,
    times: ins.amt,
    from: ins.from,
    to: ins.to,
    startFrom: [...stacks[ins.from]],
    startTo: [...stacks[ins.to]]
  }
  // for (let times = 0; times < ins.amt; times++) {
    // pop stack
    let popped = stacks[ins.from].splice(0, ins.amt);
    // push stack
    stacks[ins.to].splice(0, 0, ...popped);

    // console.log(frame);
    if (stacks[ins.to].filter(el => el === undefined).length > 0) {
      console.error(ins)
      console.error(stacks[ins.to]);
      Deno.exit();
    }
  // }
}
// console.log(stacks, instructions);
// console.log(stacks);

// query
const topmost = Object.keys(stacks).reduce((acc, val) => {
  return [...acc, stacks[val + ""][0] ];
}, []);

const result = topmost.join("");
console.log("RESULT:", result);
