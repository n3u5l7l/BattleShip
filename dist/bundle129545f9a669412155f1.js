/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/factories/GameBoard.js":
/*!************************************!*\
  !*** ./src/factories/GameBoard.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameBoard": () => (/* binding */ gameBoard)
/* harmony export */ });
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ "./src/factories/ship.js");

class GameBoard {
  #playerShipInfo;
  #playerBoard;
  #enemyShipInfo;
  #enemyBoard;
  #playerTurn;
  #enemyTurn;

  constructor() {
    this.#playerTurn = true;
    this.#playerShipInfo = new _ship_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.#playerBoard = [];

    this.#enemyTurn = false;
    this.#enemyShipInfo = new _ship_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
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
    this.#playerShipInfo = new _ship_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.#playerBoard = [];

    this.#enemyTurn = false;
    this.#enemyShipInfo = new _ship_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
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

const gameBoard = new GameBoard();


/***/ }),

/***/ "./src/factories/Player.js":
/*!*********************************!*\
  !*** ./src/factories/Player.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "enemy": () => (/* binding */ enemy),
/* harmony export */   "player": () => (/* binding */ player)
/* harmony export */ });
/* harmony import */ var _GameBoard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameBoard.js */ "./src/factories/GameBoard.js");

class Player {
  #gameBoard;
  #shipSpotted;
  #smartMoveOn;
  #foundDir;
  #foundDirMove;
  #foundDirLength;
  #alreadyHit;

  constructor(GameBoard) {
    if (!GameBoard) {
      throw new Error("Requires a gameboard class to initalize");
    }
    this.#gameBoard = GameBoard;
    this.#shipSpotted = false;
    this.#smartMoveOn = [];
    this.#foundDir = false;
    this.#foundDirMove = [];
    this.#foundDirLength = 0;
    this.#alreadyHit = [];

    for (let i = 0; i < 10; i++) {
      this.#alreadyHit[i] = [];
      for (let j = 0; j < 10; j++) {
        this.#alreadyHit[i].push(false);
      }
    }
  }

  attack(x, y, target) {
    this.#gameBoard.recieveAttack(Number(x), Number(y), target);
  }

  randomAttack() {
    let xPos = Math.floor(Math.random() * 100) % 10;
    let yPos = Math.floor(Math.random() * 100) % 10;

    while (
      this.#alreadyHit[yPos][xPos] &&
      (!this.#foundDir || !this.#shipSpotted)
    ) {
      xPos = Math.floor(Math.random() * 100) % 10;
      yPos = Math.floor(Math.random() * 100) % 10;
    }
    if (this.#foundDir) {
      this.startDemolish(); //third level of AI knowing the exact path
    } else if (this.#shipSpotted) {
      this.startSmartAttack(); //second level of AI finding ship and attack surrounding
    } else {
      this.randomAttackStart(xPos, yPos); //first level of AI randomly attacking
    }
  }

  randomAttackStart(xPos, yPos) {
    this.#alreadyHit[yPos][xPos] = true;
    const checkThisShip = document.querySelector(
      `.playerBoard > [data-y="${yPos}"][data-x="${xPos}"]`
    );
    checkThisShip.click();
    this.#shipSpotted = this.#gameBoard.recieveAttack(
      xPos,
      yPos,
      checkThisShip,
      this.#alreadyHit
    );

    if (
      checkThisShip.dataset.ship &&
      checkThisShip.dataset.ship.includes("one-block")
    ) {
      this.resetRandom();
      return;
    }

    if (this.#shipSpotted) {
      this.#foundDirLength++;
      this.#smartMoveOn.push({ x: xPos + 1, y: yPos, dir: "right" });
      this.#smartMoveOn.push({ x: xPos - 1, y: yPos, dir: "left" });
      this.#smartMoveOn.push({ x: xPos, y: yPos - 1, dir: "up" });
      this.#smartMoveOn.push({ x: xPos, y: yPos + 1, dir: "down" });
    }
  }

  startSmartAttack() {
    let hitThisPos = this.#smartMoveOn.pop();
    while (
      hitThisPos.y < 0 ||
      hitThisPos.y > 9 ||
      hitThisPos.x < 0 ||
      hitThisPos.x > 9 ||
      this.#alreadyHit[hitThisPos.y][hitThisPos.x]
    ) {
      hitThisPos = this.#smartMoveOn.pop();
      if (!hitThisPos) {
        break;
      }
    }

    this.#alreadyHit[hitThisPos.y][hitThisPos.x] = true;
    document
      .querySelector(
        `.playerBoard > [data-y="${hitThisPos.y}"][data-x="${hitThisPos.x}"]`
      )
      .click();

    if (
      this.#gameBoard.recieveAttack(
        hitThisPos.x,
        hitThisPos.y,
        document.querySelector(
          `.playerBoard > [data-y="${hitThisPos.y}"][data-x="${hitThisPos.x}"]`
        ),
        this.#alreadyHit
      )
    ) {
      this.#foundDirLength++;
      this.#smartMoveOn = [];
      if (this.#shipSpotted.includes("two") && this.#foundDirLength === 2) {
        this.resetRandom();
        return;
      }

      if (hitThisPos.dir === "right") {
        this.#foundDir = "right";
        this.#foundDirMove = { x: hitThisPos.x + 1, y: hitThisPos.y };
      } else if (hitThisPos.dir === "left") {
        this.#foundDir = "left";
        this.#foundDirMove = { x: hitThisPos.x - 1, y: hitThisPos.y };
      } else if (hitThisPos.dir === "up") {
        this.#foundDir = "up";
        this.#foundDirMove = { x: hitThisPos.x, y: hitThisPos.y - 1 };
      } else if (hitThisPos.dir === "down") {
        this.#foundDir = "down";
        this.#foundDirMove = { x: hitThisPos.x, y: hitThisPos.y + 1 };
      }
    }
  }

  startDemolish() {
    if (this.#foundDirMove.y < 0) {
      this.#foundDirMove.y = this.#foundDirMove.y + this.#foundDirLength + 1;
      this.#foundDir = "down";
    } else if (this.#foundDirMove.y > 9) {
      this.#foundDirMove.y = this.#foundDirMove.y - (this.#foundDirLength + 1);
      this.#foundDir = "up";
    } else if (this.#foundDirMove.x < 0) {
      this.#foundDirMove.x = this.#foundDirMove.x + this.#foundDirLength + 1;
      this.#foundDir = "right";
    } else if (this.#foundDirMove.x > 9) {
      this.#foundDirMove.x = this.#foundDirMove.x - (this.#foundDirLength + 1);
      this.#foundDir = "left";
    } else if (this.#alreadyHit[this.#foundDirMove.y][this.#foundDirMove.x]) {
      switch (this.#foundDir) {
        case "up":
          this.#foundDir = "down";
          this.#foundDirMove.y =
            this.#foundDirMove.y + this.#foundDirLength + 1;
          break;
        case "down":
          this.#foundDir = "up";
          this.#foundDirMove.y =
            this.#foundDirMove.y - (this.#foundDirLength + 1);
          break;
        case "right":
          this.#foundDir = "left";
          this.#foundDirMove.x =
            this.#foundDirMove.x - (this.#foundDirLength + 1);
          break;
        case "left":
          this.#foundDir = "right";
          this.#foundDirMove.x =
            this.#foundDirMove.x + this.#foundDirLength + 1;
          break;
      }
    }
    const box = document.querySelector(
      `.playerBoard > [data-y="${this.#foundDirMove.y}"][data-x="${
        this.#foundDirMove.x
      }"]`
    );
    box.click();
    this.#alreadyHit[this.#foundDirMove.y][this.#foundDirMove.x] = true;
    if (
      this.#gameBoard.recieveAttack(
        this.#foundDirMove.x,
        this.#foundDirMove.y,
        document.querySelector(
          `.playerBoard > [data-y="${this.#foundDirMove.y}"][data-x="${
            this.#foundDirMove.x
          }"]`
        ),
        this.#alreadyHit
      )
    ) {
      this.#foundDirLength++;
      if (
        (this.#shipSpotted.includes("four") && this.#foundDirLength === 4) ||
        (this.#shipSpotted.includes("three") && this.#foundDirLength === 3)
      ) {
        this.resetRandom();
        return;
      }
      if (this.#foundDir === "right") {
        this.#foundDirMove = {
          x: this.#foundDirMove.x + 1,
          y: this.#foundDirMove.y,
        };
      } else if (this.#foundDir === "left") {
        this.#foundDirMove = {
          x: this.#foundDirMove.x - 1,
          y: this.#foundDirMove.y,
        };
      } else if (this.#foundDir === "up") {
        this.#foundDirMove = {
          x: this.#foundDirMove.x,
          y: this.#foundDirMove.y - 1,
        };
      } else if (this.#foundDir === "down") {
        this.#foundDirMove = {
          x: this.#foundDirMove.x,
          y: this.#foundDirMove.y + 1,
        };
      }
    } else {
      if (
        (this.#shipSpotted.includes("four") && this.#foundDirLength !== 4) ||
        (this.#shipSpotted.includes("three") && this.#foundDirLength !== 3)
      ) {
        if (this.#foundDir === "left") {
          this.#foundDirMove = {
            x: this.#foundDirMove.x + this.#foundDirLength + 1,
            y: this.#foundDirMove.y,
          };
          this.#foundDir = "right";
        } else if (this.#foundDir === "right") {
          this.#foundDirMove = {
            x: this.#foundDirMove.x - (this.#foundDirLength + 1),
            y: this.#foundDirMove.y,
          };
          this.#foundDir = "left";
        } else if (this.#foundDir === "up") {
          this.#foundDirMove = {
            x: this.#foundDirMove.x,
            y: this.#foundDirMove.y + this.#foundDirLength + 1,
          };
          this.#foundDir = "down";
        } else if (this.#foundDir === "down") {
          this.#foundDirMove = {
            x: this.#foundDirMove.x,
            y: this.#foundDirMove.y - (this.#foundDirLength + 1),
          };
          this.#foundDir = "up";
        }
      }
    }
  }
  resetRandom() {
    this.#foundDir = false;
    this.#shipSpotted = false;
    this.#foundDirLength = 0;
    this.#foundDirMove = [];
  }

  reset() {
    this.#foundDir = false;
    this.#shipSpotted = false;
    this.#foundDirLength = 0;
    this.#foundDirMove = [];
    this.#alreadyHit = [];
    this.#smartMoveOn = [];
    for (let i = 0; i < 10; i++) {
      this.#alreadyHit[i] = [];
      for (let j = 0; j < 10; j++) {
        this.#alreadyHit[i].push(false);
      }
    }
  }
}

const player = new Player(_GameBoard_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard);
const enemy = new Player(_GameBoard_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard);

/***/ }),

/***/ "./src/factories/ship.js":
/*!*******************************!*\
  !*** ./src/factories/ship.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
  
  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);
  

/***/ }),

/***/ "./src/menu_helper/addShip.js":
/*!************************************!*\
  !*** ./src/menu_helper/addShip.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddingFourBlockShip": () => (/* binding */ AddingFourBlockShip),
/* harmony export */   "AddingOneBlockShip": () => (/* binding */ AddingOneBlockShip),
/* harmony export */   "AddingThreeBlockShip": () => (/* binding */ AddingThreeBlockShip),
/* harmony export */   "AddingTwoBlockShip": () => (/* binding */ AddingTwoBlockShip),
/* harmony export */   "currFour": () => (/* binding */ currFour),
/* harmony export */   "currOne": () => (/* binding */ currOne),
/* harmony export */   "currThree": () => (/* binding */ currThree),
/* harmony export */   "currTwo": () => (/* binding */ currTwo),
/* harmony export */   "shipUsed": () => (/* binding */ shipUsed),
/* harmony export */   "verticalCheck": () => (/* binding */ verticalCheck)
/* harmony export */ });
/* harmony import */ var _checkShipPlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkShipPlacement.js */ "./src/menu_helper/checkShipPlacement.js");
/* harmony import */ var _updateShip_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateShip.js */ "./src/menu_helper/updateShip.js");
/* harmony import */ var _generateShip_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./generateShip.js */ "./src/menu_helper/generateShip.js");
/* harmony import */ var _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../factories/GameBoard.js */ "./src/factories/GameBoard.js");
/* harmony import */ var _highlightShip_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./highlightShip.js */ "./src/menu_helper/highlightShip.js");
/* harmony import */ var _beginButton_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./beginButton.js */ "./src/menu_helper/beginButton.js");
/* harmony import */ var _factories_Player_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../factories/Player.js */ "./src/factories/Player.js");

  












let shipUsed = { count: 0 };
let currFour = true;
let currThree = false;
let currTwo = false;
let currOne = false;
const verticalCheck = { four: false, three: false, two: false };



function AddingFourBlockShip(x, y, whatBoard, event, vertical) {
const whereX = Number(x);
if (vertical) {
    const whereY = Number(y);

    if (whereY > 6) {
    return false;
    }

    if (!(0,_checkShipPlacement_js__WEBPACK_IMPORTED_MODULE_0__.checkFourPlacementVertically)(whereX, whereY, whatBoard)) {
    return false;
    }

    if (whatBoard === "playerBoard") {
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignPlayerShip("four-block-0", 0, whereX, whereY, true);
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignPlayerShip("four-block-0", 1, whereX, whereY + 1, true);
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignPlayerShip("four-block-0", 2, whereX, whereY + 2, true);
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignPlayerShip("four-block-0", 3, whereX, whereY + 3, true);
    } else {
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignEnemyShip("four-block-0", 0, whereX, whereY, true);
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignEnemyShip("four-block-0", 1, whereX, whereY + 1, true);
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignEnemyShip("four-block-0", 2, whereX, whereY + 2, true);
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignEnemyShip("four-block-0", 3, whereX, whereY + 3, true);
    }

    (0,_updateShip_js__WEBPACK_IMPORTED_MODULE_1__.updateFourBlockShipVertically)(whereX, whereY, whatBoard, _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard);
} else {
    const whereY = Number(y);
    if (whereX > 6) {
    return false;
    }

    if (!(0,_checkShipPlacement_js__WEBPACK_IMPORTED_MODULE_0__.checkFourPlacementHorizontal)(whereX, whereY, whatBoard)) {
    return false;
    }

    if (whatBoard === "playerBoard") {
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignPlayerShip("four-block-0", 0, whereX, whereY, false);
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignPlayerShip("four-block-0", 1, whereX + 1, whereY, false);
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignPlayerShip("four-block-0", 2, whereX + 2, whereY, false);
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignPlayerShip("four-block-0", 3, whereX + 3, whereY, false);
    } else {
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignEnemyShip("four-block-0", 0, whereX, whereY, false);
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignEnemyShip("four-block-0", 1, whereX + 1, whereY, false);
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignEnemyShip("four-block-0", 2, whereX + 2, whereY, false);
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignEnemyShip("four-block-0", 3, whereX + 3, whereY, false);
    }

    (0,_updateShip_js__WEBPACK_IMPORTED_MODULE_1__.updateFourBlockShip)(whereX, whereY, whatBoard, _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard);
}
if (whatBoard === "playerBoard" && event != "noEvent") {
    currFour = false;
    document.querySelector(".selectShip").textContent = "";
    document.querySelector(".whatOption").textContent =
    "Place your three-block ship";
    currThree = true;
    (0,_generateShip_js__WEBPACK_IMPORTED_MODULE_2__.generateThree)();
}
}

function AddingThreeBlockShip(x, y, whatBoard, event, vertical) {
const whereX = Number(x);

if (vertical) {
    const whereY = Number(y);

    if (whereY > 7) {
    return false;
    }

    if (!(0,_checkShipPlacement_js__WEBPACK_IMPORTED_MODULE_0__.checkThreePlacementVertically)(whereX, whereY, whatBoard)) {
    return false;
    }

    if (whatBoard === "playerBoard") {
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignPlayerShip(
        `three-block-${shipUsed.count}`,
        0,
        whereX,
        whereY,
        true
    );
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignPlayerShip(
        `three-block-${shipUsed.count}`,
        1,
        whereX,
        whereY + 1,
        true
    );
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignPlayerShip(
        `three-block-${shipUsed.count}`,
        2,
        whereX,
        whereY + 2,
        true
    );
    } else {
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignEnemyShip(
        `three-block-${shipUsed.count}`,
        0,
        whereX,
        whereY,
        true
    );
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignEnemyShip(
        `three-block-${shipUsed.count}`,
        1,
        whereX,
        whereY + 1,
        true
    );
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignEnemyShip(
        `three-block-${shipUsed.count}`,
        2,
        whereX,
        whereY + 2,
        true
    );
    }

    (0,_updateShip_js__WEBPACK_IMPORTED_MODULE_1__.updateThreeBlockShipVertically)(whereX, whereY, whatBoard, _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard);
    shipUsed.count++;
} else {
    const whereY = Number(y);

    if (whereX > 7) {
    return false;
    }
    if (!(0,_checkShipPlacement_js__WEBPACK_IMPORTED_MODULE_0__.checkThreePlacementHorizontal)(whereX, whereY, whatBoard)) {
    return false;
    }
    if (whatBoard === "playerBoard") {
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignPlayerShip(
        `three-block-${shipUsed.count}`,
        0,
        whereX,
        whereY,
        false
    );
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignPlayerShip(
        `three-block-${shipUsed.count}`,
        1,
        whereX + 1,
        whereY,
        false
    );
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignPlayerShip(
        `three-block-${shipUsed.count}`,
        2,
        whereX + 2,
        whereY,
        false
    );
    } else {
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignEnemyShip(
        `three-block-${shipUsed.count}`,
        0,
        whereX,
        whereY,
        false
    );
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignEnemyShip(
        `three-block-${shipUsed.count}`,
        1,
        whereX + 1,
        whereY,
        false
    );
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignEnemyShip(
        `three-block-${shipUsed.count}`,
        2,
        whereX + 2,
        whereY,
        false
    );
    }

    (0,_updateShip_js__WEBPACK_IMPORTED_MODULE_1__.updateThreeBlockShip)(whereX, whereY, whatBoard, _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard);
    shipUsed.count++;
}
if (whatBoard === "playerBoard" && event != "noEvent") {
    document
    .querySelector(`.${event.dataTransfer.getData("text")}`)
    .parentNode.removeChild(
        document.querySelector(`.${event.dataTransfer.getData("text")}`)
    );

    if (shipUsed.count === 2) {
    shipUsed.count = 0;
    currThree = false;
    document.querySelector(".selectShip").textContent = "";
    document.querySelector(".whatOption").textContent =
    "Place your two-block ship";
    (0,_generateShip_js__WEBPACK_IMPORTED_MODULE_2__.generateTwo)();
    currTwo = true;
    }
}
}

function AddingTwoBlockShip(x, y, whatBoard, event, vertical) {
const whereX = Number(x);

if (vertical) {
    const whereY = Number(y);

    if (whereY > 8) {
    return false;
    }
    if (!(0,_checkShipPlacement_js__WEBPACK_IMPORTED_MODULE_0__.checkTwoPlacementVertically)(whereX, whereY, whatBoard)) {
    return false;
    }
    if (whatBoard === "playerBoard") {
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignPlayerShip(
        `two-block-${shipUsed.count}`,
        0,
        whereX,
        whereY,
        true
    );
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignPlayerShip(
        `two-block-${shipUsed.count}`,
        1,
        whereX,
        whereY + 1,
        true
    );
    } else {
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignEnemyShip(
        `two-block-${shipUsed.count}`,
        0,
        whereX,
        whereY,
        true
    );
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignEnemyShip(
        `two-block-${shipUsed.count}`,
        1,
        whereX,
        whereY + 1,
        true
    );
    }
    (0,_updateShip_js__WEBPACK_IMPORTED_MODULE_1__.updateTwoBlockShipVertically)(whereX, whereY, whatBoard, _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard);
    shipUsed.count++;
} else {
    const whereY = Number(y);

    if (whereX > 8) {
    return false;
    }
    if (!(0,_checkShipPlacement_js__WEBPACK_IMPORTED_MODULE_0__.checkTwoPlacementHorizontal)(whereX, whereY, whatBoard)) {
    return false;
    }

    if (whatBoard === "playerBoard") {
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignPlayerShip(
        `two-block-${shipUsed.count}`,
        0,
        whereX,
        whereY,
        false
    );
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignPlayerShip(
        `two-block-${shipUsed.count}`,
        1,
        whereX + 1,
        whereY,
        false
    );
    } else {
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignEnemyShip(
        `two-block-${shipUsed.count}`,
        0,
        whereX,
        whereY,
        false
    );
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignEnemyShip(
        `two-block-${shipUsed.count}`,
        1,
        whereX + 1,
        whereY,
        false
    );
    }

    (0,_updateShip_js__WEBPACK_IMPORTED_MODULE_1__.updateTwoBlockShip)(whereX, whereY, whatBoard, _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard);
    shipUsed.count++;
}
if (whatBoard === "playerBoard" && event != "noEvent") {
    document
    .querySelector(`.${event.dataTransfer.getData("text")}`)
    .parentNode.removeChild(
        document.querySelector(`.${event.dataTransfer.getData("text")}`)
    );
    if (shipUsed.count === 3) {
    shipUsed.count = 0;
    currTwo = false;
    document.querySelector(".selectShip").textContent = "";
    document.querySelector(".whatOption").textContent =
    "Place your one-block ship";
    (0,_generateShip_js__WEBPACK_IMPORTED_MODULE_2__.generateOne)();
    currOne = true;
    }
}
}

function AddingOneBlockShip(x, y, whatBoard, event) {
const whereY = Number(y);
const whereX = Number(x);

if (!(0,_checkShipPlacement_js__WEBPACK_IMPORTED_MODULE_0__.checkOnePlacement)(whereX, whereY, whatBoard)) {
    return false;
}
if (whatBoard === "playerBoard") {
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignPlayerShip(
    `one-block-${shipUsed.count}`,
    0,
    whereX,
    whereY
    );
} else {
    _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.assignEnemyShip(`one-block-${shipUsed.count}`, 0, whereX, whereY);
}

(0,_updateShip_js__WEBPACK_IMPORTED_MODULE_1__.updateOneBlockShip)(whereX, whereY, whatBoard, _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard);
shipUsed.count++;

if (whatBoard === "playerBoard" && event != "noEvent") {
    document
    .querySelector(`.${event.dataTransfer.getData("text")}`)
    .parentNode.removeChild(
        document.querySelector(`.${event.dataTransfer.getData("text")}`)
    );
    if (shipUsed.count === 4) {
    shipUsed.count = 0;
    document.querySelector(".selectShip").textContent = "";
    (0,_beginButton_js__WEBPACK_IMPORTED_MODULE_5__.addBeginButton)();
    currOne = false;
    }
}
}

document.querySelector(".reset").addEventListener("click", function (e) {
e.preventDefault();
document.querySelector(".selectShip").textContent = "";

document.querySelectorAll("[data-ship]").forEach((box) => {
    delete box.dataset.ship;
});
document.querySelectorAll("[data-space]").forEach((box) => {
    delete box.dataset.space;
});

document.querySelectorAll(".active").forEach((box) => {
    box.classList.remove("active");
});

_factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_3__.gameBoard.reset();
_factories_Player_js__WEBPACK_IMPORTED_MODULE_6__.enemy.reset();

currFour = true;
currThree = false;
currTwo = false;
currOne = false;
verticalCheck.four = false;
verticalCheck.three = false;
verticalCheck.two = false;
shipUsed = { count: 0 };
(0,_generateShip_js__WEBPACK_IMPORTED_MODULE_2__.generateFour)();
});

/***/ }),

/***/ "./src/menu_helper/beginButton.js":
/*!****************************************!*\
  !*** ./src/menu_helper/beginButton.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addBeginButton": () => (/* binding */ addBeginButton)
/* harmony export */ });
/* harmony import */ var _randomizeShip_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./randomizeShip.js */ "./src/menu_helper/randomizeShip.js");
/* harmony import */ var _factories_Player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../factories/Player.js */ "./src/factories/Player.js");
/* harmony import */ var _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../factories/GameBoard.js */ "./src/factories/GameBoard.js");





function addBeginButton() {
  const startButton = document.createElement("button");
  startButton.classList.add("begin");
  startButton.textContent = "BEGIN";
  document.querySelector(".selectShip").appendChild(startButton);

  startButton.addEventListener(
    "click",
    function (e) {
      e.preventDefault();
      document.querySelector("form").style.display = "none";
      document.querySelector(".mainContent").style.display = "flex";
      document
        .querySelector(".playerBoardContainer")
        .appendChild(document.querySelector(".playerBoard"));
      (0,_randomizeShip_js__WEBPACK_IMPORTED_MODULE_0__.randomize)("computerBoard");
      addBoardEvents("playerBoard");
      addBoardEvents("computerBoard");
      _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_2__.gameBoard.startGame();
    },
    false
  );
}

function addBoardEvents(thisBoard) {
  function containShipBox(e) {
    this.removeEventListener("click", containShipBox);
    this.classList.add("shipAnimation");
    this.firstChild.style.display = "flex";
    this.firstChild.textContent = "✖";
    if (thisBoard === "computerBoard") {
      if (_factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_2__.gameBoard.whosTurn === "player") {
        _factories_Player_js__WEBPACK_IMPORTED_MODULE_1__.player.attack(e.target.dataset.x, e.target.dataset.y, e.target);
        setTimeout(() => {
          _factories_Player_js__WEBPACK_IMPORTED_MODULE_1__.enemy.randomAttack();
        }, 1000);
      }
    }
  }
  function noShipBox(e) {
    this.removeEventListener("click", noShipBox);
    this.classList.add("noShipAnimate");
    this.firstChild.style.display = "flex";
    this.firstChild.textContent = "⨷";
    this.firstChild.style.fontSize = "15px";
    if (thisBoard === "computerBoard") {
      if (_factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_2__.gameBoard.whosTurn === "player") {
        _factories_Player_js__WEBPACK_IMPORTED_MODULE_1__.player.attack(e.target.dataset.x, e.target.dataset.y, e.target);
        setTimeout(() => {
          _factories_Player_js__WEBPACK_IMPORTED_MODULE_1__.enemy.randomAttack();
        }, 1000);
      }
    }
  }
  document.querySelectorAll(`.${thisBoard} > .box`).forEach((box) => {
    if (
      _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_2__.gameBoard[`${thisBoard}`][box.dataset.y][box.dataset.x].split("-")
        .length === 3
    ) {
      box.addEventListener("click", containShipBox);
    } else {
      box.addEventListener("click", noShipBox);
    }
  });
}




/***/ }),

/***/ "./src/menu_helper/checkShipPlacement.js":
/*!***********************************************!*\
  !*** ./src/menu_helper/checkShipPlacement.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkFourPlacementHorizontal": () => (/* binding */ checkFourPlacementHorizontal),
/* harmony export */   "checkFourPlacementVertically": () => (/* binding */ checkFourPlacementVertically),
/* harmony export */   "checkOnePlacement": () => (/* binding */ checkOnePlacement),
/* harmony export */   "checkThreePlacementHorizontal": () => (/* binding */ checkThreePlacementHorizontal),
/* harmony export */   "checkThreePlacementVertically": () => (/* binding */ checkThreePlacementVertically),
/* harmony export */   "checkTwoPlacementHorizontal": () => (/* binding */ checkTwoPlacementHorizontal),
/* harmony export */   "checkTwoPlacementVertically": () => (/* binding */ checkTwoPlacementVertically)
/* harmony export */ });
/* harmony import */ var _factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factories/GameBoard.js */ "./src/factories/GameBoard.js");

