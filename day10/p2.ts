const input = await Deno.readTextFile(Deno.args[0] || "input.txt");

const stmts = input.split("\n").filter(l => !!l)
  .map(line => line.split(" "))
  .map(([op, arg]) => ({op, arg: parseInt(arg, 10)}));

const cyclesOfInterest = [20, 60, 100, 140, 180, 220];

let cycle = 0;
let ip = -1;
let wait = 0;
let X = 1;
let Xhist = [];

let crt = []

function tick() {
  cycle += 1;

  Xhist.push(X);
  let spriteStart = X;
  let spriteEnd = X + 2
  let pointer = ((cycle - 1) % 40) + 1;
  if (pointer <= spriteEnd && pointer >= spriteStart) {
    crt.push("X");
  } else {
    crt.push(".");
  }

  // console.log(`Starting cycle ${cycle}, X is ${X}`);
  if (wait > 0) {
    let stmt = stmts[ip];
    wait -= 1;
    if (wait === 0) {
      if (stmt.op === "addx") {
        X += stmt.arg;
      }
    }
  } else {
    ip += 1;
    let stmt = stmts[ip];
    if (stmt.op === "noop") {
      wait = 0;
    } else if (stmt.op === "addx") {
      wait = 1;
    }
  }
  // console.log(`Ending cycle ${cycle}, X is ${X}`);
}

while (ip < stmts.length - 1 || wait > 0) {
  tick();
}

// const strengths = cyclesOfInterest.map(coi => coi*Xhist[coi-1]).reduce((a,v)=>a+v,0);
let output = "";

for (let [idx, pixel] of crt.entries()) {
  console.log(idx, pixel);
  output += pixel;
  if ((idx + 1) % 40 === 0) output += "\n";
}

const result = output;
console.log("Result:");
console.log(result);
