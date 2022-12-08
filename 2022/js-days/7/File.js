class File {
    size;
    folder;

    constructor(size, folder){
        this.folder = folder;
        this.size = parseInt(size);
    }
}
module.exports = File;