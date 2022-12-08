const fs = require('fs');
const Folder = require('./Folder');
const File = require('./File'); 

function splitCommands(commands) {
    return commands.split('\n');
}

function sumAll (folders) {
    let total = 0;
    folders.forEach(folder => {
        if(folder.getSize() < 100000) {
            total += folder.getSize();
        }
    });
    return total;
}


function run () {
    const file = fs.readFileSync('./input.txt');
    const input = file.toString();
    const commandList = splitCommands(input);
    const rootFolder = new Folder('/', undefined);
    let currentFolder = rootFolder;
    let allFolders = [rootFolder];
    let dirSize = 0;
    for (let index = 1; index < commandList.length; index++) {
        const item = commandList[index];
        switch (true) {
            case item.startsWith('$ ls'):
                // look for next input
                break;
            case item.startsWith('$ cd '):
                if(item.includes('..')) {
                    currentFolder = currentFolder.parent;
                } else {
                    // here -> there
                    currentFolder = currentFolder.folders.find((fold)=> {
                        if(fold.name === item.split(' ')[2]) {
                            return fold;
                        };
                    })
                }
                break;
            case item.startsWith('dir'):
                const folder = new Folder(item.split(' ')[1], currentFolder);
                currentFolder.folders.push(folder);
                allFolders.push(folder);
                break;
            default:
                const file = new File(item.split(' ')[0], currentFolder);
                currentFolder.files.push(file);
                break;
        }
    }

    console.log(rootFolder.getSize());
    console.log(sumAll(allFolders));
}

run();
// build object?
/**
 * /
 *  -a
 *  -b
 *      -c
 *      -d
 *          u
 */