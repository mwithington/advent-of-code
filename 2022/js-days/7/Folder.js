class Folder {
    files = [];
    name;
    folders = [];
    parent;

    constructor(name, parent){
        this.name = name;
        this.parent = parent;
    }

    getSize() {
        let total = 0;

        this.files.forEach((file) => {
            total += file.size;
        });

        this.folders.forEach((folder) => {
            total += folder.getSize();
        });
        
        return total;
    }
}

module.exports = Folder;