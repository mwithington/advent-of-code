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

    let index = 0;
    const states = [];
    const window = [];
    let drawLine = '';
    while (index < commands.length) {
        const charChecker = (cycle % 40) - X.value;
        if(charChecker === 1 || charChecker == -1 || charChecker == 0 ) {
            drawLine+= '#';
        } else {
            drawLine+= '.';
        }

        cycle++;
        
        states[cycle] =  X.value;
        if(cycle % 40 === 0){
            window.push(drawLine);
            drawLine = ''; 
        }

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
    console.log(window);
}

run();