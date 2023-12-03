class Part {
  constructor(x, y, id, next) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.isSymbol = isNaN(id);
    this.next = next

  }
}


module.exports = { Part };
