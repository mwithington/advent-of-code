const fs = require('fs');

function splitItems (itemsList) {
    return itemsList.split('\n')
}

function sumCommonItems (charValue) {}

function run () {
    const file = fs.readFileSync('./input.txt');
    const input = file.toString();
    const itemsList = splitItems(input);
}
