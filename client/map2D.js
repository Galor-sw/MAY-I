

///////class TileMap

export default class TileMap {
    constructor(tileSize) {
      this.tileSize = tileSize;
      this.floor = this.#image("parquet.png")
      this.man = this.#image("m.png")
      this.woman = this.#image("w.png")
      this.table = this.#image("black-square.png")
      // this.table = this.#image("rectangle.png")
    //   this.dot = this.#image("yellowDot.png");
    //   this.ghost = this.#image("ghost.png");
    }
  
    #image(fileName) {
      const img = new Image();
      img.src = `images/${fileName}`;
      return img;
    }
  
    //0 - floor
    //1 - dots
    //2 - pacman
    //3 enemies

    map = [
      [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 3, 3, 0, 0],
      [1, 0, 2, 3, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0],
      [1, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 1, 1, 1, 1, 0, 0, 3, 1, 0, 0, 1, 0],
      [0, 0, 0, 2, 2, 2, 3, 0, 0, 3, 1, 0, 2, 1, 3],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 0, 0, 1, 0],
      [0, 0, 0, 2, 3, 2, 3, 0, 0, 0, 1, 0, 0, 1, 0],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 3, 0, 0],
      [2, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 1, 1, 0, 0],
      [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
    ];
  
    draw(canvas, ctx) {
      this.#setCanvasSize(canvas);
      this.#clearCanvas(canvas, ctx);
      this.#drawMap(ctx);
    }
  
    #drawMap(ctx) {
      for (let row = 0; row < this.map.length; row++) {
        for (let column = 0; column < this.map[row].length; column++) {
          const tile = this.map[row][column];
          let image = null;
          switch (tile) {
            case 0:
              image = this.floor;
              break;
            case 1:
              image = this.table;
              break;
            case 2:
              image = this.man;
              break;
            case 3:
              image = this.woman;
              // break;
          }
  
          if (image != null)
            ctx.drawImage(
              image,
              column * this.tileSize,
              row * this.tileSize,
              this.tileSize,
              this.tileSize
            );
        }
      }
    }
  
    #clearCanvas(canvas, ctx) {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  
    #setCanvasSize(canvas) {
      canvas.height = this.map.length * this.tileSize;
      canvas.width = this.map[0].length * this.tileSize;
    }
  }


  