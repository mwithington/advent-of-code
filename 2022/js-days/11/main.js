const fs = require('fs');

const MONKIES = [
    {
        items: [
            79,
            98
        ],
        test: 23,
        isTrue: 2,
        isFalse: 3,
        inspection: 0,
        operation: (old) => {
            return old * 19;
        }
    },
    {
        items: [
            54,
            65,
            75,
            74
        ],
        test: 19,
        isTrue: 2,
        isFalse: 0,
        inspection: 0,
        operation: (old) => {
            return old + 6;
        }
    },
    {
        items: [
            79,
            60,
            97
        ],
        test: 13,
        isTrue: 1,
        isFalse: 3,
        inspection: 0,
        operation: (old) => {
            return old * old;
        }
    },
    {
        items: [
            74
        ],
        test: 17,
        isTrue: 0,
        isFalse: 1,
        inspection: 0,
        operation: (old) => {
            return old + 3;
        }
    }
];

const MONKIESSample = [
    {
        items: [
            72,
            97
        ],
        test: 19,
        isTrue: 5,
        isFalse: 6,
        inspection: 0,
        operation: (old) => {
            return old * 13;
        }
    },
    {
        items: [
            55, 70, 90, 74, 95
        ],
        test: 7,
        isTrue: 5,
        isFalse: 0,
        inspection: 0,
        operation: (old) => {
            return old * old;
        }
    },
    {
        items: [
            74, 97, 66, 57
        ],
        test: 17,
        isTrue: 1,
        isFalse: 0,
        inspection: 0,
        operation: (old) => {
            return old + 6;
        }
    },
    {
        items: [
            86, 54, 53
        ],
        test: 13,
        isTrue: 1,
        isFalse: 2,
        inspection: 0,
        operation: (old) => {
            return old + 2;
        }
    },
    {
        items: [
            50, 65, 78, 50, 62, 99
        ],
        test: 11,
        isTrue: 3,
        isFalse: 7,
        inspection: 0,
        operation: (old) => {
            return old + 3;
        }
    },
    {
        items: [
            90
        ],
        test: 2,
        isTrue: 4,
        isFalse: 6,
        inspection: 0,
        operation: (old) => {
            return old + 4;
        }
    },
    {
        items: [
            88, 92, 63, 94, 96, 82, 53, 53
        ],
        test: 5,
        isTrue: 4,
        isFalse: 7,
        inspection: 0,
        operation: (old) => {
            return old + 8;
        }
    },
    {
        items: [
            70, 60, 71, 69, 77, 70, 98
        ],
        test: 3,
        isTrue: 2,
        isFalse: 3,
        inspection: 0,
        operation: (old) => {
            return old * 7;
        }
    }
]

const MAX_ROUNDS = 10000;

function buildMonkes(input) {

}

function run() {

    // const input = fs.readFileSync('./input.txt').toString();
    for (let rounds = 0; rounds < MAX_ROUNDS; rounds++) {

            for (let index = 0; index < MONKIES.length; index++) {
                const monke = MONKIES[index];
                while (monke.items.length > 0) {
                    monke.inspection++;
                    const currentItem = monke.items.shift();
                    // console.log(currentItem, monke);
                    let newWorry = monke.operation(currentItem);
                    if (newWorry === Infinity && currentItem){
                        console.log(currentItem % monke.test, rounds);
                        console.log(monke.operation.toString());
                        throw '888'
                    }
                    // newWorry = Math.floor(newWorry / 3);
                    if (newWorry % monke.test === 0) {
                        MONKIES[monke.isTrue].items.push(newWorry);
                    } else {
                        MONKIES[monke.isFalse].items.push(newWorry);
                    }
                }
            }
    }
    // console.log(MONKIES);
    const sortedMonkes = MONKIES.sort((a, b) => { return b.inspection - a.inspection });
    console.log(sortedMonkes, sortedMonkes[0].inspection * sortedMonkes[1].inspection);
}

run();