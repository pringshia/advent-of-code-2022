const input = await Deno.readTextFile(Deno.args[0] || "input.txt");

type Monkey = {
  items: number[];
  operation: (number) => number;
  test: (number) => boolean;
  trueThrow: number;
  falseThrow: number;
  inspected: number;
  divisor: number;
}

const monkeys: Monkey[] = [];

const lines = input.split("\n");
for (let i = 0; i < lines.length; i+=7) {
  let itemsLine = lines[i+1];
  let opLine = lines[i+2];
  let testLine = lines[i+3];
  let trueLine = lines[i+4];
  let falseLine = lines[i+5];

  let items = itemsLine.split(": ")[1].split(", ").map(str => parseInt(str, 10));
  
  let [lhs, op, rhs] = opLine.split(": new = ")[1].split(" ");
  let operation = (old) => {
    let operands = [lhs, rhs].map(val => val === "old" ? old : parseInt(val, 10));
    if (op === "*") {
      return operands.reduce((a, v) => a * v, 1);
    } else if (op === "+") {
      return operands.reduce((a, v) => a + v, 0);
    }
  }
  
  let divisor = parseInt(testLine.split("divisible by ")[1], 10);
  let test = (worryLevel) => {
    return worryLevel % divisor === 0;
  }

  let trueThrow = parseInt(trueLine.split("throw to monkey ")[1], 10)
  let falseThrow = parseInt(falseLine.split("throw to monkey ")[1], 10)
  // console.log(items);
  // console.log(lhs, op, rhs);
  // console.log(divisor);
  monkeys.push({items, operation, divisor, test, trueThrow, falseThrow, inspected: 0});
}

let round = 0;
function performRound(debug = false) {
  round += 1;
  const stressDivisor = monkeys.reduce((a, m) => a * m.divisor, 1);
  for (let [idx, monkey] of monkeys.entries()) {
    while (monkey.items.length > 0) {
      monkey.inspected += 1;
      debug && console.log(`Monkey ${idx}:`);
      let item = monkey.items.shift();
      debug && console.log(`\tMonkey inspect item with WL ${item}.`);
      item = monkey.operation(item);
      debug && console.log(`\tWL changed to ${item}.`);
      item = Math.floor(item % stressDivisor);
      // debug && console.log(`\tWL divided to ${item}.`);
      debug && console.log(monkey.test(item) ? "\tDivisible": "\tNot Divisible");
      let throwTo = monkey.test(item) ? monkey.trueThrow : monkey.falseThrow;
      debug && console.log(`Item with WL ${item} throw to monkey ${throwTo}`);
      monkeys[throwTo].items.push(item);
    }
  }
}

function printInventory() {
  for (let [idx, monkey] of monkeys.entries()) {
    console.log(`Monkey ${idx}: ${monkey.items.join(", ")}`);
  }
}
function printStats() {
  for (let [idx, monkey] of monkeys.entries()) {
    console.log(`Monkey ${idx} inspected ${monkey.inspected} times.`);
  }
}
function getScore() {
  const top = monkeys.map(m => m.inspected).sort((a, b) => b - a);
  return top[0] * top[1];
}

new Array(10000).fill(1).forEach(_ => {
  performRound();
  // console.log(`After round ${round}`);
  if (round % 1000 === 0 || round === 1 || round === 20) {
    console.log(`== After round ${round} ==`);
    printStats();
    console.log("");
  }
});

// printStats();

const result = getScore();
console.log("RESULT:", result);
