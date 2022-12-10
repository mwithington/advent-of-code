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
    // console.log(commands);

    let cycle = 0;
    let storedCommand, execCommand;
    let X = new Register(1);
    const cycleCheckArray = [];

    let index = 0;
    const states = []
    while (index < commands.length) {
        cycle++;
        // console.log({cycle, value: X.value, index})
        states[cycle] =  X.value;

        const command = commands[index];
        // if(storedCommand == undefined){
        //     storedCommand = command;
        // } else {
            // console.log(command);
        if(command === COMMANDS.noop) {
            // storedCommand = undefined;
            // console.log('Do nothing');
        } else if (command.startsWith(COMMANDS.addx)) {
            if(storedCommand){
                const add = command.split(' ');
                X.value += parseInt(add[1]);
                storedCommand = undefined;

            } else {
                storedCommand = command;
                continue;
            }
            // const add = command.split(' ');
            // X.value += parseInt(add[1]);
            // cycle++;
        }
        // }
        index++;
        // break;
        // if(cycle == 20){
        //     break;
        // }
    }

    let sum = 0;

    for (let cycleCount = 20; cycleCount < states.length; cycleCount+=40) {
        // console.log(states[cycleCount]);
        // console.log(states[cycleCount] * cycleCount);
        sum +=  states[cycleCount] * cycleCount;
    }

    console.log(sum);


    // for (let index = 0; index < commands.length; index++) {
    //     const command = commands[index];
    //     if(storedCommand == undefined){
    //         storedCommand = command;
    //     } else {
    //         if(storedCommand === COMMANDS.noop) {
    //             storedCommand = undefined;
    //             continue;
    //         } else if (storedCommand.startsWith(COMMANDS.addx)) {
    //             const add = storedCommand.split(' ');
    //             X.value += parseInt(add[1]);
    //             storedCommand = undefined;
    //         }
    //     }
    //     cycle++;
    //     if(cycleCheckArray.indexOf(cycle) !== -1) {
    //         console.log({cycle, value: X.value})
    //     }
        
    // }
}

run();