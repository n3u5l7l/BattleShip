class Ship {
    #AllShips;
  
    constructor() {
      this.#AllShips = {
        "one-block-0": { length: 1 },
        "one-block-1": { length: 1 },
        "one-block-2": { length: 1 },
        "one-block-3": { length: 1 },
        "two-block-0": { length: 2, vertical: false },
        "two-block-1": { length: 2, vertical: false },
        "two-block-2": { length: 2, vertical: false },
        "three-block-0": { length: 3, vertical: false },
        "three-block-1": { length: 3, vertical: false },
        "four-block-0": { length: 4, vertical: false },
      };
    }
  
    isSunk(thisShip) {
      return !thisShip.length;
    }
  
    assign(whatShip, count, xPos, yPos, isVertical) {
      if (isVertical && this.#AllShips[whatShip].vertical !== undefined) {
        this.#AllShips[whatShip].vertical = true;
      }
      return Object.assign(this.#AllShips[whatShip], {
        [count]: { x: xPos, y: yPos },
      });
    }
  
    get getInfo() {
      return this.#AllShips;
    }
  }
  
  export default Ship;
  