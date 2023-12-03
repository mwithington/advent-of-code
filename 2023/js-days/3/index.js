const fs = require('fs');
const { Part } = require('./lib/part')

async function calibration() {
  let input = await fs.readFileSync('./input.txt');
  let replacedString = input.toString();

  const lines = replacedString.split('\n');
  lines.pop()
  let sum = 0;
  const parts = []

  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    for(let x = 0; x < line.length; x++ ) {
      const prev = parts.length === 0 ? undefined : parts[parts.length - 1]
      const part = new Part(x, y, line[x])
      if(prev) {
        prev.next = part
      }
      parts.push(part)
    }
  }

  for (let index = 0; index < parts.length; index++) {
    const part = parts[index];
    // loop to find full number and check each one for adjacent symbols != '.'
    let builtParts;
    let fullNumber;
    if(!part.isSymbol) {
      builtParts = getBuiltParts(part, []);
      if(hasValidAdjSymbol(builtParts, parts)) {
        fullNumber = getFullNumber(builtParts)
        if(builtParts[0].x === 0) {
          console.log(fullNumber)
        }
        sum+=fullNumber;
      }
      index += builtParts.length
    }
    // break;
  }

  // console.log(parts)
  return sum;
}

function getBuiltParts(part, numbers) {
  numbers.push(part)
  if(part.next.isSymbol || part.next.y === part.y + 1){
    // console.log(part.y)
    return numbers
  } else {
    return getBuiltParts(part.next, numbers)
  }
}

function getFullNumber (builtParts) {
  let fullNumber = ''
  builtParts.forEach((v) => {
    fullNumber += v.id
  })
  return parseInt(fullNumber)
}

function hasValidAdjSymbol(builtParts, parts) {
  // loop through parts if any have a valid symbol return early.
    // add this number to the total sum
  for (let p = 0; p < builtParts.length; p++) {
    const part = builtParts[p];
    // console.log(part)
    const found = parts.find((elem) => {
      // check all surrounding coords for any ids that !== '.' and isSymbol true
      if(elem.isSymbol && elem.id !== '.') {
        // console.log(elem.id)
        const isAdj = (elem.x === part.x - 1 && elem.y === part.y ) ||
          (elem.x === part.x + 1 && elem.y === part.y ) ||
          (elem.x === part.x && elem.y === part.y - 1 ) ||
          (elem.x === part.x && elem.y === part.y + 1 ) ||
          (elem.x === part.x - 1 && elem.y === part.y - 1 ) ||
          (elem.x === part.x + 1 && elem.y === part.y + 1 ) ||
          (elem.x === part.x - 1 && elem.y === part.y + 1 ) ||
          (elem.x === part.x + 1 && elem.y === part.y - 1 )
        if(isAdj) {
          return elem
        }
      }
    })
    if(found) {
      return true;
    }
  }
  return false;
}

calibration().then((data)=>{
  console.log(data)
})

