const fs = require('fs');
const numbers = [
  ['one', 1],
  ['two', 2],
  ['three', 3],
  ['four', 4],
  ['five', 5],
  ['six', 6],
  ['seven', 7],
  ['eight', 8],
  ['nine', 9]
]

async function calibration() {
  let input = await fs.readFileSync('./input.txt');
  let replacedString = input.toString();
  for(let i = 0; i < numbers.length; i++) {
    replacedString = replacedString.replaceAll(numbers[i][0], numbers[i][1]);
  }
  console.log(replacedString)

  const lines = replacedString.split('\n');
  lines.pop()
  let sum = 0;

  for(let i = 0; i < lines.length; i++ ) {
    // Get only numbers from each line
    let replacedLine;
    for(let x=0; x< lines[i].length; x++) {

    }
    const numbersOnly = lines[i].replaceAll(new RegExp(/[^0-9.]/g), "")
    // look at the first and last of them
    // Join them
    // Parse them to an integer
    const joinedNumber = parseInt(numbersOnly[0] + numbersOnly[numbersOnly.length - 1])
    // Add them to sum
    sum += joinedNumber;
    if(i === lines.length - 1){
      console.log(joinedNumber, numbersOnly, lines[i])
    }

  }
  return sum;
}

calibration().then((data)=>{
  console.log(data)
})



