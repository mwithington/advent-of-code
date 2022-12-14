const fs = require('fs');




function run () {
    const input = fs.readFileSync('./input.txt').toString();
    const packets = formatInput(input);
    for (let index = 0; index < packets.length; index++) {
        const packetGroup = packets[index];
        // check values
        // console.log(packetGroup[0])
        // console.log(getDepth(packetGroup[0], 0));
        // if (packetGroup[0].length == packetGroup[1].length) {
        //     console.log(packetGroup[0].toString(), packetGroup[1].toString());            
        // }
        compareArrays(packetGroup[0], packetGroup[1]);

        break;


        
    }
    console.log(packets);
}


function compareArrays(arr1, arr2) {

    for (let index = 0; index < arr1.length; index++) {
        const element1 = arr1[index];
        const element2 = arr2[index];
        console.log(element1, element2, getDepth(element1));
        if(getDepth(element1) === 0) {
            if(element1 > element2) {

            }
        }
        


        // if(arr[index] === undefined) {

        // }
        
    }
}

function getDepth (arr, depth) {
    if(arr[0] !== undefined) {
        return getDepth(arr[0], depth+1);
    }
    return depth;
}

// console.log(getDepth([[[[[[[]]]]]]], 0));

function formatInput(input) {
    const splitPackets = input.split('\n\n');
    // console.log(splitPackets[0]);

    const map = [];
    for (let group = 0; group < splitPackets.length; group++) {
        const items = splitPackets[group].split('\n');
        const innerMap = {};

        items.forEach((packet, i)=> {
            innerMap[i] = JSON.parse(packet);
        });

        map.push(innerMap);
    }

    return map;
}

run();