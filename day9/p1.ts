const input = await Deno.readTextFile(Deno.args[0] || "input.txt");
const lines = input
  .split("\n")
  .filter((l) => l !== "")
  .map((line) => line.split(" "));

const height = 2000; // sort of had to guess these values
const width = 2000;

const grid = new Array(height).fill(0).map((_) => new Array(width).fill("."));
const tailcounts = new Array(height)
  .fill(0)
  .map((_) => new Array(width).fill(0));

let hi = 1000; // sort of had to guess these values
let hj = 1000; // we start somewhere in the middle
let ti;
let tj;
function setTail(i, j) {
  ti = i;
  tj = j;
  tailcounts[i][j] = 1;
}
setTail(hi, hj);

function getPrintedMap() {
  const printedMap = grid.map((row, i) =>
    row.map((col, j) => {
      let val = ".";
      if (tj === j && ti === i) val = "T";
      if (hj === j && hi === i) val = "H";
      return val;
    })
  );
  return printedMap;
}

function pullTail() {
  // exit early if tail doesn't need to be pulled
  // this happens if tail is "touching the head"
  if (ti === hi && tj === hj) {
    // console.log("overlapping");
    return; // overlapping case
  }
  if (Math.abs(ti - hi) + Math.abs(tj - hj) === 1) {
    // console.log("one away, cardinal");
    return; // cardinal adjacency
  }
  if (Math.abs(ti - hi) === 1 && Math.abs(tj - hj) === 1) {
    // console.log("one away, diagonal");
    return; // diagonal adjacency
  }
  if (ti === hi) {
    // console.log("two away, same row");
    setTail(ti, (tj + hj) / 2);
    return;
  }
  if (tj === hj) {
    // console.log("two away, same col");
    setTail((ti + hi) / 2, tj);
    return;
  }
  if (Math.abs(ti - hi) > Math.abs(tj - hj)) {
    // console.log("two away, long row");
    setTail((ti + hi) / 2, hj);
  } else {
    // console.log("two away, long col");
    setTail(hi, (tj + hj) / 2);
  }
}

// console.log(getPrintedMap());

for (let [dir, amt] of lines) {
  amt = parseInt(amt, 10);
  // console.log("INSTRUCTION", dir, amt);
  for (let i = 0; i < amt; i++) {
    switch (dir) {
      case "R":
        hj += 1;
        break;
      case "L":
        hj -= 1;
        break;
      case "U":
        hi -= 1;
        break;
      case "D":
        hi += 1;
        break;
    }
    pullTail();
    // console.log(getPrintedMap());
  }
}

const result = tailcounts.reduce(
  (ar, vr) => ar + vr.reduce((ac, vc) => ac + vc, 0),
  0
);
console.log("RESULT:", result);
