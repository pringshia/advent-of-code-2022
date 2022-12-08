const input = await Deno.readTextFile("input.txt");

const lines = input.split("\n").filter(l => l !== "");
const height = lines.length;
const width = lines[0].length;

const nums = lines.map(line => line.split("").map(val => parseInt(val, 10)));
const map = new Array(height).fill(0).map(_ => new Array(width).fill(0));


let scoreLeft = (i, j) => {
  const num = nums[i][j];
  const row = nums[i];
  let space = 1;
  j--;
  while (j > 0) {
    if (num > row[j]) {
      space += 1;
    } else {
      return space;
    }
    j--;
  }
  return space;
}
let scoreRight = (i, j) => {
  const num = nums[i][j];
  const row = nums[i];
  let space = 1;
  j++;
  while (j < row.length - 1) {
    if (num > row[j]) {
      space += 1;
    } else {
      return space;
    }
    j++;
  }
  return space;
}
let scoreUp = (i, j) => {
  const num = nums[i][j];
  const col = nums.map(row => row[j]);
  let space = 1;
  i--;
  while (i > 0) {
    if (num > col[i]) {
      space += 1;
    } else {
      return space;
    }
    i--;
  }
  return space;
}
let scoreDown = (i, j) => {
  const num = nums[i][j];
  const col = nums.map(row => row[j]);
  let space = 1;
  i++;
  while (i < col.length - 1) {
    if (num > col[i]) {
      space += 1;
    } else {
      return space;
    }
    i++;
  }
  return space;
}

for (let i = 0; i < height; i++) {
  for (let j = 0; j < width; j++) {
    let score = 0;
    if (i === 0 || i === height - 1 || j === 0 || j === width - 1) {
    } else {
      let left = scoreLeft(i, j);
      let right = scoreRight(i, j);
      let down = scoreDown(i, j);
      let up = scoreUp(i, j);
      score = left * right * down * up;
    }
    map[i][j] = score;
  }
}

// console.log(map)

const result = map.reduce((a, v) => Math.max(a, v.reduce((aa, vv) => Math.max(aa, vv), 0)), 0);

console.log("RESULT:", result);