function checkFourPlacementHorizontal(x, y, whatBoard) {
  return (
    !_factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard[whatBoard][y][x] &&
    !_factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard[whatBoard][y][x + 1] &&
    !_factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard[whatBoard][y][x + 2] &&
    !_factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard[whatBoard][y][x + 3]
  );
}
function checkFourPlacementVertically(x, y, whatBoard) {
  return (
    !_factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard[whatBoard][y][x] &&
    !_factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard[whatBoard][y + 1][x] &&
    !_factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard[whatBoard][y + 2][x] &&
    !_factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard[whatBoard][y + 3][x]
  );
}

function checkThreePlacementHorizontal(x, y, whatBoard) {
  return (
    !_factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard[whatBoard][y][x] &&
    !_factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard[whatBoard][y][x + 1] &&
    !_factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard[whatBoard][y][x + 2]
  );
}
function checkThreePlacementVertically(x, y, whatBoard) {
  return (
    !_factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard[whatBoard][y][x] &&
    !_factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard[whatBoard][y + 1][x] &&
    !_factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard[whatBoard][y + 2][x]
  );
}

function checkTwoPlacementHorizontal(x, y, whatBoard) {
  return !_factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard[whatBoard][y][x] && !_factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard[whatBoard][y][x + 1];
}

function checkTwoPlacementVertically(x, y, whatBoard) {
  return !_factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard[whatBoard][y][x] && !_factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard[whatBoard][y + 1][x];
}

function checkOnePlacement(x, y, whatBoard) {
  return !_factories_GameBoard_js__WEBPACK_IMPORTED_MODULE_0__.gameBoard[whatBoard][y][x];
}



/***/ }),

/***/ "./src/menu_helper/generateShip.js":
/*!*****************************************!*\
  !*** ./src/menu_helper/generateShip.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateFour": () => (/* binding */ generateFour),
/* harmony export */   "generateOne": () => (/* binding */ generateOne),
/* harmony export */   "generateThree": () => (/* binding */ generateThree),
/* harmony export */   "generateTwo": () => (/* binding */ generateTwo)
/* harmony export */ });
function generateFour() {
    const ship1 = document.createElement("div");
    ship1.classList.add("fourBlockShip");
  
    const box1 = document.createElement("div");
    const box2 = document.createElement("div");
    const box3 = document.createElement("div");
    const box4 = document.createElement("div");
  
    box1.classList.add("shipPart");
    box2.classList.add("shipPart");
    box3.classList.add("shipPart");
    box4.classList.add("shipPart");
  
    ship1.appendChild(box1);
    ship1.appendChild(box2);
    ship1.appendChild(box3);
    ship1.appendChild(box4);
  
    document.querySelector(".selectShip").appendChild(ship1);
  }
  
  function generateThree() {
    const ship1 = document.createElement("div");
    ship1.classList.add("threeBlockShip");
  
    const box1 = document.createElement("div");
    const box2 = document.createElement("div");
    const box3 = document.createElement("div");
  
    box1.classList.add("shipPart");
    box2.classList.add("shipPart");
    box3.classList.add("shipPart");
  
    ship1.appendChild(box1);
    ship1.appendChild(box2);
    ship1.appendChild(box3);
    ship1.draggable = "true";
  
    const ship2 = document.createElement("div");
    ship2.classList.add("threeBlockShip");
  
    const box4 = document.createElement("div");
    const box5 = document.createElement("div");
    const box6 = document.createElement("div");
  
    box4.classList.add("shipPart");
    box5.classList.add("shipPart");
    box6.classList.add("shipPart");
  
    ship2.appendChild(box4);
    ship2.appendChild(box5);
    ship2.appendChild(box6);
    ship2.draggable = "true";
  
    document.querySelector(".selectShip").appendChild(ship1);
    document.querySelector(".selectShip").appendChild(ship2);
  
    document.querySelectorAll(".selectShip > div").forEach((ship) =>
      ship.addEventListener(
        "dragstart",
        function (event) {
          event.dataTransfer.setData("text", event.target.className);
          event.target.style.opacity = "0.5";
        },
        false
      )
    );
  }
  
  function generateTwo() {
    const ship1 = document.createElement("div");
    ship1.classList.add("twoBlockShip");
  
    const box1 = document.createElement("div");
    const box2 = document.createElement("div");
  
    box1.classList.add("shipPart");
    box2.classList.add("shipPart");
  
    ship1.appendChild(box1);
    ship1.appendChild(box2);
    ship1.draggable = "true";
  
    const ship2 = document.createElement("div");
    ship2.classList.add("twoBlockShip");
  
    const box3 = document.createElement("div");
    const box4 = document.createElement("div");
  
    box3.classList.add("shipPart");
    box4.classList.add("shipPart");
  
    ship2.appendChild(box3);
    ship2.appendChild(box4);
    ship2.draggable = "true";
  
    const ship3 = document.createElement("div");
    ship3.classList.add("twoBlockShip");
  
    const box5 = document.createElement("div");
    const box6 = document.createElement("div");
  
    box5.classList.add("shipPart");
    box6.classList.add("shipPart");
  
    ship3.appendChild(box5);
    ship3.appendChild(box6);
    ship3.draggable = "true";
  
    document.querySelector(".selectShip").appendChild(ship1);
    document.querySelector(".selectShip").appendChild(ship2);
    document.querySelector(".selectShip").appendChild(ship3);
  
    document.querySelectorAll(".selectShip > div").forEach((ship) =>
      ship.addEventListener(
        "dragstart",
        function (event) {
          event.dataTransfer.setData("text", event.target.className);
          event.target.style.opacity = "0.5";
        },
        false
      )
    );
  }
  
  function generateOne() {
    const ship1 = document.createElement("div");
    ship1.classList.add("oneBlockShip");
  
    const box1 = document.createElement("div");
    box1.classList.add("shipPart");
  
    ship1.appendChild(box1);
    ship1.draggable = "true";
  
    const ship2 = document.createElement("div");
    ship2.classList.add("oneBlockShip");
  
    const box2 = document.createElement("div");
    box2.classList.add("shipPart");
  
    ship2.appendChild(box2);
    ship2.draggable = "true";
  
    const ship3 = document.createElement("div");
    ship3.classList.add("oneBlockShip");
  
    const box3 = document.createElement("div");
    box3.classList.add("shipPart");
  
    ship3.appendChild(box3);
    ship3.draggable = "true";
  
    const ship4 = document.createElement("div");
    ship4.classList.add("oneBlockShip");
  
    const box4 = document.createElement("div");
    box4.classList.add("shipPart");
  
    ship4.appendChild(box4);
    ship4.draggable = "true";
  
    document.querySelector(".selectShip").appendChild(ship1);
    document.querySelector(".selectShip").appendChild(ship2);
    document.querySelector(".selectShip").appendChild(ship3);
    document.querySelector(".selectShip").appendChild(ship4);
  
    document.querySelectorAll(".selectShip > div").forEach((ship) =>
      ship.addEventListener(
        "dragstart",
        function (event) {
          event.dataTransfer.setData("text", event.target.className);
          event.target.style.opacity = "0.5";
        },
        false
      )
    );
  }
  
  

/***/ }),

/***/ "./src/menu_helper/highlightShip.js":
/*!******************************************!*\
  !*** ./src/menu_helper/highlightShip.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "activeBox": () => (/* binding */ activeBox),
/* harmony export */   "errorBox": () => (/* binding */ errorBox),
/* harmony export */   "highlightFourBlockShip": () => (/* binding */ highlightFourBlockShip),
/* harmony export */   "highlightOneBlockShip": () => (/* binding */ highlightOneBlockShip),
/* harmony export */   "highlightThreeBlockShip": () => (/* binding */ highlightThreeBlockShip),
/* harmony export */   "highlightTwoBlockShip": () => (/* binding */ highlightTwoBlockShip)
/* harmony export */ });
/* harmony import */ var _checkShipPlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkShipPlacement.js */ "./src/menu_helper/checkShipPlacement.js");

  
const activeBox = document.getElementsByClassName("active");
const errorBox = document.getElementsByClassName("error");

function highlightFourBlockShip(event, fourVertical) {
const whereX = Number(event.target.dataset.x);

if (fourVertical) {
    Array.from(activeBox).forEach((active) => {
    active.classList.remove("active");
    });

    Array.from(errorBox).forEach((error) => {
    error.classList.remove("error");
    });

    const whereY = Number(event.target.dataset.y);

    if (whereY > 6) {
    event.target.classList.add("error");
    return false;
    }

    if (!(0,_checkShipPlacement_js__WEBPACK_IMPORTED_MODULE_0__.checkFourPlacementVertically)(whereX, whereY, "playerBoard")) {
    event.target.classList.add("error");
    return false;
    }
    event.target.classList.add("active");

    const secondBlock = document.querySelector(
    `[data-y="${whereY + 1}"][data-x="${whereX}"]`
    );
    const thirdBlock = document.querySelector(
    `[data-y="${whereY + 2}"][data-x="${whereX}"]`
    );
    const fourthBlock = document.querySelector(
    `[data-y="${whereY + 3}"][data-x="${whereX}"]`
    );

    secondBlock.classList.add("active");
    thirdBlock.classList.add("active");
    fourthBlock.classList.add("active");
} else {
    const whereY = Number(event.target.dataset.y);

    Array.from(activeBox).forEach((active) => {
    active.classList.remove("active");
    });

    Array.from(errorBox).forEach((error) => {
    error.classList.remove("error");
    });

    if (whereX > 6) {
    event.target.classList.add("error");
    return;
    }
    if (!(0,_checkShipPlacement_js__WEBPACK_IMPORTED_MODULE_0__.checkFourPlacementHorizontal)(whereX, whereY, "playerBoard")) {
    event.target.classList.add("error");
    return false;
    }
    event.target.classList.add("active");
    event.target.nextElementSibling.classList.add("active");
    event.target.nextElementSibling.nextElementSibling.classList.add("active");
    event.target.nextElementSibling.nextElementSibling.nextElementSibling.classList.add(
    "active"
    );
}
}
function highlightThreeBlockShip(event, threeVertical) {
const whereX = Number(event.target.dataset.x);

if (threeVertical) {
    Array.from(activeBox).forEach((active) => {
    active.classList.remove("active");
    });

    Array.from(errorBox).forEach((error) => {
    error.classList.remove("error");
    });
    const whereY = Number(event.target.dataset.y);

    if (whereY > 7) {
    event.target.classList.add("error");
    return;
    }
    if (
    !(0,_checkShipPlacement_js__WEBPACK_IMPORTED_MODULE_0__.checkThreePlacementVertically)(
        whereX,
        Number(event.target.dataset.y),
        "playerBoard"
    )
    ) {
    event.target.classList.add("error");
    return;
    }
    event.target.classList.add("active");

    const secondBlock = document.querySelector(
    `[data-y="${whereY + 1}"][data-x="${whereX}"]`
    );
    const thirdBlock = document.querySelector(
    `[data-y="${whereY + 2}"][data-x="${whereX}"]`
    );
    secondBlock.classList.add("active");
    thirdBlock.classList.add("active");
} else {
    const whereY = Number(event.target.dataset.y);

    Array.from(activeBox).forEach((active) => {
    active.classList.remove("active");
    });

    Array.from(errorBox).forEach((error) => {
    error.classList.remove("error");
    });

    if (whereX > 7) {
    event.target.classList.add("error");
    return;
    }
    if (!(0,_checkShipPlacement_js__WEBPACK_IMPORTED_MODULE_0__.checkThreePlacementHorizontal)(whereX, whereY, "playerBoard")) {
    event.target.classList.add("error");
    return;
    }

    event.target.classList.add("active");
    event.target.nextElementSibling.classList.add("active");
    event.target.nextElementSibling.nextElementSibling.classList.add("active");
}
}

function highlightTwoBlockShip(event, twoVertical) {
const whereX = Number(event.target.dataset.x);

if (twoVertical) {
    Array.from(activeBox).forEach((active) => {
    active.classList.remove("active");
    });

    Array.from(errorBox).forEach((error) => {
    error.classList.remove("error");
    });
    const whereY = Number(event.target.dataset.y);

    if (whereY > 8) {
    event.target.classList.add("error");
    return;
    }
    if (
    !(0,_checkShipPlacement_js__WEBPACK_IMPORTED_MODULE_0__.checkTwoPlacementVertically)(
        whereX,
        Number(event.target.dataset.y),
        "playerBoard"
    )
    ) {
    event.target.classList.add("error");
    return;
    }
    event.target.classList.add("active");

    const secondBlock = document.querySelector(
    `[data-y="${whereY + 1}"][data-x="${whereX}"]`
    );
    secondBlock.classList.add("active");
} else {
    const whereY = Number(event.target.dataset.y);

    Array.from(activeBox).forEach((active) => {
    active.classList.remove("active");
    });

    Array.from(errorBox).forEach((error) => {
    error.classList.remove("error");
    });

    if (whereX > 8) {
    event.target.classList.add("error");
    return;
    }
    if (!(0,_checkShipPlacement_js__WEBPACK_IMPORTED_MODULE_0__.checkTwoPlacementHorizontal)(whereX, whereY, "playerBoard")) {
    event.target.classList.add("error");
    return;
    }

    event.target.classList.add("active");
    event.target.nextElementSibling.classList.add("active");
}
}

function highlightOneBlockShip(event) {
const whereY = Number(event.target.dataset.y);
const whereX = Number(event.target.dataset.x);

Array.from(activeBox).forEach((active) => {
    active.clientHeight;
    active.classList.remove("active");
});

Array.from(errorBox).forEach((error) => {
    error.classList.remove("error");
});

if (whereX > 9) {
    event.target.classList.add("error");
    return;
}
if (!(0,_checkShipPlacement_js__WEBPACK_IMPORTED_MODULE_0__.checkOnePlacement)(whereX, whereY, "playerBoard")) {
    event.target.classList.add("error");
    return;
}

event.target.classList.add("active");
}




/***/ }),

/***/ "./src/menu_helper/randomizeShip.js":
/*!******************************************!*\
  !*** ./src/menu_helper/randomizeShip.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "randomize": () => (/* binding */ randomize)
/* harmony export */ });
/* harmony import */ var _addShip_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addShip.js */ "./src/menu_helper/addShip.js");



function randomize(whatBoard) {
    let isVertical = Math.floor(Math.random() * 100) % 2 === 0 ? true : false;
    let xPos;
    let yPos;
    let count = 0;
    while (count < 1) {
        if (isVertical) {
        xPos = Math.floor(Math.random() * 100) % 10;
        yPos = Math.floor(Math.random() * 100) % 7;
        if (
            (0,_addShip_js__WEBPACK_IMPORTED_MODULE_0__.AddingFourBlockShip)(xPos, yPos, whatBoard, "noEvent", isVertical) ===
            false
        ) {
            continue;
        }
        count++;
        } else {
        xPos = Math.floor(Math.random() * 100) % 7;
        yPos = Math.floor(Math.random() * 100) % 10;
        if (
            (0,_addShip_js__WEBPACK_IMPORTED_MODULE_0__.AddingFourBlockShip)(xPos, yPos, whatBoard, "noEvent", isVertical) ===
            false
        ) {
            continue;
        }
        count++;
        }
    }
    _addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count = 0;
    count = 0;
    isVertical = Math.floor(Math.random() * 100) % 2 === 0 ? true : false;
    while (count < 2) {
        if (isVertical) {
        xPos = Math.floor(Math.random() * 100) % 10;
        yPos = Math.floor(Math.random() * 100) % 8;
        if (
            (0,_addShip_js__WEBPACK_IMPORTED_MODULE_0__.AddingThreeBlockShip)(xPos, yPos, whatBoard, "noEvent", isVertical) ===
            false
        ) {
            continue;
        }
        count++;
        } else {
        xPos = Math.floor(Math.random() * 100) % 8;
        yPos = Math.floor(Math.random() * 100) % 10;
        if (
            (0,_addShip_js__WEBPACK_IMPORTED_MODULE_0__.AddingThreeBlockShip)(xPos, yPos, whatBoard, "noEvent", isVertical) ===
            false
        ) {
            continue;
        }
        count++;
        }
    }
    _addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count = 0;
    count = 0;
    isVertical = Math.floor(Math.random() * 100) % 2 === 0 ? true : false;
    while (count < 3) {
        if (isVertical) {
        xPos = Math.floor(Math.random() * 100) % 10;
        yPos = Math.floor(Math.random() * 100) % 9;
        if (
            (0,_addShip_js__WEBPACK_IMPORTED_MODULE_0__.AddingTwoBlockShip)(xPos, yPos, whatBoard, "noEvent", isVertical) ===
            false
        ) {
            continue;
        }
        count++;
        } else {
        xPos = Math.floor(Math.random() * 100) % 9;
        yPos = Math.floor(Math.random() * 100) % 10;
        if (
            (0,_addShip_js__WEBPACK_IMPORTED_MODULE_0__.AddingTwoBlockShip)(xPos, yPos, whatBoard, "noEvent", isVertical) ===
            false
        ) {
            continue;
        }
        count++;
        }
    }
    _addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count = 0;
    count = 0;
    isVertical = Math.floor(Math.random() * 100) % 2 === 0 ? true : false;
    while (count < 4) {
        if (isVertical) {
        xPos = Math.floor(Math.random() * 100) % 10;
        yPos = Math.floor(Math.random() * 100) % 10;
        if (
            (0,_addShip_js__WEBPACK_IMPORTED_MODULE_0__.AddingOneBlockShip)(xPos, yPos, whatBoard, "noEvent", isVertical) ===
            false
        ) {
            continue;
        }
        count++;
        } else {
        xPos = Math.floor(Math.random() * 100) % 10;
        yPos = Math.floor(Math.random() * 100) % 10;
        if (
            (0,_addShip_js__WEBPACK_IMPORTED_MODULE_0__.AddingOneBlockShip)(xPos, yPos, whatBoard, "noEvent", isVertical) ===
            false
        ) {
            continue;
        }
        count++;
        }
    }
    _addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count = 0;
}
  

/***/ }),

/***/ "./src/menu_helper/rotateShip.js":
/*!***************************************!*\
  !*** ./src/menu_helper/rotateShip.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "rotateFourBlockShip": () => (/* binding */ rotateFourBlockShip),
/* harmony export */   "rotateThreeBlockShip": () => (/* binding */ rotateThreeBlockShip),
/* harmony export */   "rotateTwoBlockShip": () => (/* binding */ rotateTwoBlockShip)
/* harmony export */ });
/* harmony import */ var _addShip_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addShip.js */ "./src/menu_helper/addShip.js");


function rotateFourBlockShip(gridColumns) {
  if (gridColumns === 4) {
    document.querySelector(".selectShip > div").style.gridTemplateColumns =
      "20px";
    document.querySelector(".selectShip > div").style.gridTemplateRows =
      "repeat(4, 20px)";
    _addShip_js__WEBPACK_IMPORTED_MODULE_0__.verticalCheck.four = true;
  } else {
    document.querySelector(".selectShip > div").style.gridTemplateColumns =
      "repeat(4, 20px)";
    document.querySelector(".selectShip > div").style.gridTemplateRows = "20px";
    _addShip_js__WEBPACK_IMPORTED_MODULE_0__.verticalCheck.four = false;
  }
}

function rotateThreeBlockShip(gridColumns) {
  if (gridColumns === 3) {
    document
      .querySelectorAll(".selectShip > div")
      .forEach((ship) => (ship.style.gridTemplateColumns = "20px"));
    document
      .querySelectorAll(".selectShip > div")
      .forEach((ship) => (ship.style.gridTemplateRows = "repeat(3, 20px)"));
    _addShip_js__WEBPACK_IMPORTED_MODULE_0__.verticalCheck.three = true;
  } else {
    document
      .querySelectorAll(".selectShip > div")
      .forEach((ship) => (ship.style.gridTemplateColumns = "repeat(3, 20px)"));
    document
      .querySelectorAll(".selectShip > div")
      .forEach((ship) => (ship.style.gridTemplateRows = "20px"));
    _addShip_js__WEBPACK_IMPORTED_MODULE_0__.verticalCheck.three = false;
  }
}

function rotateTwoBlockShip(gridColumns) {
  if (gridColumns === 2) {
    document
      .querySelectorAll(".selectShip > div")
      .forEach((ship) => (ship.style.gridTemplateColumns = "20px"));
    document
      .querySelectorAll(".selectShip > div")
      .forEach((ship) => (ship.style.gridTemplateRows = "repeat(2, 20px)"));
    _addShip_js__WEBPACK_IMPORTED_MODULE_0__.verticalCheck.two = true;
  } else {
    document
      .querySelectorAll(".selectShip > div")
      .forEach((ship) => (ship.style.gridTemplateColumns = "repeat(2, 20px)"));
    document
      .querySelectorAll(".selectShip > div")
      .forEach((ship) => (ship.style.gridTemplateRows = "20px"));
    _addShip_js__WEBPACK_IMPORTED_MODULE_0__.verticalCheck.two = false;
  }
}




/***/ }),

/***/ "./src/menu_helper/updateShip.js":
/*!***************************************!*\
  !*** ./src/menu_helper/updateShip.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateFourBlockShip": () => (/* binding */ updateFourBlockShip),
/* harmony export */   "updateFourBlockShipVertically": () => (/* binding */ updateFourBlockShipVertically),
/* harmony export */   "updateOneBlockShip": () => (/* binding */ updateOneBlockShip),
/* harmony export */   "updateThreeBlockShip": () => (/* binding */ updateThreeBlockShip),
/* harmony export */   "updateThreeBlockShipVertically": () => (/* binding */ updateThreeBlockShipVertically),
/* harmony export */   "updateTwoBlockShip": () => (/* binding */ updateTwoBlockShip),
/* harmony export */   "updateTwoBlockShipVertically": () => (/* binding */ updateTwoBlockShipVertically)
/* harmony export */ });
/* harmony import */ var _addShip_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addShip.js */ "./src/menu_helper/addShip.js");


