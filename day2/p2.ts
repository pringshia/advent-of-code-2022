const input = await Deno.readTextFile("input.txt");
const lines = input.split("\n");

let score = 0;

// Rock: A
// Paper: B
// Scissors: C
//
// Win: Z
// Lose: X
// Draw: Y

function choicePts(opp, outcome) {
  if (outcome === "Y") {
    return opp === "B"? 2 : opp === "A" ? 1 : 3;
  }
  if (outcome === "Z") {
    let pick = opp === "A" ? "B" : opp === "B" ? "C" : "A";
    return pick === "B"? 2 : pick === "A" ? 1 : 3;
  }
  if (outcome === "X") {
    let pick = opp === "A" ? "C" : opp === "B" ? "A" : "B";
    return pick === "B"? 2 : pick === "A" ? 1 : 3;
  }
}

for (const round of lines) {
  if (round === "") continue;
  let [opp, outcome] = round.split(" ");
  const didWin = outcome === "X" ? -1 : outcome === "Y" ? 0 : 1;
  const winScore = didWin === 0 ? 3 : didWin > 0 ? 6 : 0;
  const handScore = choicePts(opp, outcome);
  const roundScore = winScore + handScore;

  score += roundScore;
}

console.log(score);
