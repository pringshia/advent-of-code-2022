const input = await Deno.readTextFile(Deno.args[0] || "input.txt");
const lines = input
  .split("\n")
  .filter((l) => l !== "")
  .map((line) => line.split(" "));

const height = 1000; // sort of had to guess these values
const width = 1000;

const grid = new Array(height).fill(0).map((_) => new Array(width).fill("."));
const tailcounts = new Array(height)
  .fill(0)
  .map((_) => new Array(width).fill(0));

const CONNECTED_KNOTS = 10 - 1;

let hi = height / 2; // sort of had to guess these values
let hj = width / 2; // we start somewhere in the middle
let tai = new Array(CONNECTED_KNOTS).fill(hi);
let taj = new Array(CONNECTED_KNOTS).fill(hj);
function setTail(knotIdx, i, j) {
  // console.log(`moving tail {${knotIdx + 1} to: `, i, j);
  tai[knotIdx] = i;
  taj[knotIdx] = j;
  if (knotIdx === CONNECTED_KNOTS - 1) tailcounts[i][j] = 1;
}

new Array(CONNECTED_KNOTS).fill(0).forEach((_, idx) => setTail(idx, hi, hj));

function getPrintedMap() {
  const printedMap = grid.map((row, i) =>
    row.map((col, j) => {
      let val = ".";
      for (var ki = CONNECTED_KNOTS - 1; ki >= 0; ki--) {
        let tj = taj[ki];
        let ti = tai[ki];

        if (tj === j && ti === i) val = String(ki + 1);
      }
      if (hj === j && hi === i) val = "H";
      return val;
    })
  );
  // return printedMap;
  return printedMap.map((row) => row.join("")).join("\n") + "\n\n\n";
}

function pullTail(knotIndex) {
  let ti = tai[knotIndex];
  let tj = taj[knotIndex];

  let ci = hi;
  let cj = hj;

  if (knotIndex > 0) {
    ci = tai[knotIndex - 1];
    cj = taj[knotIndex - 1];
  }

  // console.log(`Pulling ${knotIndex}`);

  // exit early if tail doesn't need to be pulled
  // this happens if tail is "touching the head"
  if (ti === ci && tj === cj) {
    // console.log("overlapping");
    return; // overlapping case
  }
  if (Math.abs(ti - ci) + Math.abs(tj - cj) === 1) {
    // console.log("one away, cardinal");
    return; // cardinal adjacency
  }
  if (Math.abs(ti - ci) === 1 && Math.abs(tj - cj) === 1) {
    // console.log("one away, diagonal");
    return; // diagonal adjacency
  }
  if (ti === ci) {
    // console.log("two away, same row");
    setTail(knotIndex, ti, (tj + cj) / 2);
    return;
  }
  if (tj === cj) {
    // console.log("two away, same col");
    setTail(knotIndex, (ti + ci) / 2, tj);
    return;
  }
  if (Math.abs(ti - ci) === 2 && Math.abs(tj - cj) == 2) {
    // console.log("two away, diagonal");
    setTail(knotIndex, (ti + ci) / 2, (tj + cj) / 2);
    return;
  }
  if (Math.abs(ti - ci) > Math.abs(tj - cj)) {
    // console.log("two away, long row");
    setTail(knotIndex, (ti + ci) / 2, cj);
  } else {
    // console.log("two away, long col");
    setTail(knotIndex, ci, (tj + cj) / 2);
  }
}

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
    new Array(CONNECTED_KNOTS).fill(0).forEach((_, idx) => pullTail(idx));
  }
  // console.log(getPrintedMap());
}

// console.log(tailcounts.map((row) => row.join("")).join("\n"));

const result = tailcounts.reduce(
  (ar, vr) => ar + vr.reduce((ac, vc) => ac + vc, 0),
  0
);
console.log("RESULT:", result);