function updateFourBlockShip(x, y, whatBoard, gameBoard) {
  if (whatBoard === "playerBoard") {
    const firstBlock = document.querySelector(
      `.${whatBoard} > [data-y="${y}"][data-x="${x}"]`
    );
    const secondBlock = document.querySelector(
      `.${whatBoard} > [data-y="${y}"][data-x="${x + 1}"]`
    );
    const thirdBlock = document.querySelector(
      `.${whatBoard} > [data-y="${y}"][data-x="${x + 2}"]`
    );
    const fourthBlock = document.querySelector(
      `.${whatBoard} > [data-y="${y}"][data-x="${x + 3}"]`
    );

    firstBlock.setAttribute("data-ship", "four-block-0");
    secondBlock.setAttribute("data-ship", "four-block-0");
    thirdBlock.setAttribute("data-ship", "four-block-0");
    fourthBlock.setAttribute("data-ship", "four-block-0");
  }
  gameBoard.updateBoard(y, x, whatBoard, "four-block-0");
  gameBoard.updateBoard(y, x + 1, whatBoard, "four-block-0");
  gameBoard.updateBoard(y, x + 2, whatBoard, "four-block-0");
  gameBoard.updateBoard(y, x + 3, whatBoard, "four-block-0");

  if (x === 0 && y === 0) {
    //check top left corner
    gameBoard.updateBoard(y + 1, x, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x + 2, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x + 3, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y, x + 4, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x + 4, whatBoard, "four-block-0-space");
  } else if (x === 6 && y === 0) {
    //check top right coner
    gameBoard.updateBoard(y, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x + 2, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x + 3, whatBoard, "four-block-0-space");
  } else if (x === 0 && y === 9) {
    //check bottom left corner
    gameBoard.updateBoard(y - 1, x, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x + 2, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x + 3, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x + 4, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y, x + 4, whatBoard, "four-block-0-space");
  } else if (x === 6 && y === 9) {
    //check bottom right corner
    gameBoard.updateBoard(y, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x + 2, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x + 3, whatBoard, "four-block-0-space");
  } else if (x === 0) {
    //check first column
    gameBoard.updateBoard(y - 1, x, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x + 2, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x + 2, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x + 3, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x + 3, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y, x + 4, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x + 4, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x + 4, whatBoard, "four-block-0-space");
  } else if (x === 6) {
    //check last colume;
    gameBoard.updateBoard(y, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x + 2, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x + 2, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x + 3, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x + 3, whatBoard, "four-block-0-space");
  } else if (y === 0) {
    //check first row
    gameBoard.updateBoard(y, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x + 2, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x + 3, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x + 4, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y, x + 4, whatBoard, "four-block-0-space");
  } else if (y === 9) {
    //check last row
    gameBoard.updateBoard(y, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x + 2, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x + 3, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x + 4, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y, x + 4, whatBoard, "four-block-0-space");
  } else {
    //check rest of the array
    gameBoard.updateBoard(y, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x + 2, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x + 2, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x + 3, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x + 3, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y, x + 4, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x + 4, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x + 4, whatBoard, "four-block-0-space");
  }
}
function updateFourBlockShipVertically(x, y, whatBoard, gameBoard) {
  if (whatBoard === "playerBoard") {
    const firstBlock = document.querySelector(
      `.${whatBoard} > [data-y="${y}"][data-x="${x}"]`
    );
    const secondBlock = document.querySelector(
      `.${whatBoard} > [data-y="${y + 1}"][data-x="${x}"]`
    );
    const thirdBlock = document.querySelector(
      `.${whatBoard} > [data-y="${y + 2}"][data-x="${x}"]`
    );
    const fourthBlock = document.querySelector(
      `.${whatBoard} > [data-y="${y + 3}"][data-x="${x}"]`
    );

    firstBlock.setAttribute("data-ship", "four-block-0");
    secondBlock.setAttribute("data-ship", "four-block-0");
    thirdBlock.setAttribute("data-ship", "four-block-0");
    fourthBlock.setAttribute("data-ship", "four-block-0");
  }
  gameBoard.updateBoard(y, x, whatBoard, "four-block-0");
  gameBoard.updateBoard(y + 1, x, whatBoard, "four-block-0");
  gameBoard.updateBoard(y + 2, x, whatBoard, "four-block-0");
  gameBoard.updateBoard(y + 3, x, whatBoard, "four-block-0");

  if (x === 0 && y === 0) {
    //check top left corner`
    gameBoard.updateBoard(y, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 2, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 3, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 4, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 4, x, whatBoard, "four-block-0-space");
  } else if (x === 9 && y === 0) {
    //check top right corner
    gameBoard.updateBoard(y, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 2, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 3, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 4, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 4, x, whatBoard, "four-block-0-space");
  } else if (x === 0 && y === 6) {
    //check bottom left corner
    gameBoard.updateBoard(y - 1, x, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 2, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 3, x + 1, whatBoard, "four-block-0-space");
  } else if (x === 9 && y === 6) {
    //check bottom right corner
    gameBoard.updateBoard(y - 1, x, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 2, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 3, x - 1, whatBoard, "four-block-0-space");
  } else if (x === 0) {
    //check first column
    gameBoard.updateBoard(y - 1, x, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 2, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 3, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 4, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 4, x, whatBoard, "four-block-0-space");
  } else if (x === 9) {
    //check last column
    gameBoard.updateBoard(y - 1, x, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 2, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 3, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 4, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 4, x, whatBoard, "four-block-0-space");
  } else if (y === 0) {
    //check first row
    gameBoard.updateBoard(y, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 2, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 2, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 3, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 3, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 4, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 4, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 4, x, whatBoard, "four-block-0-space");
  } else if (y === 6) {
    //check last row
    gameBoard.updateBoard(y - 1, x, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 2, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 2, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 3, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 3, x + 1, whatBoard, "four-block-0-space");
  } else {
    //check rest of the array
    gameBoard.updateBoard(y - 1, x, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y - 1, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 1, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 2, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 2, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 3, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 3, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 4, x - 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 4, x + 1, whatBoard, "four-block-0-space");
    gameBoard.updateBoard(y + 4, x, whatBoard, "four-block-0-space");
  }
}
function updateThreeBlockShip(x, y, whatBoard, gameBoard) {
  if (whatBoard === "playerBoard") {
    const firstBlock = document.querySelector(
      `.${whatBoard} > [data-y="${y}"][data-x="${x}"]`
    );
    const secondBlock = document.querySelector(
      `.${whatBoard} > [data-y="${y}"][data-x="${x + 1}"]`
    );
    const thirdBlock = document.querySelector(
      `.${whatBoard} > [data-y="${y}"][data-x="${x + 2}"]`
    );

    firstBlock.setAttribute("data-ship", `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}`);
    secondBlock.setAttribute("data-ship", `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}`);
    thirdBlock.setAttribute("data-ship", `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}`);
  }

  gameBoard.updateBoard(y, x, whatBoard, `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}`);
  gameBoard.updateBoard(y, x + 1, whatBoard, `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}`);
  gameBoard.updateBoard(y, x + 2, whatBoard, `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}`);

  if (x === 0 && y === 0) {
    //check top left corner
    gameBoard.updateBoard(
      y,
      x + 3,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 2,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 3,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (x === 7 && y === 0) {
    //check top right coner
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 2,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (x === 0 && y === 9) {
    //check bottom left corner
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 2,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 3,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 3,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (x === 7 && y === 9) {
    //check bottom right corner
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 2,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (x === 0) {
    //check first column
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 2,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 2,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 3,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 3,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 3,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (x === 7) {
    //check last column
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 2,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 2,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (y === 0) {
    //check first row
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 2,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 3,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 3,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (y === 9) {
    //check last row
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 2,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 3,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 3,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else {
    //check rest of the array
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 2,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 2,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 3,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 3,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 3,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  }
}
function updateThreeBlockShipVertically(x, y, whatBoard, gameBoard) {
  if (whatBoard === "playerBoard") {
    const firstBlock = document.querySelector(
      `.${whatBoard} > [data-y="${y}"][data-x="${x}"]`
    );
    const secondBlock = document.querySelector(
      `.${whatBoard} > [data-y="${y + 1}"][data-x="${x}"]`
    );
    const thirdBlock = document.querySelector(
      `.${whatBoard} > [data-y="${y + 2}"][data-x="${x}"]`
    );

    firstBlock.setAttribute("data-ship", `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}`);
    secondBlock.setAttribute("data-ship", `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}`);
    thirdBlock.setAttribute("data-ship", `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}`);
  }
  gameBoard.updateBoard(y, x, whatBoard, `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}`);
  gameBoard.updateBoard(y + 1, x, whatBoard, `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}`);
  gameBoard.updateBoard(y + 2, x, whatBoard, `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}`);

  if (x === 0 && y === 0) {
    //check top left corner
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 3,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 3,
      x,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (x === 9 && y === 0) {
    //check top right corner
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 3,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 3,
      x,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (x === 0 && y === 7) {
    //check bottom left corner
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (x === 9 && y === 7) {
    //check bottom right corner
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (x === 0) {
    //check first column
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 3,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 3,
      x,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (x === 9) {
    //check last column
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 3,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 3,
      x,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (y === 0) {
    //check first row
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 3,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 3,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 3,
      x,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (y === 7) {
    //check last row
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else {
    //check rest of the array
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 3,
      x - 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 3,
      x + 1,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 3,
      x,
      whatBoard,
      `three-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  }
}

function updateTwoBlockShip(x, y, whatBoard, gameBoard) {
  if (whatBoard === "playerBoard") {
    const firstBlock = document.querySelector(
      `.${whatBoard} > [data-y="${y}"][data-x="${x}"]`
    );
    const secondBlock = document.querySelector(
      `.${whatBoard} > [data-y="${y}"][data-x="${x + 1}"]`
    );

    firstBlock.setAttribute("data-ship", `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}`);
    secondBlock.setAttribute("data-ship", `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}`);
  }

  gameBoard.updateBoard(y, x, whatBoard, `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}`);
  gameBoard.updateBoard(y, x + 1, whatBoard, `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}`);

  if (x === 0 && y === 0) {
    //check top left corner
    gameBoard.updateBoard(
      y,
      x + 2,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 2,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (x === 8 && y === 0) {
    //check top right coner
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (x === 0 && y === 9) {
    //check bottom left corner
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 2,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 2,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (x === 8 && y === 9) {
    //check bottom right corner
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (x === 0) {
    //check first column
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 2,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 2,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 2,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (x === 8) {
    //check last column
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (y === 0) {
    //check first row
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 2,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 2,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (y === 9) {
    //check last row
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 2,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 2,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else {
    //check rest of the array
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 2,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 2,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 2,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  }
}

function updateTwoBlockShipVertically(x, y, whatBoard, gameBoard) {
  if (whatBoard === "playerBoard") {
    const firstBlock = document.querySelector(
      `.${whatBoard} > [data-y="${y}"][data-x="${x}"]`
    );
    const secondBlock = document.querySelector(
      `.${whatBoard} > [data-y="${y + 1}"][data-x="${x}"]`
    );

    firstBlock.setAttribute("data-ship", `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}`);
    secondBlock.setAttribute("data-ship", `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}`);
  }

  gameBoard.updateBoard(y, x, whatBoard, `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}`);
  gameBoard.updateBoard(y + 1, x, whatBoard, `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}`);

  if (x === 0 && y === 0) {
    //check top left corner
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (x === 9 && y === 0) {
    //check top right corner
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (x === 0 && y === 8) {
    //check bottom left corner
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (x === 9 && y === 8) {
    //check bottom right corner
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (x === 0) {
    //check first column
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (x === 9) {
    //check last column
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (y === 0) {
    //check first row
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (y === 8) {
    //check last row
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else {
    //check rest of the array
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x - 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x + 1,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x,
      whatBoard,
      `two-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  }
}

function updateOneBlockShip(x, y, whatBoard, gameBoard) {
  if (whatBoard === "playerBoard") {
    const firstBlock = document.querySelector(
      `.${whatBoard} > [data-y="${y}"][data-x="${x}"]`
    );

    firstBlock.setAttribute("data-ship", `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}`);
  }

  gameBoard.updateBoard(y, x, whatBoard, `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}`);

  if (x === 0 && y === 0) {
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (x === 9 && y === 0) {
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (x === 0 && y === 9) {
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (x === 9 && y === 9) {
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (x === 0) {
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (x === 9) {
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (y === 0) {
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else if (y === 9) {
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  } else {
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `one-block-${_addShip_js__WEBPACK_IMPORTED_MODULE_0__.shipUsed.count}-space`
    );
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _menu_helper_addShip_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu_helper/addShip.js */ "./src/menu_helper/addShip.js");
/* harmony import */ var _menu_helper_beginButton_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu_helper/beginButton.js */ "./src/menu_helper/beginButton.js");
/* harmony import */ var _menu_helper_generateShip_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu_helper/generateShip.js */ "./src/menu_helper/generateShip.js");
/* harmony import */ var _menu_helper_highlightShip_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./menu_helper/highlightShip.js */ "./src/menu_helper/highlightShip.js");
/* harmony import */ var _menu_helper_randomizeShip_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./menu_helper/randomizeShip.js */ "./src/menu_helper/randomizeShip.js");
/* harmony import */ var _menu_helper_rotateShip_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./menu_helper/rotateShip.js */ "./src/menu_helper/rotateShip.js");







document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
});

document.querySelectorAll(".selectShip > div").forEach((ship) =>
  ship.addEventListener(
    "dragstart",
    function (event) {
      event.dataTransfer.setData("text", event.target.className);
      event.target.style.opacity = "0.5";
    },
    false
  )
);

document.addEventListener(
  "dragend",
  function (event) {
    event.target.style.opacity = "";
    Array.from(_menu_helper_highlightShip_js__WEBPACK_IMPORTED_MODULE_3__.activeBox).forEach((active) => {
      active.classList.remove("active");
    });
  },
  false
);

document.addEventListener(
  "dragover",
  function (event) {
    // prevent default to allow drop
    event.preventDefault();
  },
  false
);

document.querySelector(".playerBoard").addEventListener(
  "dragenter",
  function (event) {
    // highlight potential drop target when the draggable element enters it
    if (_menu_helper_addShip_js__WEBPACK_IMPORTED_MODULE_0__.currFour) {
      (0,_menu_helper_highlightShip_js__WEBPACK_IMPORTED_MODULE_3__.highlightFourBlockShip)(event, _menu_helper_addShip_js__WEBPACK_IMPORTED_MODULE_0__.verticalCheck.four);
    } else if (_menu_helper_addShip_js__WEBPACK_IMPORTED_MODULE_0__.currThree) {
      (0,_menu_helper_highlightShip_js__WEBPACK_IMPORTED_MODULE_3__.highlightThreeBlockShip)(event, _menu_helper_addShip_js__WEBPACK_IMPORTED_MODULE_0__.verticalCheck.three);
    } else if (_menu_helper_addShip_js__WEBPACK_IMPORTED_MODULE_0__.currTwo) {
      (0,_menu_helper_highlightShip_js__WEBPACK_IMPORTED_MODULE_3__.highlightTwoBlockShip)(event, _menu_helper_addShip_js__WEBPACK_IMPORTED_MODULE_0__.verticalCheck.two);
    } else if (_menu_helper_addShip_js__WEBPACK_IMPORTED_MODULE_0__.currOne) {
      (0,_menu_helper_highlightShip_js__WEBPACK_IMPORTED_MODULE_3__.highlightOneBlockShip)(event);
    }
  },
  false
);

document.querySelector(".selectShip").addEventListener(
  //removes highlight if drag box go back
  "dragenter",
  function (event) {
    Array.from(_menu_helper_highlightShip_js__WEBPACK_IMPORTED_MODULE_3__.activeBox).forEach((active) => {
      active.classList.remove("active");
    });
  },
  false
);

document.querySelector(".playerBoard").addEventListener(
  "drop",
  function (event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    event.stopPropagation(); //prevent body drop event from triggering

    if (_menu_helper_addShip_js__WEBPACK_IMPORTED_MODULE_0__.currFour) {
      (0,_menu_helper_addShip_js__WEBPACK_IMPORTED_MODULE_0__.AddingFourBlockShip)(
        event.target.dataset.x,
        event.target.dataset.y,
        "playerBoard",
        event,
        _menu_helper_addShip_js__WEBPACK_IMPORTED_MODULE_0__.verticalCheck.four
      );
    } else if (_menu_helper_addShip_js__WEBPACK_IMPORTED_MODULE_0__.currThree) {
      (0,_menu_helper_addShip_js__WEBPACK_IMPORTED_MODULE_0__.AddingThreeBlockShip)(
        event.target.dataset.x,
        event.target.dataset.y,
        "playerBoard",
        event,
        _menu_helper_addShip_js__WEBPACK_IMPORTED_MODULE_0__.verticalCheck.three
      );
    } else if (_menu_helper_addShip_js__WEBPACK_IMPORTED_MODULE_0__.currTwo) {
      (0,_menu_helper_addShip_js__WEBPACK_IMPORTED_MODULE_0__.AddingTwoBlockShip)(
        event.target.dataset.x,
        event.target.dataset.y,
        "playerBoard",
        event,
        _menu_helper_addShip_js__WEBPACK_IMPORTED_MODULE_0__.verticalCheck.two
      );
    } else if (_menu_helper_addShip_js__WEBPACK_IMPORTED_MODULE_0__.currOne) {
      (0,_menu_helper_addShip_js__WEBPACK_IMPORTED_MODULE_0__.AddingOneBlockShip)(
        event.target.dataset.x,
        event.target.dataset.y,
        "playerBoard",
        event
      );
    }
    Array.from(_menu_helper_highlightShip_js__WEBPACK_IMPORTED_MODULE_3__.errorBox).forEach((error) => {
      error.classList.remove("error");
    });
  },
  false
);

document.querySelector("body").addEventListener(
  "drop",
  function (e) {
    Array.from(_menu_helper_highlightShip_js__WEBPACK_IMPORTED_MODULE_3__.errorBox).forEach((error) => {
      error.classList.remove("error");
    });
  },
  false
);

document.querySelector(".randomize").addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".reset").click();
  (0,_menu_helper_randomizeShip_js__WEBPACK_IMPORTED_MODULE_4__.randomize)("playerBoard");
  document.querySelector(".selectShip").textContent = "";
  (0,_menu_helper_beginButton_js__WEBPACK_IMPORTED_MODULE_1__.addBeginButton)();
});
document.querySelector(".rotate").addEventListener("click", function (e) {
  e.preventDefault();
  const getthis = document.querySelector(".selectShip > div");

  let gridColumns = getComputedStyle(getthis)
    .getPropertyValue("grid-template-columns")
    .split(" ").length;

  if (_menu_helper_addShip_js__WEBPACK_IMPORTED_MODULE_0__.currFour) {
    (0,_menu_helper_rotateShip_js__WEBPACK_IMPORTED_MODULE_5__.rotateFourBlockShip)(gridColumns);
  } else if (_menu_helper_addShip_js__WEBPACK_IMPORTED_MODULE_0__.currThree) {
    (0,_menu_helper_rotateShip_js__WEBPACK_IMPORTED_MODULE_5__.rotateThreeBlockShip)(gridColumns);
  } else if (_menu_helper_addShip_js__WEBPACK_IMPORTED_MODULE_0__.currTwo) {
    (0,_menu_helper_rotateShip_js__WEBPACK_IMPORTED_MODULE_5__.rotateTwoBlockShip)(gridColumns);
  }
});

function cleanBoxSymbol(boxes) {
  boxes.forEach((symbol) => {
    symbol.textContent = "";
    symbol.style.display = "none";
    symbol.removeAttribute("style");
  });
}
function cleanPlayerBoard() {
  const PLAYER_BOARD_BOXES = document.querySelectorAll(".playerBoard > .box");
  PLAYER_BOARD_BOXES.forEach((box) => {
    const newBox = box.cloneNode(true);
    box.parentNode.replaceChild(newBox, box);
    newBox.style.pointerEvents = "";
    Object.keys(newBox.dataset).forEach((key) => {
      if (key === "x" || key === "y") {
        return;
      }
      delete newBox.dataset[key];
    });
    newBox.className = "box";
    newBox.removeAttribute("style");
  });
  const PLAYER_BOARD_BOX_SYMBOL = document.querySelectorAll(
    ".playerBoard > .box > .symbol"
  );

  cleanBoxSymbol(PLAYER_BOARD_BOX_SYMBOL);
}

function cleanComputerBoard() {
  const COMPUTER_BOARD_BOXES = document.querySelectorAll(
    ".computerBoard > .box"
  );
  COMPUTER_BOARD_BOXES.forEach((box) => {
    box.className = "box";
    box.removeAttribute("style");
  });

  const COMPUTER_BOARD_BOXES_SYMBOL = document.querySelectorAll(
    ".computerBoard > .box > .symbol"
  );
  cleanBoxSymbol(COMPUTER_BOARD_BOXES_SYMBOL);

  const oldComputerBoard = document.querySelector(".computerBoard");
  const newComputerBoard = document
    .querySelector(".computerBoard")
    .cloneNode(true);
  document
    .querySelector(".computerBoardContainer")
    .replaceChild(newComputerBoard, oldComputerBoard);
}

document.querySelector(".restart").addEventListener(
  "click", 
  function (e) {
    document.querySelector(".reset").click();

    document.querySelector(".finish").style.display = "none";
    document.querySelector(".finish").style.opacity = "0";

    document.querySelector("form").style.display = "flex";
    document
      .querySelector("form")
      .insertBefore(
        document.querySelector(".playerBoard"),
        document.querySelector(".reset")
      );

    document.querySelector(".mainContent").style.display = "none";
    document.querySelector(".mainContent").style.filter = "";
    document.querySelector(".mainContent").style.pointerEvents = "";

    cleanPlayerBoard();

    cleanComputerBoard();
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLE1BQU0sOERBQVMsSUFBSSxVQUFVO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUUwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZFNEI7QUFDdEQ7QUFDQTtBQUNBLEtBQUssOERBQVM7QUFDZCxLQUFLLDhEQUFTO0FBQ2QsS0FBSyw4REFBUztBQUNkLEtBQUssOERBQVM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssOERBQVM7QUFDZCxLQUFLLDhEQUFTO0FBQ2QsS0FBSyw4REFBUztBQUNkLEtBQUssOERBQVM7QUFDZDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLLDhEQUFTO0FBQ2QsS0FBSyw4REFBUztBQUNkLEtBQUssOERBQVM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssOERBQVM7QUFDZCxLQUFLLDhEQUFTO0FBQ2QsS0FBSyw4REFBUztBQUNkO0FBQ0E7O0FBRUE7QUFDQSxVQUFVLDhEQUFTLHNCQUFzQiw4REFBUztBQUNsRDs7QUFFQTtBQUNBLFVBQVUsOERBQVMsc0JBQXNCLDhEQUFTO0FBQ2xEOztBQUVBO0FBQ0EsVUFBVSw4REFBUztBQUNuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLFdBQVcsYUFBYSxFQUFFLGFBQWEsRUFBRTtBQUNuRDtBQUNBO0FBQ0EsVUFBVSxXQUFXLGFBQWEsTUFBTSxhQUFhLEVBQUU7QUFDdkQ7QUFDQTtBQUNBLFVBQVUsV0FBVyxhQUFhLE1BQU0sYUFBYSxFQUFFO0FBQ3ZEO0FBQ0E7QUFDQSxVQUFVLFdBQVcsYUFBYSxNQUFNLGFBQWEsRUFBRTtBQUN2RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsV0FBVyxhQUFhLEVBQUUsYUFBYSxFQUFFO0FBQ25EO0FBQ0E7QUFDQSxVQUFVLFdBQVcsYUFBYSxFQUFFLGFBQWEsTUFBTTtBQUN2RDtBQUNBO0FBQ0EsVUFBVSxXQUFXLGFBQWEsRUFBRSxhQUFhLE1BQU07QUFDdkQ7O0FBRUEsd0RBQXdELHVEQUFjLENBQUM7QUFDdkUseURBQXlELHVEQUFjLENBQUM7QUFDeEUsd0RBQXdELHVEQUFjLENBQUM7QUFDdkU7O0FBRUEsd0RBQXdELHVEQUFjLENBQUM7QUFDdkUsNERBQTRELHVEQUFjLENBQUM7QUFDM0UsNERBQTRELHVEQUFjLENBQUM7O0FBRTNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsV0FBVyxhQUFhLEVBQUUsYUFBYSxFQUFFO0FBQ25EO0FBQ0E7QUFDQSxVQUFVLFdBQVcsYUFBYSxNQUFNLGFBQWEsRUFBRTtBQUN2RDtBQUNBO0FBQ0EsVUFBVSxXQUFXLGFBQWEsTUFBTSxhQUFhLEVBQUU7QUFDdkQ7O0FBRUEsd0RBQXdELHVEQUFjLENBQUM7QUFDdkUseURBQXlELHVEQUFjLENBQUM7QUFDeEUsd0RBQXdELHVEQUFjLENBQUM7QUFDdkU7QUFDQSx3REFBd0QsdURBQWMsQ0FBQztBQUN2RSw0REFBNEQsdURBQWMsQ0FBQztBQUMzRSw0REFBNEQsdURBQWMsQ0FBQzs7QUFFM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsV0FBVyxhQUFhLEVBQUUsYUFBYSxFQUFFO0FBQ25EO0FBQ0E7QUFDQSxVQUFVLFdBQVcsYUFBYSxFQUFFLGFBQWEsTUFBTTtBQUN2RDs7QUFFQSxzREFBc0QsdURBQWMsQ0FBQztBQUNyRSx1REFBdUQsdURBQWMsQ0FBQztBQUN0RTs7QUFFQSxzREFBc0QsdURBQWMsQ0FBQztBQUNyRSwwREFBMEQsdURBQWMsQ0FBQzs7QUFFekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsV0FBVyxhQUFhLEVBQUUsYUFBYSxFQUFFO0FBQ25EO0FBQ0E7QUFDQSxVQUFVLFdBQVcsYUFBYSxNQUFNLGFBQWEsRUFBRTtBQUN2RDs7QUFFQSxzREFBc0QsdURBQWMsQ0FBQztBQUNyRSx1REFBdUQsdURBQWMsQ0FBQztBQUN0RTs7QUFFQSxzREFBc0QsdURBQWMsQ0FBQztBQUNyRSwwREFBMEQsdURBQWMsQ0FBQzs7QUFFekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsV0FBVyxhQUFhLEVBQUUsYUFBYSxFQUFFO0FBQ25EOztBQUVBLHNEQUFzRCx1REFBYyxDQUFDO0FBQ3JFOztBQUVBLHNEQUFzRCx1REFBYyxDQUFDOztBQUVyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QTtBQUNBO0FBQ0EsUUFBUSxzRUFBaUI7QUFDekI7QUFDQSxNQUFNLFNBQVMsNERBQU87QUFDdEIsTUFBTSwyRUFBa0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxtRUFBUTtBQUN2QjtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG1FQUFRO0FBQ3ZCO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsd0VBQVM7QUFDWDtBQUNBLEVBQUUsMkVBQWM7QUFDaEIsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTSw2REFBUTtBQUNkLElBQUksK0VBQW1CO0FBQ3ZCLElBQUksU0FBUyw4REFBUztBQUN0QixJQUFJLGdGQUFvQjtBQUN4QixJQUFJLFNBQVMsNERBQU87QUFDcEIsSUFBSSw4RUFBa0I7QUFDdEI7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9HYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvUGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tZW51X2hlbHBlci9hZGRTaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbWVudV9oZWxwZXIvYmVnaW5CdXR0b24uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tZW51X2hlbHBlci9jaGVja1NoaXBQbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tZW51X2hlbHBlci9nZW5lcmF0ZVNoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tZW51X2hlbHBlci9oaWdobGlnaHRTaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbWVudV9oZWxwZXIvcmFuZG9taXplU2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21lbnVfaGVscGVyL3JvdGF0ZVNoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tZW51X2hlbHBlci91cGRhdGVTaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXAuanNcIjtcbmNsYXNzIEdhbWVCb2FyZCB7XG4gICNwbGF5ZXJTaGlwSW5mbztcbiAgI3BsYXllckJvYXJkO1xuICAjZW5lbXlTaGlwSW5mbztcbiAgI2VuZW15Qm9hcmQ7XG4gICNwbGF5ZXJUdXJuO1xuICAjZW5lbXlUdXJuO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuI3BsYXllclR1cm4gPSB0cnVlO1xuICAgIHRoaXMuI3BsYXllclNoaXBJbmZvID0gbmV3IFNoaXAoKTtcbiAgICB0aGlzLiNwbGF5ZXJCb2FyZCA9IFtdO1xuXG4gICAgdGhpcy4jZW5lbXlUdXJuID0gZmFsc2U7XG4gICAgdGhpcy4jZW5lbXlTaGlwSW5mbyA9IG5ldyBTaGlwKCk7XG4gICAgdGhpcy4jZW5lbXlCb2FyZCA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICB0aGlzLiNwbGF5ZXJCb2FyZFtpXSA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIHRoaXMuI3BsYXllckJvYXJkW2ldLnB1c2goXCJcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICB0aGlzLiNlbmVteUJvYXJkW2ldID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgdGhpcy4jZW5lbXlCb2FyZFtpXS5wdXNoKFwiXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlY2lldmVBdHRhY2soeCwgeSwgdGFyZ2V0LCBoYXZlUmFuZG9tQXR0YWNrKSB7XG4gICAgY29uc3QgVEhJU19TSElQX0lORk8gPVxuICAgICAgdGFyZ2V0LnBhcmVudE5vZGUuY2xhc3NOYW1lID09PSBcInBsYXllckJvYXJkXCJcbiAgICAgICAgPyB0aGlzLiNwbGF5ZXJTaGlwSW5mb1xuICAgICAgICA6IHRoaXMuI2VuZW15U2hpcEluZm87XG4gICAgY29uc3QgVEhJU19CT0FSRCA9XG4gICAgICB0YXJnZXQucGFyZW50Tm9kZS5jbGFzc05hbWUgPT09IFwicGxheWVyQm9hcmRcIlxuICAgICAgICA/IHRoaXMuI3BsYXllckJvYXJkXG4gICAgICAgIDogdGhpcy4jZW5lbXlCb2FyZDtcbiAgICB0aGlzLnN3aXRjaFR1cm4oKTtcbiAgICBpZiAoVEhJU19CT0FSRFt5XVt4XSAmJiBUSElTX0JPQVJEW3ldW3hdLnNwbGl0KFwiLVwiKS5sZW5ndGggPT09IDMpIHtcbiAgICAgIGNvbnN0IHRoaXNTaGlwID0gVEhJU19TSElQX0lORk8uZ2V0SW5mb1tgJHtUSElTX0JPQVJEW3ldW3hdfWBdO1xuICAgICAgdGhpc1NoaXAubGVuZ3RoLS07XG4gICAgICBpZiAoVEhJU19TSElQX0lORk8uaXNTdW5rKHRoaXNTaGlwKSkge1xuICAgICAgICB0aGlzLmRlc3Ryb3lTdXJyb3VuZGluZ3MoVEhJU19CT0FSRFt5XVt4XSwgaGF2ZVJhbmRvbUF0dGFjayk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNoZWNrQWxsU3VuayhUSElTX1NISVBfSU5GTykpIHtcbiAgICAgICAgaWYgKHRhcmdldC5wYXJlbnROb2RlLmNsYXNzTmFtZSA9PT0gXCJwbGF5ZXJCb2FyZFwiKSB7XG4gICAgICAgICAgdGhpcy5lbmRHYW1lKFwiZW5lbXlcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5lbmRHYW1lKFwicGxheWVyXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gVEhJU19CT0FSRFt5XVt4XTsgLy9ub3RpZnkgY29tcHV0ZXJBaSB0byBzdGFydCBkb2luZyBzbWFydCBtb3Zlc1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBkZXN0cm95U3Vycm91bmRpbmdzKHRhcmdldCwgaGF2ZVJhbmRvbUF0dGFjaykge1xuICAgIGNvbnN0IHNoaXBTdXJyb3VuZGluZ3MgPSBbXTtcbiAgICBjb25zdCBUSElTX0JPQVJEID0gdGhpcy4jcGxheWVyVHVybiA/IFwicGxheWVyQm9hcmRcIiA6IFwiY29tcHV0ZXJCb2FyZFwiO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLiNlbmVteVR1cm4gJiZcbiAgICAgICAgICB0aGlzLiNlbmVteUJvYXJkW2ldW2pdLmluY2x1ZGVzKGAke3RhcmdldH0tc3BhY2VgKVxuICAgICAgICApIHtcbiAgICAgICAgICBzaGlwU3Vycm91bmRpbmdzLnB1c2goeyB4OiBqLCB5OiBpIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIHRoaXMuI3BsYXllclR1cm4gJiZcbiAgICAgICAgICB0aGlzLiNwbGF5ZXJCb2FyZFtpXVtqXS5pbmNsdWRlcyhgJHt0YXJnZXR9LXNwYWNlYClcbiAgICAgICAgKSB7XG4gICAgICAgICAgc2hpcFN1cnJvdW5kaW5ncy5wdXNoKHsgeDogaiwgeTogaSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaGF2ZVJhbmRvbUF0dGFjaykge1xuICAgICAgLy9pZiBhdHRhY2sgY2FtZSBmcm9tIGNvbXB1dGVyQWlcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcFN1cnJvdW5kaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICBkb2N1bWVudFxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgYC4ke1RISVNfQk9BUkR9ID4gW2RhdGEteT1cIiR7c2hpcFN1cnJvdW5kaW5nc1tpXS55fVwiXVtkYXRhLXg9XCIke3NoaXBTdXJyb3VuZGluZ3NbaV0ueH1cIl1gXG4gICAgICAgICAgKVxuICAgICAgICAgIC5jbGljaygpO1xuICAgICAgICBoYXZlUmFuZG9tQXR0YWNrW3NoaXBTdXJyb3VuZGluZ3NbaV0ueV1bc2hpcFN1cnJvdW5kaW5nc1tpXS54XSA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcFN1cnJvdW5kaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICBkb2N1bWVudFxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgYC4ke1RISVNfQk9BUkR9ID4gW2RhdGEteT1cIiR7c2hpcFN1cnJvdW5kaW5nc1tpXS55fVwiXVtkYXRhLXg9XCIke3NoaXBTdXJyb3VuZGluZ3NbaV0ueH1cIl1gXG4gICAgICAgICAgKVxuICAgICAgICAgIC5jbGljaygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzc2lnblBsYXllclNoaXAod2hhdFNoaXAsIGNvdW50LCB4UG9zLCB5UG9zLCBpc1ZlcnRpY2FsKSB7XG4gICAgdGhpcy4jcGxheWVyU2hpcEluZm8uYXNzaWduKHdoYXRTaGlwLCBjb3VudCwgeFBvcywgeVBvcywgaXNWZXJ0aWNhbCk7XG4gIH1cblxuICBhc3NpZ25FbmVteVNoaXAod2hhdFNoaXAsIGNvdW50LCB4UG9zLCB5UG9zLCBpc1ZlcnRpY2FsKSB7XG4gICAgdGhpcy4jZW5lbXlTaGlwSW5mby5hc3NpZ24od2hhdFNoaXAsIGNvdW50LCB4UG9zLCB5UG9zLCBpc1ZlcnRpY2FsKTtcbiAgfVxuXG4gIGNoZWNrQWxsU3Vuayh0aGlzQm9hcmQpIHtcbiAgICBmb3IgKGxldCBzaGlwIGluIHRoaXNCb2FyZC5nZXRJbmZvKSB7XG4gICAgICBpZiAodGhpc0JvYXJkLmdldEluZm9bc2hpcF0ubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3RhcnRHYW1lKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxheWVyQm9hcmQgPiBkaXZcIikuZm9yRWFjaCgoYm94KSA9PiB7XG4gICAgICBib3guc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgIH0pO1xuICB9XG4gIGVuZEdhbWUod2hvd29uKSB7XG4gICAgaWYgKHdob3dvbiA9PT0gXCJwbGF5ZXJcIikge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aG93b25cIikudGV4dENvbnRlbnQgPSBcIlBMQVlFUiBXT04hXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2hvd29uXCIpLnRleHRDb250ZW50ID0gXCJFTkVNWSBXT04hXCI7XG4gICAgfVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmluaXNoXCIpLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZpbmlzaFwiKS5jbGllbnRIZWlnaHQ7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maW5pc2hcIikuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgIFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbkNvbnRlbnRcIikuc3R5bGUuZmlsdGVyID0gXCJibHVyKDRweClcIjtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW5Db250ZW50XCIpLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgfVxuXG4gIHN3aXRjaFR1cm4oKSB7XG4gICAgaWYgKHRoaXMuI3BsYXllclR1cm4pIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudHVybnNcIikudGV4dENvbnRlbnQgPSBcIkVORU1ZIFRVUk4hXCI7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYXllckJvYXJkID4gZGl2XCIpLmZvckVhY2goKGJveCkgPT4ge1xuICAgICAgICBib3guc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiXCI7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29tcHV0ZXJCb2FyZCA+IGRpdlwiKS5mb3JFYWNoKChib3gpID0+IHtcbiAgICAgICAgYm94LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgICAgIH0pO1xuICAgICAgdGhpcy4jZW5lbXlUdXJuID0gdHJ1ZTtcbiAgICAgIHRoaXMuI3BsYXllclR1cm4gPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50dXJuc1wiKS50ZXh0Q29udGVudCA9IFwiUExBWUVSIFRVUk4hXCI7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbXB1dGVyQm9hcmQgPiBkaXZcIikuZm9yRWFjaCgoYm94KSA9PiB7XG4gICAgICAgIGJveC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJcIjtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGF5ZXJCb2FyZCA+IGRpdlwiKS5mb3JFYWNoKChib3gpID0+IHtcbiAgICAgICAgYm94LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgICAgIH0pO1xuICAgICAgdGhpcy4jZW5lbXlUdXJuID0gZmFsc2U7XG4gICAgICB0aGlzLiNwbGF5ZXJUdXJuID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVCb2FyZCh5LCB4LCB3aGF0Qm9hcmQsIGNvbnRlbnQpIHtcbiAgICBpZiAod2hhdEJvYXJkID09PSBcInBsYXllckJvYXJkXCIpIHtcbiAgICAgIHRoaXMuI3BsYXllckJvYXJkW3ldW3hdICs9IGNvbnRlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuI2VuZW15Qm9hcmRbeV1beF0gKz0gY29udGVudDtcbiAgICB9XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLiNwbGF5ZXJUdXJuID0gdHJ1ZTtcbiAgICB0aGlzLiNwbGF5ZXJTaGlwSW5mbyA9IG5ldyBTaGlwKCk7XG4gICAgdGhpcy4jcGxheWVyQm9hcmQgPSBbXTtcblxuICAgIHRoaXMuI2VuZW15VHVybiA9IGZhbHNlO1xuICAgIHRoaXMuI2VuZW15U2hpcEluZm8gPSBuZXcgU2hpcCgpO1xuICAgIHRoaXMuI2VuZW15Qm9hcmQgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgdGhpcy4jcGxheWVyQm9hcmRbaV0gPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICB0aGlzLiNwbGF5ZXJCb2FyZFtpXS5wdXNoKFwiXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgdGhpcy4jZW5lbXlCb2FyZFtpXSA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIHRoaXMuI2VuZW15Qm9hcmRbaV0ucHVzaChcIlwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQgd2hvc1R1cm4oKSB7XG4gICAgaWYgKHRoaXMuI3BsYXllclR1cm4pIHtcbiAgICAgIHJldHVybiBcInBsYXllclwiO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gXCJlbmVteVwiO1xuICAgIH1cbiAgfVxuXG4gIGdldCBwbGF5ZXJCb2FyZCgpIHtcbiAgICByZXR1cm4gdGhpcy4jcGxheWVyQm9hcmQ7XG4gIH1cblxuICBnZXQgY29tcHV0ZXJCb2FyZCgpIHtcbiAgICByZXR1cm4gdGhpcy4jZW5lbXlCb2FyZDtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZ2FtZUJvYXJkID0gbmV3IEdhbWVCb2FyZCgpO1xuIiwiaW1wb3J0IHsgZ2FtZUJvYXJkIH0gZnJvbSBcIi4vR2FtZUJvYXJkLmpzXCI7XG5jbGFzcyBQbGF5ZXIge1xuICAjZ2FtZUJvYXJkO1xuICAjc2hpcFNwb3R0ZWQ7XG4gICNzbWFydE1vdmVPbjtcbiAgI2ZvdW5kRGlyO1xuICAjZm91bmREaXJNb3ZlO1xuICAjZm91bmREaXJMZW5ndGg7XG4gICNhbHJlYWR5SGl0O1xuXG4gIGNvbnN0cnVjdG9yKEdhbWVCb2FyZCkge1xuICAgIGlmICghR2FtZUJvYXJkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSZXF1aXJlcyBhIGdhbWVib2FyZCBjbGFzcyB0byBpbml0YWxpemVcIik7XG4gICAgfVxuICAgIHRoaXMuI2dhbWVCb2FyZCA9IEdhbWVCb2FyZDtcbiAgICB0aGlzLiNzaGlwU3BvdHRlZCA9IGZhbHNlO1xuICAgIHRoaXMuI3NtYXJ0TW92ZU9uID0gW107XG4gICAgdGhpcy4jZm91bmREaXIgPSBmYWxzZTtcbiAgICB0aGlzLiNmb3VuZERpck1vdmUgPSBbXTtcbiAgICB0aGlzLiNmb3VuZERpckxlbmd0aCA9IDA7XG4gICAgdGhpcy4jYWxyZWFkeUhpdCA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICB0aGlzLiNhbHJlYWR5SGl0W2ldID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgdGhpcy4jYWxyZWFkeUhpdFtpXS5wdXNoKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhdHRhY2soeCwgeSwgdGFyZ2V0KSB7XG4gICAgdGhpcy4jZ2FtZUJvYXJkLnJlY2lldmVBdHRhY2soTnVtYmVyKHgpLCBOdW1iZXIoeSksIHRhcmdldCk7XG4gIH1cblxuICByYW5kb21BdHRhY2soKSB7XG4gICAgbGV0IHhQb3MgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICUgMTA7XG4gICAgbGV0IHlQb3MgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICUgMTA7XG5cbiAgICB3aGlsZSAoXG4gICAgICB0aGlzLiNhbHJlYWR5SGl0W3lQb3NdW3hQb3NdICYmXG4gICAgICAoIXRoaXMuI2ZvdW5kRGlyIHx8ICF0aGlzLiNzaGlwU3BvdHRlZClcbiAgICApIHtcbiAgICAgIHhQb3MgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICUgMTA7XG4gICAgICB5UG9zID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSAlIDEwO1xuICAgIH1cbiAgICBpZiAodGhpcy4jZm91bmREaXIpIHtcbiAgICAgIHRoaXMuc3RhcnREZW1vbGlzaCgpOyAvL3RoaXJkIGxldmVsIG9mIEFJIGtub3dpbmcgdGhlIGV4YWN0IHBhdGhcbiAgICB9IGVsc2UgaWYgKHRoaXMuI3NoaXBTcG90dGVkKSB7XG4gICAgICB0aGlzLnN0YXJ0U21hcnRBdHRhY2soKTsgLy9zZWNvbmQgbGV2ZWwgb2YgQUkgZmluZGluZyBzaGlwIGFuZCBhdHRhY2sgc3Vycm91bmRpbmdcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yYW5kb21BdHRhY2tTdGFydCh4UG9zLCB5UG9zKTsgLy9maXJzdCBsZXZlbCBvZiBBSSByYW5kb21seSBhdHRhY2tpbmdcbiAgICB9XG4gIH1cblxuICByYW5kb21BdHRhY2tTdGFydCh4UG9zLCB5UG9zKSB7XG4gICAgdGhpcy4jYWxyZWFkeUhpdFt5UG9zXVt4UG9zXSA9IHRydWU7XG4gICAgY29uc3QgY2hlY2tUaGlzU2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLnBsYXllckJvYXJkID4gW2RhdGEteT1cIiR7eVBvc31cIl1bZGF0YS14PVwiJHt4UG9zfVwiXWBcbiAgICApO1xuICAgIGNoZWNrVGhpc1NoaXAuY2xpY2soKTtcbiAgICB0aGlzLiNzaGlwU3BvdHRlZCA9IHRoaXMuI2dhbWVCb2FyZC5yZWNpZXZlQXR0YWNrKFxuICAgICAgeFBvcyxcbiAgICAgIHlQb3MsXG4gICAgICBjaGVja1RoaXNTaGlwLFxuICAgICAgdGhpcy4jYWxyZWFkeUhpdFxuICAgICk7XG5cbiAgICBpZiAoXG4gICAgICBjaGVja1RoaXNTaGlwLmRhdGFzZXQuc2hpcCAmJlxuICAgICAgY2hlY2tUaGlzU2hpcC5kYXRhc2V0LnNoaXAuaW5jbHVkZXMoXCJvbmUtYmxvY2tcIilcbiAgICApIHtcbiAgICAgIHRoaXMucmVzZXRSYW5kb20oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy4jc2hpcFNwb3R0ZWQpIHtcbiAgICAgIHRoaXMuI2ZvdW5kRGlyTGVuZ3RoKys7XG4gICAgICB0aGlzLiNzbWFydE1vdmVPbi5wdXNoKHsgeDogeFBvcyArIDEsIHk6IHlQb3MsIGRpcjogXCJyaWdodFwiIH0pO1xuICAgICAgdGhpcy4jc21hcnRNb3ZlT24ucHVzaCh7IHg6IHhQb3MgLSAxLCB5OiB5UG9zLCBkaXI6IFwibGVmdFwiIH0pO1xuICAgICAgdGhpcy4jc21hcnRNb3ZlT24ucHVzaCh7IHg6IHhQb3MsIHk6IHlQb3MgLSAxLCBkaXI6IFwidXBcIiB9KTtcbiAgICAgIHRoaXMuI3NtYXJ0TW92ZU9uLnB1c2goeyB4OiB4UG9zLCB5OiB5UG9zICsgMSwgZGlyOiBcImRvd25cIiB9KTtcbiAgICB9XG4gIH1cblxuICBzdGFydFNtYXJ0QXR0YWNrKCkge1xuICAgIGxldCBoaXRUaGlzUG9zID0gdGhpcy4jc21hcnRNb3ZlT24ucG9wKCk7XG4gICAgd2hpbGUgKFxuICAgICAgaGl0VGhpc1Bvcy55IDwgMCB8fFxuICAgICAgaGl0VGhpc1Bvcy55ID4gOSB8fFxuICAgICAgaGl0VGhpc1Bvcy54IDwgMCB8fFxuICAgICAgaGl0VGhpc1Bvcy54ID4gOSB8fFxuICAgICAgdGhpcy4jYWxyZWFkeUhpdFtoaXRUaGlzUG9zLnldW2hpdFRoaXNQb3MueF1cbiAgICApIHtcbiAgICAgIGhpdFRoaXNQb3MgPSB0aGlzLiNzbWFydE1vdmVPbi5wb3AoKTtcbiAgICAgIGlmICghaGl0VGhpc1Bvcykge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLiNhbHJlYWR5SGl0W2hpdFRoaXNQb3MueV1baGl0VGhpc1Bvcy54XSA9IHRydWU7XG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgLnBsYXllckJvYXJkID4gW2RhdGEteT1cIiR7aGl0VGhpc1Bvcy55fVwiXVtkYXRhLXg9XCIke2hpdFRoaXNQb3MueH1cIl1gXG4gICAgICApXG4gICAgICAuY2xpY2soKTtcblxuICAgIGlmIChcbiAgICAgIHRoaXMuI2dhbWVCb2FyZC5yZWNpZXZlQXR0YWNrKFxuICAgICAgICBoaXRUaGlzUG9zLngsXG4gICAgICAgIGhpdFRoaXNQb3MueSxcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgLnBsYXllckJvYXJkID4gW2RhdGEteT1cIiR7aGl0VGhpc1Bvcy55fVwiXVtkYXRhLXg9XCIke2hpdFRoaXNQb3MueH1cIl1gXG4gICAgICAgICksXG4gICAgICAgIHRoaXMuI2FscmVhZHlIaXRcbiAgICAgIClcbiAgICApIHtcbiAgICAgIHRoaXMuI2ZvdW5kRGlyTGVuZ3RoKys7XG4gICAgICB0aGlzLiNzbWFydE1vdmVPbiA9IFtdO1xuICAgICAgaWYgKHRoaXMuI3NoaXBTcG90dGVkLmluY2x1ZGVzKFwidHdvXCIpICYmIHRoaXMuI2ZvdW5kRGlyTGVuZ3RoID09PSAyKSB7XG4gICAgICAgIHRoaXMucmVzZXRSYW5kb20oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoaGl0VGhpc1Bvcy5kaXIgPT09IFwicmlnaHRcIikge1xuICAgICAgICB0aGlzLiNmb3VuZERpciA9IFwicmlnaHRcIjtcbiAgICAgICAgdGhpcy4jZm91bmREaXJNb3ZlID0geyB4OiBoaXRUaGlzUG9zLnggKyAxLCB5OiBoaXRUaGlzUG9zLnkgfTtcbiAgICAgIH0gZWxzZSBpZiAoaGl0VGhpc1Bvcy5kaXIgPT09IFwibGVmdFwiKSB7XG4gICAgICAgIHRoaXMuI2ZvdW5kRGlyID0gXCJsZWZ0XCI7XG4gICAgICAgIHRoaXMuI2ZvdW5kRGlyTW92ZSA9IHsgeDogaGl0VGhpc1Bvcy54IC0gMSwgeTogaGl0VGhpc1Bvcy55IH07XG4gICAgICB9IGVsc2UgaWYgKGhpdFRoaXNQb3MuZGlyID09PSBcInVwXCIpIHtcbiAgICAgICAgdGhpcy4jZm91bmREaXIgPSBcInVwXCI7XG4gICAgICAgIHRoaXMuI2ZvdW5kRGlyTW92ZSA9IHsgeDogaGl0VGhpc1Bvcy54LCB5OiBoaXRUaGlzUG9zLnkgLSAxIH07XG4gICAgICB9IGVsc2UgaWYgKGhpdFRoaXNQb3MuZGlyID09PSBcImRvd25cIikge1xuICAgICAgICB0aGlzLiNmb3VuZERpciA9IFwiZG93blwiO1xuICAgICAgICB0aGlzLiNmb3VuZERpck1vdmUgPSB7IHg6IGhpdFRoaXNQb3MueCwgeTogaGl0VGhpc1Bvcy55ICsgMSB9O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXJ0RGVtb2xpc2goKSB7XG4gICAgaWYgKHRoaXMuI2ZvdW5kRGlyTW92ZS55IDwgMCkge1xuICAgICAgdGhpcy4jZm91bmREaXJNb3ZlLnkgPSB0aGlzLiNmb3VuZERpck1vdmUueSArIHRoaXMuI2ZvdW5kRGlyTGVuZ3RoICsgMTtcbiAgICAgIHRoaXMuI2ZvdW5kRGlyID0gXCJkb3duXCI7XG4gICAgfSBlbHNlIGlmICh0aGlzLiNmb3VuZERpck1vdmUueSA+IDkpIHtcbiAgICAgIHRoaXMuI2ZvdW5kRGlyTW92ZS55ID0gdGhpcy4jZm91bmREaXJNb3ZlLnkgLSAodGhpcy4jZm91bmREaXJMZW5ndGggKyAxKTtcbiAgICAgIHRoaXMuI2ZvdW5kRGlyID0gXCJ1cFwiO1xuICAgIH0gZWxzZSBpZiAodGhpcy4jZm91bmREaXJNb3ZlLnggPCAwKSB7XG4gICAgICB0aGlzLiNmb3VuZERpck1vdmUueCA9IHRoaXMuI2ZvdW5kRGlyTW92ZS54ICsgdGhpcy4jZm91bmREaXJMZW5ndGggKyAxO1xuICAgICAgdGhpcy4jZm91bmREaXIgPSBcInJpZ2h0XCI7XG4gICAgfSBlbHNlIGlmICh0aGlzLiNmb3VuZERpck1vdmUueCA+IDkpIHtcbiAgICAgIHRoaXMuI2ZvdW5kRGlyTW92ZS54ID0gdGhpcy4jZm91bmREaXJNb3ZlLnggLSAodGhpcy4jZm91bmREaXJMZW5ndGggKyAxKTtcbiAgICAgIHRoaXMuI2ZvdW5kRGlyID0gXCJsZWZ0XCI7XG4gICAgfSBlbHNlIGlmICh0aGlzLiNhbHJlYWR5SGl0W3RoaXMuI2ZvdW5kRGlyTW92ZS55XVt0aGlzLiNmb3VuZERpck1vdmUueF0pIHtcbiAgICAgIHN3aXRjaCAodGhpcy4jZm91bmREaXIpIHtcbiAgICAgICAgY2FzZSBcInVwXCI6XG4gICAgICAgICAgdGhpcy4jZm91bmREaXIgPSBcImRvd25cIjtcbiAgICAgICAgICB0aGlzLiNmb3VuZERpck1vdmUueSA9XG4gICAgICAgICAgICB0aGlzLiNmb3VuZERpck1vdmUueSArIHRoaXMuI2ZvdW5kRGlyTGVuZ3RoICsgMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImRvd25cIjpcbiAgICAgICAgICB0aGlzLiNmb3VuZERpciA9IFwidXBcIjtcbiAgICAgICAgICB0aGlzLiNmb3VuZERpck1vdmUueSA9XG4gICAgICAgICAgICB0aGlzLiNmb3VuZERpck1vdmUueSAtICh0aGlzLiNmb3VuZERpckxlbmd0aCArIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgICB0aGlzLiNmb3VuZERpciA9IFwibGVmdFwiO1xuICAgICAgICAgIHRoaXMuI2ZvdW5kRGlyTW92ZS54ID1cbiAgICAgICAgICAgIHRoaXMuI2ZvdW5kRGlyTW92ZS54IC0gKHRoaXMuI2ZvdW5kRGlyTGVuZ3RoICsgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgICAgdGhpcy4jZm91bmREaXIgPSBcInJpZ2h0XCI7XG4gICAgICAgICAgdGhpcy4jZm91bmREaXJNb3ZlLnggPVxuICAgICAgICAgICAgdGhpcy4jZm91bmREaXJNb3ZlLnggKyB0aGlzLiNmb3VuZERpckxlbmd0aCArIDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLnBsYXllckJvYXJkID4gW2RhdGEteT1cIiR7dGhpcy4jZm91bmREaXJNb3ZlLnl9XCJdW2RhdGEteD1cIiR7XG4gICAgICAgIHRoaXMuI2ZvdW5kRGlyTW92ZS54XG4gICAgICB9XCJdYFxuICAgICk7XG4gICAgYm94LmNsaWNrKCk7XG4gICAgdGhpcy4jYWxyZWFkeUhpdFt0aGlzLiNmb3VuZERpck1vdmUueV1bdGhpcy4jZm91bmREaXJNb3ZlLnhdID0gdHJ1ZTtcbiAgICBpZiAoXG4gICAgICB0aGlzLiNnYW1lQm9hcmQucmVjaWV2ZUF0dGFjayhcbiAgICAgICAgdGhpcy4jZm91bmREaXJNb3ZlLngsXG4gICAgICAgIHRoaXMuI2ZvdW5kRGlyTW92ZS55LFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAucGxheWVyQm9hcmQgPiBbZGF0YS15PVwiJHt0aGlzLiNmb3VuZERpck1vdmUueX1cIl1bZGF0YS14PVwiJHtcbiAgICAgICAgICAgIHRoaXMuI2ZvdW5kRGlyTW92ZS54XG4gICAgICAgICAgfVwiXWBcbiAgICAgICAgKSxcbiAgICAgICAgdGhpcy4jYWxyZWFkeUhpdFxuICAgICAgKVxuICAgICkge1xuICAgICAgdGhpcy4jZm91bmREaXJMZW5ndGgrKztcbiAgICAgIGlmIChcbiAgICAgICAgKHRoaXMuI3NoaXBTcG90dGVkLmluY2x1ZGVzKFwiZm91clwiKSAmJiB0aGlzLiNmb3VuZERpckxlbmd0aCA9PT0gNCkgfHxcbiAgICAgICAgKHRoaXMuI3NoaXBTcG90dGVkLmluY2x1ZGVzKFwidGhyZWVcIikgJiYgdGhpcy4jZm91bmREaXJMZW5ndGggPT09IDMpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5yZXNldFJhbmRvbSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodGhpcy4jZm91bmREaXIgPT09IFwicmlnaHRcIikge1xuICAgICAgICB0aGlzLiNmb3VuZERpck1vdmUgPSB7XG4gICAgICAgICAgeDogdGhpcy4jZm91bmREaXJNb3ZlLnggKyAxLFxuICAgICAgICAgIHk6IHRoaXMuI2ZvdW5kRGlyTW92ZS55LFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmICh0aGlzLiNmb3VuZERpciA9PT0gXCJsZWZ0XCIpIHtcbiAgICAgICAgdGhpcy4jZm91bmREaXJNb3ZlID0ge1xuICAgICAgICAgIHg6IHRoaXMuI2ZvdW5kRGlyTW92ZS54IC0gMSxcbiAgICAgICAgICB5OiB0aGlzLiNmb3VuZERpck1vdmUueSxcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy4jZm91bmREaXIgPT09IFwidXBcIikge1xuICAgICAgICB0aGlzLiNmb3VuZERpck1vdmUgPSB7XG4gICAgICAgICAgeDogdGhpcy4jZm91bmREaXJNb3ZlLngsXG4gICAgICAgICAgeTogdGhpcy4jZm91bmREaXJNb3ZlLnkgLSAxLFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmICh0aGlzLiNmb3VuZERpciA9PT0gXCJkb3duXCIpIHtcbiAgICAgICAgdGhpcy4jZm91bmREaXJNb3ZlID0ge1xuICAgICAgICAgIHg6IHRoaXMuI2ZvdW5kRGlyTW92ZS54LFxuICAgICAgICAgIHk6IHRoaXMuI2ZvdW5kRGlyTW92ZS55ICsgMSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKFxuICAgICAgICAodGhpcy4jc2hpcFNwb3R0ZWQuaW5jbHVkZXMoXCJmb3VyXCIpICYmIHRoaXMuI2ZvdW5kRGlyTGVuZ3RoICE9PSA0KSB8fFxuICAgICAgICAodGhpcy4jc2hpcFNwb3R0ZWQuaW5jbHVkZXMoXCJ0aHJlZVwiKSAmJiB0aGlzLiNmb3VuZERpckxlbmd0aCAhPT0gMylcbiAgICAgICkge1xuICAgICAgICBpZiAodGhpcy4jZm91bmREaXIgPT09IFwibGVmdFwiKSB7XG4gICAgICAgICAgdGhpcy4jZm91bmREaXJNb3ZlID0ge1xuICAgICAgICAgICAgeDogdGhpcy4jZm91bmREaXJNb3ZlLnggKyB0aGlzLiNmb3VuZERpckxlbmd0aCArIDEsXG4gICAgICAgICAgICB5OiB0aGlzLiNmb3VuZERpck1vdmUueSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRoaXMuI2ZvdW5kRGlyID0gXCJyaWdodFwiO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuI2ZvdW5kRGlyID09PSBcInJpZ2h0XCIpIHtcbiAgICAgICAgICB0aGlzLiNmb3VuZERpck1vdmUgPSB7XG4gICAgICAgICAgICB4OiB0aGlzLiNmb3VuZERpck1vdmUueCAtICh0aGlzLiNmb3VuZERpckxlbmd0aCArIDEpLFxuICAgICAgICAgICAgeTogdGhpcy4jZm91bmREaXJNb3ZlLnksXG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aGlzLiNmb3VuZERpciA9IFwibGVmdFwiO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuI2ZvdW5kRGlyID09PSBcInVwXCIpIHtcbiAgICAgICAgICB0aGlzLiNmb3VuZERpck1vdmUgPSB7XG4gICAgICAgICAgICB4OiB0aGlzLiNmb3VuZERpck1vdmUueCxcbiAgICAgICAgICAgIHk6IHRoaXMuI2ZvdW5kRGlyTW92ZS55ICsgdGhpcy4jZm91bmREaXJMZW5ndGggKyAxLFxuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy4jZm91bmREaXIgPSBcImRvd25cIjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLiNmb3VuZERpciA9PT0gXCJkb3duXCIpIHtcbiAgICAgICAgICB0aGlzLiNmb3VuZERpck1vdmUgPSB7XG4gICAgICAgICAgICB4OiB0aGlzLiNmb3VuZERpck1vdmUueCxcbiAgICAgICAgICAgIHk6IHRoaXMuI2ZvdW5kRGlyTW92ZS55IC0gKHRoaXMuI2ZvdW5kRGlyTGVuZ3RoICsgMSksXG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aGlzLiNmb3VuZERpciA9IFwidXBcIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXNldFJhbmRvbSgpIHtcbiAgICB0aGlzLiNmb3VuZERpciA9IGZhbHNlO1xuICAgIHRoaXMuI3NoaXBTcG90dGVkID0gZmFsc2U7XG4gICAgdGhpcy4jZm91bmREaXJMZW5ndGggPSAwO1xuICAgIHRoaXMuI2ZvdW5kRGlyTW92ZSA9IFtdO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy4jZm91bmREaXIgPSBmYWxzZTtcbiAgICB0aGlzLiNzaGlwU3BvdHRlZCA9IGZhbHNlO1xuICAgIHRoaXMuI2ZvdW5kRGlyTGVuZ3RoID0gMDtcbiAgICB0aGlzLiNmb3VuZERpck1vdmUgPSBbXTtcbiAgICB0aGlzLiNhbHJlYWR5SGl0ID0gW107XG4gICAgdGhpcy4jc21hcnRNb3ZlT24gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIHRoaXMuI2FscmVhZHlIaXRbaV0gPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICB0aGlzLiNhbHJlYWR5SGl0W2ldLnB1c2goZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgcGxheWVyID0gbmV3IFBsYXllcihnYW1lQm9hcmQpO1xuZXhwb3J0IGNvbnN0IGVuZW15ID0gbmV3IFBsYXllcihnYW1lQm9hcmQpOyIsImNsYXNzIFNoaXAge1xuICAgICNBbGxTaGlwcztcbiAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICB0aGlzLiNBbGxTaGlwcyA9IHtcbiAgICAgICAgXCJvbmUtYmxvY2stMFwiOiB7IGxlbmd0aDogMSB9LFxuICAgICAgICBcIm9uZS1ibG9jay0xXCI6IHsgbGVuZ3RoOiAxIH0sXG4gICAgICAgIFwib25lLWJsb2NrLTJcIjogeyBsZW5ndGg6IDEgfSxcbiAgICAgICAgXCJvbmUtYmxvY2stM1wiOiB7IGxlbmd0aDogMSB9LFxuICAgICAgICBcInR3by1ibG9jay0wXCI6IHsgbGVuZ3RoOiAyLCB2ZXJ0aWNhbDogZmFsc2UgfSxcbiAgICAgICAgXCJ0d28tYmxvY2stMVwiOiB7IGxlbmd0aDogMiwgdmVydGljYWw6IGZhbHNlIH0sXG4gICAgICAgIFwidHdvLWJsb2NrLTJcIjogeyBsZW5ndGg6IDIsIHZlcnRpY2FsOiBmYWxzZSB9LFxuICAgICAgICBcInRocmVlLWJsb2NrLTBcIjogeyBsZW5ndGg6IDMsIHZlcnRpY2FsOiBmYWxzZSB9LFxuICAgICAgICBcInRocmVlLWJsb2NrLTFcIjogeyBsZW5ndGg6IDMsIHZlcnRpY2FsOiBmYWxzZSB9LFxuICAgICAgICBcImZvdXItYmxvY2stMFwiOiB7IGxlbmd0aDogNCwgdmVydGljYWw6IGZhbHNlIH0sXG4gICAgICB9O1xuICAgIH1cbiAgXG4gICAgaXNTdW5rKHRoaXNTaGlwKSB7XG4gICAgICByZXR1cm4gIXRoaXNTaGlwLmxlbmd0aDtcbiAgICB9XG4gIFxuICAgIGFzc2lnbih3aGF0U2hpcCwgY291bnQsIHhQb3MsIHlQb3MsIGlzVmVydGljYWwpIHtcbiAgICAgIGlmIChpc1ZlcnRpY2FsICYmIHRoaXMuI0FsbFNoaXBzW3doYXRTaGlwXS52ZXJ0aWNhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuI0FsbFNoaXBzW3doYXRTaGlwXS52ZXJ0aWNhbCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih0aGlzLiNBbGxTaGlwc1t3aGF0U2hpcF0sIHtcbiAgICAgICAgW2NvdW50XTogeyB4OiB4UG9zLCB5OiB5UG9zIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIFxuICAgIGdldCBnZXRJbmZvKCkge1xuICAgICAgcmV0dXJuIHRoaXMuI0FsbFNoaXBzO1xuICAgIH1cbiAgfVxuICBcbiAgZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiAgIiwiaW1wb3J0IHtcbiAgICBjaGVja0ZvdXJQbGFjZW1lbnRIb3Jpem9udGFsLFxuICAgIGNoZWNrRm91clBsYWNlbWVudFZlcnRpY2FsbHksXG4gICAgY2hlY2tUaHJlZVBsYWNlbWVudEhvcml6b250YWwsXG4gICAgY2hlY2tUaHJlZVBsYWNlbWVudFZlcnRpY2FsbHksXG4gICAgY2hlY2tUd29QbGFjZW1lbnRIb3Jpem9udGFsLFxuICAgIGNoZWNrVHdvUGxhY2VtZW50VmVydGljYWxseSxcbiAgICBjaGVja09uZVBsYWNlbWVudCxcbiAgfSBmcm9tIFwiLi9jaGVja1NoaXBQbGFjZW1lbnQuanNcIjtcbiAgXG5pbXBvcnQge1xudXBkYXRlRm91ckJsb2NrU2hpcCxcbnVwZGF0ZUZvdXJCbG9ja1NoaXBWZXJ0aWNhbGx5LFxudXBkYXRlVGhyZWVCbG9ja1NoaXAsXG51cGRhdGVUaHJlZUJsb2NrU2hpcFZlcnRpY2FsbHksXG51cGRhdGVUd29CbG9ja1NoaXAsXG51cGRhdGVUd29CbG9ja1NoaXBWZXJ0aWNhbGx5LFxudXBkYXRlT25lQmxvY2tTaGlwLFxufSBmcm9tIFwiLi91cGRhdGVTaGlwLmpzXCI7XG5cbmltcG9ydCB7XG5nZW5lcmF0ZU9uZSxcbmdlbmVyYXRlVHdvLFxuZ2VuZXJhdGVUaHJlZSxcbmdlbmVyYXRlRm91cixcbn0gZnJvbSBcIi4vZ2VuZXJhdGVTaGlwLmpzXCI7XG5cbmltcG9ydCB7IGdhbWVCb2FyZCB9IGZyb20gXCIuLi9mYWN0b3JpZXMvR2FtZUJvYXJkLmpzXCI7XG5cbmltcG9ydCB7IGFjdGl2ZUJveCwgZXJyb3JCb3ggfSBmcm9tIFwiLi9oaWdobGlnaHRTaGlwLmpzXCI7XG5cbmltcG9ydCB7IGFkZEJlZ2luQnV0dG9uIH0gZnJvbSBcIi4vYmVnaW5CdXR0b24uanNcIjtcblxuaW1wb3J0IHsgZW5lbXkgfSBmcm9tIFwiLi4vZmFjdG9yaWVzL1BsYXllci5qc1wiO1xuXG5sZXQgc2hpcFVzZWQgPSB7IGNvdW50OiAwIH07XG5sZXQgY3VyckZvdXIgPSB0cnVlO1xubGV0IGN1cnJUaHJlZSA9IGZhbHNlO1xubGV0IGN1cnJUd28gPSBmYWxzZTtcbmxldCBjdXJyT25lID0gZmFsc2U7XG5jb25zdCB2ZXJ0aWNhbENoZWNrID0geyBmb3VyOiBmYWxzZSwgdGhyZWU6IGZhbHNlLCB0d286IGZhbHNlIH07XG5cbmV4cG9ydCB7c2hpcFVzZWQsIGN1cnJGb3VyLCBjdXJyVGhyZWUsIGN1cnJUd28sIGN1cnJPbmUsIHZlcnRpY2FsQ2hlY2t9O1xuXG5leHBvcnQgZnVuY3Rpb24gQWRkaW5nRm91ckJsb2NrU2hpcCh4LCB5LCB3aGF0Qm9hcmQsIGV2ZW50LCB2ZXJ0aWNhbCkge1xuY29uc3Qgd2hlcmVYID0gTnVtYmVyKHgpO1xuaWYgKHZlcnRpY2FsKSB7XG4gICAgY29uc3Qgd2hlcmVZID0gTnVtYmVyKHkpO1xuXG4gICAgaWYgKHdoZXJlWSA+IDYpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCFjaGVja0ZvdXJQbGFjZW1lbnRWZXJ0aWNhbGx5KHdoZXJlWCwgd2hlcmVZLCB3aGF0Qm9hcmQpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh3aGF0Qm9hcmQgPT09IFwicGxheWVyQm9hcmRcIikge1xuICAgIGdhbWVCb2FyZC5hc3NpZ25QbGF5ZXJTaGlwKFwiZm91ci1ibG9jay0wXCIsIDAsIHdoZXJlWCwgd2hlcmVZLCB0cnVlKTtcbiAgICBnYW1lQm9hcmQuYXNzaWduUGxheWVyU2hpcChcImZvdXItYmxvY2stMFwiLCAxLCB3aGVyZVgsIHdoZXJlWSArIDEsIHRydWUpO1xuICAgIGdhbWVCb2FyZC5hc3NpZ25QbGF5ZXJTaGlwKFwiZm91ci1ibG9jay0wXCIsIDIsIHdoZXJlWCwgd2hlcmVZICsgMiwgdHJ1ZSk7XG4gICAgZ2FtZUJvYXJkLmFzc2lnblBsYXllclNoaXAoXCJmb3VyLWJsb2NrLTBcIiwgMywgd2hlcmVYLCB3aGVyZVkgKyAzLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgIGdhbWVCb2FyZC5hc3NpZ25FbmVteVNoaXAoXCJmb3VyLWJsb2NrLTBcIiwgMCwgd2hlcmVYLCB3aGVyZVksIHRydWUpO1xuICAgIGdhbWVCb2FyZC5hc3NpZ25FbmVteVNoaXAoXCJmb3VyLWJsb2NrLTBcIiwgMSwgd2hlcmVYLCB3aGVyZVkgKyAxLCB0cnVlKTtcbiAgICBnYW1lQm9hcmQuYXNzaWduRW5lbXlTaGlwKFwiZm91ci1ibG9jay0wXCIsIDIsIHdoZXJlWCwgd2hlcmVZICsgMiwgdHJ1ZSk7XG4gICAgZ2FtZUJvYXJkLmFzc2lnbkVuZW15U2hpcChcImZvdXItYmxvY2stMFwiLCAzLCB3aGVyZVgsIHdoZXJlWSArIDMsIHRydWUpO1xuICAgIH1cblxuICAgIHVwZGF0ZUZvdXJCbG9ja1NoaXBWZXJ0aWNhbGx5KHdoZXJlWCwgd2hlcmVZLCB3aGF0Qm9hcmQsIGdhbWVCb2FyZCk7XG59IGVsc2Uge1xuICAgIGNvbnN0IHdoZXJlWSA9IE51bWJlcih5KTtcbiAgICBpZiAod2hlcmVYID4gNikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIWNoZWNrRm91clBsYWNlbWVudEhvcml6b250YWwod2hlcmVYLCB3aGVyZVksIHdoYXRCb2FyZCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHdoYXRCb2FyZCA9PT0gXCJwbGF5ZXJCb2FyZFwiKSB7XG4gICAgZ2FtZUJvYXJkLmFzc2lnblBsYXllclNoaXAoXCJmb3VyLWJsb2NrLTBcIiwgMCwgd2hlcmVYLCB3aGVyZVksIGZhbHNlKTtcbiAgICBnYW1lQm9hcmQuYXNzaWduUGxheWVyU2hpcChcImZvdXItYmxvY2stMFwiLCAxLCB3aGVyZVggKyAxLCB3aGVyZVksIGZhbHNlKTtcbiAgICBnYW1lQm9hcmQuYXNzaWduUGxheWVyU2hpcChcImZvdXItYmxvY2stMFwiLCAyLCB3aGVyZVggKyAyLCB3aGVyZVksIGZhbHNlKTtcbiAgICBnYW1lQm9hcmQuYXNzaWduUGxheWVyU2hpcChcImZvdXItYmxvY2stMFwiLCAzLCB3aGVyZVggKyAzLCB3aGVyZVksIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgIGdhbWVCb2FyZC5hc3NpZ25FbmVteVNoaXAoXCJmb3VyLWJsb2NrLTBcIiwgMCwgd2hlcmVYLCB3aGVyZVksIGZhbHNlKTtcbiAgICBnYW1lQm9hcmQuYXNzaWduRW5lbXlTaGlwKFwiZm91ci1ibG9jay0wXCIsIDEsIHdoZXJlWCArIDEsIHdoZXJlWSwgZmFsc2UpO1xuICAgIGdhbWVCb2FyZC5hc3NpZ25FbmVteVNoaXAoXCJmb3VyLWJsb2NrLTBcIiwgMiwgd2hlcmVYICsgMiwgd2hlcmVZLCBmYWxzZSk7XG4gICAgZ2FtZUJvYXJkLmFzc2lnbkVuZW15U2hpcChcImZvdXItYmxvY2stMFwiLCAzLCB3aGVyZVggKyAzLCB3aGVyZVksIGZhbHNlKTtcbiAgICB9XG5cbiAgICB1cGRhdGVGb3VyQmxvY2tTaGlwKHdoZXJlWCwgd2hlcmVZLCB3aGF0Qm9hcmQsIGdhbWVCb2FyZCk7XG59XG5pZiAod2hhdEJvYXJkID09PSBcInBsYXllckJvYXJkXCIgJiYgZXZlbnQgIT0gXCJub0V2ZW50XCIpIHtcbiAgICBjdXJyRm91ciA9IGZhbHNlO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0U2hpcFwiKS50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aGF0T3B0aW9uXCIpLnRleHRDb250ZW50ID1cbiAgICBcIlBsYWNlIHlvdXIgdGhyZWUtYmxvY2sgc2hpcFwiO1xuICAgIGN1cnJUaHJlZSA9IHRydWU7XG4gICAgZ2VuZXJhdGVUaHJlZSgpO1xufVxufVxuXG5leHBvcnQgZnVuY3Rpb24gQWRkaW5nVGhyZWVCbG9ja1NoaXAoeCwgeSwgd2hhdEJvYXJkLCBldmVudCwgdmVydGljYWwpIHtcbmNvbnN0IHdoZXJlWCA9IE51bWJlcih4KTtcblxuaWYgKHZlcnRpY2FsKSB7XG4gICAgY29uc3Qgd2hlcmVZID0gTnVtYmVyKHkpO1xuXG4gICAgaWYgKHdoZXJlWSA+IDcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCFjaGVja1RocmVlUGxhY2VtZW50VmVydGljYWxseSh3aGVyZVgsIHdoZXJlWSwgd2hhdEJvYXJkKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAod2hhdEJvYXJkID09PSBcInBsYXllckJvYXJkXCIpIHtcbiAgICBnYW1lQm9hcmQuYXNzaWduUGxheWVyU2hpcChcbiAgICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCxcbiAgICAgICAgMCxcbiAgICAgICAgd2hlcmVYLFxuICAgICAgICB3aGVyZVksXG4gICAgICAgIHRydWVcbiAgICApO1xuICAgIGdhbWVCb2FyZC5hc3NpZ25QbGF5ZXJTaGlwKFxuICAgICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gLFxuICAgICAgICAxLFxuICAgICAgICB3aGVyZVgsXG4gICAgICAgIHdoZXJlWSArIDEsXG4gICAgICAgIHRydWVcbiAgICApO1xuICAgIGdhbWVCb2FyZC5hc3NpZ25QbGF5ZXJTaGlwKFxuICAgICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gLFxuICAgICAgICAyLFxuICAgICAgICB3aGVyZVgsXG4gICAgICAgIHdoZXJlWSArIDIsXG4gICAgICAgIHRydWVcbiAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgZ2FtZUJvYXJkLmFzc2lnbkVuZW15U2hpcChcbiAgICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCxcbiAgICAgICAgMCxcbiAgICAgICAgd2hlcmVYLFxuICAgICAgICB3aGVyZVksXG4gICAgICAgIHRydWVcbiAgICApO1xuICAgIGdhbWVCb2FyZC5hc3NpZ25FbmVteVNoaXAoXG4gICAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fWAsXG4gICAgICAgIDEsXG4gICAgICAgIHdoZXJlWCxcbiAgICAgICAgd2hlcmVZICsgMSxcbiAgICAgICAgdHJ1ZVxuICAgICk7XG4gICAgZ2FtZUJvYXJkLmFzc2lnbkVuZW15U2hpcChcbiAgICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCxcbiAgICAgICAgMixcbiAgICAgICAgd2hlcmVYLFxuICAgICAgICB3aGVyZVkgKyAyLFxuICAgICAgICB0cnVlXG4gICAgKTtcbiAgICB9XG5cbiAgICB1cGRhdGVUaHJlZUJsb2NrU2hpcFZlcnRpY2FsbHkod2hlcmVYLCB3aGVyZVksIHdoYXRCb2FyZCwgZ2FtZUJvYXJkKTtcbiAgICBzaGlwVXNlZC5jb3VudCsrO1xufSBlbHNlIHtcbiAgICBjb25zdCB3aGVyZVkgPSBOdW1iZXIoeSk7XG5cbiAgICBpZiAod2hlcmVYID4gNykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFjaGVja1RocmVlUGxhY2VtZW50SG9yaXpvbnRhbCh3aGVyZVgsIHdoZXJlWSwgd2hhdEJvYXJkKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHdoYXRCb2FyZCA9PT0gXCJwbGF5ZXJCb2FyZFwiKSB7XG4gICAgZ2FtZUJvYXJkLmFzc2lnblBsYXllclNoaXAoXG4gICAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fWAsXG4gICAgICAgIDAsXG4gICAgICAgIHdoZXJlWCxcbiAgICAgICAgd2hlcmVZLFxuICAgICAgICBmYWxzZVxuICAgICk7XG4gICAgZ2FtZUJvYXJkLmFzc2lnblBsYXllclNoaXAoXG4gICAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fWAsXG4gICAgICAgIDEsXG4gICAgICAgIHdoZXJlWCArIDEsXG4gICAgICAgIHdoZXJlWSxcbiAgICAgICAgZmFsc2VcbiAgICApO1xuICAgIGdhbWVCb2FyZC5hc3NpZ25QbGF5ZXJTaGlwKFxuICAgICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gLFxuICAgICAgICAyLFxuICAgICAgICB3aGVyZVggKyAyLFxuICAgICAgICB3aGVyZVksXG4gICAgICAgIGZhbHNlXG4gICAgKTtcbiAgICB9IGVsc2Uge1xuICAgIGdhbWVCb2FyZC5hc3NpZ25FbmVteVNoaXAoXG4gICAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fWAsXG4gICAgICAgIDAsXG4gICAgICAgIHdoZXJlWCxcbiAgICAgICAgd2hlcmVZLFxuICAgICAgICBmYWxzZVxuICAgICk7XG4gICAgZ2FtZUJvYXJkLmFzc2lnbkVuZW15U2hpcChcbiAgICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCxcbiAgICAgICAgMSxcbiAgICAgICAgd2hlcmVYICsgMSxcbiAgICAgICAgd2hlcmVZLFxuICAgICAgICBmYWxzZVxuICAgICk7XG4gICAgZ2FtZUJvYXJkLmFzc2lnbkVuZW15U2hpcChcbiAgICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCxcbiAgICAgICAgMixcbiAgICAgICAgd2hlcmVYICsgMixcbiAgICAgICAgd2hlcmVZLFxuICAgICAgICBmYWxzZVxuICAgICk7XG4gICAgfVxuXG4gICAgdXBkYXRlVGhyZWVCbG9ja1NoaXAod2hlcmVYLCB3aGVyZVksIHdoYXRCb2FyZCwgZ2FtZUJvYXJkKTtcbiAgICBzaGlwVXNlZC5jb3VudCsrO1xufVxuaWYgKHdoYXRCb2FyZCA9PT0gXCJwbGF5ZXJCb2FyZFwiICYmIGV2ZW50ICE9IFwibm9FdmVudFwiKSB7XG4gICAgZG9jdW1lbnRcbiAgICAucXVlcnlTZWxlY3RvcihgLiR7ZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0XCIpfWApXG4gICAgLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2V2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dFwiKX1gKVxuICAgICk7XG5cbiAgICBpZiAoc2hpcFVzZWQuY291bnQgPT09IDIpIHtcbiAgICBzaGlwVXNlZC5jb3VudCA9IDA7XG4gICAgY3VyclRocmVlID0gZmFsc2U7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3RTaGlwXCIpLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndoYXRPcHRpb25cIikudGV4dENvbnRlbnQgPVxuICAgIFwiUGxhY2UgeW91ciB0d28tYmxvY2sgc2hpcFwiO1xuICAgIGdlbmVyYXRlVHdvKCk7XG4gICAgY3VyclR3byA9IHRydWU7XG4gICAgfVxufVxufVxuXG5leHBvcnQgZnVuY3Rpb24gQWRkaW5nVHdvQmxvY2tTaGlwKHgsIHksIHdoYXRCb2FyZCwgZXZlbnQsIHZlcnRpY2FsKSB7XG5jb25zdCB3aGVyZVggPSBOdW1iZXIoeCk7XG5cbmlmICh2ZXJ0aWNhbCkge1xuICAgIGNvbnN0IHdoZXJlWSA9IE51bWJlcih5KTtcblxuICAgIGlmICh3aGVyZVkgPiA4KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIWNoZWNrVHdvUGxhY2VtZW50VmVydGljYWxseSh3aGVyZVgsIHdoZXJlWSwgd2hhdEJvYXJkKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHdoYXRCb2FyZCA9PT0gXCJwbGF5ZXJCb2FyZFwiKSB7XG4gICAgZ2FtZUJvYXJkLmFzc2lnblBsYXllclNoaXAoXG4gICAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gLFxuICAgICAgICAwLFxuICAgICAgICB3aGVyZVgsXG4gICAgICAgIHdoZXJlWSxcbiAgICAgICAgdHJ1ZVxuICAgICk7XG4gICAgZ2FtZUJvYXJkLmFzc2lnblBsYXllclNoaXAoXG4gICAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gLFxuICAgICAgICAxLFxuICAgICAgICB3aGVyZVgsXG4gICAgICAgIHdoZXJlWSArIDEsXG4gICAgICAgIHRydWVcbiAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgZ2FtZUJvYXJkLmFzc2lnbkVuZW15U2hpcChcbiAgICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fWAsXG4gICAgICAgIDAsXG4gICAgICAgIHdoZXJlWCxcbiAgICAgICAgd2hlcmVZLFxuICAgICAgICB0cnVlXG4gICAgKTtcbiAgICBnYW1lQm9hcmQuYXNzaWduRW5lbXlTaGlwKFxuICAgICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCxcbiAgICAgICAgMSxcbiAgICAgICAgd2hlcmVYLFxuICAgICAgICB3aGVyZVkgKyAxLFxuICAgICAgICB0cnVlXG4gICAgKTtcbiAgICB9XG4gICAgdXBkYXRlVHdvQmxvY2tTaGlwVmVydGljYWxseSh3aGVyZVgsIHdoZXJlWSwgd2hhdEJvYXJkLCBnYW1lQm9hcmQpO1xuICAgIHNoaXBVc2VkLmNvdW50Kys7XG59IGVsc2Uge1xuICAgIGNvbnN0IHdoZXJlWSA9IE51bWJlcih5KTtcblxuICAgIGlmICh3aGVyZVggPiA4KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIWNoZWNrVHdvUGxhY2VtZW50SG9yaXpvbnRhbCh3aGVyZVgsIHdoZXJlWSwgd2hhdEJvYXJkKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAod2hhdEJvYXJkID09PSBcInBsYXllckJvYXJkXCIpIHtcbiAgICBnYW1lQm9hcmQuYXNzaWduUGxheWVyU2hpcChcbiAgICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fWAsXG4gICAgICAgIDAsXG4gICAgICAgIHdoZXJlWCxcbiAgICAgICAgd2hlcmVZLFxuICAgICAgICBmYWxzZVxuICAgICk7XG4gICAgZ2FtZUJvYXJkLmFzc2lnblBsYXllclNoaXAoXG4gICAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gLFxuICAgICAgICAxLFxuICAgICAgICB3aGVyZVggKyAxLFxuICAgICAgICB3aGVyZVksXG4gICAgICAgIGZhbHNlXG4gICAgKTtcbiAgICB9IGVsc2Uge1xuICAgIGdhbWVCb2FyZC5hc3NpZ25FbmVteVNoaXAoXG4gICAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gLFxuICAgICAgICAwLFxuICAgICAgICB3aGVyZVgsXG4gICAgICAgIHdoZXJlWSxcbiAgICAgICAgZmFsc2VcbiAgICApO1xuICAgIGdhbWVCb2FyZC5hc3NpZ25FbmVteVNoaXAoXG4gICAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gLFxuICAgICAgICAxLFxuICAgICAgICB3aGVyZVggKyAxLFxuICAgICAgICB3aGVyZVksXG4gICAgICAgIGZhbHNlXG4gICAgKTtcbiAgICB9XG5cbiAgICB1cGRhdGVUd29CbG9ja1NoaXAod2hlcmVYLCB3aGVyZVksIHdoYXRCb2FyZCwgZ2FtZUJvYXJkKTtcbiAgICBzaGlwVXNlZC5jb3VudCsrO1xufVxuaWYgKHdoYXRCb2FyZCA9PT0gXCJwbGF5ZXJCb2FyZFwiICYmIGV2ZW50ICE9IFwibm9FdmVudFwiKSB7XG4gICAgZG9jdW1lbnRcbiAgICAucXVlcnlTZWxlY3RvcihgLiR7ZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0XCIpfWApXG4gICAgLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2V2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dFwiKX1gKVxuICAgICk7XG4gICAgaWYgKHNoaXBVc2VkLmNvdW50ID09PSAzKSB7XG4gICAgc2hpcFVzZWQuY291bnQgPSAwO1xuICAgIGN1cnJUd28gPSBmYWxzZTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdFNoaXBcIikudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2hhdE9wdGlvblwiKS50ZXh0Q29udGVudCA9XG4gICAgXCJQbGFjZSB5b3VyIG9uZS1ibG9jayBzaGlwXCI7XG4gICAgZ2VuZXJhdGVPbmUoKTtcbiAgICBjdXJyT25lID0gdHJ1ZTtcbiAgICB9XG59XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBZGRpbmdPbmVCbG9ja1NoaXAoeCwgeSwgd2hhdEJvYXJkLCBldmVudCkge1xuY29uc3Qgd2hlcmVZID0gTnVtYmVyKHkpO1xuY29uc3Qgd2hlcmVYID0gTnVtYmVyKHgpO1xuXG5pZiAoIWNoZWNrT25lUGxhY2VtZW50KHdoZXJlWCwgd2hlcmVZLCB3aGF0Qm9hcmQpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuaWYgKHdoYXRCb2FyZCA9PT0gXCJwbGF5ZXJCb2FyZFwiKSB7XG4gICAgZ2FtZUJvYXJkLmFzc2lnblBsYXllclNoaXAoXG4gICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fWAsXG4gICAgMCxcbiAgICB3aGVyZVgsXG4gICAgd2hlcmVZXG4gICAgKTtcbn0gZWxzZSB7XG4gICAgZ2FtZUJvYXJkLmFzc2lnbkVuZW15U2hpcChgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCwgMCwgd2hlcmVYLCB3aGVyZVkpO1xufVxuXG51cGRhdGVPbmVCbG9ja1NoaXAod2hlcmVYLCB3aGVyZVksIHdoYXRCb2FyZCwgZ2FtZUJvYXJkKTtcbnNoaXBVc2VkLmNvdW50Kys7XG5cbmlmICh3aGF0Qm9hcmQgPT09IFwicGxheWVyQm9hcmRcIiAmJiBldmVudCAhPSBcIm5vRXZlbnRcIikge1xuICAgIGRvY3VtZW50XG4gICAgLnF1ZXJ5U2VsZWN0b3IoYC4ke2V2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dFwiKX1gKVxuICAgIC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHRcIil9YClcbiAgICApO1xuICAgIGlmIChzaGlwVXNlZC5jb3VudCA9PT0gNCkge1xuICAgIHNoaXBVc2VkLmNvdW50ID0gMDtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdFNoaXBcIikudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIGFkZEJlZ2luQnV0dG9uKCk7XG4gICAgY3Vyck9uZSA9IGZhbHNlO1xuICAgIH1cbn1cbn1cblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXNldFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbmUucHJldmVudERlZmF1bHQoKTtcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0U2hpcFwiKS50ZXh0Q29udGVudCA9IFwiXCI7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1zaGlwXVwiKS5mb3JFYWNoKChib3gpID0+IHtcbiAgICBkZWxldGUgYm94LmRhdGFzZXQuc2hpcDtcbn0pO1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLXNwYWNlXVwiKS5mb3JFYWNoKChib3gpID0+IHtcbiAgICBkZWxldGUgYm94LmRhdGFzZXQuc3BhY2U7XG59KTtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hY3RpdmVcIikuZm9yRWFjaCgoYm94KSA9PiB7XG4gICAgYm94LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG59KTtcblxuZ2FtZUJvYXJkLnJlc2V0KCk7XG5lbmVteS5yZXNldCgpO1xuXG5jdXJyRm91ciA9IHRydWU7XG5jdXJyVGhyZWUgPSBmYWxzZTtcbmN1cnJUd28gPSBmYWxzZTtcbmN1cnJPbmUgPSBmYWxzZTtcbnZlcnRpY2FsQ2hlY2suZm91ciA9IGZhbHNlO1xudmVydGljYWxDaGVjay50aHJlZSA9IGZhbHNlO1xudmVydGljYWxDaGVjay50d28gPSBmYWxzZTtcbnNoaXBVc2VkID0geyBjb3VudDogMCB9O1xuZ2VuZXJhdGVGb3VyKCk7XG59KTsiLCJpbXBvcnQgeyByYW5kb21pemUgfSBmcm9tIFwiLi9yYW5kb21pemVTaGlwLmpzXCI7XG5pbXBvcnQgeyBwbGF5ZXIgfSBmcm9tIFwiLi4vZmFjdG9yaWVzL1BsYXllci5qc1wiO1xuaW1wb3J0IHsgZW5lbXkgfSBmcm9tIFwiLi4vZmFjdG9yaWVzL1BsYXllci5qc1wiO1xuaW1wb3J0IHsgZ2FtZUJvYXJkIH0gZnJvbSBcIi4uL2ZhY3Rvcmllcy9HYW1lQm9hcmQuanNcIjtcblxuZnVuY3Rpb24gYWRkQmVnaW5CdXR0b24oKSB7XG4gIGNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgc3RhcnRCdXR0b24uY2xhc3NMaXN0LmFkZChcImJlZ2luXCIpO1xuICBzdGFydEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQkVHSU5cIjtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3RTaGlwXCIpLmFwcGVuZENoaWxkKHN0YXJ0QnV0dG9uKTtcblxuICBzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFxuICAgIFwiY2xpY2tcIixcbiAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImZvcm1cIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluQ29udGVudFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICBkb2N1bWVudFxuICAgICAgICAucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXJCb2FyZENvbnRhaW5lclwiKVxuICAgICAgICAuYXBwZW5kQ2hpbGQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXJCb2FyZFwiKSk7XG4gICAgICByYW5kb21pemUoXCJjb21wdXRlckJvYXJkXCIpO1xuICAgICAgYWRkQm9hcmRFdmVudHMoXCJwbGF5ZXJCb2FyZFwiKTtcbiAgICAgIGFkZEJvYXJkRXZlbnRzKFwiY29tcHV0ZXJCb2FyZFwiKTtcbiAgICAgIGdhbWVCb2FyZC5zdGFydEdhbWUoKTtcbiAgICB9LFxuICAgIGZhbHNlXG4gICk7XG59XG5cbmZ1bmN0aW9uIGFkZEJvYXJkRXZlbnRzKHRoaXNCb2FyZCkge1xuICBmdW5jdGlvbiBjb250YWluU2hpcEJveChlKSB7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY29udGFpblNoaXBCb3gpO1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZChcInNoaXBBbmltYXRpb25cIik7XG4gICAgdGhpcy5maXJzdENoaWxkLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICB0aGlzLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQgPSBcIuKcllwiO1xuICAgIGlmICh0aGlzQm9hcmQgPT09IFwiY29tcHV0ZXJCb2FyZFwiKSB7XG4gICAgICBpZiAoZ2FtZUJvYXJkLndob3NUdXJuID09PSBcInBsYXllclwiKSB7XG4gICAgICAgIHBsYXllci5hdHRhY2soZS50YXJnZXQuZGF0YXNldC54LCBlLnRhcmdldC5kYXRhc2V0LnksIGUudGFyZ2V0KTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgZW5lbXkucmFuZG9tQXR0YWNrKCk7XG4gICAgICAgIH0sIDEwMDApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBub1NoaXBCb3goZSkge1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG5vU2hpcEJveCk7XG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKFwibm9TaGlwQW5pbWF0ZVwiKTtcbiAgICB0aGlzLmZpcnN0Q2hpbGQuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgIHRoaXMuZmlyc3RDaGlsZC50ZXh0Q29udGVudCA9IFwi4qi3XCI7XG4gICAgdGhpcy5maXJzdENoaWxkLnN0eWxlLmZvbnRTaXplID0gXCIxNXB4XCI7XG4gICAgaWYgKHRoaXNCb2FyZCA9PT0gXCJjb21wdXRlckJvYXJkXCIpIHtcbiAgICAgIGlmIChnYW1lQm9hcmQud2hvc1R1cm4gPT09IFwicGxheWVyXCIpIHtcbiAgICAgICAgcGxheWVyLmF0dGFjayhlLnRhcmdldC5kYXRhc2V0LngsIGUudGFyZ2V0LmRhdGFzZXQueSwgZS50YXJnZXQpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBlbmVteS5yYW5kb21BdHRhY2soKTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke3RoaXNCb2FyZH0gPiAuYm94YCkuZm9yRWFjaCgoYm94KSA9PiB7XG4gICAgaWYgKFxuICAgICAgZ2FtZUJvYXJkW2Ake3RoaXNCb2FyZH1gXVtib3guZGF0YXNldC55XVtib3guZGF0YXNldC54XS5zcGxpdChcIi1cIilcbiAgICAgICAgLmxlbmd0aCA9PT0gM1xuICAgICkge1xuICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjb250YWluU2hpcEJveCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbm9TaGlwQm94KTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgeyBhZGRCZWdpbkJ1dHRvbiB9O1xuIiwiaW1wb3J0IHsgZ2FtZUJvYXJkIH0gZnJvbSBcIi4uL2ZhY3Rvcmllcy9HYW1lQm9hcmQuanNcIjtcbmZ1bmN0aW9uIGNoZWNrRm91clBsYWNlbWVudEhvcml6b250YWwoeCwgeSwgd2hhdEJvYXJkKSB7XG4gIHJldHVybiAoXG4gICAgIWdhbWVCb2FyZFt3aGF0Qm9hcmRdW3ldW3hdICYmXG4gICAgIWdhbWVCb2FyZFt3aGF0Qm9hcmRdW3ldW3ggKyAxXSAmJlxuICAgICFnYW1lQm9hcmRbd2hhdEJvYXJkXVt5XVt4ICsgMl0gJiZcbiAgICAhZ2FtZUJvYXJkW3doYXRCb2FyZF1beV1beCArIDNdXG4gICk7XG59XG5mdW5jdGlvbiBjaGVja0ZvdXJQbGFjZW1lbnRWZXJ0aWNhbGx5KHgsIHksIHdoYXRCb2FyZCkge1xuICByZXR1cm4gKFxuICAgICFnYW1lQm9hcmRbd2hhdEJvYXJkXVt5XVt4XSAmJlxuICAgICFnYW1lQm9hcmRbd2hhdEJvYXJkXVt5ICsgMV1beF0gJiZcbiAgICAhZ2FtZUJvYXJkW3doYXRCb2FyZF1beSArIDJdW3hdICYmXG4gICAgIWdhbWVCb2FyZFt3aGF0Qm9hcmRdW3kgKyAzXVt4XVxuICApO1xufVxuXG5mdW5jdGlvbiBjaGVja1RocmVlUGxhY2VtZW50SG9yaXpvbnRhbCh4LCB5LCB3aGF0Qm9hcmQpIHtcbiAgcmV0dXJuIChcbiAgICAhZ2FtZUJvYXJkW3doYXRCb2FyZF1beV1beF0gJiZcbiAgICAhZ2FtZUJvYXJkW3doYXRCb2FyZF1beV1beCArIDFdICYmXG4gICAgIWdhbWVCb2FyZFt3aGF0Qm9hcmRdW3ldW3ggKyAyXVxuICApO1xufVxuZnVuY3Rpb24gY2hlY2tUaHJlZVBsYWNlbWVudFZlcnRpY2FsbHkoeCwgeSwgd2hhdEJvYXJkKSB7XG4gIHJldHVybiAoXG4gICAgIWdhbWVCb2FyZFt3aGF0Qm9hcmRdW3ldW3hdICYmXG4gICAgIWdhbWVCb2FyZFt3aGF0Qm9hcmRdW3kgKyAxXVt4XSAmJlxuICAgICFnYW1lQm9hcmRbd2hhdEJvYXJkXVt5ICsgMl1beF1cbiAgKTtcbn1cblxuZnVuY3Rpb24gY2hlY2tUd29QbGFjZW1lbnRIb3Jpem9udGFsKHgsIHksIHdoYXRCb2FyZCkge1xuICByZXR1cm4gIWdhbWVCb2FyZFt3aGF0Qm9hcmRdW3ldW3hdICYmICFnYW1lQm9hcmRbd2hhdEJvYXJkXVt5XVt4ICsgMV07XG59XG5cbmZ1bmN0aW9uIGNoZWNrVHdvUGxhY2VtZW50VmVydGljYWxseSh4LCB5LCB3aGF0Qm9hcmQpIHtcbiAgcmV0dXJuICFnYW1lQm9hcmRbd2hhdEJvYXJkXVt5XVt4XSAmJiAhZ2FtZUJvYXJkW3doYXRCb2FyZF1beSArIDFdW3hdO1xufVxuXG5mdW5jdGlvbiBjaGVja09uZVBsYWNlbWVudCh4LCB5LCB3aGF0Qm9hcmQpIHtcbiAgcmV0dXJuICFnYW1lQm9hcmRbd2hhdEJvYXJkXVt5XVt4XTtcbn1cblxuZXhwb3J0IHtcbiAgICBjaGVja0ZvdXJQbGFjZW1lbnRIb3Jpem9udGFsLFxuICAgIGNoZWNrRm91clBsYWNlbWVudFZlcnRpY2FsbHksXG4gICAgY2hlY2tUaHJlZVBsYWNlbWVudEhvcml6b250YWwsXG4gICAgY2hlY2tUaHJlZVBsYWNlbWVudFZlcnRpY2FsbHksXG4gICAgY2hlY2tUd29QbGFjZW1lbnRIb3Jpem9udGFsLFxuICAgIGNoZWNrVHdvUGxhY2VtZW50VmVydGljYWxseSxcbiAgICBjaGVja09uZVBsYWNlbWVudCxcbn07IiwiZnVuY3Rpb24gZ2VuZXJhdGVGb3VyKCkge1xuICAgIGNvbnN0IHNoaXAxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzaGlwMS5jbGFzc0xpc3QuYWRkKFwiZm91ckJsb2NrU2hpcFwiKTtcbiAgXG4gICAgY29uc3QgYm94MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgYm94MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgYm94MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgYm94NCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIFxuICAgIGJveDEuY2xhc3NMaXN0LmFkZChcInNoaXBQYXJ0XCIpO1xuICAgIGJveDIuY2xhc3NMaXN0LmFkZChcInNoaXBQYXJ0XCIpO1xuICAgIGJveDMuY2xhc3NMaXN0LmFkZChcInNoaXBQYXJ0XCIpO1xuICAgIGJveDQuY2xhc3NMaXN0LmFkZChcInNoaXBQYXJ0XCIpO1xuICBcbiAgICBzaGlwMS5hcHBlbmRDaGlsZChib3gxKTtcbiAgICBzaGlwMS5hcHBlbmRDaGlsZChib3gyKTtcbiAgICBzaGlwMS5hcHBlbmRDaGlsZChib3gzKTtcbiAgICBzaGlwMS5hcHBlbmRDaGlsZChib3g0KTtcbiAgXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3RTaGlwXCIpLmFwcGVuZENoaWxkKHNoaXAxKTtcbiAgfVxuICBcbiAgZnVuY3Rpb24gZ2VuZXJhdGVUaHJlZSgpIHtcbiAgICBjb25zdCBzaGlwMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2hpcDEuY2xhc3NMaXN0LmFkZChcInRocmVlQmxvY2tTaGlwXCIpO1xuICBcbiAgICBjb25zdCBib3gxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBib3gyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBib3gzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgXG4gICAgYm94MS5jbGFzc0xpc3QuYWRkKFwic2hpcFBhcnRcIik7XG4gICAgYm94Mi5jbGFzc0xpc3QuYWRkKFwic2hpcFBhcnRcIik7XG4gICAgYm94My5jbGFzc0xpc3QuYWRkKFwic2hpcFBhcnRcIik7XG4gIFxuICAgIHNoaXAxLmFwcGVuZENoaWxkKGJveDEpO1xuICAgIHNoaXAxLmFwcGVuZENoaWxkKGJveDIpO1xuICAgIHNoaXAxLmFwcGVuZENoaWxkKGJveDMpO1xuICAgIHNoaXAxLmRyYWdnYWJsZSA9IFwidHJ1ZVwiO1xuICBcbiAgICBjb25zdCBzaGlwMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2hpcDIuY2xhc3NMaXN0LmFkZChcInRocmVlQmxvY2tTaGlwXCIpO1xuICBcbiAgICBjb25zdCBib3g0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBib3g1ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBib3g2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgXG4gICAgYm94NC5jbGFzc0xpc3QuYWRkKFwic2hpcFBhcnRcIik7XG4gICAgYm94NS5jbGFzc0xpc3QuYWRkKFwic2hpcFBhcnRcIik7XG4gICAgYm94Ni5jbGFzc0xpc3QuYWRkKFwic2hpcFBhcnRcIik7XG4gIFxuICAgIHNoaXAyLmFwcGVuZENoaWxkKGJveDQpO1xuICAgIHNoaXAyLmFwcGVuZENoaWxkKGJveDUpO1xuICAgIHNoaXAyLmFwcGVuZENoaWxkKGJveDYpO1xuICAgIHNoaXAyLmRyYWdnYWJsZSA9IFwidHJ1ZVwiO1xuICBcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdFNoaXBcIikuYXBwZW5kQ2hpbGQoc2hpcDEpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0U2hpcFwiKS5hcHBlbmRDaGlsZChzaGlwMik7XG4gIFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0U2hpcCA+IGRpdlwiKS5mb3JFYWNoKChzaGlwKSA9PlxuICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBcImRyYWdzdGFydFwiLFxuICAgICAgICBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHRcIiwgZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSk7XG4gICAgICAgICAgZXZlbnQudGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSBcIjAuNVwiO1xuICAgICAgICB9LFxuICAgICAgICBmYWxzZVxuICAgICAgKVxuICAgICk7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIGdlbmVyYXRlVHdvKCkge1xuICAgIGNvbnN0IHNoaXAxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzaGlwMS5jbGFzc0xpc3QuYWRkKFwidHdvQmxvY2tTaGlwXCIpO1xuICBcbiAgICBjb25zdCBib3gxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBib3gyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgXG4gICAgYm94MS5jbGFzc0xpc3QuYWRkKFwic2hpcFBhcnRcIik7XG4gICAgYm94Mi5jbGFzc0xpc3QuYWRkKFwic2hpcFBhcnRcIik7XG4gIFxuICAgIHNoaXAxLmFwcGVuZENoaWxkKGJveDEpO1xuICAgIHNoaXAxLmFwcGVuZENoaWxkKGJveDIpO1xuICAgIHNoaXAxLmRyYWdnYWJsZSA9IFwidHJ1ZVwiO1xuICBcbiAgICBjb25zdCBzaGlwMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2hpcDIuY2xhc3NMaXN0LmFkZChcInR3b0Jsb2NrU2hpcFwiKTtcbiAgXG4gICAgY29uc3QgYm94MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgYm94NCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIFxuICAgIGJveDMuY2xhc3NMaXN0LmFkZChcInNoaXBQYXJ0XCIpO1xuICAgIGJveDQuY2xhc3NMaXN0LmFkZChcInNoaXBQYXJ0XCIpO1xuICBcbiAgICBzaGlwMi5hcHBlbmRDaGlsZChib3gzKTtcbiAgICBzaGlwMi5hcHBlbmRDaGlsZChib3g0KTtcbiAgICBzaGlwMi5kcmFnZ2FibGUgPSBcInRydWVcIjtcbiAgXG4gICAgY29uc3Qgc2hpcDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHNoaXAzLmNsYXNzTGlzdC5hZGQoXCJ0d29CbG9ja1NoaXBcIik7XG4gIFxuICAgIGNvbnN0IGJveDUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGJveDYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBcbiAgICBib3g1LmNsYXNzTGlzdC5hZGQoXCJzaGlwUGFydFwiKTtcbiAgICBib3g2LmNsYXNzTGlzdC5hZGQoXCJzaGlwUGFydFwiKTtcbiAgXG4gICAgc2hpcDMuYXBwZW5kQ2hpbGQoYm94NSk7XG4gICAgc2hpcDMuYXBwZW5kQ2hpbGQoYm94Nik7XG4gICAgc2hpcDMuZHJhZ2dhYmxlID0gXCJ0cnVlXCI7XG4gIFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0U2hpcFwiKS5hcHBlbmRDaGlsZChzaGlwMSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3RTaGlwXCIpLmFwcGVuZENoaWxkKHNoaXAyKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdFNoaXBcIikuYXBwZW5kQ2hpbGQoc2hpcDMpO1xuICBcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlbGVjdFNoaXAgPiBkaXZcIikuZm9yRWFjaCgoc2hpcCkgPT5cbiAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJkcmFnc3RhcnRcIixcbiAgICAgICAgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0XCIsIGV2ZW50LnRhcmdldC5jbGFzc05hbWUpO1xuICAgICAgICAgIGV2ZW50LnRhcmdldC5zdHlsZS5vcGFjaXR5ID0gXCIwLjVcIjtcbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2VcbiAgICAgIClcbiAgICApO1xuICB9XG4gIFxuICBmdW5jdGlvbiBnZW5lcmF0ZU9uZSgpIHtcbiAgICBjb25zdCBzaGlwMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2hpcDEuY2xhc3NMaXN0LmFkZChcIm9uZUJsb2NrU2hpcFwiKTtcbiAgXG4gICAgY29uc3QgYm94MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgYm94MS5jbGFzc0xpc3QuYWRkKFwic2hpcFBhcnRcIik7XG4gIFxuICAgIHNoaXAxLmFwcGVuZENoaWxkKGJveDEpO1xuICAgIHNoaXAxLmRyYWdnYWJsZSA9IFwidHJ1ZVwiO1xuICBcbiAgICBjb25zdCBzaGlwMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2hpcDIuY2xhc3NMaXN0LmFkZChcIm9uZUJsb2NrU2hpcFwiKTtcbiAgXG4gICAgY29uc3QgYm94MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgYm94Mi5jbGFzc0xpc3QuYWRkKFwic2hpcFBhcnRcIik7XG4gIFxuICAgIHNoaXAyLmFwcGVuZENoaWxkKGJveDIpO1xuICAgIHNoaXAyLmRyYWdnYWJsZSA9IFwidHJ1ZVwiO1xuICBcbiAgICBjb25zdCBzaGlwMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2hpcDMuY2xhc3NMaXN0LmFkZChcIm9uZUJsb2NrU2hpcFwiKTtcbiAgXG4gICAgY29uc3QgYm94MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgYm94My5jbGFzc0xpc3QuYWRkKFwic2hpcFBhcnRcIik7XG4gIFxuICAgIHNoaXAzLmFwcGVuZENoaWxkKGJveDMpO1xuICAgIHNoaXAzLmRyYWdnYWJsZSA9IFwidHJ1ZVwiO1xuICBcbiAgICBjb25zdCBzaGlwNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2hpcDQuY2xhc3NMaXN0LmFkZChcIm9uZUJsb2NrU2hpcFwiKTtcbiAgXG4gICAgY29uc3QgYm94NCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgYm94NC5jbGFzc0xpc3QuYWRkKFwic2hpcFBhcnRcIik7XG4gIFxuICAgIHNoaXA0LmFwcGVuZENoaWxkKGJveDQpO1xuICAgIHNoaXA0LmRyYWdnYWJsZSA9IFwidHJ1ZVwiO1xuICBcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdFNoaXBcIikuYXBwZW5kQ2hpbGQoc2hpcDEpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0U2hpcFwiKS5hcHBlbmRDaGlsZChzaGlwMik7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3RTaGlwXCIpLmFwcGVuZENoaWxkKHNoaXAzKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdFNoaXBcIikuYXBwZW5kQ2hpbGQoc2hpcDQpO1xuICBcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlbGVjdFNoaXAgPiBkaXZcIikuZm9yRWFjaCgoc2hpcCkgPT5cbiAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJkcmFnc3RhcnRcIixcbiAgICAgICAgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0XCIsIGV2ZW50LnRhcmdldC5jbGFzc05hbWUpO1xuICAgICAgICAgIGV2ZW50LnRhcmdldC5zdHlsZS5vcGFjaXR5ID0gXCIwLjVcIjtcbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2VcbiAgICAgIClcbiAgICApO1xuICB9XG4gIFxuICBleHBvcnQgeyBnZW5lcmF0ZUZvdXIsIGdlbmVyYXRlVGhyZWUsIGdlbmVyYXRlVHdvLCBnZW5lcmF0ZU9uZSB9OyIsImltcG9ydCB7XG4gICAgY2hlY2tGb3VyUGxhY2VtZW50SG9yaXpvbnRhbCxcbiAgICBjaGVja0ZvdXJQbGFjZW1lbnRWZXJ0aWNhbGx5LFxuICAgIGNoZWNrVGhyZWVQbGFjZW1lbnRIb3Jpem9udGFsLFxuICAgIGNoZWNrVGhyZWVQbGFjZW1lbnRWZXJ0aWNhbGx5LFxuICAgIGNoZWNrVHdvUGxhY2VtZW50SG9yaXpvbnRhbCxcbiAgICBjaGVja1R3b1BsYWNlbWVudFZlcnRpY2FsbHksXG4gICAgY2hlY2tPbmVQbGFjZW1lbnQsXG4gIH0gZnJvbSBcIi4vY2hlY2tTaGlwUGxhY2VtZW50LmpzXCI7XG4gIFxuY29uc3QgYWN0aXZlQm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImFjdGl2ZVwiKTtcbmNvbnN0IGVycm9yQm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImVycm9yXCIpO1xuXG5mdW5jdGlvbiBoaWdobGlnaHRGb3VyQmxvY2tTaGlwKGV2ZW50LCBmb3VyVmVydGljYWwpIHtcbmNvbnN0IHdoZXJlWCA9IE51bWJlcihldmVudC50YXJnZXQuZGF0YXNldC54KTtcblxuaWYgKGZvdXJWZXJ0aWNhbCkge1xuICAgIEFycmF5LmZyb20oYWN0aXZlQm94KS5mb3JFYWNoKChhY3RpdmUpID0+IHtcbiAgICBhY3RpdmUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICB9KTtcblxuICAgIEFycmF5LmZyb20oZXJyb3JCb3gpLmZvckVhY2goKGVycm9yKSA9PiB7XG4gICAgZXJyb3IuY2xhc3NMaXN0LnJlbW92ZShcImVycm9yXCIpO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgd2hlcmVZID0gTnVtYmVyKGV2ZW50LnRhcmdldC5kYXRhc2V0LnkpO1xuXG4gICAgaWYgKHdoZXJlWSA+IDYpIHtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIWNoZWNrRm91clBsYWNlbWVudFZlcnRpY2FsbHkod2hlcmVYLCB3aGVyZVksIFwicGxheWVyQm9hcmRcIikpIHtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG5cbiAgICBjb25zdCBzZWNvbmRCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgYFtkYXRhLXk9XCIke3doZXJlWSArIDF9XCJdW2RhdGEteD1cIiR7d2hlcmVYfVwiXWBcbiAgICApO1xuICAgIGNvbnN0IHRoaXJkQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIGBbZGF0YS15PVwiJHt3aGVyZVkgKyAyfVwiXVtkYXRhLXg9XCIke3doZXJlWH1cIl1gXG4gICAgKTtcbiAgICBjb25zdCBmb3VydGhCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgYFtkYXRhLXk9XCIke3doZXJlWSArIDN9XCJdW2RhdGEteD1cIiR7d2hlcmVYfVwiXWBcbiAgICApO1xuXG4gICAgc2Vjb25kQmxvY2suY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICB0aGlyZEJsb2NrLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgZm91cnRoQmxvY2suY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbn0gZWxzZSB7XG4gICAgY29uc3Qgd2hlcmVZID0gTnVtYmVyKGV2ZW50LnRhcmdldC5kYXRhc2V0LnkpO1xuXG4gICAgQXJyYXkuZnJvbShhY3RpdmVCb3gpLmZvckVhY2goKGFjdGl2ZSkgPT4ge1xuICAgIGFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgIH0pO1xuXG4gICAgQXJyYXkuZnJvbShlcnJvckJveCkuZm9yRWFjaCgoZXJyb3IpID0+IHtcbiAgICBlcnJvci5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3JcIik7XG4gICAgfSk7XG5cbiAgICBpZiAod2hlcmVYID4gNikge1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiZXJyb3JcIik7XG4gICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWNoZWNrRm91clBsYWNlbWVudEhvcml6b250YWwod2hlcmVYLCB3aGVyZVksIFwicGxheWVyQm9hcmRcIikpIHtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgZXZlbnQudGFyZ2V0Lm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIGV2ZW50LnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgZXZlbnQudGFyZ2V0Lm5leHRFbGVtZW50U2libGluZy5uZXh0RWxlbWVudFNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5hZGQoXG4gICAgXCJhY3RpdmVcIlxuICAgICk7XG59XG59XG5mdW5jdGlvbiBoaWdobGlnaHRUaHJlZUJsb2NrU2hpcChldmVudCwgdGhyZWVWZXJ0aWNhbCkge1xuY29uc3Qgd2hlcmVYID0gTnVtYmVyKGV2ZW50LnRhcmdldC5kYXRhc2V0LngpO1xuXG5pZiAodGhyZWVWZXJ0aWNhbCkge1xuICAgIEFycmF5LmZyb20oYWN0aXZlQm94KS5mb3JFYWNoKChhY3RpdmUpID0+IHtcbiAgICBhY3RpdmUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICB9KTtcblxuICAgIEFycmF5LmZyb20oZXJyb3JCb3gpLmZvckVhY2goKGVycm9yKSA9PiB7XG4gICAgZXJyb3IuY2xhc3NMaXN0LnJlbW92ZShcImVycm9yXCIpO1xuICAgIH0pO1xuICAgIGNvbnN0IHdoZXJlWSA9IE51bWJlcihldmVudC50YXJnZXQuZGF0YXNldC55KTtcblxuICAgIGlmICh3aGVyZVkgPiA3KSB7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChcbiAgICAhY2hlY2tUaHJlZVBsYWNlbWVudFZlcnRpY2FsbHkoXG4gICAgICAgIHdoZXJlWCxcbiAgICAgICAgTnVtYmVyKGV2ZW50LnRhcmdldC5kYXRhc2V0LnkpLFxuICAgICAgICBcInBsYXllckJvYXJkXCJcbiAgICApXG4gICAgKSB7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICByZXR1cm47XG4gICAgfVxuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuXG4gICAgY29uc3Qgc2Vjb25kQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIGBbZGF0YS15PVwiJHt3aGVyZVkgKyAxfVwiXVtkYXRhLXg9XCIke3doZXJlWH1cIl1gXG4gICAgKTtcbiAgICBjb25zdCB0aGlyZEJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBgW2RhdGEteT1cIiR7d2hlcmVZICsgMn1cIl1bZGF0YS14PVwiJHt3aGVyZVh9XCJdYFxuICAgICk7XG4gICAgc2Vjb25kQmxvY2suY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICB0aGlyZEJsb2NrLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG59IGVsc2Uge1xuICAgIGNvbnN0IHdoZXJlWSA9IE51bWJlcihldmVudC50YXJnZXQuZGF0YXNldC55KTtcblxuICAgIEFycmF5LmZyb20oYWN0aXZlQm94KS5mb3JFYWNoKChhY3RpdmUpID0+IHtcbiAgICBhY3RpdmUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICB9KTtcblxuICAgIEFycmF5LmZyb20oZXJyb3JCb3gpLmZvckVhY2goKGVycm9yKSA9PiB7XG4gICAgZXJyb3IuY2xhc3NMaXN0LnJlbW92ZShcImVycm9yXCIpO1xuICAgIH0pO1xuXG4gICAgaWYgKHdoZXJlWCA+IDcpIHtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xuICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFjaGVja1RocmVlUGxhY2VtZW50SG9yaXpvbnRhbCh3aGVyZVgsIHdoZXJlWSwgXCJwbGF5ZXJCb2FyZFwiKSkge1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiZXJyb3JcIik7XG4gICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIGV2ZW50LnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICBldmVudC50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xufVxufVxuXG5mdW5jdGlvbiBoaWdobGlnaHRUd29CbG9ja1NoaXAoZXZlbnQsIHR3b1ZlcnRpY2FsKSB7XG5jb25zdCB3aGVyZVggPSBOdW1iZXIoZXZlbnQudGFyZ2V0LmRhdGFzZXQueCk7XG5cbmlmICh0d29WZXJ0aWNhbCkge1xuICAgIEFycmF5LmZyb20oYWN0aXZlQm94KS5mb3JFYWNoKChhY3RpdmUpID0+IHtcbiAgICBhY3RpdmUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICB9KTtcblxuICAgIEFycmF5LmZyb20oZXJyb3JCb3gpLmZvckVhY2goKGVycm9yKSA9PiB7XG4gICAgZXJyb3IuY2xhc3NMaXN0LnJlbW92ZShcImVycm9yXCIpO1xuICAgIH0pO1xuICAgIGNvbnN0IHdoZXJlWSA9IE51bWJlcihldmVudC50YXJnZXQuZGF0YXNldC55KTtcblxuICAgIGlmICh3aGVyZVkgPiA4KSB7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChcbiAgICAhY2hlY2tUd29QbGFjZW1lbnRWZXJ0aWNhbGx5KFxuICAgICAgICB3aGVyZVgsXG4gICAgICAgIE51bWJlcihldmVudC50YXJnZXQuZGF0YXNldC55KSxcbiAgICAgICAgXCJwbGF5ZXJCb2FyZFwiXG4gICAgKVxuICAgICkge1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiZXJyb3JcIik7XG4gICAgcmV0dXJuO1xuICAgIH1cbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcblxuICAgIGNvbnN0IHNlY29uZEJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBgW2RhdGEteT1cIiR7d2hlcmVZICsgMX1cIl1bZGF0YS14PVwiJHt3aGVyZVh9XCJdYFxuICAgICk7XG4gICAgc2Vjb25kQmxvY2suY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbn0gZWxzZSB7XG4gICAgY29uc3Qgd2hlcmVZID0gTnVtYmVyKGV2ZW50LnRhcmdldC5kYXRhc2V0LnkpO1xuXG4gICAgQXJyYXkuZnJvbShhY3RpdmVCb3gpLmZvckVhY2goKGFjdGl2ZSkgPT4ge1xuICAgIGFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgIH0pO1xuXG4gICAgQXJyYXkuZnJvbShlcnJvckJveCkuZm9yRWFjaCgoZXJyb3IpID0+IHtcbiAgICBlcnJvci5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3JcIik7XG4gICAgfSk7XG5cbiAgICBpZiAod2hlcmVYID4gOCkge1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiZXJyb3JcIik7XG4gICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWNoZWNrVHdvUGxhY2VtZW50SG9yaXpvbnRhbCh3aGVyZVgsIHdoZXJlWSwgXCJwbGF5ZXJCb2FyZFwiKSkge1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiZXJyb3JcIik7XG4gICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIGV2ZW50LnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbn1cbn1cblxuZnVuY3Rpb24gaGlnaGxpZ2h0T25lQmxvY2tTaGlwKGV2ZW50KSB7XG5jb25zdCB3aGVyZVkgPSBOdW1iZXIoZXZlbnQudGFyZ2V0LmRhdGFzZXQueSk7XG5jb25zdCB3aGVyZVggPSBOdW1iZXIoZXZlbnQudGFyZ2V0LmRhdGFzZXQueCk7XG5cbkFycmF5LmZyb20oYWN0aXZlQm94KS5mb3JFYWNoKChhY3RpdmUpID0+IHtcbiAgICBhY3RpdmUuY2xpZW50SGVpZ2h0O1xuICAgIGFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xufSk7XG5cbkFycmF5LmZyb20oZXJyb3JCb3gpLmZvckVhY2goKGVycm9yKSA9PiB7XG4gICAgZXJyb3IuY2xhc3NMaXN0LnJlbW92ZShcImVycm9yXCIpO1xufSk7XG5cbmlmICh3aGVyZVggPiA5KSB7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICByZXR1cm47XG59XG5pZiAoIWNoZWNrT25lUGxhY2VtZW50KHdoZXJlWCwgd2hlcmVZLCBcInBsYXllckJvYXJkXCIpKSB7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICByZXR1cm47XG59XG5cbmV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xufVxuXG5leHBvcnQge1xuICAgIGFjdGl2ZUJveCxcbiAgICBlcnJvckJveCxcbiAgICBoaWdobGlnaHRGb3VyQmxvY2tTaGlwLFxuICAgIGhpZ2hsaWdodFRocmVlQmxvY2tTaGlwLFxuICAgIGhpZ2hsaWdodFR3b0Jsb2NrU2hpcCxcbiAgICBoaWdobGlnaHRPbmVCbG9ja1NoaXAsXG59O1xuIiwiaW1wb3J0IHtcbiAgICBzaGlwVXNlZCxcbiAgICBBZGRpbmdGb3VyQmxvY2tTaGlwLFxuICAgIEFkZGluZ1RocmVlQmxvY2tTaGlwLFxuICAgIEFkZGluZ1R3b0Jsb2NrU2hpcCxcbiAgICBBZGRpbmdPbmVCbG9ja1NoaXAsXG4gIH0gZnJvbSBcIi4vYWRkU2hpcC5qc1wiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21pemUod2hhdEJvYXJkKSB7XG4gICAgbGV0IGlzVmVydGljYWwgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICUgMiA9PT0gMCA/IHRydWUgOiBmYWxzZTtcbiAgICBsZXQgeFBvcztcbiAgICBsZXQgeVBvcztcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIHdoaWxlIChjb3VudCA8IDEpIHtcbiAgICAgICAgaWYgKGlzVmVydGljYWwpIHtcbiAgICAgICAgeFBvcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgJSAxMDtcbiAgICAgICAgeVBvcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgJSA3O1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBBZGRpbmdGb3VyQmxvY2tTaGlwKHhQb3MsIHlQb3MsIHdoYXRCb2FyZCwgXCJub0V2ZW50XCIsIGlzVmVydGljYWwpID09PVxuICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb3VudCsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICB4UG9zID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSAlIDc7XG4gICAgICAgIHlQb3MgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICUgMTA7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIEFkZGluZ0ZvdXJCbG9ja1NoaXAoeFBvcywgeVBvcywgd2hhdEJvYXJkLCBcIm5vRXZlbnRcIiwgaXNWZXJ0aWNhbCkgPT09XG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvdW50Kys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2hpcFVzZWQuY291bnQgPSAwO1xuICAgIGNvdW50ID0gMDtcbiAgICBpc1ZlcnRpY2FsID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSAlIDIgPT09IDAgPyB0cnVlIDogZmFsc2U7XG4gICAgd2hpbGUgKGNvdW50IDwgMikge1xuICAgICAgICBpZiAoaXNWZXJ0aWNhbCkge1xuICAgICAgICB4UG9zID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSAlIDEwO1xuICAgICAgICB5UG9zID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSAlIDg7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIEFkZGluZ1RocmVlQmxvY2tTaGlwKHhQb3MsIHlQb3MsIHdoYXRCb2FyZCwgXCJub0V2ZW50XCIsIGlzVmVydGljYWwpID09PVxuICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb3VudCsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICB4UG9zID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSAlIDg7XG4gICAgICAgIHlQb3MgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICUgMTA7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIEFkZGluZ1RocmVlQmxvY2tTaGlwKHhQb3MsIHlQb3MsIHdoYXRCb2FyZCwgXCJub0V2ZW50XCIsIGlzVmVydGljYWwpID09PVxuICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNoaXBVc2VkLmNvdW50ID0gMDtcbiAgICBjb3VudCA9IDA7XG4gICAgaXNWZXJ0aWNhbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgJSAyID09PSAwID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHdoaWxlIChjb3VudCA8IDMpIHtcbiAgICAgICAgaWYgKGlzVmVydGljYWwpIHtcbiAgICAgICAgeFBvcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgJSAxMDtcbiAgICAgICAgeVBvcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgJSA5O1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBBZGRpbmdUd29CbG9ja1NoaXAoeFBvcywgeVBvcywgd2hhdEJvYXJkLCBcIm5vRXZlbnRcIiwgaXNWZXJ0aWNhbCkgPT09XG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvdW50Kys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgIHhQb3MgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICUgOTtcbiAgICAgICAgeVBvcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgJSAxMDtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgQWRkaW5nVHdvQmxvY2tTaGlwKHhQb3MsIHlQb3MsIHdoYXRCb2FyZCwgXCJub0V2ZW50XCIsIGlzVmVydGljYWwpID09PVxuICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNoaXBVc2VkLmNvdW50ID0gMDtcbiAgICBjb3VudCA9IDA7XG4gICAgaXNWZXJ0aWNhbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgJSAyID09PSAwID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHdoaWxlIChjb3VudCA8IDQpIHtcbiAgICAgICAgaWYgKGlzVmVydGljYWwpIHtcbiAgICAgICAgeFBvcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgJSAxMDtcbiAgICAgICAgeVBvcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgJSAxMDtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgQWRkaW5nT25lQmxvY2tTaGlwKHhQb3MsIHlQb3MsIHdoYXRCb2FyZCwgXCJub0V2ZW50XCIsIGlzVmVydGljYWwpID09PVxuICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb3VudCsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICB4UG9zID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSAlIDEwO1xuICAgICAgICB5UG9zID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSAlIDEwO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBBZGRpbmdPbmVCbG9ja1NoaXAoeFBvcywgeVBvcywgd2hhdEJvYXJkLCBcIm5vRXZlbnRcIiwgaXNWZXJ0aWNhbCkgPT09XG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvdW50Kys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2hpcFVzZWQuY291bnQgPSAwO1xufVxuICAiLCJpbXBvcnQgeyB2ZXJ0aWNhbENoZWNrIH0gZnJvbSBcIi4vYWRkU2hpcC5qc1wiO1xuXG5mdW5jdGlvbiByb3RhdGVGb3VyQmxvY2tTaGlwKGdyaWRDb2x1bW5zKSB7XG4gIGlmIChncmlkQ29sdW1ucyA9PT0gNCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0U2hpcCA+IGRpdlwiKS5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID1cbiAgICAgIFwiMjBweFwiO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0U2hpcCA+IGRpdlwiKS5zdHlsZS5ncmlkVGVtcGxhdGVSb3dzID1cbiAgICAgIFwicmVwZWF0KDQsIDIwcHgpXCI7XG4gICAgdmVydGljYWxDaGVjay5mb3VyID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdFNoaXAgPiBkaXZcIikuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9XG4gICAgICBcInJlcGVhdCg0LCAyMHB4KVwiO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0U2hpcCA+IGRpdlwiKS5zdHlsZS5ncmlkVGVtcGxhdGVSb3dzID0gXCIyMHB4XCI7XG4gICAgdmVydGljYWxDaGVjay5mb3VyID0gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gcm90YXRlVGhyZWVCbG9ja1NoaXAoZ3JpZENvbHVtbnMpIHtcbiAgaWYgKGdyaWRDb2x1bW5zID09PSAzKSB7XG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlbGVjdFNoaXAgPiBkaXZcIilcbiAgICAgIC5mb3JFYWNoKChzaGlwKSA9PiAoc2hpcC5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gXCIyMHB4XCIpKTtcbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0U2hpcCA+IGRpdlwiKVxuICAgICAgLmZvckVhY2goKHNoaXApID0+IChzaGlwLnN0eWxlLmdyaWRUZW1wbGF0ZVJvd3MgPSBcInJlcGVhdCgzLCAyMHB4KVwiKSk7XG4gICAgdmVydGljYWxDaGVjay50aHJlZSA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlbGVjdFNoaXAgPiBkaXZcIilcbiAgICAgIC5mb3JFYWNoKChzaGlwKSA9PiAoc2hpcC5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gXCJyZXBlYXQoMywgMjBweClcIikpO1xuICAgIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvckFsbChcIi5zZWxlY3RTaGlwID4gZGl2XCIpXG4gICAgICAuZm9yRWFjaCgoc2hpcCkgPT4gKHNoaXAuc3R5bGUuZ3JpZFRlbXBsYXRlUm93cyA9IFwiMjBweFwiKSk7XG4gICAgdmVydGljYWxDaGVjay50aHJlZSA9IGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJvdGF0ZVR3b0Jsb2NrU2hpcChncmlkQ29sdW1ucykge1xuICBpZiAoZ3JpZENvbHVtbnMgPT09IDIpIHtcbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0U2hpcCA+IGRpdlwiKVxuICAgICAgLmZvckVhY2goKHNoaXApID0+IChzaGlwLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBcIjIwcHhcIikpO1xuICAgIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvckFsbChcIi5zZWxlY3RTaGlwID4gZGl2XCIpXG4gICAgICAuZm9yRWFjaCgoc2hpcCkgPT4gKHNoaXAuc3R5bGUuZ3JpZFRlbXBsYXRlUm93cyA9IFwicmVwZWF0KDIsIDIwcHgpXCIpKTtcbiAgICB2ZXJ0aWNhbENoZWNrLnR3byA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlbGVjdFNoaXAgPiBkaXZcIilcbiAgICAgIC5mb3JFYWNoKChzaGlwKSA9PiAoc2hpcC5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gXCJyZXBlYXQoMiwgMjBweClcIikpO1xuICAgIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvckFsbChcIi5zZWxlY3RTaGlwID4gZGl2XCIpXG4gICAgICAuZm9yRWFjaCgoc2hpcCkgPT4gKHNoaXAuc3R5bGUuZ3JpZFRlbXBsYXRlUm93cyA9IFwiMjBweFwiKSk7XG4gICAgdmVydGljYWxDaGVjay50d28gPSBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgeyByb3RhdGVGb3VyQmxvY2tTaGlwLCByb3RhdGVUaHJlZUJsb2NrU2hpcCwgcm90YXRlVHdvQmxvY2tTaGlwIH07XG4iLCJpbXBvcnQgeyBzaGlwVXNlZCB9IGZyb20gXCIuL2FkZFNoaXAuanNcIjtcblxuZnVuY3Rpb24gdXBkYXRlRm91ckJsb2NrU2hpcCh4LCB5LCB3aGF0Qm9hcmQsIGdhbWVCb2FyZCkge1xuICBpZiAod2hhdEJvYXJkID09PSBcInBsYXllckJvYXJkXCIpIHtcbiAgICBjb25zdCBmaXJzdEJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAuJHt3aGF0Qm9hcmR9ID4gW2RhdGEteT1cIiR7eX1cIl1bZGF0YS14PVwiJHt4fVwiXWBcbiAgICApO1xuICAgIGNvbnN0IHNlY29uZEJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAuJHt3aGF0Qm9hcmR9ID4gW2RhdGEteT1cIiR7eX1cIl1bZGF0YS14PVwiJHt4ICsgMX1cIl1gXG4gICAgKTtcbiAgICBjb25zdCB0aGlyZEJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAuJHt3aGF0Qm9hcmR9ID4gW2RhdGEteT1cIiR7eX1cIl1bZGF0YS14PVwiJHt4ICsgMn1cIl1gXG4gICAgKTtcbiAgICBjb25zdCBmb3VydGhCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7d2hhdEJvYXJkfSA+IFtkYXRhLXk9XCIke3l9XCJdW2RhdGEteD1cIiR7eCArIDN9XCJdYFxuICAgICk7XG5cbiAgICBmaXJzdEJsb2NrLnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcFwiLCBcImZvdXItYmxvY2stMFwiKTtcbiAgICBzZWNvbmRCbG9jay5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNoaXBcIiwgXCJmb3VyLWJsb2NrLTBcIik7XG4gICAgdGhpcmRCbG9jay5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNoaXBcIiwgXCJmb3VyLWJsb2NrLTBcIik7XG4gICAgZm91cnRoQmxvY2suc2V0QXR0cmlidXRlKFwiZGF0YS1zaGlwXCIsIFwiZm91ci1ibG9jay0wXCIpO1xuICB9XG4gIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4LCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wXCIpO1xuICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSwgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTBcIik7XG4gIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4ICsgMiwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMFwiKTtcbiAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHksIHggKyAzLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wXCIpO1xuXG4gIGlmICh4ID09PSAwICYmIHkgPT09IDApIHtcbiAgICAvL2NoZWNrIHRvcCBsZWZ0IGNvcm5lclxuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDEsIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCArIDIsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4ICsgMywgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSwgeCArIDQsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4ICsgNCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgfSBlbHNlIGlmICh4ID09PSA2ICYmIHkgPT09IDApIHtcbiAgICAvL2NoZWNrIHRvcCByaWdodCBjb25lclxuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDEsIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDEsIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCArIDIsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4ICsgMywgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgfSBlbHNlIGlmICh4ID09PSAwICYmIHkgPT09IDkpIHtcbiAgICAvL2NoZWNrIGJvdHRvbSBsZWZ0IGNvcm5lclxuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5IC0gMSwgeCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5IC0gMSwgeCArIDIsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4ICsgMywgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHggKyA0LCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4ICsgNCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgfSBlbHNlIGlmICh4ID09PSA2ICYmIHkgPT09IDkpIHtcbiAgICAvL2NoZWNrIGJvdHRvbSByaWdodCBjb3JuZXJcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSwgeCAtIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHgsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4ICsgMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHggKyAyLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5IC0gMSwgeCArIDMsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gIH0gZWxzZSBpZiAoeCA9PT0gMCkge1xuICAgIC8vY2hlY2sgZmlyc3QgY29sdW1uXG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4LCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4ICsgMiwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDEsIHggKyAyLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5IC0gMSwgeCArIDMsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4ICsgMywgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSwgeCArIDQsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4ICsgNCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDEsIHggKyA0LCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICB9IGVsc2UgaWYgKHggPT09IDYpIHtcbiAgICAvL2NoZWNrIGxhc3QgY29sdW1lO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCAtIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4LCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4ICsgMiwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDEsIHggKyAyLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5IC0gMSwgeCArIDMsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4ICsgMywgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgfSBlbHNlIGlmICh5ID09PSAwKSB7XG4gICAgLy9jaGVjayBmaXJzdCByb3dcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSwgeCAtIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDEsIHgsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4ICsgMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDEsIHggKyAyLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCArIDMsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4ICsgNCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSwgeCArIDQsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gIH0gZWxzZSBpZiAoeSA9PT0gOSkge1xuICAgIC8vY2hlY2sgbGFzdCByb3dcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSwgeCAtIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHgsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4ICsgMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHggKyAyLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5IC0gMSwgeCArIDMsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4ICsgNCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSwgeCArIDQsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gIH0gZWxzZSB7XG4gICAgLy9jaGVjayByZXN0IG9mIHRoZSBhcnJheVxuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCAtIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4LCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4ICsgMiwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDEsIHggKyAyLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5IC0gMSwgeCArIDMsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4ICsgMywgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSwgeCArIDQsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4ICsgNCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDEsIHggKyA0LCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICB9XG59XG5mdW5jdGlvbiB1cGRhdGVGb3VyQmxvY2tTaGlwVmVydGljYWxseSh4LCB5LCB3aGF0Qm9hcmQsIGdhbWVCb2FyZCkge1xuICBpZiAod2hhdEJvYXJkID09PSBcInBsYXllckJvYXJkXCIpIHtcbiAgICBjb25zdCBmaXJzdEJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAuJHt3aGF0Qm9hcmR9ID4gW2RhdGEteT1cIiR7eX1cIl1bZGF0YS14PVwiJHt4fVwiXWBcbiAgICApO1xuICAgIGNvbnN0IHNlY29uZEJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAuJHt3aGF0Qm9hcmR9ID4gW2RhdGEteT1cIiR7eSArIDF9XCJdW2RhdGEteD1cIiR7eH1cIl1gXG4gICAgKTtcbiAgICBjb25zdCB0aGlyZEJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAuJHt3aGF0Qm9hcmR9ID4gW2RhdGEteT1cIiR7eSArIDJ9XCJdW2RhdGEteD1cIiR7eH1cIl1gXG4gICAgKTtcbiAgICBjb25zdCBmb3VydGhCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7d2hhdEJvYXJkfSA+IFtkYXRhLXk9XCIke3kgKyAzfVwiXVtkYXRhLXg9XCIke3h9XCJdYFxuICAgICk7XG5cbiAgICBmaXJzdEJsb2NrLnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcFwiLCBcImZvdXItYmxvY2stMFwiKTtcbiAgICBzZWNvbmRCbG9jay5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNoaXBcIiwgXCJmb3VyLWJsb2NrLTBcIik7XG4gICAgdGhpcmRCbG9jay5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNoaXBcIiwgXCJmb3VyLWJsb2NrLTBcIik7XG4gICAgZm91cnRoQmxvY2suc2V0QXR0cmlidXRlKFwiZGF0YS1zaGlwXCIsIFwiZm91ci1ibG9jay0wXCIpO1xuICB9XG4gIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4LCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wXCIpO1xuICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDEsIHgsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTBcIik7XG4gIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMiwgeCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMFwiKTtcbiAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAzLCB4LCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wXCIpO1xuXG4gIGlmICh4ID09PSAwICYmIHkgPT09IDApIHtcbiAgICAvL2NoZWNrIHRvcCBsZWZ0IGNvcm5lcmBcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSwgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4ICsgMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDIsIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMywgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyA0LCB4ICsgMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDQsIHgsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gIH0gZWxzZSBpZiAoeCA9PT0gOSAmJiB5ID09PSAwKSB7XG4gICAgLy9jaGVjayB0b3AgcmlnaHQgY29ybmVyXG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHksIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCAtIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAyLCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDMsIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgNCwgeCAtIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyA0LCB4LCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICB9IGVsc2UgaWYgKHggPT09IDAgJiYgeSA9PT0gNikge1xuICAgIC8vY2hlY2sgYm90dG9tIGxlZnQgY29ybmVyXG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4LCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5IC0gMSwgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHksIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAyLCB4ICsgMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDMsIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICB9IGVsc2UgaWYgKHggPT09IDkgJiYgeSA9PT0gNikge1xuICAgIC8vY2hlY2sgYm90dG9tIHJpZ2h0IGNvcm5lclxuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5IC0gMSwgeCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDEsIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMiwgeCAtIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAzLCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgfSBlbHNlIGlmICh4ID09PSAwKSB7XG4gICAgLy9jaGVjayBmaXJzdCBjb2x1bW5cbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHgsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4ICsgMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSwgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4ICsgMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDIsIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMywgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyA0LCB4ICsgMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDQsIHgsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gIH0gZWxzZSBpZiAoeCA9PT0gOSkge1xuICAgIC8vY2hlY2sgbGFzdCBjb2x1bW5cbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHgsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSwgeCAtIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDIsIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMywgeCAtIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyA0LCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDQsIHgsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gIH0gZWxzZSBpZiAoeSA9PT0gMCkge1xuICAgIC8vY2hlY2sgZmlyc3Qgcm93XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHksIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4ICsgMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDEsIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAyLCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDIsIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMywgeCAtIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAzLCB4ICsgMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDQsIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgNCwgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyA0LCB4LCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICB9IGVsc2UgaWYgKHkgPT09IDYpIHtcbiAgICAvL2NoZWNrIGxhc3Qgcm93XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4LCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5IC0gMSwgeCAtIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4ICsgMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSwgeCAtIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHksIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCAtIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4ICsgMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDIsIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMiwgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAzLCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDMsIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICB9IGVsc2Uge1xuICAgIC8vY2hlY2sgcmVzdCBvZiB0aGUgYXJyYXlcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHgsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSwgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDEsIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMiwgeCAtIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAyLCB4ICsgMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDMsIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMywgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyA0LCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDQsIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgNCwgeCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgfVxufVxuZnVuY3Rpb24gdXBkYXRlVGhyZWVCbG9ja1NoaXAoeCwgeSwgd2hhdEJvYXJkLCBnYW1lQm9hcmQpIHtcbiAgaWYgKHdoYXRCb2FyZCA9PT0gXCJwbGF5ZXJCb2FyZFwiKSB7XG4gICAgY29uc3QgZmlyc3RCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7d2hhdEJvYXJkfSA+IFtkYXRhLXk9XCIke3l9XCJdW2RhdGEteD1cIiR7eH1cIl1gXG4gICAgKTtcbiAgICBjb25zdCBzZWNvbmRCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7d2hhdEJvYXJkfSA+IFtkYXRhLXk9XCIke3l9XCJdW2RhdGEteD1cIiR7eCArIDF9XCJdYFxuICAgICk7XG4gICAgY29uc3QgdGhpcmRCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7d2hhdEJvYXJkfSA+IFtkYXRhLXk9XCIke3l9XCJdW2RhdGEteD1cIiR7eCArIDJ9XCJdYFxuICAgICk7XG5cbiAgICBmaXJzdEJsb2NrLnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcFwiLCBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gKTtcbiAgICBzZWNvbmRCbG9jay5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNoaXBcIiwgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCk7XG4gICAgdGhpcmRCbG9jay5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNoaXBcIiwgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCk7XG4gIH1cblxuICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSwgeCwgd2hhdEJvYXJkLCBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gKTtcbiAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHksIHggKyAxLCB3aGF0Qm9hcmQsIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fWApO1xuICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSwgeCArIDIsIHdoYXRCb2FyZCwgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCk7XG5cbiAgaWYgKHggPT09IDAgJiYgeSA9PT0gMCkge1xuICAgIC8vY2hlY2sgdG9wIGxlZnQgY29ybmVyXG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggKyAzLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDIsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggKyAzLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSBpZiAoeCA9PT0gNyAmJiB5ID09PSAwKSB7XG4gICAgLy9jaGVjayB0b3AgcmlnaHQgY29uZXJcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDIsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgfSBlbHNlIGlmICh4ID09PSAwICYmIHkgPT09IDkpIHtcbiAgICAvL2NoZWNrIGJvdHRvbSBsZWZ0IGNvcm5lclxuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggKyAyLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4ICsgMyxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4ICsgMyxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9IGVsc2UgaWYgKHggPT09IDcgJiYgeSA9PT0gOSkge1xuICAgIC8vY2hlY2sgYm90dG9tIHJpZ2h0IGNvcm5lclxuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4ICsgMixcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9IGVsc2UgaWYgKHggPT09IDApIHtcbiAgICAvL2NoZWNrIGZpcnN0IGNvbHVtblxuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4ICsgMixcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDIsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCArIDMsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggKyAzLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4ICsgMyxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9IGVsc2UgaWYgKHggPT09IDcpIHtcbiAgICAvL2NoZWNrIGxhc3QgY29sdW1uXG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCArIDIsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggKyAyLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSBpZiAoeSA9PT0gMCkge1xuICAgIC8vY2hlY2sgZmlyc3Qgcm93XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggKyAyLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4ICsgMyxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4ICsgMyxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9IGVsc2UgaWYgKHkgPT09IDkpIHtcbiAgICAvL2NoZWNrIGxhc3Qgcm93XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggKyAyLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4ICsgMyxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4ICsgMyxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vY2hlY2sgcmVzdCBvZiB0aGUgYXJyYXlcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4ICsgMixcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDIsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCArIDMsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggKyAzLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4ICsgMyxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9XG59XG5mdW5jdGlvbiB1cGRhdGVUaHJlZUJsb2NrU2hpcFZlcnRpY2FsbHkoeCwgeSwgd2hhdEJvYXJkLCBnYW1lQm9hcmQpIHtcbiAgaWYgKHdoYXRCb2FyZCA9PT0gXCJwbGF5ZXJCb2FyZFwiKSB7XG4gICAgY29uc3QgZmlyc3RCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7d2hhdEJvYXJkfSA+IFtkYXRhLXk9XCIke3l9XCJdW2RhdGEteD1cIiR7eH1cIl1gXG4gICAgKTtcbiAgICBjb25zdCBzZWNvbmRCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7d2hhdEJvYXJkfSA+IFtkYXRhLXk9XCIke3kgKyAxfVwiXVtkYXRhLXg9XCIke3h9XCJdYFxuICAgICk7XG4gICAgY29uc3QgdGhpcmRCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7d2hhdEJvYXJkfSA+IFtkYXRhLXk9XCIke3kgKyAyfVwiXVtkYXRhLXg9XCIke3h9XCJdYFxuICAgICk7XG5cbiAgICBmaXJzdEJsb2NrLnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcFwiLCBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gKTtcbiAgICBzZWNvbmRCbG9jay5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNoaXBcIiwgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCk7XG4gICAgdGhpcmRCbG9jay5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNoaXBcIiwgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCk7XG4gIH1cbiAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHksIHgsIHdoYXRCb2FyZCwgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCk7XG4gIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCwgd2hhdEJvYXJkLCBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gKTtcbiAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAyLCB4LCB3aGF0Qm9hcmQsIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fWApO1xuXG4gIGlmICh4ID09PSAwICYmIHkgPT09IDApIHtcbiAgICAvL2NoZWNrIHRvcCBsZWZ0IGNvcm5lclxuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMixcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDMsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAzLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9IGVsc2UgaWYgKHggPT09IDkgJiYgeSA9PT0gMCkge1xuICAgIC8vY2hlY2sgdG9wIHJpZ2h0IGNvcm5lclxuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMixcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDMsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAzLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9IGVsc2UgaWYgKHggPT09IDAgJiYgeSA9PT0gNykge1xuICAgIC8vY2hlY2sgYm90dG9tIGxlZnQgY29ybmVyXG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMixcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSBpZiAoeCA9PT0gOSAmJiB5ID09PSA3KSB7XG4gICAgLy9jaGVjayBib3R0b20gcmlnaHQgY29ybmVyXG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMixcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSBpZiAoeCA9PT0gMCkge1xuICAgIC8vY2hlY2sgZmlyc3QgY29sdW1uXG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMixcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDMsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAzLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9IGVsc2UgaWYgKHggPT09IDkpIHtcbiAgICAvL2NoZWNrIGxhc3QgY29sdW1uXG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMixcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDMsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAzLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9IGVsc2UgaWYgKHkgPT09IDApIHtcbiAgICAvL2NoZWNrIGZpcnN0IHJvd1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDIsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAyLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMyxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDMsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAzLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9IGVsc2UgaWYgKHkgPT09IDcpIHtcbiAgICAvL2NoZWNrIGxhc3Qgcm93XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAyLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMixcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy9jaGVjayByZXN0IG9mIHRoZSBhcnJheVxuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMixcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDIsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAzLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMyxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDMsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlVHdvQmxvY2tTaGlwKHgsIHksIHdoYXRCb2FyZCwgZ2FtZUJvYXJkKSB7XG4gIGlmICh3aGF0Qm9hcmQgPT09IFwicGxheWVyQm9hcmRcIikge1xuICAgIGNvbnN0IGZpcnN0QmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYC4ke3doYXRCb2FyZH0gPiBbZGF0YS15PVwiJHt5fVwiXVtkYXRhLXg9XCIke3h9XCJdYFxuICAgICk7XG4gICAgY29uc3Qgc2Vjb25kQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYC4ke3doYXRCb2FyZH0gPiBbZGF0YS15PVwiJHt5fVwiXVtkYXRhLXg9XCIke3ggKyAxfVwiXWBcbiAgICApO1xuXG4gICAgZmlyc3RCbG9jay5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNoaXBcIiwgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fWApO1xuICAgIHNlY29uZEJsb2NrLnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcFwiLCBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCk7XG4gIH1cblxuICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSwgeCwgd2hhdEJvYXJkLCBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCk7XG4gIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4ICsgMSwgd2hhdEJvYXJkLCBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCk7XG5cbiAgaWYgKHggPT09IDAgJiYgeSA9PT0gMCkge1xuICAgIC8vY2hlY2sgdG9wIGxlZnQgY29ybmVyXG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggKyAyLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDIsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSBpZiAoeCA9PT0gOCAmJiB5ID09PSAwKSB7XG4gICAgLy9jaGVjayB0b3AgcmlnaHQgY29uZXJcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgfSBlbHNlIGlmICh4ID09PSAwICYmIHkgPT09IDkpIHtcbiAgICAvL2NoZWNrIGJvdHRvbSBsZWZ0IGNvcm5lclxuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCArIDIsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggKyAyLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9IGVsc2UgaWYgKHggPT09IDggJiYgeSA9PT0gOSkge1xuICAgIC8vY2hlY2sgYm90dG9tIHJpZ2h0IGNvcm5lclxuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9IGVsc2UgaWYgKHggPT09IDApIHtcbiAgICAvL2NoZWNrIGZpcnN0IGNvbHVtblxuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCArIDIsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4ICsgMixcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCArIDIsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSBpZiAoeCA9PT0gOCkge1xuICAgIC8vY2hlY2sgbGFzdCBjb2x1bW5cbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9IGVsc2UgaWYgKHkgPT09IDApIHtcbiAgICAvL2NoZWNrIGZpcnN0IHJvd1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDIsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggKyAyLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9IGVsc2UgaWYgKHkgPT09IDkpIHtcbiAgICAvL2NoZWNrIGxhc3Qgcm93XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4ICsgMixcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCArIDIsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy9jaGVjayByZXN0IG9mIHRoZSBhcnJheVxuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4ICsgMixcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggKyAyLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4ICsgMixcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVUd29CbG9ja1NoaXBWZXJ0aWNhbGx5KHgsIHksIHdoYXRCb2FyZCwgZ2FtZUJvYXJkKSB7XG4gIGlmICh3aGF0Qm9hcmQgPT09IFwicGxheWVyQm9hcmRcIikge1xuICAgIGNvbnN0IGZpcnN0QmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYC4ke3doYXRCb2FyZH0gPiBbZGF0YS15PVwiJHt5fVwiXVtkYXRhLXg9XCIke3h9XCJdYFxuICAgICk7XG4gICAgY29uc3Qgc2Vjb25kQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYC4ke3doYXRCb2FyZH0gPiBbZGF0YS15PVwiJHt5ICsgMX1cIl1bZGF0YS14PVwiJHt4fVwiXWBcbiAgICApO1xuXG4gICAgZmlyc3RCbG9jay5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNoaXBcIiwgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fWApO1xuICAgIHNlY29uZEJsb2NrLnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcFwiLCBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCk7XG4gIH1cblxuICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSwgeCwgd2hhdEJvYXJkLCBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCk7XG4gIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCwgd2hhdEJvYXJkLCBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCk7XG5cbiAgaWYgKHggPT09IDAgJiYgeSA9PT0gMCkge1xuICAgIC8vY2hlY2sgdG9wIGxlZnQgY29ybmVyXG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDIsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMixcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSBpZiAoeCA9PT0gOSAmJiB5ID09PSAwKSB7XG4gICAgLy9jaGVjayB0b3AgcmlnaHQgY29ybmVyXG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDIsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMixcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSBpZiAoeCA9PT0gMCAmJiB5ID09PSA4KSB7XG4gICAgLy9jaGVjayBib3R0b20gbGVmdCBjb3JuZXJcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgfSBlbHNlIGlmICh4ID09PSA5ICYmIHkgPT09IDgpIHtcbiAgICAvL2NoZWNrIGJvdHRvbSByaWdodCBjb3JuZXJcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgfSBlbHNlIGlmICh4ID09PSAwKSB7XG4gICAgLy9jaGVjayBmaXJzdCBjb2x1bW5cbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMixcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAyLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgfSBlbHNlIGlmICh4ID09PSA5KSB7XG4gICAgLy9jaGVjayBsYXN0IGNvbHVtblxuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAyLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDIsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9IGVsc2UgaWYgKHkgPT09IDApIHtcbiAgICAvL2NoZWNrIGZpcnN0IHJvd1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAyLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDIsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMixcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSBpZiAoeSA9PT0gOCkge1xuICAgIC8vY2hlY2sgbGFzdCByb3dcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vY2hlY2sgcmVzdCBvZiB0aGUgYXJyYXlcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAyLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDIsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMixcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlT25lQmxvY2tTaGlwKHgsIHksIHdoYXRCb2FyZCwgZ2FtZUJvYXJkKSB7XG4gIGlmICh3aGF0Qm9hcmQgPT09IFwicGxheWVyQm9hcmRcIikge1xuICAgIGNvbnN0IGZpcnN0QmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYC4ke3doYXRCb2FyZH0gPiBbZGF0YS15PVwiJHt5fVwiXVtkYXRhLXg9XCIke3h9XCJdYFxuICAgICk7XG5cbiAgICBmaXJzdEJsb2NrLnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcFwiLCBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCk7XG4gIH1cblxuICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSwgeCwgd2hhdEJvYXJkLCBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCk7XG5cbiAgaWYgKHggPT09IDAgJiYgeSA9PT0gMCkge1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGBvbmUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGBvbmUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgfSBlbHNlIGlmICh4ID09PSA5ICYmIHkgPT09IDApIHtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGBvbmUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSBpZiAoeCA9PT0gMCAmJiB5ID09PSA5KSB7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9IGVsc2UgaWYgKHggPT09IDkgJiYgeSA9PT0gOSkge1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGBvbmUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGBvbmUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgfSBlbHNlIGlmICh4ID09PSAwKSB7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGBvbmUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9IGVsc2UgaWYgKHggPT09IDkpIHtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGBvbmUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGBvbmUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSBpZiAoeSA9PT0gMCkge1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGBvbmUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGBvbmUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGBvbmUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgfSBlbHNlIGlmICh5ID09PSA5KSB7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGBvbmUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGBvbmUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9XG59XG5leHBvcnQge1xuICB1cGRhdGVGb3VyQmxvY2tTaGlwLFxuICB1cGRhdGVGb3VyQmxvY2tTaGlwVmVydGljYWxseSxcbiAgdXBkYXRlVGhyZWVCbG9ja1NoaXAsXG4gIHVwZGF0ZVRocmVlQmxvY2tTaGlwVmVydGljYWxseSxcbiAgdXBkYXRlVHdvQmxvY2tTaGlwLFxuICB1cGRhdGVUd29CbG9ja1NoaXBWZXJ0aWNhbGx5LFxuICB1cGRhdGVPbmVCbG9ja1NoaXAsXG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtcbiAgQWRkaW5nRm91ckJsb2NrU2hpcCxcbiAgQWRkaW5nVGhyZWVCbG9ja1NoaXAsXG4gIEFkZGluZ1R3b0Jsb2NrU2hpcCxcbiAgQWRkaW5nT25lQmxvY2tTaGlwLFxuICBjdXJyRm91cixcbiAgY3VyclRocmVlLFxuICBjdXJyVHdvLFxuICBjdXJyT25lLFxuICB2ZXJ0aWNhbENoZWNrLFxufSBmcm9tIFwiLi9tZW51X2hlbHBlci9hZGRTaGlwLmpzXCI7XG5pbXBvcnQgeyBhZGRCZWdpbkJ1dHRvbiB9IGZyb20gXCIuL21lbnVfaGVscGVyL2JlZ2luQnV0dG9uLmpzXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZUZvdXIgfSBmcm9tIFwiLi9tZW51X2hlbHBlci9nZW5lcmF0ZVNoaXAuanNcIjtcbmltcG9ydCB7XG4gIGhpZ2hsaWdodE9uZUJsb2NrU2hpcCxcbiAgaGlnaGxpZ2h0VHdvQmxvY2tTaGlwLFxuICBoaWdobGlnaHRUaHJlZUJsb2NrU2hpcCxcbiAgaGlnaGxpZ2h0Rm91ckJsb2NrU2hpcCxcbiAgYWN0aXZlQm94LFxuICBlcnJvckJveCxcbn0gZnJvbSBcIi4vbWVudV9oZWxwZXIvaGlnaGxpZ2h0U2hpcC5qc1wiO1xuaW1wb3J0IHsgcmFuZG9taXplIH0gZnJvbSBcIi4vbWVudV9oZWxwZXIvcmFuZG9taXplU2hpcC5qc1wiO1xuaW1wb3J0IHtcbiAgcm90YXRlRm91ckJsb2NrU2hpcCxcbiAgcm90YXRlVGhyZWVCbG9ja1NoaXAsXG4gIHJvdGF0ZVR3b0Jsb2NrU2hpcCxcbn0gZnJvbSBcIi4vbWVudV9oZWxwZXIvcm90YXRlU2hpcC5qc1wiO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uIChlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbn0pO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlbGVjdFNoaXAgPiBkaXZcIikuZm9yRWFjaCgoc2hpcCkgPT5cbiAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFxuICAgIFwiZHJhZ3N0YXJ0XCIsXG4gICAgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHRcIiwgZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSk7XG4gICAgICBldmVudC50YXJnZXQuc3R5bGUub3BhY2l0eSA9IFwiMC41XCI7XG4gICAgfSxcbiAgICBmYWxzZVxuICApXG4pO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICBcImRyYWdlbmRcIixcbiAgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgZXZlbnQudGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSBcIlwiO1xuICAgIEFycmF5LmZyb20oYWN0aXZlQm94KS5mb3JFYWNoKChhY3RpdmUpID0+IHtcbiAgICAgIGFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgIH0pO1xuICB9LFxuICBmYWxzZVxuKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgXCJkcmFnb3ZlclwiLFxuICBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAvLyBwcmV2ZW50IGRlZmF1bHQgdG8gYWxsb3cgZHJvcFxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH0sXG4gIGZhbHNlXG4pO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllckJvYXJkXCIpLmFkZEV2ZW50TGlzdGVuZXIoXG4gIFwiZHJhZ2VudGVyXCIsXG4gIGZ1bmN0aW9uIChldmVudCkge1xuICAgIC8vIGhpZ2hsaWdodCBwb3RlbnRpYWwgZHJvcCB0YXJnZXQgd2hlbiB0aGUgZHJhZ2dhYmxlIGVsZW1lbnQgZW50ZXJzIGl0XG4gICAgaWYgKGN1cnJGb3VyKSB7XG4gICAgICBoaWdobGlnaHRGb3VyQmxvY2tTaGlwKGV2ZW50LCB2ZXJ0aWNhbENoZWNrLmZvdXIpO1xuICAgIH0gZWxzZSBpZiAoY3VyclRocmVlKSB7XG4gICAgICBoaWdobGlnaHRUaHJlZUJsb2NrU2hpcChldmVudCwgdmVydGljYWxDaGVjay50aHJlZSk7XG4gICAgfSBlbHNlIGlmIChjdXJyVHdvKSB7XG4gICAgICBoaWdobGlnaHRUd29CbG9ja1NoaXAoZXZlbnQsIHZlcnRpY2FsQ2hlY2sudHdvKTtcbiAgICB9IGVsc2UgaWYgKGN1cnJPbmUpIHtcbiAgICAgIGhpZ2hsaWdodE9uZUJsb2NrU2hpcChldmVudCk7XG4gICAgfVxuICB9LFxuICBmYWxzZVxuKTtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3RTaGlwXCIpLmFkZEV2ZW50TGlzdGVuZXIoXG4gIC8vcmVtb3ZlcyBoaWdobGlnaHQgaWYgZHJhZyBib3ggZ28gYmFja1xuICBcImRyYWdlbnRlclwiLFxuICBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBBcnJheS5mcm9tKGFjdGl2ZUJveCkuZm9yRWFjaCgoYWN0aXZlKSA9PiB7XG4gICAgICBhY3RpdmUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICB9KTtcbiAgfSxcbiAgZmFsc2Vcbik7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyQm9hcmRcIikuYWRkRXZlbnRMaXN0ZW5lcihcbiAgXCJkcm9wXCIsXG4gIGZ1bmN0aW9uIChldmVudCkge1xuICAgIC8vIHByZXZlbnQgZGVmYXVsdCBhY3Rpb24gKG9wZW4gYXMgbGluayBmb3Igc29tZSBlbGVtZW50cylcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyAvL3ByZXZlbnQgYm9keSBkcm9wIGV2ZW50IGZyb20gdHJpZ2dlcmluZ1xuXG4gICAgaWYgKGN1cnJGb3VyKSB7XG4gICAgICBBZGRpbmdGb3VyQmxvY2tTaGlwKFxuICAgICAgICBldmVudC50YXJnZXQuZGF0YXNldC54LFxuICAgICAgICBldmVudC50YXJnZXQuZGF0YXNldC55LFxuICAgICAgICBcInBsYXllckJvYXJkXCIsXG4gICAgICAgIGV2ZW50LFxuICAgICAgICB2ZXJ0aWNhbENoZWNrLmZvdXJcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChjdXJyVGhyZWUpIHtcbiAgICAgIEFkZGluZ1RocmVlQmxvY2tTaGlwKFxuICAgICAgICBldmVudC50YXJnZXQuZGF0YXNldC54LFxuICAgICAgICBldmVudC50YXJnZXQuZGF0YXNldC55LFxuICAgICAgICBcInBsYXllckJvYXJkXCIsXG4gICAgICAgIGV2ZW50LFxuICAgICAgICB2ZXJ0aWNhbENoZWNrLnRocmVlXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoY3VyclR3bykge1xuICAgICAgQWRkaW5nVHdvQmxvY2tTaGlwKFxuICAgICAgICBldmVudC50YXJnZXQuZGF0YXNldC54LFxuICAgICAgICBldmVudC50YXJnZXQuZGF0YXNldC55LFxuICAgICAgICBcInBsYXllckJvYXJkXCIsXG4gICAgICAgIGV2ZW50LFxuICAgICAgICB2ZXJ0aWNhbENoZWNrLnR3b1xuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKGN1cnJPbmUpIHtcbiAgICAgIEFkZGluZ09uZUJsb2NrU2hpcChcbiAgICAgICAgZXZlbnQudGFyZ2V0LmRhdGFzZXQueCxcbiAgICAgICAgZXZlbnQudGFyZ2V0LmRhdGFzZXQueSxcbiAgICAgICAgXCJwbGF5ZXJCb2FyZFwiLFxuICAgICAgICBldmVudFxuICAgICAgKTtcbiAgICB9XG4gICAgQXJyYXkuZnJvbShlcnJvckJveCkuZm9yRWFjaCgoZXJyb3IpID0+IHtcbiAgICAgIGVycm9yLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvclwiKTtcbiAgICB9KTtcbiAgfSxcbiAgZmFsc2Vcbik7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXG4gIFwiZHJvcFwiLFxuICBmdW5jdGlvbiAoZSkge1xuICAgIEFycmF5LmZyb20oZXJyb3JCb3gpLmZvckVhY2goKGVycm9yKSA9PiB7XG4gICAgICBlcnJvci5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3JcIik7XG4gICAgfSk7XG4gIH0sXG4gIGZhbHNlXG4pO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJhbmRvbWl6ZVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc2V0XCIpLmNsaWNrKCk7XG4gIHJhbmRvbWl6ZShcInBsYXllckJvYXJkXCIpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdFNoaXBcIikudGV4dENvbnRlbnQgPSBcIlwiO1xuICBhZGRCZWdpbkJ1dHRvbigpO1xufSk7XG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJvdGF0ZVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBnZXR0aGlzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3RTaGlwID4gZGl2XCIpO1xuXG4gIGxldCBncmlkQ29sdW1ucyA9IGdldENvbXB1dGVkU3R5bGUoZ2V0dGhpcylcbiAgICAuZ2V0UHJvcGVydHlWYWx1ZShcImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiKVxuICAgIC5zcGxpdChcIiBcIikubGVuZ3RoO1xuXG4gIGlmIChjdXJyRm91cikge1xuICAgIHJvdGF0ZUZvdXJCbG9ja1NoaXAoZ3JpZENvbHVtbnMpO1xuICB9IGVsc2UgaWYgKGN1cnJUaHJlZSkge1xuICAgIHJvdGF0ZVRocmVlQmxvY2tTaGlwKGdyaWRDb2x1bW5zKTtcbiAgfSBlbHNlIGlmIChjdXJyVHdvKSB7XG4gICAgcm90YXRlVHdvQmxvY2tTaGlwKGdyaWRDb2x1bW5zKTtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIGNsZWFuQm94U3ltYm9sKGJveGVzKSB7XG4gIGJveGVzLmZvckVhY2goKHN5bWJvbCkgPT4ge1xuICAgIHN5bWJvbC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgc3ltYm9sLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBzeW1ib2wucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIik7XG4gIH0pO1xufVxuZnVuY3Rpb24gY2xlYW5QbGF5ZXJCb2FyZCgpIHtcbiAgY29uc3QgUExBWUVSX0JPQVJEX0JPWEVTID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGF5ZXJCb2FyZCA+IC5ib3hcIik7XG4gIFBMQVlFUl9CT0FSRF9CT1hFUy5mb3JFYWNoKChib3gpID0+IHtcbiAgICBjb25zdCBuZXdCb3ggPSBib3guY2xvbmVOb2RlKHRydWUpO1xuICAgIGJveC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdCb3gsIGJveCk7XG4gICAgbmV3Qm94LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIlwiO1xuICAgIE9iamVjdC5rZXlzKG5ld0JveC5kYXRhc2V0KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmIChrZXkgPT09IFwieFwiIHx8IGtleSA9PT0gXCJ5XCIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZGVsZXRlIG5ld0JveC5kYXRhc2V0W2tleV07XG4gICAgfSk7XG4gICAgbmV3Qm94LmNsYXNzTmFtZSA9IFwiYm94XCI7XG4gICAgbmV3Qm94LnJlbW92ZUF0dHJpYnV0ZShcInN0eWxlXCIpO1xuICB9KTtcbiAgY29uc3QgUExBWUVSX0JPQVJEX0JPWF9TWU1CT0wgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgIFwiLnBsYXllckJvYXJkID4gLmJveCA+IC5zeW1ib2xcIlxuICApO1xuXG4gIGNsZWFuQm94U3ltYm9sKFBMQVlFUl9CT0FSRF9CT1hfU1lNQk9MKTtcbn1cblxuZnVuY3Rpb24gY2xlYW5Db21wdXRlckJvYXJkKCkge1xuICBjb25zdCBDT01QVVRFUl9CT0FSRF9CT1hFUyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgXCIuY29tcHV0ZXJCb2FyZCA+IC5ib3hcIlxuICApO1xuICBDT01QVVRFUl9CT0FSRF9CT1hFUy5mb3JFYWNoKChib3gpID0+IHtcbiAgICBib3guY2xhc3NOYW1lID0gXCJib3hcIjtcbiAgICBib3gucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIik7XG4gIH0pO1xuXG4gIGNvbnN0IENPTVBVVEVSX0JPQVJEX0JPWEVTX1NZTUJPTCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgXCIuY29tcHV0ZXJCb2FyZCA+IC5ib3ggPiAuc3ltYm9sXCJcbiAgKTtcbiAgY2xlYW5Cb3hTeW1ib2woQ09NUFVURVJfQk9BUkRfQk9YRVNfU1lNQk9MKTtcblxuICBjb25zdCBvbGRDb21wdXRlckJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wdXRlckJvYXJkXCIpO1xuICBjb25zdCBuZXdDb21wdXRlckJvYXJkID0gZG9jdW1lbnRcbiAgICAucXVlcnlTZWxlY3RvcihcIi5jb21wdXRlckJvYXJkXCIpXG4gICAgLmNsb25lTm9kZSh0cnVlKTtcbiAgZG9jdW1lbnRcbiAgICAucXVlcnlTZWxlY3RvcihcIi5jb21wdXRlckJvYXJkQ29udGFpbmVyXCIpXG4gICAgLnJlcGxhY2VDaGlsZChuZXdDb21wdXRlckJvYXJkLCBvbGRDb21wdXRlckJvYXJkKTtcbn1cblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXN0YXJ0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXG4gIFwiY2xpY2tcIiwgXG4gIGZ1bmN0aW9uIChlKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXNldFwiKS5jbGljaygpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maW5pc2hcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmluaXNoXCIpLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpXG4gICAgICAuaW5zZXJ0QmVmb3JlKFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllckJvYXJkXCIpLFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc2V0XCIpXG4gICAgICApO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluQ29udGVudFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluQ29udGVudFwiKS5zdHlsZS5maWx0ZXIgPSBcIlwiO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbkNvbnRlbnRcIikuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiXCI7XG5cbiAgICBjbGVhblBsYXllckJvYXJkKCk7XG5cbiAgICBjbGVhbkNvbXB1dGVyQm9hcmQoKTtcbn0pOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==