const fs = require('fs');

const MAX_CUBE_COUNTS = {
  red: 12,
  green: 13,
  blue: 14
}


async function calibration() {
  let input = await fs.readFileSync('./test.txt');
  let replacedString = input.toString();
  // console.log(replacedString)

  const lines = replacedString.split('\n');
  console.log(lines)
  lines.pop()
  let sum = 0;
  const validGames = {};

  for(let i = 0; i < lines.length; i++ ) {
    // complicated way?

    const cubeCounts = lines[i].split(':')[1].trim()
    let isValid = false;
    // 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    // games[i] = cubeCounts

    const drawings = cubeCounts.split(';')
    for (let d = 0; d < drawings.length; d++) {
      const round = drawings[d].split(',');
      for (let r = 0; r < round.length; r++) {
        const counts = round[r].trim().split(' ');
        if (counts[0] > MAX_CUBE_COUNTS[counts[1]]) {
          console.log(`Game: ${i+1} is invalid`)
          isValid = false
          break;
        } else {
          console.log(`Game: ${i+1} is valid`)
          isValid = true
        }
      }
      if(!isValid) {
        break;
      }
    }
    if(isValid) {
      console.log(i+1)
      sum+=(i+1);
    }
  }
  return sum;
}

calibration().then((data)=>{
  console.log(data)
})

