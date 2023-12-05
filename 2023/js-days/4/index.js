const fs = require('fs');

class Card {
  constructor(id, drawnNumbers, winningNumbers) {
    this.id = id;
    this.drawnNumbers = drawnNumbers;
    this.winningNumbers = winningNumbers;
  }
}

async function calibration() {
  let input = await fs.readFileSync('./input.txt');
  let replacedString = input.toString();
  // console.log(replacedString)

  const lines = replacedString.split('\n');
  console.log(lines)
  lines.pop()
  let sum = 0;

  for(let i = 0; i < lines.length; i++ ) {
    // first split the card in two with the ':' as a delimiter
    const game = lines[i].split(':')

    // from here we can split again on space for the first part to give us the ID of the game
    const cardId = game[0].split(' ')[1]

    // Next we can split on the '|' to get the set of drawn numbers and winning numbers
    const [dNumberString, wNumberString] = game[1].split('|');

    // process both strings by splitting them into parsed ints and into sorted arrays for easy double matching
    const winningNumbers = wNumberString.split(' ').map((v) => {
      if(v !== ''){
        return parseInt(v)
      }
    }).filter((val) => val !== undefined).sort((a, b)=> a - b)

    const drawnNumbers = dNumberString.split(' ').map((v) => {
      if(v !== ''){
        return parseInt(v)
      }
    }).filter((val) => val !== undefined).sort((a, b) => a - b)

    // Create Objects from them... maybe
    // Keep track of each Card points
    let cardSum = 0;
    // Find matching values with arrays if they match
    for (let num = 0; num < drawnNumbers.length; num++) {
      const dNum = drawnNumbers[num];
      // const wNum = winningNumbers[num];
      if(winningNumbers.includes(dNum)) {
        cardSum++
      }
    }
    sum+=Math.floor(Math.pow(2, cardSum-1));
  }
  return sum;
}

calibration().then((data)=>{
  console.log(data)
})

