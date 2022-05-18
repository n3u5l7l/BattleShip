import Ship from "./ship.js";
class GameBoard {
  #playerShipInfo;
  #playerBoard;
  #enemyShipInfo;
  #enemyBoard;
  #playerTurn;
  #enemyTurn;

  constructor() {
    this.#playerTurn = true;
    this.#playerShipInfo = new Ship();
    this.#playerBoard = [];

    this.#enemyTurn = false;
    this.#enemyShipInfo = new Ship();
    this.#enemyBoard = [];

    for (let i = 0; i < 10; i++) {
      this.#playerBoard[i] = [];
      for (let j = 0; j < 10; j++) {
        this.#playerBoard[i].push("");
      }
    }

    for (let i = 0; i < 10; i++) {
      this.#enemyBoard[i] = [];
      for (let j = 0; j < 10; j++) {
        this.#enemyBoard[i].push("");
      }
    }
  }

  recieveAttack(x, y, target, haveRandomAttack) {
    const THIS_SHIP_INFO =
      target.parentNode.className === "playerBoard"
        ? this.#playerShipInfo
        : this.#enemyShipInfo;
    const THIS_BOARD =
      target.parentNode.className === "playerBoard"
        ? this.#playerBoard
        : this.#enemyBoard;
    this.switchTurn();
    if (THIS_BOARD[y][x] && THIS_BOARD[y][x].split("-").length === 3) {
      const thisShip = THIS_SHIP_INFO.getInfo[`${THIS_BOARD[y][x]}`];
      thisShip.length--;
      if (THIS_SHIP_INFO.isSunk(thisShip)) {
        this.destroySurroundings(THIS_BOARD[y][x], haveRandomAttack);
      }

      if (this.checkAllSunk(THIS_SHIP_INFO)) {
        if (target.parentNode.className === "playerBoard") {
          this.endGame("enemy");
        } else {
          this.endGame("player");
        }
      }
      return THIS_BOARD[y][x]; //notify computerAi to start doing smart moves
    }
    return false;
  }

  destroySurroundings(target, haveRandomAttack) {
    const shipSurroundings = [];
    const THIS_BOARD = this.#playerTurn ? "playerBoard" : "computerBoard";
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (
          this.#enemyTurn &&
          this.#enemyBoard[i][j].includes(`${target}-space`)
        ) {
          shipSurroundings.push({ x: j, y: i });
        } else if (
          this.#playerTurn &&
          this.#playerBoard[i][j].includes(`${target}-space`)
        ) {
          shipSurroundings.push({ x: j, y: i });
        }
      }
    }
    if (haveRandomAttack) {
      //if attack came from computerAi
      for (let i = 0; i < shipSurroundings.length; i++) {
        document
          .querySelector(
            `.${THIS_BOARD} > [data-y="${shipSurroundings[i].y}"][data-x="${shipSurroundings[i].x}"]`
          )
          .click();
        haveRandomAttack[shipSurroundings[i].y][shipSurroundings[i].x] = true;
      }
    } else {
      for (let i = 0; i < shipSurroundings.length; i++) {
        document
          .querySelector(
            `.${THIS_BOARD} > [data-y="${shipSurroundings[i].y}"][data-x="${shipSurroundings[i].x}"]`
          )
          .click();
      }
    }
  }

  assignPlayerShip(whatShip, count, xPos, yPos, isVertical) {
    this.#playerShipInfo.assign(whatShip, count, xPos, yPos, isVertical);
  }

  assignEnemyShip(whatShip, count, xPos, yPos, isVertical) {
    this.#enemyShipInfo.assign(whatShip, count, xPos, yPos, isVertical);
  }

  checkAllSunk(thisBoard) {
    for (let ship in thisBoard.getInfo) {
      if (thisBoard.getInfo[ship].length > 0) {
        return false;
      }
    }
    return true;
  }

  startGame() {
    document.querySelectorAll(".playerBoard > div").forEach((box) => {
      box.style.pointerEvents = "none";
    });
  }
  endGame(whowon) {
    if (whowon === "player") {
      document.querySelector(".whowon").textContent = "PLAYER WON!";
    } else {
      document.querySelector(".whowon").textContent = "ENEMY WON!";
    }
    document.querySelector(".finish").style.display = "flex";
    document.querySelector(".finish").clientHeight;
    document.querySelector(".finish").style.opacity = "1";
    
    document.querySelector(".mainContent").style.filter = "blur(4px)";
    document.querySelector(".mainContent").style.pointerEvents = "none";
  }

  switchTurn() {
    if (this.#playerTurn) {
      document.querySelector(".turns").textContent = "ENEMY TURN!";
      document.querySelectorAll(".playerBoard > div").forEach((box) => {
        box.style.pointerEvents = "";
      });
      document.querySelectorAll(".computerBoard > div").forEach((box) => {
        box.style.pointerEvents = "none";
      });
      this.#enemyTurn = true;
      this.#playerTurn = false;
    } else {
      document.querySelector(".turns").textContent = "PLAYER TURN!";
      document.querySelectorAll(".computerBoard > div").forEach((box) => {
        box.style.pointerEvents = "";
      });
      document.querySelectorAll(".playerBoard > div").forEach((box) => {
        box.style.pointerEvents = "none";
      });
      this.#enemyTurn = false;
      this.#playerTurn = true;
    }
  }

  updateBoard(y, x, whatBoard, content) {
    if (whatBoard === "playerBoard") {
      this.#playerBoard[y][x] += content;
    } else {
      this.#enemyBoard[y][x] += content;
    }
  }

  reset() {
    this.#playerTurn = true;
    this.#playerShipInfo = new Ship();
    this.#playerBoard = [];

    this.#enemyTurn = false;
    this.#enemyShipInfo = new Ship();
    this.#enemyBoard = [];

    for (let i = 0; i < 10; i++) {
      this.#playerBoard[i] = [];
      for (let j = 0; j < 10; j++) {
        this.#playerBoard[i].push("");
      }
    }

    for (let i = 0; i < 10; i++) {
      this.#enemyBoard[i] = [];
      for (let j = 0; j < 10; j++) {
        this.#enemyBoard[i].push("");
      }
    }
  }

  get whosTurn() {
    if (this.#playerTurn) {
      return "player";
    } else {
      return "enemy";
    }
  }

  get playerBoard() {
    return this.#playerBoard;
  }

  get computerBoard() {
    return this.#enemyBoard;
  }
}

export const gameBoard = new GameBoard();
