const input = await Deno.readTextFile("input.txt");
const lines = input.split("\n");

let score = 0;

// Rock: A X
// Paper: B Y
// Scissors: C Z

function winner(opp, me) {
  me = String.fromCharCode(me.charCodeAt() - 23);
  if (opp === me) return 0;
  if (opp === "A") {
    return me === "B" ? 1 : -1;
  } else if (opp === "B") {
    return me === "C" ? 1 : -1;
  } else if (opp === "C") {
    return me === "A" ? 1 : -1;
  }
}

for (const round of lines) {
  if (round === "") continue;
  const [opp, me] = round.split(" ");
  console.log(opp, me);
  const didWin = winner(opp, me);
  
  const winScore = didWin === 0 ? 3 : didWin > 0 ? 6 : 0;
  const handScore = me === "Y"? 2 : me === "X" ? 1 : 3;
  const roundScore = winScore + handScore;

  console.log(winScore, handScore);
  score += roundScore;

}

console.log(score);
