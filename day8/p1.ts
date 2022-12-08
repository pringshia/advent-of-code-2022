const input = await Deno.readTextFile("input.txt");

const lines = input.split("\n").filter(l => l !== "");
const height = lines.length;
const width = lines[0].length;

const nums = lines.map(line => line.split("").map(val => parseInt(val, 10)));

const map = new Array(height).fill(0).map(_ => new Array(width).fill(0));

for (let i = 0; i < height; i++) {
  let maxMain = -Infinity;
  let maxReverse = -Infinity;
  for (let j = 0; j < width; j++) {
    // L-to-R
    let numMain = nums[i][j];
    let numReverse = nums[i][width - j - 1];
    // maxMain = Math.max(maxMain, numMain);
    // maxReverse = Math.max(maxReverse, numReverse);

    let visibleMain = 0;
    let visibleReverse = 0;

    // console.log(i, j, numMain, numReverse, maxMain, maxReverse)
    if (i === 0 || i === height - 1 || j === 0 || j === width - 1) {
      visibleMain = 1;
      maxMain = Math.max(maxMain, numMain);
      maxReverse = Math.max(maxReverse, numReverse);
    } else {
      if (numMain > maxMain) {
        maxMain = numMain;
        visibleMain = 1;
      } else {
        visibleMain = 0;
      }
      if (numReverse > maxReverse) {
        maxReverse = numReverse;
        visibleReverse = 1;
      } else {
        visibleReverse = 0;
      }
    }
    map[i][j] ||= visibleMain;
    map[i][width - j - 1] ||= visibleReverse;
  }
}
  
for (let j = 0; j < width; j++) {
  let maxMain = -Infinity;
  let maxReverse = -Infinity;
  for (let i = 0; i < height; i++) {
    // T-to-D
    let numMain = nums[i][j];
    let numReverse = nums[height - i - 1][j];

    let visibleMain = 0;
    let visibleReverse = 0;

    if (i === 0 || i === height - 1 || j === 0 || j === width - 1) {
      visibleMain = 1;
      maxMain = Math.max(maxMain, numMain);
      maxReverse = Math.max(maxReverse, numReverse);
    } else {
      if (numMain > maxMain) {
        maxMain = numMain;
        visibleMain = 1;
      } else {
        visibleMain = 0;
      }
      if (numReverse > maxReverse) {
        maxReverse = numReverse;
        visibleReverse = 1;
      } else {
        visibleReverse = 0;
      }
    }
    map[i][j] ||= visibleMain;
    map[height - i - 1][j] ||= visibleReverse;
  }
}

// console.log(map)

const result = map.reduce((a, v) => a + v.reduce((aa, vv) => aa + vv, 0), 0);

console.log("RESULT:", result);
