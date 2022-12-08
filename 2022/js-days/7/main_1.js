const fs = require('fs');
const Folder = require('./Folder');
const File = require('./File'); 

const DISK_SPACE = 70_000_000;
const DOWNLOAD_SIZE = 30_000_000;


function splitCommands(commands) {
    return commands.split('\n');
}

function getSmallestFolderForDeletion (folders, remainingSize) {
    let smallestDirSize = Number.MAX_SAFE_INTEGER;
    folders.forEach(folder => {
        if(folder.getSize()+remainingSize >= DOWNLOAD_SIZE && folder.getSize() <= smallestDirSize) {
            smallestDirSize = folder.getSize();
        }
    });
    return smallestDirSize;
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

    console.log(getSmallestFolderForDeletion(allFolders, DISK_SPACE - rootFolder.getSize()));
}

run();