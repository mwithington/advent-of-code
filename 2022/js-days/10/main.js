const fs = require('fs');

const COMMANDS = {
    noop: 'noop',
    addx: 'addx'
}

function splitCommands(input) {
    return input.split('\n');
}

class Register {
    name;
    storedInstruction;
    value;
    constructor(value) {
        this.value = value;
    }
}

function run(){
    const input = fs.readFileSync('./input.txt').toString();
    const commands = splitCommands(input);
    let cycle = 0;
    let storedCommand, execCommand;
    let X = new Register(1);
    const cycleCheckArray = [];

    let index = 0;
    const states = []
    while (index < commands.length) {
        cycle++;
        states[cycle] =  X.value;

        const command = commands[index];
        if (command.startsWith(COMMANDS.addx)) {
            if(storedCommand){
                const add = command.split(' ');
                X.value += parseInt(add[1]);
                storedCommand = undefined;

            } else {
                storedCommand = command;
                continue;
            }
        }
        index++;
    }

    let sum = 0;

    for (let cycleCount = 20; cycleCount < states.length; cycleCount+=40) {
        sum +=  states[cycleCount] * cycleCount;
    }

    console.log(sum);
}

run();