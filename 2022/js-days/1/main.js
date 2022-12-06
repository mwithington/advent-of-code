const fs = require('fs');

function splitElves(elvesList) {
    return elvesList.split('\n\n');
}

function caloriesPerElf(elvesArray) {
    const elf = elvesArray.split('\n');
    return  elf
        .map( function(elt) {
            return /^\d+$/.test(elt) ? parseInt(elt) : 0; 
        })
        .reduce( function(a,b) { 
            return a+b
        });
}

function run() {
   const input = fs.readFileSync('./input.txt');
   const separatedElves = splitElves(input.toString());
   console.log(separatedElves);
   let bigBoy = 0;
   for (let index = 0; index < separatedElves.length-1; index++) {
    const elf_1 = caloriesPerElf(separatedElves[index]);
    const elf_2 = caloriesPerElf(separatedElves[index+1]);
    bigBoy = Math.max(bigBoy, elf_1, elf_2);
   }
}

run();