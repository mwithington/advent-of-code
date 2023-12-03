const fs = require('fs');

const MAX_CUBE_COUNTS = {
  red: 12,
  green: 13,
  blue: 14
}


async function calibration() {
  let input = await fs.readFileSync('./input.txt');
  let replacedString = input.toString();

  const lines = replacedString.split('\n');
  lines.pop()
  let sum = 0;

  for(let i = 0; i < lines.length; i++ ) {
    // complicated way?

    const cubeCounts = lines[i].split(':')[1].trim()
    let isValid = false;
    // 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    // games[i] = cubeCounts

    const drawings = cubeCounts.split(';')
    const minReqCube = {}
    for (let d = 0; d < drawings.length; d++) {
      const round = drawings[d].split(',');

      for (let r = 0; r < round.length; r++) {
        const counts = round[r].trim().split(' ');
        const color = counts[1]
        const count = parseInt(counts[0])
        if(minReqCube[color] === undefined || minReqCube[color] < count) {
          minReqCube[color] = count
        }
      }
    }
    console.log('--------')
    console.log(minReqCube)
    const powerOfValues = Object.values(minReqCube).reduce((a,b)=>a*b)
    console.log(powerOfValues)
    sum+=powerOfValues;
  }
  return sum;
}

calibration().then((data)=>{
  console.log(data)
})

