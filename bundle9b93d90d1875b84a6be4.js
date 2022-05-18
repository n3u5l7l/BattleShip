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
      this.#foundDirMove.y = this.#foundDirMove.y - this.#foundDirLength + 1;
      this.#foundDir = "up";
    } else if (this.#foundDirMove.x < 0) {
      this.#foundDirMove.x = this.#foundDirMove.x + this.#foundDirLength + 1;
      this.#foundDir = "right";
    } else if (this.#foundDirMove.x > 9) {
      this.#foundDirMove.x = this.#foundDirMove.x - this.#foundDirLength + 1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLE1BQU0sOERBQVMsSUFBSSxVQUFVO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUUwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZFNEI7QUFDdEQ7QUFDQTtBQUNBLEtBQUssOERBQVM7QUFDZCxLQUFLLDhEQUFTO0FBQ2QsS0FBSyw4REFBUztBQUNkLEtBQUssOERBQVM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssOERBQVM7QUFDZCxLQUFLLDhEQUFTO0FBQ2QsS0FBSyw4REFBUztBQUNkLEtBQUssOERBQVM7QUFDZDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLLDhEQUFTO0FBQ2QsS0FBSyw4REFBUztBQUNkLEtBQUssOERBQVM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssOERBQVM7QUFDZCxLQUFLLDhEQUFTO0FBQ2QsS0FBSyw4REFBUztBQUNkO0FBQ0E7O0FBRUE7QUFDQSxVQUFVLDhEQUFTLHNCQUFzQiw4REFBUztBQUNsRDs7QUFFQTtBQUNBLFVBQVUsOERBQVMsc0JBQXNCLDhEQUFTO0FBQ2xEOztBQUVBO0FBQ0EsVUFBVSw4REFBUztBQUNuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLFdBQVcsYUFBYSxFQUFFLGFBQWEsRUFBRTtBQUNuRDtBQUNBO0FBQ0EsVUFBVSxXQUFXLGFBQWEsTUFBTSxhQUFhLEVBQUU7QUFDdkQ7QUFDQTtBQUNBLFVBQVUsV0FBVyxhQUFhLE1BQU0sYUFBYSxFQUFFO0FBQ3ZEO0FBQ0E7QUFDQSxVQUFVLFdBQVcsYUFBYSxNQUFNLGFBQWEsRUFBRTtBQUN2RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsV0FBVyxhQUFhLEVBQUUsYUFBYSxFQUFFO0FBQ25EO0FBQ0E7QUFDQSxVQUFVLFdBQVcsYUFBYSxFQUFFLGFBQWEsTUFBTTtBQUN2RDtBQUNBO0FBQ0EsVUFBVSxXQUFXLGFBQWEsRUFBRSxhQUFhLE1BQU07QUFDdkQ7O0FBRUEsd0RBQXdELHVEQUFjLENBQUM7QUFDdkUseURBQXlELHVEQUFjLENBQUM7QUFDeEUsd0RBQXdELHVEQUFjLENBQUM7QUFDdkU7O0FBRUEsd0RBQXdELHVEQUFjLENBQUM7QUFDdkUsNERBQTRELHVEQUFjLENBQUM7QUFDM0UsNERBQTRELHVEQUFjLENBQUM7O0FBRTNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsV0FBVyxhQUFhLEVBQUUsYUFBYSxFQUFFO0FBQ25EO0FBQ0E7QUFDQSxVQUFVLFdBQVcsYUFBYSxNQUFNLGFBQWEsRUFBRTtBQUN2RDtBQUNBO0FBQ0EsVUFBVSxXQUFXLGFBQWEsTUFBTSxhQUFhLEVBQUU7QUFDdkQ7O0FBRUEsd0RBQXdELHVEQUFjLENBQUM7QUFDdkUseURBQXlELHVEQUFjLENBQUM7QUFDeEUsd0RBQXdELHVEQUFjLENBQUM7QUFDdkU7QUFDQSx3REFBd0QsdURBQWMsQ0FBQztBQUN2RSw0REFBNEQsdURBQWMsQ0FBQztBQUMzRSw0REFBNEQsdURBQWMsQ0FBQzs7QUFFM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix1REFBYyxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdURBQWMsQ0FBQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVEQUFjLENBQUM7QUFDcEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsV0FBVyxhQUFhLEVBQUUsYUFBYSxFQUFFO0FBQ25EO0FBQ0E7QUFDQSxVQUFVLFdBQVcsYUFBYSxFQUFFLGFBQWEsTUFBTTtBQUN2RDs7QUFFQSxzREFBc0QsdURBQWMsQ0FBQztBQUNyRSx1REFBdUQsdURBQWMsQ0FBQztBQUN0RTs7QUFFQSxzREFBc0QsdURBQWMsQ0FBQztBQUNyRSwwREFBMEQsdURBQWMsQ0FBQzs7QUFFekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsV0FBVyxhQUFhLEVBQUUsYUFBYSxFQUFFO0FBQ25EO0FBQ0E7QUFDQSxVQUFVLFdBQVcsYUFBYSxNQUFNLGFBQWEsRUFBRTtBQUN2RDs7QUFFQSxzREFBc0QsdURBQWMsQ0FBQztBQUNyRSx1REFBdUQsdURBQWMsQ0FBQztBQUN0RTs7QUFFQSxzREFBc0QsdURBQWMsQ0FBQztBQUNyRSwwREFBMEQsdURBQWMsQ0FBQzs7QUFFekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsV0FBVyxhQUFhLEVBQUUsYUFBYSxFQUFFO0FBQ25EOztBQUVBLHNEQUFzRCx1REFBYyxDQUFDO0FBQ3JFOztBQUVBLHNEQUFzRCx1REFBYyxDQUFDOztBQUVyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1REFBYyxDQUFDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdURBQWMsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFjLENBQUM7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QTtBQUNBO0FBQ0EsUUFBUSxzRUFBaUI7QUFDekI7QUFDQSxNQUFNLFNBQVMsNERBQU87QUFDdEIsTUFBTSwyRUFBa0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxtRUFBUTtBQUN2QjtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG1FQUFRO0FBQ3ZCO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsd0VBQVM7QUFDWDtBQUNBLEVBQUUsMkVBQWM7QUFDaEIsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTSw2REFBUTtBQUNkLElBQUksK0VBQW1CO0FBQ3ZCLElBQUksU0FBUyw4REFBUztBQUN0QixJQUFJLGdGQUFvQjtBQUN4QixJQUFJLFNBQVMsNERBQU87QUFDcEIsSUFBSSw4RUFBa0I7QUFDdEI7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9HYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvUGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tZW51X2hlbHBlci9hZGRTaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbWVudV9oZWxwZXIvYmVnaW5CdXR0b24uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tZW51X2hlbHBlci9jaGVja1NoaXBQbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tZW51X2hlbHBlci9nZW5lcmF0ZVNoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tZW51X2hlbHBlci9oaWdobGlnaHRTaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbWVudV9oZWxwZXIvcmFuZG9taXplU2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21lbnVfaGVscGVyL3JvdGF0ZVNoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tZW51X2hlbHBlci91cGRhdGVTaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXAuanNcIjtcbmNsYXNzIEdhbWVCb2FyZCB7XG4gICNwbGF5ZXJTaGlwSW5mbztcbiAgI3BsYXllckJvYXJkO1xuICAjZW5lbXlTaGlwSW5mbztcbiAgI2VuZW15Qm9hcmQ7XG4gICNwbGF5ZXJUdXJuO1xuICAjZW5lbXlUdXJuO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuI3BsYXllclR1cm4gPSB0cnVlO1xuICAgIHRoaXMuI3BsYXllclNoaXBJbmZvID0gbmV3IFNoaXAoKTtcbiAgICB0aGlzLiNwbGF5ZXJCb2FyZCA9IFtdO1xuXG4gICAgdGhpcy4jZW5lbXlUdXJuID0gZmFsc2U7XG4gICAgdGhpcy4jZW5lbXlTaGlwSW5mbyA9IG5ldyBTaGlwKCk7XG4gICAgdGhpcy4jZW5lbXlCb2FyZCA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICB0aGlzLiNwbGF5ZXJCb2FyZFtpXSA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIHRoaXMuI3BsYXllckJvYXJkW2ldLnB1c2goXCJcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICB0aGlzLiNlbmVteUJvYXJkW2ldID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgdGhpcy4jZW5lbXlCb2FyZFtpXS5wdXNoKFwiXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlY2lldmVBdHRhY2soeCwgeSwgdGFyZ2V0LCBoYXZlUmFuZG9tQXR0YWNrKSB7XG4gICAgY29uc3QgVEhJU19TSElQX0lORk8gPVxuICAgICAgdGFyZ2V0LnBhcmVudE5vZGUuY2xhc3NOYW1lID09PSBcInBsYXllckJvYXJkXCJcbiAgICAgICAgPyB0aGlzLiNwbGF5ZXJTaGlwSW5mb1xuICAgICAgICA6IHRoaXMuI2VuZW15U2hpcEluZm87XG4gICAgY29uc3QgVEhJU19CT0FSRCA9XG4gICAgICB0YXJnZXQucGFyZW50Tm9kZS5jbGFzc05hbWUgPT09IFwicGxheWVyQm9hcmRcIlxuICAgICAgICA/IHRoaXMuI3BsYXllckJvYXJkXG4gICAgICAgIDogdGhpcy4jZW5lbXlCb2FyZDtcbiAgICB0aGlzLnN3aXRjaFR1cm4oKTtcbiAgICBpZiAoVEhJU19CT0FSRFt5XVt4XSAmJiBUSElTX0JPQVJEW3ldW3hdLnNwbGl0KFwiLVwiKS5sZW5ndGggPT09IDMpIHtcbiAgICAgIGNvbnN0IHRoaXNTaGlwID0gVEhJU19TSElQX0lORk8uZ2V0SW5mb1tgJHtUSElTX0JPQVJEW3ldW3hdfWBdO1xuICAgICAgdGhpc1NoaXAubGVuZ3RoLS07XG4gICAgICBpZiAoVEhJU19TSElQX0lORk8uaXNTdW5rKHRoaXNTaGlwKSkge1xuICAgICAgICB0aGlzLmRlc3Ryb3lTdXJyb3VuZGluZ3MoVEhJU19CT0FSRFt5XVt4XSwgaGF2ZVJhbmRvbUF0dGFjayk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNoZWNrQWxsU3VuayhUSElTX1NISVBfSU5GTykpIHtcbiAgICAgICAgaWYgKHRhcmdldC5wYXJlbnROb2RlLmNsYXNzTmFtZSA9PT0gXCJwbGF5ZXJCb2FyZFwiKSB7XG4gICAgICAgICAgdGhpcy5lbmRHYW1lKFwiZW5lbXlcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5lbmRHYW1lKFwicGxheWVyXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gVEhJU19CT0FSRFt5XVt4XTsgLy9ub3RpZnkgY29tcHV0ZXJBaSB0byBzdGFydCBkb2luZyBzbWFydCBtb3Zlc1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBkZXN0cm95U3Vycm91bmRpbmdzKHRhcmdldCwgaGF2ZVJhbmRvbUF0dGFjaykge1xuICAgIGNvbnN0IHNoaXBTdXJyb3VuZGluZ3MgPSBbXTtcbiAgICBjb25zdCBUSElTX0JPQVJEID0gdGhpcy4jcGxheWVyVHVybiA/IFwicGxheWVyQm9hcmRcIiA6IFwiY29tcHV0ZXJCb2FyZFwiO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLiNlbmVteVR1cm4gJiZcbiAgICAgICAgICB0aGlzLiNlbmVteUJvYXJkW2ldW2pdLmluY2x1ZGVzKGAke3RhcmdldH0tc3BhY2VgKVxuICAgICAgICApIHtcbiAgICAgICAgICBzaGlwU3Vycm91bmRpbmdzLnB1c2goeyB4OiBqLCB5OiBpIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIHRoaXMuI3BsYXllclR1cm4gJiZcbiAgICAgICAgICB0aGlzLiNwbGF5ZXJCb2FyZFtpXVtqXS5pbmNsdWRlcyhgJHt0YXJnZXR9LXNwYWNlYClcbiAgICAgICAgKSB7XG4gICAgICAgICAgc2hpcFN1cnJvdW5kaW5ncy5wdXNoKHsgeDogaiwgeTogaSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaGF2ZVJhbmRvbUF0dGFjaykge1xuICAgICAgLy9pZiBhdHRhY2sgY2FtZSBmcm9tIGNvbXB1dGVyQWlcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcFN1cnJvdW5kaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICBkb2N1bWVudFxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgYC4ke1RISVNfQk9BUkR9ID4gW2RhdGEteT1cIiR7c2hpcFN1cnJvdW5kaW5nc1tpXS55fVwiXVtkYXRhLXg9XCIke3NoaXBTdXJyb3VuZGluZ3NbaV0ueH1cIl1gXG4gICAgICAgICAgKVxuICAgICAgICAgIC5jbGljaygpO1xuICAgICAgICBoYXZlUmFuZG9tQXR0YWNrW3NoaXBTdXJyb3VuZGluZ3NbaV0ueV1bc2hpcFN1cnJvdW5kaW5nc1tpXS54XSA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcFN1cnJvdW5kaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICBkb2N1bWVudFxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgYC4ke1RISVNfQk9BUkR9ID4gW2RhdGEteT1cIiR7c2hpcFN1cnJvdW5kaW5nc1tpXS55fVwiXVtkYXRhLXg9XCIke3NoaXBTdXJyb3VuZGluZ3NbaV0ueH1cIl1gXG4gICAgICAgICAgKVxuICAgICAgICAgIC5jbGljaygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzc2lnblBsYXllclNoaXAod2hhdFNoaXAsIGNvdW50LCB4UG9zLCB5UG9zLCBpc1ZlcnRpY2FsKSB7XG4gICAgdGhpcy4jcGxheWVyU2hpcEluZm8uYXNzaWduKHdoYXRTaGlwLCBjb3VudCwgeFBvcywgeVBvcywgaXNWZXJ0aWNhbCk7XG4gIH1cblxuICBhc3NpZ25FbmVteVNoaXAod2hhdFNoaXAsIGNvdW50LCB4UG9zLCB5UG9zLCBpc1ZlcnRpY2FsKSB7XG4gICAgdGhpcy4jZW5lbXlTaGlwSW5mby5hc3NpZ24od2hhdFNoaXAsIGNvdW50LCB4UG9zLCB5UG9zLCBpc1ZlcnRpY2FsKTtcbiAgfVxuXG4gIGNoZWNrQWxsU3Vuayh0aGlzQm9hcmQpIHtcbiAgICBmb3IgKGxldCBzaGlwIGluIHRoaXNCb2FyZC5nZXRJbmZvKSB7XG4gICAgICBpZiAodGhpc0JvYXJkLmdldEluZm9bc2hpcF0ubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3RhcnRHYW1lKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGxheWVyQm9hcmQgPiBkaXZcIikuZm9yRWFjaCgoYm94KSA9PiB7XG4gICAgICBib3guc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgIH0pO1xuICB9XG4gIGVuZEdhbWUod2hvd29uKSB7XG4gICAgaWYgKHdob3dvbiA9PT0gXCJwbGF5ZXJcIikge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aG93b25cIikudGV4dENvbnRlbnQgPSBcIlBMQVlFUiBXT04hXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2hvd29uXCIpLnRleHRDb250ZW50ID0gXCJFTkVNWSBXT04hXCI7XG4gICAgfVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmluaXNoXCIpLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZpbmlzaFwiKS5jbGllbnRIZWlnaHQ7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maW5pc2hcIikuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgIFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbkNvbnRlbnRcIikuc3R5bGUuZmlsdGVyID0gXCJibHVyKDRweClcIjtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW5Db250ZW50XCIpLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgfVxuXG4gIHN3aXRjaFR1cm4oKSB7XG4gICAgaWYgKHRoaXMuI3BsYXllclR1cm4pIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudHVybnNcIikudGV4dENvbnRlbnQgPSBcIkVORU1ZIFRVUk4hXCI7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYXllckJvYXJkID4gZGl2XCIpLmZvckVhY2goKGJveCkgPT4ge1xuICAgICAgICBib3guc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiXCI7XG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29tcHV0ZXJCb2FyZCA+IGRpdlwiKS5mb3JFYWNoKChib3gpID0+IHtcbiAgICAgICAgYm94LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgICAgIH0pO1xuICAgICAgdGhpcy4jZW5lbXlUdXJuID0gdHJ1ZTtcbiAgICAgIHRoaXMuI3BsYXllclR1cm4gPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50dXJuc1wiKS50ZXh0Q29udGVudCA9IFwiUExBWUVSIFRVUk4hXCI7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbXB1dGVyQm9hcmQgPiBkaXZcIikuZm9yRWFjaCgoYm94KSA9PiB7XG4gICAgICAgIGJveC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJcIjtcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGF5ZXJCb2FyZCA+IGRpdlwiKS5mb3JFYWNoKChib3gpID0+IHtcbiAgICAgICAgYm94LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgICAgIH0pO1xuICAgICAgdGhpcy4jZW5lbXlUdXJuID0gZmFsc2U7XG4gICAgICB0aGlzLiNwbGF5ZXJUdXJuID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVCb2FyZCh5LCB4LCB3aGF0Qm9hcmQsIGNvbnRlbnQpIHtcbiAgICBpZiAod2hhdEJvYXJkID09PSBcInBsYXllckJvYXJkXCIpIHtcbiAgICAgIHRoaXMuI3BsYXllckJvYXJkW3ldW3hdICs9IGNvbnRlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuI2VuZW15Qm9hcmRbeV1beF0gKz0gY29udGVudDtcbiAgICB9XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLiNwbGF5ZXJUdXJuID0gdHJ1ZTtcbiAgICB0aGlzLiNwbGF5ZXJTaGlwSW5mbyA9IG5ldyBTaGlwKCk7XG4gICAgdGhpcy4jcGxheWVyQm9hcmQgPSBbXTtcblxuICAgIHRoaXMuI2VuZW15VHVybiA9IGZhbHNlO1xuICAgIHRoaXMuI2VuZW15U2hpcEluZm8gPSBuZXcgU2hpcCgpO1xuICAgIHRoaXMuI2VuZW15Qm9hcmQgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgdGhpcy4jcGxheWVyQm9hcmRbaV0gPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICB0aGlzLiNwbGF5ZXJCb2FyZFtpXS5wdXNoKFwiXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgdGhpcy4jZW5lbXlCb2FyZFtpXSA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIHRoaXMuI2VuZW15Qm9hcmRbaV0ucHVzaChcIlwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQgd2hvc1R1cm4oKSB7XG4gICAgaWYgKHRoaXMuI3BsYXllclR1cm4pIHtcbiAgICAgIHJldHVybiBcInBsYXllclwiO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gXCJlbmVteVwiO1xuICAgIH1cbiAgfVxuXG4gIGdldCBwbGF5ZXJCb2FyZCgpIHtcbiAgICByZXR1cm4gdGhpcy4jcGxheWVyQm9hcmQ7XG4gIH1cblxuICBnZXQgY29tcHV0ZXJCb2FyZCgpIHtcbiAgICByZXR1cm4gdGhpcy4jZW5lbXlCb2FyZDtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZ2FtZUJvYXJkID0gbmV3IEdhbWVCb2FyZCgpO1xuIiwiaW1wb3J0IHsgZ2FtZUJvYXJkIH0gZnJvbSBcIi4vR2FtZUJvYXJkLmpzXCI7XG5jbGFzcyBQbGF5ZXIge1xuICAjZ2FtZUJvYXJkO1xuICAjc2hpcFNwb3R0ZWQ7XG4gICNzbWFydE1vdmVPbjtcbiAgI2ZvdW5kRGlyO1xuICAjZm91bmREaXJNb3ZlO1xuICAjZm91bmREaXJMZW5ndGg7XG4gICNhbHJlYWR5SGl0O1xuXG4gIGNvbnN0cnVjdG9yKEdhbWVCb2FyZCkge1xuICAgIGlmICghR2FtZUJvYXJkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSZXF1aXJlcyBhIGdhbWVib2FyZCBjbGFzcyB0byBpbml0YWxpemVcIik7XG4gICAgfVxuICAgIHRoaXMuI2dhbWVCb2FyZCA9IEdhbWVCb2FyZDtcbiAgICB0aGlzLiNzaGlwU3BvdHRlZCA9IGZhbHNlO1xuICAgIHRoaXMuI3NtYXJ0TW92ZU9uID0gW107XG4gICAgdGhpcy4jZm91bmREaXIgPSBmYWxzZTtcbiAgICB0aGlzLiNmb3VuZERpck1vdmUgPSBbXTtcbiAgICB0aGlzLiNmb3VuZERpckxlbmd0aCA9IDA7XG4gICAgdGhpcy4jYWxyZWFkeUhpdCA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICB0aGlzLiNhbHJlYWR5SGl0W2ldID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgdGhpcy4jYWxyZWFkeUhpdFtpXS5wdXNoKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhdHRhY2soeCwgeSwgdGFyZ2V0KSB7XG4gICAgdGhpcy4jZ2FtZUJvYXJkLnJlY2lldmVBdHRhY2soTnVtYmVyKHgpLCBOdW1iZXIoeSksIHRhcmdldCk7XG4gIH1cblxuICByYW5kb21BdHRhY2soKSB7XG4gICAgbGV0IHhQb3MgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICUgMTA7XG4gICAgbGV0IHlQb3MgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICUgMTA7XG5cbiAgICB3aGlsZSAoXG4gICAgICB0aGlzLiNhbHJlYWR5SGl0W3lQb3NdW3hQb3NdICYmXG4gICAgICAoIXRoaXMuI2ZvdW5kRGlyIHx8ICF0aGlzLiNzaGlwU3BvdHRlZClcbiAgICApIHtcbiAgICAgIHhQb3MgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICUgMTA7XG4gICAgICB5UG9zID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSAlIDEwO1xuICAgIH1cbiAgICBpZiAodGhpcy4jZm91bmREaXIpIHtcbiAgICAgIHRoaXMuc3RhcnREZW1vbGlzaCgpOyAvL3RoaXJkIGxldmVsIG9mIEFJIGtub3dpbmcgdGhlIGV4YWN0IHBhdGhcbiAgICB9IGVsc2UgaWYgKHRoaXMuI3NoaXBTcG90dGVkKSB7XG4gICAgICB0aGlzLnN0YXJ0U21hcnRBdHRhY2soKTsgLy9zZWNvbmQgbGV2ZWwgb2YgQUkgZmluZGluZyBzaGlwIGFuZCBhdHRhY2sgc3Vycm91bmRpbmdcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yYW5kb21BdHRhY2tTdGFydCh4UG9zLCB5UG9zKTsgLy9maXJzdCBsZXZlbCBvZiBBSSByYW5kb21seSBhdHRhY2tpbmdcbiAgICB9XG4gIH1cblxuICByYW5kb21BdHRhY2tTdGFydCh4UG9zLCB5UG9zKSB7XG4gICAgdGhpcy4jYWxyZWFkeUhpdFt5UG9zXVt4UG9zXSA9IHRydWU7XG4gICAgY29uc3QgY2hlY2tUaGlzU2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLnBsYXllckJvYXJkID4gW2RhdGEteT1cIiR7eVBvc31cIl1bZGF0YS14PVwiJHt4UG9zfVwiXWBcbiAgICApO1xuICAgIGNoZWNrVGhpc1NoaXAuY2xpY2soKTtcbiAgICB0aGlzLiNzaGlwU3BvdHRlZCA9IHRoaXMuI2dhbWVCb2FyZC5yZWNpZXZlQXR0YWNrKFxuICAgICAgeFBvcyxcbiAgICAgIHlQb3MsXG4gICAgICBjaGVja1RoaXNTaGlwLFxuICAgICAgdGhpcy4jYWxyZWFkeUhpdFxuICAgICk7XG5cbiAgICBpZiAoXG4gICAgICBjaGVja1RoaXNTaGlwLmRhdGFzZXQuc2hpcCAmJlxuICAgICAgY2hlY2tUaGlzU2hpcC5kYXRhc2V0LnNoaXAuaW5jbHVkZXMoXCJvbmUtYmxvY2tcIilcbiAgICApIHtcbiAgICAgIHRoaXMucmVzZXRSYW5kb20oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy4jc2hpcFNwb3R0ZWQpIHtcbiAgICAgIHRoaXMuI2ZvdW5kRGlyTGVuZ3RoKys7XG4gICAgICB0aGlzLiNzbWFydE1vdmVPbi5wdXNoKHsgeDogeFBvcyArIDEsIHk6IHlQb3MsIGRpcjogXCJyaWdodFwiIH0pO1xuICAgICAgdGhpcy4jc21hcnRNb3ZlT24ucHVzaCh7IHg6IHhQb3MgLSAxLCB5OiB5UG9zLCBkaXI6IFwibGVmdFwiIH0pO1xuICAgICAgdGhpcy4jc21hcnRNb3ZlT24ucHVzaCh7IHg6IHhQb3MsIHk6IHlQb3MgLSAxLCBkaXI6IFwidXBcIiB9KTtcbiAgICAgIHRoaXMuI3NtYXJ0TW92ZU9uLnB1c2goeyB4OiB4UG9zLCB5OiB5UG9zICsgMSwgZGlyOiBcImRvd25cIiB9KTtcbiAgICB9XG4gIH1cblxuICBzdGFydFNtYXJ0QXR0YWNrKCkge1xuICAgIGxldCBoaXRUaGlzUG9zID0gdGhpcy4jc21hcnRNb3ZlT24ucG9wKCk7XG4gICAgd2hpbGUgKFxuICAgICAgaGl0VGhpc1Bvcy55IDwgMCB8fFxuICAgICAgaGl0VGhpc1Bvcy55ID4gOSB8fFxuICAgICAgaGl0VGhpc1Bvcy54IDwgMCB8fFxuICAgICAgaGl0VGhpc1Bvcy54ID4gOSB8fFxuICAgICAgdGhpcy4jYWxyZWFkeUhpdFtoaXRUaGlzUG9zLnldW2hpdFRoaXNQb3MueF1cbiAgICApIHtcbiAgICAgIGhpdFRoaXNQb3MgPSB0aGlzLiNzbWFydE1vdmVPbi5wb3AoKTtcbiAgICAgIGlmICghaGl0VGhpc1Bvcykge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLiNhbHJlYWR5SGl0W2hpdFRoaXNQb3MueV1baGl0VGhpc1Bvcy54XSA9IHRydWU7XG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgLnBsYXllckJvYXJkID4gW2RhdGEteT1cIiR7aGl0VGhpc1Bvcy55fVwiXVtkYXRhLXg9XCIke2hpdFRoaXNQb3MueH1cIl1gXG4gICAgICApXG4gICAgICAuY2xpY2soKTtcblxuICAgIGlmIChcbiAgICAgIHRoaXMuI2dhbWVCb2FyZC5yZWNpZXZlQXR0YWNrKFxuICAgICAgICBoaXRUaGlzUG9zLngsXG4gICAgICAgIGhpdFRoaXNQb3MueSxcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgLnBsYXllckJvYXJkID4gW2RhdGEteT1cIiR7aGl0VGhpc1Bvcy55fVwiXVtkYXRhLXg9XCIke2hpdFRoaXNQb3MueH1cIl1gXG4gICAgICAgICksXG4gICAgICAgIHRoaXMuI2FscmVhZHlIaXRcbiAgICAgIClcbiAgICApIHtcbiAgICAgIHRoaXMuI2ZvdW5kRGlyTGVuZ3RoKys7XG4gICAgICB0aGlzLiNzbWFydE1vdmVPbiA9IFtdO1xuICAgICAgaWYgKHRoaXMuI3NoaXBTcG90dGVkLmluY2x1ZGVzKFwidHdvXCIpICYmIHRoaXMuI2ZvdW5kRGlyTGVuZ3RoID09PSAyKSB7XG4gICAgICAgIHRoaXMucmVzZXRSYW5kb20oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoaGl0VGhpc1Bvcy5kaXIgPT09IFwicmlnaHRcIikge1xuICAgICAgICB0aGlzLiNmb3VuZERpciA9IFwicmlnaHRcIjtcbiAgICAgICAgdGhpcy4jZm91bmREaXJNb3ZlID0geyB4OiBoaXRUaGlzUG9zLnggKyAxLCB5OiBoaXRUaGlzUG9zLnkgfTtcbiAgICAgIH0gZWxzZSBpZiAoaGl0VGhpc1Bvcy5kaXIgPT09IFwibGVmdFwiKSB7XG4gICAgICAgIHRoaXMuI2ZvdW5kRGlyID0gXCJsZWZ0XCI7XG4gICAgICAgIHRoaXMuI2ZvdW5kRGlyTW92ZSA9IHsgeDogaGl0VGhpc1Bvcy54IC0gMSwgeTogaGl0VGhpc1Bvcy55IH07XG4gICAgICB9IGVsc2UgaWYgKGhpdFRoaXNQb3MuZGlyID09PSBcInVwXCIpIHtcbiAgICAgICAgdGhpcy4jZm91bmREaXIgPSBcInVwXCI7XG4gICAgICAgIHRoaXMuI2ZvdW5kRGlyTW92ZSA9IHsgeDogaGl0VGhpc1Bvcy54LCB5OiBoaXRUaGlzUG9zLnkgLSAxIH07XG4gICAgICB9IGVsc2UgaWYgKGhpdFRoaXNQb3MuZGlyID09PSBcImRvd25cIikge1xuICAgICAgICB0aGlzLiNmb3VuZERpciA9IFwiZG93blwiO1xuICAgICAgICB0aGlzLiNmb3VuZERpck1vdmUgPSB7IHg6IGhpdFRoaXNQb3MueCwgeTogaGl0VGhpc1Bvcy55ICsgMSB9O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXJ0RGVtb2xpc2goKSB7XG4gICAgaWYgKHRoaXMuI2ZvdW5kRGlyTW92ZS55IDwgMCkge1xuICAgICAgdGhpcy4jZm91bmREaXJNb3ZlLnkgPSB0aGlzLiNmb3VuZERpck1vdmUueSArIHRoaXMuI2ZvdW5kRGlyTGVuZ3RoICsgMTtcbiAgICAgIHRoaXMuI2ZvdW5kRGlyID0gXCJkb3duXCI7XG4gICAgfSBlbHNlIGlmICh0aGlzLiNmb3VuZERpck1vdmUueSA+IDkpIHtcbiAgICAgIHRoaXMuI2ZvdW5kRGlyTW92ZS55ID0gdGhpcy4jZm91bmREaXJNb3ZlLnkgLSB0aGlzLiNmb3VuZERpckxlbmd0aCArIDE7XG4gICAgICB0aGlzLiNmb3VuZERpciA9IFwidXBcIjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuI2ZvdW5kRGlyTW92ZS54IDwgMCkge1xuICAgICAgdGhpcy4jZm91bmREaXJNb3ZlLnggPSB0aGlzLiNmb3VuZERpck1vdmUueCArIHRoaXMuI2ZvdW5kRGlyTGVuZ3RoICsgMTtcbiAgICAgIHRoaXMuI2ZvdW5kRGlyID0gXCJyaWdodFwiO1xuICAgIH0gZWxzZSBpZiAodGhpcy4jZm91bmREaXJNb3ZlLnggPiA5KSB7XG4gICAgICB0aGlzLiNmb3VuZERpck1vdmUueCA9IHRoaXMuI2ZvdW5kRGlyTW92ZS54IC0gdGhpcy4jZm91bmREaXJMZW5ndGggKyAxO1xuICAgICAgdGhpcy4jZm91bmREaXIgPSBcImxlZnRcIjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuI2FscmVhZHlIaXRbdGhpcy4jZm91bmREaXJNb3ZlLnldW3RoaXMuI2ZvdW5kRGlyTW92ZS54XSkge1xuICAgICAgc3dpdGNoICh0aGlzLiNmb3VuZERpcikge1xuICAgICAgICBjYXNlIFwidXBcIjpcbiAgICAgICAgICB0aGlzLiNmb3VuZERpciA9IFwiZG93blwiO1xuICAgICAgICAgIHRoaXMuI2ZvdW5kRGlyTW92ZS55ID1cbiAgICAgICAgICAgIHRoaXMuI2ZvdW5kRGlyTW92ZS55ICsgdGhpcy4jZm91bmREaXJMZW5ndGggKyAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZG93blwiOlxuICAgICAgICAgIHRoaXMuI2ZvdW5kRGlyID0gXCJ1cFwiO1xuICAgICAgICAgIHRoaXMuI2ZvdW5kRGlyTW92ZS55ID1cbiAgICAgICAgICAgIHRoaXMuI2ZvdW5kRGlyTW92ZS55IC0gKHRoaXMuI2ZvdW5kRGlyTGVuZ3RoICsgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICAgIHRoaXMuI2ZvdW5kRGlyID0gXCJsZWZ0XCI7XG4gICAgICAgICAgdGhpcy4jZm91bmREaXJNb3ZlLnggPVxuICAgICAgICAgICAgdGhpcy4jZm91bmREaXJNb3ZlLnggLSAodGhpcy4jZm91bmREaXJMZW5ndGggKyAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgICB0aGlzLiNmb3VuZERpciA9IFwicmlnaHRcIjtcbiAgICAgICAgICB0aGlzLiNmb3VuZERpck1vdmUueCA9XG4gICAgICAgICAgICB0aGlzLiNmb3VuZERpck1vdmUueCArIHRoaXMuI2ZvdW5kRGlyTGVuZ3RoICsgMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAucGxheWVyQm9hcmQgPiBbZGF0YS15PVwiJHt0aGlzLiNmb3VuZERpck1vdmUueX1cIl1bZGF0YS14PVwiJHtcbiAgICAgICAgdGhpcy4jZm91bmREaXJNb3ZlLnhcbiAgICAgIH1cIl1gXG4gICAgKTtcbiAgICBib3guY2xpY2soKTtcbiAgICB0aGlzLiNhbHJlYWR5SGl0W3RoaXMuI2ZvdW5kRGlyTW92ZS55XVt0aGlzLiNmb3VuZERpck1vdmUueF0gPSB0cnVlO1xuICAgIGlmIChcbiAgICAgIHRoaXMuI2dhbWVCb2FyZC5yZWNpZXZlQXR0YWNrKFxuICAgICAgICB0aGlzLiNmb3VuZERpck1vdmUueCxcbiAgICAgICAgdGhpcy4jZm91bmREaXJNb3ZlLnksXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYC5wbGF5ZXJCb2FyZCA+IFtkYXRhLXk9XCIke3RoaXMuI2ZvdW5kRGlyTW92ZS55fVwiXVtkYXRhLXg9XCIke1xuICAgICAgICAgICAgdGhpcy4jZm91bmREaXJNb3ZlLnhcbiAgICAgICAgICB9XCJdYFxuICAgICAgICApLFxuICAgICAgICB0aGlzLiNhbHJlYWR5SGl0XG4gICAgICApXG4gICAgKSB7XG4gICAgICB0aGlzLiNmb3VuZERpckxlbmd0aCsrO1xuICAgICAgaWYgKFxuICAgICAgICAodGhpcy4jc2hpcFNwb3R0ZWQuaW5jbHVkZXMoXCJmb3VyXCIpICYmIHRoaXMuI2ZvdW5kRGlyTGVuZ3RoID09PSA0KSB8fFxuICAgICAgICAodGhpcy4jc2hpcFNwb3R0ZWQuaW5jbHVkZXMoXCJ0aHJlZVwiKSAmJiB0aGlzLiNmb3VuZERpckxlbmd0aCA9PT0gMylcbiAgICAgICkge1xuICAgICAgICB0aGlzLnJlc2V0UmFuZG9tKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLiNmb3VuZERpciA9PT0gXCJyaWdodFwiKSB7XG4gICAgICAgIHRoaXMuI2ZvdW5kRGlyTW92ZSA9IHtcbiAgICAgICAgICB4OiB0aGlzLiNmb3VuZERpck1vdmUueCArIDEsXG4gICAgICAgICAgeTogdGhpcy4jZm91bmREaXJNb3ZlLnksXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuI2ZvdW5kRGlyID09PSBcImxlZnRcIikge1xuICAgICAgICB0aGlzLiNmb3VuZERpck1vdmUgPSB7XG4gICAgICAgICAgeDogdGhpcy4jZm91bmREaXJNb3ZlLnggLSAxLFxuICAgICAgICAgIHk6IHRoaXMuI2ZvdW5kRGlyTW92ZS55LFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmICh0aGlzLiNmb3VuZERpciA9PT0gXCJ1cFwiKSB7XG4gICAgICAgIHRoaXMuI2ZvdW5kRGlyTW92ZSA9IHtcbiAgICAgICAgICB4OiB0aGlzLiNmb3VuZERpck1vdmUueCxcbiAgICAgICAgICB5OiB0aGlzLiNmb3VuZERpck1vdmUueSAtIDEsXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuI2ZvdW5kRGlyID09PSBcImRvd25cIikge1xuICAgICAgICB0aGlzLiNmb3VuZERpck1vdmUgPSB7XG4gICAgICAgICAgeDogdGhpcy4jZm91bmREaXJNb3ZlLngsXG4gICAgICAgICAgeTogdGhpcy4jZm91bmREaXJNb3ZlLnkgKyAxLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoXG4gICAgICAgICh0aGlzLiNzaGlwU3BvdHRlZC5pbmNsdWRlcyhcImZvdXJcIikgJiYgdGhpcy4jZm91bmREaXJMZW5ndGggIT09IDQpIHx8XG4gICAgICAgICh0aGlzLiNzaGlwU3BvdHRlZC5pbmNsdWRlcyhcInRocmVlXCIpICYmIHRoaXMuI2ZvdW5kRGlyTGVuZ3RoICE9PSAzKVxuICAgICAgKSB7XG4gICAgICAgIGlmICh0aGlzLiNmb3VuZERpciA9PT0gXCJsZWZ0XCIpIHtcbiAgICAgICAgICB0aGlzLiNmb3VuZERpck1vdmUgPSB7XG4gICAgICAgICAgICB4OiB0aGlzLiNmb3VuZERpck1vdmUueCArIHRoaXMuI2ZvdW5kRGlyTGVuZ3RoICsgMSxcbiAgICAgICAgICAgIHk6IHRoaXMuI2ZvdW5kRGlyTW92ZS55LFxuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy4jZm91bmREaXIgPSBcInJpZ2h0XCI7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy4jZm91bmREaXIgPT09IFwicmlnaHRcIikge1xuICAgICAgICAgIHRoaXMuI2ZvdW5kRGlyTW92ZSA9IHtcbiAgICAgICAgICAgIHg6IHRoaXMuI2ZvdW5kRGlyTW92ZS54IC0gKHRoaXMuI2ZvdW5kRGlyTGVuZ3RoICsgMSksXG4gICAgICAgICAgICB5OiB0aGlzLiNmb3VuZERpck1vdmUueSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRoaXMuI2ZvdW5kRGlyID0gXCJsZWZ0XCI7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy4jZm91bmREaXIgPT09IFwidXBcIikge1xuICAgICAgICAgIHRoaXMuI2ZvdW5kRGlyTW92ZSA9IHtcbiAgICAgICAgICAgIHg6IHRoaXMuI2ZvdW5kRGlyTW92ZS54LFxuICAgICAgICAgICAgeTogdGhpcy4jZm91bmREaXJNb3ZlLnkgKyB0aGlzLiNmb3VuZERpckxlbmd0aCArIDEsXG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aGlzLiNmb3VuZERpciA9IFwiZG93blwiO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuI2ZvdW5kRGlyID09PSBcImRvd25cIikge1xuICAgICAgICAgIHRoaXMuI2ZvdW5kRGlyTW92ZSA9IHtcbiAgICAgICAgICAgIHg6IHRoaXMuI2ZvdW5kRGlyTW92ZS54LFxuICAgICAgICAgICAgeTogdGhpcy4jZm91bmREaXJNb3ZlLnkgLSAodGhpcy4jZm91bmREaXJMZW5ndGggKyAxKSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRoaXMuI2ZvdW5kRGlyID0gXCJ1cFwiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJlc2V0UmFuZG9tKCkge1xuICAgIHRoaXMuI2ZvdW5kRGlyID0gZmFsc2U7XG4gICAgdGhpcy4jc2hpcFNwb3R0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLiNmb3VuZERpckxlbmd0aCA9IDA7XG4gICAgdGhpcy4jZm91bmREaXJNb3ZlID0gW107XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLiNmb3VuZERpciA9IGZhbHNlO1xuICAgIHRoaXMuI3NoaXBTcG90dGVkID0gZmFsc2U7XG4gICAgdGhpcy4jZm91bmREaXJMZW5ndGggPSAwO1xuICAgIHRoaXMuI2ZvdW5kRGlyTW92ZSA9IFtdO1xuICAgIHRoaXMuI2FscmVhZHlIaXQgPSBbXTtcbiAgICB0aGlzLiNzbWFydE1vdmVPbiA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgdGhpcy4jYWxyZWFkeUhpdFtpXSA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIHRoaXMuI2FscmVhZHlIaXRbaV0ucHVzaChmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKGdhbWVCb2FyZCk7XG5leHBvcnQgY29uc3QgZW5lbXkgPSBuZXcgUGxheWVyKGdhbWVCb2FyZCk7IiwiY2xhc3MgU2hpcCB7XG4gICAgI0FsbFNoaXBzO1xuICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHRoaXMuI0FsbFNoaXBzID0ge1xuICAgICAgICBcIm9uZS1ibG9jay0wXCI6IHsgbGVuZ3RoOiAxIH0sXG4gICAgICAgIFwib25lLWJsb2NrLTFcIjogeyBsZW5ndGg6IDEgfSxcbiAgICAgICAgXCJvbmUtYmxvY2stMlwiOiB7IGxlbmd0aDogMSB9LFxuICAgICAgICBcIm9uZS1ibG9jay0zXCI6IHsgbGVuZ3RoOiAxIH0sXG4gICAgICAgIFwidHdvLWJsb2NrLTBcIjogeyBsZW5ndGg6IDIsIHZlcnRpY2FsOiBmYWxzZSB9LFxuICAgICAgICBcInR3by1ibG9jay0xXCI6IHsgbGVuZ3RoOiAyLCB2ZXJ0aWNhbDogZmFsc2UgfSxcbiAgICAgICAgXCJ0d28tYmxvY2stMlwiOiB7IGxlbmd0aDogMiwgdmVydGljYWw6IGZhbHNlIH0sXG4gICAgICAgIFwidGhyZWUtYmxvY2stMFwiOiB7IGxlbmd0aDogMywgdmVydGljYWw6IGZhbHNlIH0sXG4gICAgICAgIFwidGhyZWUtYmxvY2stMVwiOiB7IGxlbmd0aDogMywgdmVydGljYWw6IGZhbHNlIH0sXG4gICAgICAgIFwiZm91ci1ibG9jay0wXCI6IHsgbGVuZ3RoOiA0LCB2ZXJ0aWNhbDogZmFsc2UgfSxcbiAgICAgIH07XG4gICAgfVxuICBcbiAgICBpc1N1bmsodGhpc1NoaXApIHtcbiAgICAgIHJldHVybiAhdGhpc1NoaXAubGVuZ3RoO1xuICAgIH1cbiAgXG4gICAgYXNzaWduKHdoYXRTaGlwLCBjb3VudCwgeFBvcywgeVBvcywgaXNWZXJ0aWNhbCkge1xuICAgICAgaWYgKGlzVmVydGljYWwgJiYgdGhpcy4jQWxsU2hpcHNbd2hhdFNoaXBdLnZlcnRpY2FsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy4jQWxsU2hpcHNbd2hhdFNoaXBdLnZlcnRpY2FsID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHRoaXMuI0FsbFNoaXBzW3doYXRTaGlwXSwge1xuICAgICAgICBbY291bnRdOiB7IHg6IHhQb3MsIHk6IHlQb3MgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgXG4gICAgZ2V0IGdldEluZm8oKSB7XG4gICAgICByZXR1cm4gdGhpcy4jQWxsU2hpcHM7XG4gICAgfVxuICB9XG4gIFxuICBleHBvcnQgZGVmYXVsdCBTaGlwO1xuICAiLCJpbXBvcnQge1xuICAgIGNoZWNrRm91clBsYWNlbWVudEhvcml6b250YWwsXG4gICAgY2hlY2tGb3VyUGxhY2VtZW50VmVydGljYWxseSxcbiAgICBjaGVja1RocmVlUGxhY2VtZW50SG9yaXpvbnRhbCxcbiAgICBjaGVja1RocmVlUGxhY2VtZW50VmVydGljYWxseSxcbiAgICBjaGVja1R3b1BsYWNlbWVudEhvcml6b250YWwsXG4gICAgY2hlY2tUd29QbGFjZW1lbnRWZXJ0aWNhbGx5LFxuICAgIGNoZWNrT25lUGxhY2VtZW50LFxuICB9IGZyb20gXCIuL2NoZWNrU2hpcFBsYWNlbWVudC5qc1wiO1xuICBcbmltcG9ydCB7XG51cGRhdGVGb3VyQmxvY2tTaGlwLFxudXBkYXRlRm91ckJsb2NrU2hpcFZlcnRpY2FsbHksXG51cGRhdGVUaHJlZUJsb2NrU2hpcCxcbnVwZGF0ZVRocmVlQmxvY2tTaGlwVmVydGljYWxseSxcbnVwZGF0ZVR3b0Jsb2NrU2hpcCxcbnVwZGF0ZVR3b0Jsb2NrU2hpcFZlcnRpY2FsbHksXG51cGRhdGVPbmVCbG9ja1NoaXAsXG59IGZyb20gXCIuL3VwZGF0ZVNoaXAuanNcIjtcblxuaW1wb3J0IHtcbmdlbmVyYXRlT25lLFxuZ2VuZXJhdGVUd28sXG5nZW5lcmF0ZVRocmVlLFxuZ2VuZXJhdGVGb3VyLFxufSBmcm9tIFwiLi9nZW5lcmF0ZVNoaXAuanNcIjtcblxuaW1wb3J0IHsgZ2FtZUJvYXJkIH0gZnJvbSBcIi4uL2ZhY3Rvcmllcy9HYW1lQm9hcmQuanNcIjtcblxuaW1wb3J0IHsgYWN0aXZlQm94LCBlcnJvckJveCB9IGZyb20gXCIuL2hpZ2hsaWdodFNoaXAuanNcIjtcblxuaW1wb3J0IHsgYWRkQmVnaW5CdXR0b24gfSBmcm9tIFwiLi9iZWdpbkJ1dHRvbi5qc1wiO1xuXG5pbXBvcnQgeyBlbmVteSB9IGZyb20gXCIuLi9mYWN0b3JpZXMvUGxheWVyLmpzXCI7XG5cbmxldCBzaGlwVXNlZCA9IHsgY291bnQ6IDAgfTtcbmxldCBjdXJyRm91ciA9IHRydWU7XG5sZXQgY3VyclRocmVlID0gZmFsc2U7XG5sZXQgY3VyclR3byA9IGZhbHNlO1xubGV0IGN1cnJPbmUgPSBmYWxzZTtcbmNvbnN0IHZlcnRpY2FsQ2hlY2sgPSB7IGZvdXI6IGZhbHNlLCB0aHJlZTogZmFsc2UsIHR3bzogZmFsc2UgfTtcblxuZXhwb3J0IHtzaGlwVXNlZCwgY3VyckZvdXIsIGN1cnJUaHJlZSwgY3VyclR3bywgY3Vyck9uZSwgdmVydGljYWxDaGVja307XG5cbmV4cG9ydCBmdW5jdGlvbiBBZGRpbmdGb3VyQmxvY2tTaGlwKHgsIHksIHdoYXRCb2FyZCwgZXZlbnQsIHZlcnRpY2FsKSB7XG5jb25zdCB3aGVyZVggPSBOdW1iZXIoeCk7XG5pZiAodmVydGljYWwpIHtcbiAgICBjb25zdCB3aGVyZVkgPSBOdW1iZXIoeSk7XG5cbiAgICBpZiAod2hlcmVZID4gNikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIWNoZWNrRm91clBsYWNlbWVudFZlcnRpY2FsbHkod2hlcmVYLCB3aGVyZVksIHdoYXRCb2FyZCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHdoYXRCb2FyZCA9PT0gXCJwbGF5ZXJCb2FyZFwiKSB7XG4gICAgZ2FtZUJvYXJkLmFzc2lnblBsYXllclNoaXAoXCJmb3VyLWJsb2NrLTBcIiwgMCwgd2hlcmVYLCB3aGVyZVksIHRydWUpO1xuICAgIGdhbWVCb2FyZC5hc3NpZ25QbGF5ZXJTaGlwKFwiZm91ci1ibG9jay0wXCIsIDEsIHdoZXJlWCwgd2hlcmVZICsgMSwgdHJ1ZSk7XG4gICAgZ2FtZUJvYXJkLmFzc2lnblBsYXllclNoaXAoXCJmb3VyLWJsb2NrLTBcIiwgMiwgd2hlcmVYLCB3aGVyZVkgKyAyLCB0cnVlKTtcbiAgICBnYW1lQm9hcmQuYXNzaWduUGxheWVyU2hpcChcImZvdXItYmxvY2stMFwiLCAzLCB3aGVyZVgsIHdoZXJlWSArIDMsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgZ2FtZUJvYXJkLmFzc2lnbkVuZW15U2hpcChcImZvdXItYmxvY2stMFwiLCAwLCB3aGVyZVgsIHdoZXJlWSwgdHJ1ZSk7XG4gICAgZ2FtZUJvYXJkLmFzc2lnbkVuZW15U2hpcChcImZvdXItYmxvY2stMFwiLCAxLCB3aGVyZVgsIHdoZXJlWSArIDEsIHRydWUpO1xuICAgIGdhbWVCb2FyZC5hc3NpZ25FbmVteVNoaXAoXCJmb3VyLWJsb2NrLTBcIiwgMiwgd2hlcmVYLCB3aGVyZVkgKyAyLCB0cnVlKTtcbiAgICBnYW1lQm9hcmQuYXNzaWduRW5lbXlTaGlwKFwiZm91ci1ibG9jay0wXCIsIDMsIHdoZXJlWCwgd2hlcmVZICsgMywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgdXBkYXRlRm91ckJsb2NrU2hpcFZlcnRpY2FsbHkod2hlcmVYLCB3aGVyZVksIHdoYXRCb2FyZCwgZ2FtZUJvYXJkKTtcbn0gZWxzZSB7XG4gICAgY29uc3Qgd2hlcmVZID0gTnVtYmVyKHkpO1xuICAgIGlmICh3aGVyZVggPiA2KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICghY2hlY2tGb3VyUGxhY2VtZW50SG9yaXpvbnRhbCh3aGVyZVgsIHdoZXJlWSwgd2hhdEJvYXJkKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAod2hhdEJvYXJkID09PSBcInBsYXllckJvYXJkXCIpIHtcbiAgICBnYW1lQm9hcmQuYXNzaWduUGxheWVyU2hpcChcImZvdXItYmxvY2stMFwiLCAwLCB3aGVyZVgsIHdoZXJlWSwgZmFsc2UpO1xuICAgIGdhbWVCb2FyZC5hc3NpZ25QbGF5ZXJTaGlwKFwiZm91ci1ibG9jay0wXCIsIDEsIHdoZXJlWCArIDEsIHdoZXJlWSwgZmFsc2UpO1xuICAgIGdhbWVCb2FyZC5hc3NpZ25QbGF5ZXJTaGlwKFwiZm91ci1ibG9jay0wXCIsIDIsIHdoZXJlWCArIDIsIHdoZXJlWSwgZmFsc2UpO1xuICAgIGdhbWVCb2FyZC5hc3NpZ25QbGF5ZXJTaGlwKFwiZm91ci1ibG9jay0wXCIsIDMsIHdoZXJlWCArIDMsIHdoZXJlWSwgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgZ2FtZUJvYXJkLmFzc2lnbkVuZW15U2hpcChcImZvdXItYmxvY2stMFwiLCAwLCB3aGVyZVgsIHdoZXJlWSwgZmFsc2UpO1xuICAgIGdhbWVCb2FyZC5hc3NpZ25FbmVteVNoaXAoXCJmb3VyLWJsb2NrLTBcIiwgMSwgd2hlcmVYICsgMSwgd2hlcmVZLCBmYWxzZSk7XG4gICAgZ2FtZUJvYXJkLmFzc2lnbkVuZW15U2hpcChcImZvdXItYmxvY2stMFwiLCAyLCB3aGVyZVggKyAyLCB3aGVyZVksIGZhbHNlKTtcbiAgICBnYW1lQm9hcmQuYXNzaWduRW5lbXlTaGlwKFwiZm91ci1ibG9jay0wXCIsIDMsIHdoZXJlWCArIDMsIHdoZXJlWSwgZmFsc2UpO1xuICAgIH1cblxuICAgIHVwZGF0ZUZvdXJCbG9ja1NoaXAod2hlcmVYLCB3aGVyZVksIHdoYXRCb2FyZCwgZ2FtZUJvYXJkKTtcbn1cbmlmICh3aGF0Qm9hcmQgPT09IFwicGxheWVyQm9hcmRcIiAmJiBldmVudCAhPSBcIm5vRXZlbnRcIikge1xuICAgIGN1cnJGb3VyID0gZmFsc2U7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3RTaGlwXCIpLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndoYXRPcHRpb25cIikudGV4dENvbnRlbnQgPVxuICAgIFwiUGxhY2UgeW91ciB0aHJlZS1ibG9jayBzaGlwXCI7XG4gICAgY3VyclRocmVlID0gdHJ1ZTtcbiAgICBnZW5lcmF0ZVRocmVlKCk7XG59XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBZGRpbmdUaHJlZUJsb2NrU2hpcCh4LCB5LCB3aGF0Qm9hcmQsIGV2ZW50LCB2ZXJ0aWNhbCkge1xuY29uc3Qgd2hlcmVYID0gTnVtYmVyKHgpO1xuXG5pZiAodmVydGljYWwpIHtcbiAgICBjb25zdCB3aGVyZVkgPSBOdW1iZXIoeSk7XG5cbiAgICBpZiAod2hlcmVZID4gNykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIWNoZWNrVGhyZWVQbGFjZW1lbnRWZXJ0aWNhbGx5KHdoZXJlWCwgd2hlcmVZLCB3aGF0Qm9hcmQpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh3aGF0Qm9hcmQgPT09IFwicGxheWVyQm9hcmRcIikge1xuICAgIGdhbWVCb2FyZC5hc3NpZ25QbGF5ZXJTaGlwKFxuICAgICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gLFxuICAgICAgICAwLFxuICAgICAgICB3aGVyZVgsXG4gICAgICAgIHdoZXJlWSxcbiAgICAgICAgdHJ1ZVxuICAgICk7XG4gICAgZ2FtZUJvYXJkLmFzc2lnblBsYXllclNoaXAoXG4gICAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fWAsXG4gICAgICAgIDEsXG4gICAgICAgIHdoZXJlWCxcbiAgICAgICAgd2hlcmVZICsgMSxcbiAgICAgICAgdHJ1ZVxuICAgICk7XG4gICAgZ2FtZUJvYXJkLmFzc2lnblBsYXllclNoaXAoXG4gICAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fWAsXG4gICAgICAgIDIsXG4gICAgICAgIHdoZXJlWCxcbiAgICAgICAgd2hlcmVZICsgMixcbiAgICAgICAgdHJ1ZVxuICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICBnYW1lQm9hcmQuYXNzaWduRW5lbXlTaGlwKFxuICAgICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gLFxuICAgICAgICAwLFxuICAgICAgICB3aGVyZVgsXG4gICAgICAgIHdoZXJlWSxcbiAgICAgICAgdHJ1ZVxuICAgICk7XG4gICAgZ2FtZUJvYXJkLmFzc2lnbkVuZW15U2hpcChcbiAgICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCxcbiAgICAgICAgMSxcbiAgICAgICAgd2hlcmVYLFxuICAgICAgICB3aGVyZVkgKyAxLFxuICAgICAgICB0cnVlXG4gICAgKTtcbiAgICBnYW1lQm9hcmQuYXNzaWduRW5lbXlTaGlwKFxuICAgICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gLFxuICAgICAgICAyLFxuICAgICAgICB3aGVyZVgsXG4gICAgICAgIHdoZXJlWSArIDIsXG4gICAgICAgIHRydWVcbiAgICApO1xuICAgIH1cblxuICAgIHVwZGF0ZVRocmVlQmxvY2tTaGlwVmVydGljYWxseSh3aGVyZVgsIHdoZXJlWSwgd2hhdEJvYXJkLCBnYW1lQm9hcmQpO1xuICAgIHNoaXBVc2VkLmNvdW50Kys7XG59IGVsc2Uge1xuICAgIGNvbnN0IHdoZXJlWSA9IE51bWJlcih5KTtcblxuICAgIGlmICh3aGVyZVggPiA3KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIWNoZWNrVGhyZWVQbGFjZW1lbnRIb3Jpem9udGFsKHdoZXJlWCwgd2hlcmVZLCB3aGF0Qm9hcmQpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAod2hhdEJvYXJkID09PSBcInBsYXllckJvYXJkXCIpIHtcbiAgICBnYW1lQm9hcmQuYXNzaWduUGxheWVyU2hpcChcbiAgICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCxcbiAgICAgICAgMCxcbiAgICAgICAgd2hlcmVYLFxuICAgICAgICB3aGVyZVksXG4gICAgICAgIGZhbHNlXG4gICAgKTtcbiAgICBnYW1lQm9hcmQuYXNzaWduUGxheWVyU2hpcChcbiAgICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCxcbiAgICAgICAgMSxcbiAgICAgICAgd2hlcmVYICsgMSxcbiAgICAgICAgd2hlcmVZLFxuICAgICAgICBmYWxzZVxuICAgICk7XG4gICAgZ2FtZUJvYXJkLmFzc2lnblBsYXllclNoaXAoXG4gICAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fWAsXG4gICAgICAgIDIsXG4gICAgICAgIHdoZXJlWCArIDIsXG4gICAgICAgIHdoZXJlWSxcbiAgICAgICAgZmFsc2VcbiAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgZ2FtZUJvYXJkLmFzc2lnbkVuZW15U2hpcChcbiAgICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCxcbiAgICAgICAgMCxcbiAgICAgICAgd2hlcmVYLFxuICAgICAgICB3aGVyZVksXG4gICAgICAgIGZhbHNlXG4gICAgKTtcbiAgICBnYW1lQm9hcmQuYXNzaWduRW5lbXlTaGlwKFxuICAgICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gLFxuICAgICAgICAxLFxuICAgICAgICB3aGVyZVggKyAxLFxuICAgICAgICB3aGVyZVksXG4gICAgICAgIGZhbHNlXG4gICAgKTtcbiAgICBnYW1lQm9hcmQuYXNzaWduRW5lbXlTaGlwKFxuICAgICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gLFxuICAgICAgICAyLFxuICAgICAgICB3aGVyZVggKyAyLFxuICAgICAgICB3aGVyZVksXG4gICAgICAgIGZhbHNlXG4gICAgKTtcbiAgICB9XG5cbiAgICB1cGRhdGVUaHJlZUJsb2NrU2hpcCh3aGVyZVgsIHdoZXJlWSwgd2hhdEJvYXJkLCBnYW1lQm9hcmQpO1xuICAgIHNoaXBVc2VkLmNvdW50Kys7XG59XG5pZiAod2hhdEJvYXJkID09PSBcInBsYXllckJvYXJkXCIgJiYgZXZlbnQgIT0gXCJub0V2ZW50XCIpIHtcbiAgICBkb2N1bWVudFxuICAgIC5xdWVyeVNlbGVjdG9yKGAuJHtldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHRcIil9YClcbiAgICAucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7ZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0XCIpfWApXG4gICAgKTtcblxuICAgIGlmIChzaGlwVXNlZC5jb3VudCA9PT0gMikge1xuICAgIHNoaXBVc2VkLmNvdW50ID0gMDtcbiAgICBjdXJyVGhyZWUgPSBmYWxzZTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdFNoaXBcIikudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2hhdE9wdGlvblwiKS50ZXh0Q29udGVudCA9XG4gICAgXCJQbGFjZSB5b3VyIHR3by1ibG9jayBzaGlwXCI7XG4gICAgZ2VuZXJhdGVUd28oKTtcbiAgICBjdXJyVHdvID0gdHJ1ZTtcbiAgICB9XG59XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBZGRpbmdUd29CbG9ja1NoaXAoeCwgeSwgd2hhdEJvYXJkLCBldmVudCwgdmVydGljYWwpIHtcbmNvbnN0IHdoZXJlWCA9IE51bWJlcih4KTtcblxuaWYgKHZlcnRpY2FsKSB7XG4gICAgY29uc3Qgd2hlcmVZID0gTnVtYmVyKHkpO1xuXG4gICAgaWYgKHdoZXJlWSA+IDgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghY2hlY2tUd29QbGFjZW1lbnRWZXJ0aWNhbGx5KHdoZXJlWCwgd2hlcmVZLCB3aGF0Qm9hcmQpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAod2hhdEJvYXJkID09PSBcInBsYXllckJvYXJkXCIpIHtcbiAgICBnYW1lQm9hcmQuYXNzaWduUGxheWVyU2hpcChcbiAgICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fWAsXG4gICAgICAgIDAsXG4gICAgICAgIHdoZXJlWCxcbiAgICAgICAgd2hlcmVZLFxuICAgICAgICB0cnVlXG4gICAgKTtcbiAgICBnYW1lQm9hcmQuYXNzaWduUGxheWVyU2hpcChcbiAgICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fWAsXG4gICAgICAgIDEsXG4gICAgICAgIHdoZXJlWCxcbiAgICAgICAgd2hlcmVZICsgMSxcbiAgICAgICAgdHJ1ZVxuICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICBnYW1lQm9hcmQuYXNzaWduRW5lbXlTaGlwKFxuICAgICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCxcbiAgICAgICAgMCxcbiAgICAgICAgd2hlcmVYLFxuICAgICAgICB3aGVyZVksXG4gICAgICAgIHRydWVcbiAgICApO1xuICAgIGdhbWVCb2FyZC5hc3NpZ25FbmVteVNoaXAoXG4gICAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gLFxuICAgICAgICAxLFxuICAgICAgICB3aGVyZVgsXG4gICAgICAgIHdoZXJlWSArIDEsXG4gICAgICAgIHRydWVcbiAgICApO1xuICAgIH1cbiAgICB1cGRhdGVUd29CbG9ja1NoaXBWZXJ0aWNhbGx5KHdoZXJlWCwgd2hlcmVZLCB3aGF0Qm9hcmQsIGdhbWVCb2FyZCk7XG4gICAgc2hpcFVzZWQuY291bnQrKztcbn0gZWxzZSB7XG4gICAgY29uc3Qgd2hlcmVZID0gTnVtYmVyKHkpO1xuXG4gICAgaWYgKHdoZXJlWCA+IDgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghY2hlY2tUd29QbGFjZW1lbnRIb3Jpem9udGFsKHdoZXJlWCwgd2hlcmVZLCB3aGF0Qm9hcmQpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh3aGF0Qm9hcmQgPT09IFwicGxheWVyQm9hcmRcIikge1xuICAgIGdhbWVCb2FyZC5hc3NpZ25QbGF5ZXJTaGlwKFxuICAgICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCxcbiAgICAgICAgMCxcbiAgICAgICAgd2hlcmVYLFxuICAgICAgICB3aGVyZVksXG4gICAgICAgIGZhbHNlXG4gICAgKTtcbiAgICBnYW1lQm9hcmQuYXNzaWduUGxheWVyU2hpcChcbiAgICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fWAsXG4gICAgICAgIDEsXG4gICAgICAgIHdoZXJlWCArIDEsXG4gICAgICAgIHdoZXJlWSxcbiAgICAgICAgZmFsc2VcbiAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgZ2FtZUJvYXJkLmFzc2lnbkVuZW15U2hpcChcbiAgICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fWAsXG4gICAgICAgIDAsXG4gICAgICAgIHdoZXJlWCxcbiAgICAgICAgd2hlcmVZLFxuICAgICAgICBmYWxzZVxuICAgICk7XG4gICAgZ2FtZUJvYXJkLmFzc2lnbkVuZW15U2hpcChcbiAgICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fWAsXG4gICAgICAgIDEsXG4gICAgICAgIHdoZXJlWCArIDEsXG4gICAgICAgIHdoZXJlWSxcbiAgICAgICAgZmFsc2VcbiAgICApO1xuICAgIH1cblxuICAgIHVwZGF0ZVR3b0Jsb2NrU2hpcCh3aGVyZVgsIHdoZXJlWSwgd2hhdEJvYXJkLCBnYW1lQm9hcmQpO1xuICAgIHNoaXBVc2VkLmNvdW50Kys7XG59XG5pZiAod2hhdEJvYXJkID09PSBcInBsYXllckJvYXJkXCIgJiYgZXZlbnQgIT0gXCJub0V2ZW50XCIpIHtcbiAgICBkb2N1bWVudFxuICAgIC5xdWVyeVNlbGVjdG9yKGAuJHtldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHRcIil9YClcbiAgICAucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7ZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0XCIpfWApXG4gICAgKTtcbiAgICBpZiAoc2hpcFVzZWQuY291bnQgPT09IDMpIHtcbiAgICBzaGlwVXNlZC5jb3VudCA9IDA7XG4gICAgY3VyclR3byA9IGZhbHNlO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0U2hpcFwiKS50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aGF0T3B0aW9uXCIpLnRleHRDb250ZW50ID1cbiAgICBcIlBsYWNlIHlvdXIgb25lLWJsb2NrIHNoaXBcIjtcbiAgICBnZW5lcmF0ZU9uZSgpO1xuICAgIGN1cnJPbmUgPSB0cnVlO1xuICAgIH1cbn1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEFkZGluZ09uZUJsb2NrU2hpcCh4LCB5LCB3aGF0Qm9hcmQsIGV2ZW50KSB7XG5jb25zdCB3aGVyZVkgPSBOdW1iZXIoeSk7XG5jb25zdCB3aGVyZVggPSBOdW1iZXIoeCk7XG5cbmlmICghY2hlY2tPbmVQbGFjZW1lbnQod2hlcmVYLCB3aGVyZVksIHdoYXRCb2FyZCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5pZiAod2hhdEJvYXJkID09PSBcInBsYXllckJvYXJkXCIpIHtcbiAgICBnYW1lQm9hcmQuYXNzaWduUGxheWVyU2hpcChcbiAgICBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCxcbiAgICAwLFxuICAgIHdoZXJlWCxcbiAgICB3aGVyZVlcbiAgICApO1xufSBlbHNlIHtcbiAgICBnYW1lQm9hcmQuYXNzaWduRW5lbXlTaGlwKGBvbmUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gLCAwLCB3aGVyZVgsIHdoZXJlWSk7XG59XG5cbnVwZGF0ZU9uZUJsb2NrU2hpcCh3aGVyZVgsIHdoZXJlWSwgd2hhdEJvYXJkLCBnYW1lQm9hcmQpO1xuc2hpcFVzZWQuY291bnQrKztcblxuaWYgKHdoYXRCb2FyZCA9PT0gXCJwbGF5ZXJCb2FyZFwiICYmIGV2ZW50ICE9IFwibm9FdmVudFwiKSB7XG4gICAgZG9jdW1lbnRcbiAgICAucXVlcnlTZWxlY3RvcihgLiR7ZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0XCIpfWApXG4gICAgLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2V2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dFwiKX1gKVxuICAgICk7XG4gICAgaWYgKHNoaXBVc2VkLmNvdW50ID09PSA0KSB7XG4gICAgc2hpcFVzZWQuY291bnQgPSAwO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0U2hpcFwiKS50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgYWRkQmVnaW5CdXR0b24oKTtcbiAgICBjdXJyT25lID0gZmFsc2U7XG4gICAgfVxufVxufVxuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc2V0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuZS5wcmV2ZW50RGVmYXVsdCgpO1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3RTaGlwXCIpLnRleHRDb250ZW50ID0gXCJcIjtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLXNoaXBdXCIpLmZvckVhY2goKGJveCkgPT4ge1xuICAgIGRlbGV0ZSBib3guZGF0YXNldC5zaGlwO1xufSk7XG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtc3BhY2VdXCIpLmZvckVhY2goKGJveCkgPT4ge1xuICAgIGRlbGV0ZSBib3guZGF0YXNldC5zcGFjZTtcbn0pO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFjdGl2ZVwiKS5mb3JFYWNoKChib3gpID0+IHtcbiAgICBib3guY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbn0pO1xuXG5nYW1lQm9hcmQucmVzZXQoKTtcbmVuZW15LnJlc2V0KCk7XG5cbmN1cnJGb3VyID0gdHJ1ZTtcbmN1cnJUaHJlZSA9IGZhbHNlO1xuY3VyclR3byA9IGZhbHNlO1xuY3Vyck9uZSA9IGZhbHNlO1xudmVydGljYWxDaGVjay5mb3VyID0gZmFsc2U7XG52ZXJ0aWNhbENoZWNrLnRocmVlID0gZmFsc2U7XG52ZXJ0aWNhbENoZWNrLnR3byA9IGZhbHNlO1xuc2hpcFVzZWQgPSB7IGNvdW50OiAwIH07XG5nZW5lcmF0ZUZvdXIoKTtcbn0pOyIsImltcG9ydCB7IHJhbmRvbWl6ZSB9IGZyb20gXCIuL3JhbmRvbWl6ZVNoaXAuanNcIjtcbmltcG9ydCB7IHBsYXllciB9IGZyb20gXCIuLi9mYWN0b3JpZXMvUGxheWVyLmpzXCI7XG5pbXBvcnQgeyBlbmVteSB9IGZyb20gXCIuLi9mYWN0b3JpZXMvUGxheWVyLmpzXCI7XG5pbXBvcnQgeyBnYW1lQm9hcmQgfSBmcm9tIFwiLi4vZmFjdG9yaWVzL0dhbWVCb2FyZC5qc1wiO1xuXG5mdW5jdGlvbiBhZGRCZWdpbkJ1dHRvbigpIHtcbiAgY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBzdGFydEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYmVnaW5cIik7XG4gIHN0YXJ0QnV0dG9uLnRleHRDb250ZW50ID0gXCJCRUdJTlwiO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdFNoaXBcIikuYXBwZW5kQ2hpbGQoc3RhcnRCdXR0b24pO1xuXG4gIHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgXCJjbGlja1wiLFxuICAgIGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW5Db250ZW50XCIpLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgIGRvY3VtZW50XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllckJvYXJkQ29udGFpbmVyXCIpXG4gICAgICAgIC5hcHBlbmRDaGlsZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllckJvYXJkXCIpKTtcbiAgICAgIHJhbmRvbWl6ZShcImNvbXB1dGVyQm9hcmRcIik7XG4gICAgICBhZGRCb2FyZEV2ZW50cyhcInBsYXllckJvYXJkXCIpO1xuICAgICAgYWRkQm9hcmRFdmVudHMoXCJjb21wdXRlckJvYXJkXCIpO1xuICAgICAgZ2FtZUJvYXJkLnN0YXJ0R2FtZSgpO1xuICAgIH0sXG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZnVuY3Rpb24gYWRkQm9hcmRFdmVudHModGhpc0JvYXJkKSB7XG4gIGZ1bmN0aW9uIGNvbnRhaW5TaGlwQm94KGUpIHtcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjb250YWluU2hpcEJveCk7XG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKFwic2hpcEFuaW1hdGlvblwiKTtcbiAgICB0aGlzLmZpcnN0Q2hpbGQuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgIHRoaXMuZmlyc3RDaGlsZC50ZXh0Q29udGVudCA9IFwi4pyWXCI7XG4gICAgaWYgKHRoaXNCb2FyZCA9PT0gXCJjb21wdXRlckJvYXJkXCIpIHtcbiAgICAgIGlmIChnYW1lQm9hcmQud2hvc1R1cm4gPT09IFwicGxheWVyXCIpIHtcbiAgICAgICAgcGxheWVyLmF0dGFjayhlLnRhcmdldC5kYXRhc2V0LngsIGUudGFyZ2V0LmRhdGFzZXQueSwgZS50YXJnZXQpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBlbmVteS5yYW5kb21BdHRhY2soKTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG5vU2hpcEJveChlKSB7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbm9TaGlwQm94KTtcbiAgICB0aGlzLmNsYXNzTGlzdC5hZGQoXCJub1NoaXBBbmltYXRlXCIpO1xuICAgIHRoaXMuZmlyc3RDaGlsZC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgdGhpcy5maXJzdENoaWxkLnRleHRDb250ZW50ID0gXCLiqLdcIjtcbiAgICB0aGlzLmZpcnN0Q2hpbGQuc3R5bGUuZm9udFNpemUgPSBcIjE1cHhcIjtcbiAgICBpZiAodGhpc0JvYXJkID09PSBcImNvbXB1dGVyQm9hcmRcIikge1xuICAgICAgaWYgKGdhbWVCb2FyZC53aG9zVHVybiA9PT0gXCJwbGF5ZXJcIikge1xuICAgICAgICBwbGF5ZXIuYXR0YWNrKGUudGFyZ2V0LmRhdGFzZXQueCwgZS50YXJnZXQuZGF0YXNldC55LCBlLnRhcmdldCk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGVuZW15LnJhbmRvbUF0dGFjaygpO1xuICAgICAgICB9LCAxMDAwKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7dGhpc0JvYXJkfSA+IC5ib3hgKS5mb3JFYWNoKChib3gpID0+IHtcbiAgICBpZiAoXG4gICAgICBnYW1lQm9hcmRbYCR7dGhpc0JvYXJkfWBdW2JveC5kYXRhc2V0LnldW2JveC5kYXRhc2V0LnhdLnNwbGl0KFwiLVwiKVxuICAgICAgICAubGVuZ3RoID09PSAzXG4gICAgKSB7XG4gICAgICBib3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNvbnRhaW5TaGlwQm94KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBub1NoaXBCb3gpO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCB7IGFkZEJlZ2luQnV0dG9uIH07XG4iLCJpbXBvcnQgeyBnYW1lQm9hcmQgfSBmcm9tIFwiLi4vZmFjdG9yaWVzL0dhbWVCb2FyZC5qc1wiO1xuZnVuY3Rpb24gY2hlY2tGb3VyUGxhY2VtZW50SG9yaXpvbnRhbCh4LCB5LCB3aGF0Qm9hcmQpIHtcbiAgcmV0dXJuIChcbiAgICAhZ2FtZUJvYXJkW3doYXRCb2FyZF1beV1beF0gJiZcbiAgICAhZ2FtZUJvYXJkW3doYXRCb2FyZF1beV1beCArIDFdICYmXG4gICAgIWdhbWVCb2FyZFt3aGF0Qm9hcmRdW3ldW3ggKyAyXSAmJlxuICAgICFnYW1lQm9hcmRbd2hhdEJvYXJkXVt5XVt4ICsgM11cbiAgKTtcbn1cbmZ1bmN0aW9uIGNoZWNrRm91clBsYWNlbWVudFZlcnRpY2FsbHkoeCwgeSwgd2hhdEJvYXJkKSB7XG4gIHJldHVybiAoXG4gICAgIWdhbWVCb2FyZFt3aGF0Qm9hcmRdW3ldW3hdICYmXG4gICAgIWdhbWVCb2FyZFt3aGF0Qm9hcmRdW3kgKyAxXVt4XSAmJlxuICAgICFnYW1lQm9hcmRbd2hhdEJvYXJkXVt5ICsgMl1beF0gJiZcbiAgICAhZ2FtZUJvYXJkW3doYXRCb2FyZF1beSArIDNdW3hdXG4gICk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrVGhyZWVQbGFjZW1lbnRIb3Jpem9udGFsKHgsIHksIHdoYXRCb2FyZCkge1xuICByZXR1cm4gKFxuICAgICFnYW1lQm9hcmRbd2hhdEJvYXJkXVt5XVt4XSAmJlxuICAgICFnYW1lQm9hcmRbd2hhdEJvYXJkXVt5XVt4ICsgMV0gJiZcbiAgICAhZ2FtZUJvYXJkW3doYXRCb2FyZF1beV1beCArIDJdXG4gICk7XG59XG5mdW5jdGlvbiBjaGVja1RocmVlUGxhY2VtZW50VmVydGljYWxseSh4LCB5LCB3aGF0Qm9hcmQpIHtcbiAgcmV0dXJuIChcbiAgICAhZ2FtZUJvYXJkW3doYXRCb2FyZF1beV1beF0gJiZcbiAgICAhZ2FtZUJvYXJkW3doYXRCb2FyZF1beSArIDFdW3hdICYmXG4gICAgIWdhbWVCb2FyZFt3aGF0Qm9hcmRdW3kgKyAyXVt4XVxuICApO1xufVxuXG5mdW5jdGlvbiBjaGVja1R3b1BsYWNlbWVudEhvcml6b250YWwoeCwgeSwgd2hhdEJvYXJkKSB7XG4gIHJldHVybiAhZ2FtZUJvYXJkW3doYXRCb2FyZF1beV1beF0gJiYgIWdhbWVCb2FyZFt3aGF0Qm9hcmRdW3ldW3ggKyAxXTtcbn1cblxuZnVuY3Rpb24gY2hlY2tUd29QbGFjZW1lbnRWZXJ0aWNhbGx5KHgsIHksIHdoYXRCb2FyZCkge1xuICByZXR1cm4gIWdhbWVCb2FyZFt3aGF0Qm9hcmRdW3ldW3hdICYmICFnYW1lQm9hcmRbd2hhdEJvYXJkXVt5ICsgMV1beF07XG59XG5cbmZ1bmN0aW9uIGNoZWNrT25lUGxhY2VtZW50KHgsIHksIHdoYXRCb2FyZCkge1xuICByZXR1cm4gIWdhbWVCb2FyZFt3aGF0Qm9hcmRdW3ldW3hdO1xufVxuXG5leHBvcnQge1xuICAgIGNoZWNrRm91clBsYWNlbWVudEhvcml6b250YWwsXG4gICAgY2hlY2tGb3VyUGxhY2VtZW50VmVydGljYWxseSxcbiAgICBjaGVja1RocmVlUGxhY2VtZW50SG9yaXpvbnRhbCxcbiAgICBjaGVja1RocmVlUGxhY2VtZW50VmVydGljYWxseSxcbiAgICBjaGVja1R3b1BsYWNlbWVudEhvcml6b250YWwsXG4gICAgY2hlY2tUd29QbGFjZW1lbnRWZXJ0aWNhbGx5LFxuICAgIGNoZWNrT25lUGxhY2VtZW50LFxufTsiLCJmdW5jdGlvbiBnZW5lcmF0ZUZvdXIoKSB7XG4gICAgY29uc3Qgc2hpcDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHNoaXAxLmNsYXNzTGlzdC5hZGQoXCJmb3VyQmxvY2tTaGlwXCIpO1xuICBcbiAgICBjb25zdCBib3gxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBib3gyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBib3gzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBib3g0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgXG4gICAgYm94MS5jbGFzc0xpc3QuYWRkKFwic2hpcFBhcnRcIik7XG4gICAgYm94Mi5jbGFzc0xpc3QuYWRkKFwic2hpcFBhcnRcIik7XG4gICAgYm94My5jbGFzc0xpc3QuYWRkKFwic2hpcFBhcnRcIik7XG4gICAgYm94NC5jbGFzc0xpc3QuYWRkKFwic2hpcFBhcnRcIik7XG4gIFxuICAgIHNoaXAxLmFwcGVuZENoaWxkKGJveDEpO1xuICAgIHNoaXAxLmFwcGVuZENoaWxkKGJveDIpO1xuICAgIHNoaXAxLmFwcGVuZENoaWxkKGJveDMpO1xuICAgIHNoaXAxLmFwcGVuZENoaWxkKGJveDQpO1xuICBcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdFNoaXBcIikuYXBwZW5kQ2hpbGQoc2hpcDEpO1xuICB9XG4gIFxuICBmdW5jdGlvbiBnZW5lcmF0ZVRocmVlKCkge1xuICAgIGNvbnN0IHNoaXAxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzaGlwMS5jbGFzc0xpc3QuYWRkKFwidGhyZWVCbG9ja1NoaXBcIik7XG4gIFxuICAgIGNvbnN0IGJveDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGJveDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGJveDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBcbiAgICBib3gxLmNsYXNzTGlzdC5hZGQoXCJzaGlwUGFydFwiKTtcbiAgICBib3gyLmNsYXNzTGlzdC5hZGQoXCJzaGlwUGFydFwiKTtcbiAgICBib3gzLmNsYXNzTGlzdC5hZGQoXCJzaGlwUGFydFwiKTtcbiAgXG4gICAgc2hpcDEuYXBwZW5kQ2hpbGQoYm94MSk7XG4gICAgc2hpcDEuYXBwZW5kQ2hpbGQoYm94Mik7XG4gICAgc2hpcDEuYXBwZW5kQ2hpbGQoYm94Myk7XG4gICAgc2hpcDEuZHJhZ2dhYmxlID0gXCJ0cnVlXCI7XG4gIFxuICAgIGNvbnN0IHNoaXAyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzaGlwMi5jbGFzc0xpc3QuYWRkKFwidGhyZWVCbG9ja1NoaXBcIik7XG4gIFxuICAgIGNvbnN0IGJveDQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGJveDUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGJveDYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBcbiAgICBib3g0LmNsYXNzTGlzdC5hZGQoXCJzaGlwUGFydFwiKTtcbiAgICBib3g1LmNsYXNzTGlzdC5hZGQoXCJzaGlwUGFydFwiKTtcbiAgICBib3g2LmNsYXNzTGlzdC5hZGQoXCJzaGlwUGFydFwiKTtcbiAgXG4gICAgc2hpcDIuYXBwZW5kQ2hpbGQoYm94NCk7XG4gICAgc2hpcDIuYXBwZW5kQ2hpbGQoYm94NSk7XG4gICAgc2hpcDIuYXBwZW5kQ2hpbGQoYm94Nik7XG4gICAgc2hpcDIuZHJhZ2dhYmxlID0gXCJ0cnVlXCI7XG4gIFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0U2hpcFwiKS5hcHBlbmRDaGlsZChzaGlwMSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3RTaGlwXCIpLmFwcGVuZENoaWxkKHNoaXAyKTtcbiAgXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zZWxlY3RTaGlwID4gZGl2XCIpLmZvckVhY2goKHNoaXApID0+XG4gICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgIFwiZHJhZ3N0YXJ0XCIsXG4gICAgICAgIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dFwiLCBldmVudC50YXJnZXQuY2xhc3NOYW1lKTtcbiAgICAgICAgICBldmVudC50YXJnZXQuc3R5bGUub3BhY2l0eSA9IFwiMC41XCI7XG4gICAgICAgIH0sXG4gICAgICAgIGZhbHNlXG4gICAgICApXG4gICAgKTtcbiAgfVxuICBcbiAgZnVuY3Rpb24gZ2VuZXJhdGVUd28oKSB7XG4gICAgY29uc3Qgc2hpcDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHNoaXAxLmNsYXNzTGlzdC5hZGQoXCJ0d29CbG9ja1NoaXBcIik7XG4gIFxuICAgIGNvbnN0IGJveDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IGJveDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBcbiAgICBib3gxLmNsYXNzTGlzdC5hZGQoXCJzaGlwUGFydFwiKTtcbiAgICBib3gyLmNsYXNzTGlzdC5hZGQoXCJzaGlwUGFydFwiKTtcbiAgXG4gICAgc2hpcDEuYXBwZW5kQ2hpbGQoYm94MSk7XG4gICAgc2hpcDEuYXBwZW5kQ2hpbGQoYm94Mik7XG4gICAgc2hpcDEuZHJhZ2dhYmxlID0gXCJ0cnVlXCI7XG4gIFxuICAgIGNvbnN0IHNoaXAyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzaGlwMi5jbGFzc0xpc3QuYWRkKFwidHdvQmxvY2tTaGlwXCIpO1xuICBcbiAgICBjb25zdCBib3gzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCBib3g0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgXG4gICAgYm94My5jbGFzc0xpc3QuYWRkKFwic2hpcFBhcnRcIik7XG4gICAgYm94NC5jbGFzc0xpc3QuYWRkKFwic2hpcFBhcnRcIik7XG4gIFxuICAgIHNoaXAyLmFwcGVuZENoaWxkKGJveDMpO1xuICAgIHNoaXAyLmFwcGVuZENoaWxkKGJveDQpO1xuICAgIHNoaXAyLmRyYWdnYWJsZSA9IFwidHJ1ZVwiO1xuICBcbiAgICBjb25zdCBzaGlwMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2hpcDMuY2xhc3NMaXN0LmFkZChcInR3b0Jsb2NrU2hpcFwiKTtcbiAgXG4gICAgY29uc3QgYm94NSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3QgYm94NiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIFxuICAgIGJveDUuY2xhc3NMaXN0LmFkZChcInNoaXBQYXJ0XCIpO1xuICAgIGJveDYuY2xhc3NMaXN0LmFkZChcInNoaXBQYXJ0XCIpO1xuICBcbiAgICBzaGlwMy5hcHBlbmRDaGlsZChib3g1KTtcbiAgICBzaGlwMy5hcHBlbmRDaGlsZChib3g2KTtcbiAgICBzaGlwMy5kcmFnZ2FibGUgPSBcInRydWVcIjtcbiAgXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3RTaGlwXCIpLmFwcGVuZENoaWxkKHNoaXAxKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdFNoaXBcIikuYXBwZW5kQ2hpbGQoc2hpcDIpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0U2hpcFwiKS5hcHBlbmRDaGlsZChzaGlwMyk7XG4gIFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0U2hpcCA+IGRpdlwiKS5mb3JFYWNoKChzaGlwKSA9PlxuICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBcImRyYWdzdGFydFwiLFxuICAgICAgICBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHRcIiwgZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSk7XG4gICAgICAgICAgZXZlbnQudGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSBcIjAuNVwiO1xuICAgICAgICB9LFxuICAgICAgICBmYWxzZVxuICAgICAgKVxuICAgICk7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIGdlbmVyYXRlT25lKCkge1xuICAgIGNvbnN0IHNoaXAxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzaGlwMS5jbGFzc0xpc3QuYWRkKFwib25lQmxvY2tTaGlwXCIpO1xuICBcbiAgICBjb25zdCBib3gxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBib3gxLmNsYXNzTGlzdC5hZGQoXCJzaGlwUGFydFwiKTtcbiAgXG4gICAgc2hpcDEuYXBwZW5kQ2hpbGQoYm94MSk7XG4gICAgc2hpcDEuZHJhZ2dhYmxlID0gXCJ0cnVlXCI7XG4gIFxuICAgIGNvbnN0IHNoaXAyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzaGlwMi5jbGFzc0xpc3QuYWRkKFwib25lQmxvY2tTaGlwXCIpO1xuICBcbiAgICBjb25zdCBib3gyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBib3gyLmNsYXNzTGlzdC5hZGQoXCJzaGlwUGFydFwiKTtcbiAgXG4gICAgc2hpcDIuYXBwZW5kQ2hpbGQoYm94Mik7XG4gICAgc2hpcDIuZHJhZ2dhYmxlID0gXCJ0cnVlXCI7XG4gIFxuICAgIGNvbnN0IHNoaXAzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzaGlwMy5jbGFzc0xpc3QuYWRkKFwib25lQmxvY2tTaGlwXCIpO1xuICBcbiAgICBjb25zdCBib3gzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBib3gzLmNsYXNzTGlzdC5hZGQoXCJzaGlwUGFydFwiKTtcbiAgXG4gICAgc2hpcDMuYXBwZW5kQ2hpbGQoYm94Myk7XG4gICAgc2hpcDMuZHJhZ2dhYmxlID0gXCJ0cnVlXCI7XG4gIFxuICAgIGNvbnN0IHNoaXA0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzaGlwNC5jbGFzc0xpc3QuYWRkKFwib25lQmxvY2tTaGlwXCIpO1xuICBcbiAgICBjb25zdCBib3g0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBib3g0LmNsYXNzTGlzdC5hZGQoXCJzaGlwUGFydFwiKTtcbiAgXG4gICAgc2hpcDQuYXBwZW5kQ2hpbGQoYm94NCk7XG4gICAgc2hpcDQuZHJhZ2dhYmxlID0gXCJ0cnVlXCI7XG4gIFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0U2hpcFwiKS5hcHBlbmRDaGlsZChzaGlwMSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3RTaGlwXCIpLmFwcGVuZENoaWxkKHNoaXAyKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdFNoaXBcIikuYXBwZW5kQ2hpbGQoc2hpcDMpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0U2hpcFwiKS5hcHBlbmRDaGlsZChzaGlwNCk7XG4gIFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0U2hpcCA+IGRpdlwiKS5mb3JFYWNoKChzaGlwKSA9PlxuICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBcImRyYWdzdGFydFwiLFxuICAgICAgICBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHRcIiwgZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSk7XG4gICAgICAgICAgZXZlbnQudGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSBcIjAuNVwiO1xuICAgICAgICB9LFxuICAgICAgICBmYWxzZVxuICAgICAgKVxuICAgICk7XG4gIH1cbiAgXG4gIGV4cG9ydCB7IGdlbmVyYXRlRm91ciwgZ2VuZXJhdGVUaHJlZSwgZ2VuZXJhdGVUd28sIGdlbmVyYXRlT25lIH07IiwiaW1wb3J0IHtcbiAgICBjaGVja0ZvdXJQbGFjZW1lbnRIb3Jpem9udGFsLFxuICAgIGNoZWNrRm91clBsYWNlbWVudFZlcnRpY2FsbHksXG4gICAgY2hlY2tUaHJlZVBsYWNlbWVudEhvcml6b250YWwsXG4gICAgY2hlY2tUaHJlZVBsYWNlbWVudFZlcnRpY2FsbHksXG4gICAgY2hlY2tUd29QbGFjZW1lbnRIb3Jpem9udGFsLFxuICAgIGNoZWNrVHdvUGxhY2VtZW50VmVydGljYWxseSxcbiAgICBjaGVja09uZVBsYWNlbWVudCxcbiAgfSBmcm9tIFwiLi9jaGVja1NoaXBQbGFjZW1lbnQuanNcIjtcbiAgXG5jb25zdCBhY3RpdmVCb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYWN0aXZlXCIpO1xuY29uc3QgZXJyb3JCb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZXJyb3JcIik7XG5cbmZ1bmN0aW9uIGhpZ2hsaWdodEZvdXJCbG9ja1NoaXAoZXZlbnQsIGZvdXJWZXJ0aWNhbCkge1xuY29uc3Qgd2hlcmVYID0gTnVtYmVyKGV2ZW50LnRhcmdldC5kYXRhc2V0LngpO1xuXG5pZiAoZm91clZlcnRpY2FsKSB7XG4gICAgQXJyYXkuZnJvbShhY3RpdmVCb3gpLmZvckVhY2goKGFjdGl2ZSkgPT4ge1xuICAgIGFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgIH0pO1xuXG4gICAgQXJyYXkuZnJvbShlcnJvckJveCkuZm9yRWFjaCgoZXJyb3IpID0+IHtcbiAgICBlcnJvci5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3JcIik7XG4gICAgfSk7XG5cbiAgICBjb25zdCB3aGVyZVkgPSBOdW1iZXIoZXZlbnQudGFyZ2V0LmRhdGFzZXQueSk7XG5cbiAgICBpZiAod2hlcmVZID4gNikge1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiZXJyb3JcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICghY2hlY2tGb3VyUGxhY2VtZW50VmVydGljYWxseSh3aGVyZVgsIHdoZXJlWSwgXCJwbGF5ZXJCb2FyZFwiKSkge1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiZXJyb3JcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcblxuICAgIGNvbnN0IHNlY29uZEJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBgW2RhdGEteT1cIiR7d2hlcmVZICsgMX1cIl1bZGF0YS14PVwiJHt3aGVyZVh9XCJdYFxuICAgICk7XG4gICAgY29uc3QgdGhpcmRCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgYFtkYXRhLXk9XCIke3doZXJlWSArIDJ9XCJdW2RhdGEteD1cIiR7d2hlcmVYfVwiXWBcbiAgICApO1xuICAgIGNvbnN0IGZvdXJ0aEJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBgW2RhdGEteT1cIiR7d2hlcmVZICsgM31cIl1bZGF0YS14PVwiJHt3aGVyZVh9XCJdYFxuICAgICk7XG5cbiAgICBzZWNvbmRCbG9jay5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIHRoaXJkQmxvY2suY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICBmb3VydGhCbG9jay5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xufSBlbHNlIHtcbiAgICBjb25zdCB3aGVyZVkgPSBOdW1iZXIoZXZlbnQudGFyZ2V0LmRhdGFzZXQueSk7XG5cbiAgICBBcnJheS5mcm9tKGFjdGl2ZUJveCkuZm9yRWFjaCgoYWN0aXZlKSA9PiB7XG4gICAgYWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgfSk7XG5cbiAgICBBcnJheS5mcm9tKGVycm9yQm94KS5mb3JFYWNoKChlcnJvcikgPT4ge1xuICAgIGVycm9yLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvclwiKTtcbiAgICB9KTtcblxuICAgIGlmICh3aGVyZVggPiA2KSB7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghY2hlY2tGb3VyUGxhY2VtZW50SG9yaXpvbnRhbCh3aGVyZVgsIHdoZXJlWSwgXCJwbGF5ZXJCb2FyZFwiKSkge1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiZXJyb3JcIik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICBldmVudC50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgZXZlbnQudGFyZ2V0Lm5leHRFbGVtZW50U2libGluZy5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICBldmVudC50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLm5leHRFbGVtZW50U2libGluZy5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LmFkZChcbiAgICBcImFjdGl2ZVwiXG4gICAgKTtcbn1cbn1cbmZ1bmN0aW9uIGhpZ2hsaWdodFRocmVlQmxvY2tTaGlwKGV2ZW50LCB0aHJlZVZlcnRpY2FsKSB7XG5jb25zdCB3aGVyZVggPSBOdW1iZXIoZXZlbnQudGFyZ2V0LmRhdGFzZXQueCk7XG5cbmlmICh0aHJlZVZlcnRpY2FsKSB7XG4gICAgQXJyYXkuZnJvbShhY3RpdmVCb3gpLmZvckVhY2goKGFjdGl2ZSkgPT4ge1xuICAgIGFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgIH0pO1xuXG4gICAgQXJyYXkuZnJvbShlcnJvckJveCkuZm9yRWFjaCgoZXJyb3IpID0+IHtcbiAgICBlcnJvci5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3JcIik7XG4gICAgfSk7XG4gICAgY29uc3Qgd2hlcmVZID0gTnVtYmVyKGV2ZW50LnRhcmdldC5kYXRhc2V0LnkpO1xuXG4gICAgaWYgKHdoZXJlWSA+IDcpIHtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xuICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKFxuICAgICFjaGVja1RocmVlUGxhY2VtZW50VmVydGljYWxseShcbiAgICAgICAgd2hlcmVYLFxuICAgICAgICBOdW1iZXIoZXZlbnQudGFyZ2V0LmRhdGFzZXQueSksXG4gICAgICAgIFwicGxheWVyQm9hcmRcIlxuICAgIClcbiAgICApIHtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xuICAgIHJldHVybjtcbiAgICB9XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG5cbiAgICBjb25zdCBzZWNvbmRCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgYFtkYXRhLXk9XCIke3doZXJlWSArIDF9XCJdW2RhdGEteD1cIiR7d2hlcmVYfVwiXWBcbiAgICApO1xuICAgIGNvbnN0IHRoaXJkQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIGBbZGF0YS15PVwiJHt3aGVyZVkgKyAyfVwiXVtkYXRhLXg9XCIke3doZXJlWH1cIl1gXG4gICAgKTtcbiAgICBzZWNvbmRCbG9jay5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIHRoaXJkQmxvY2suY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbn0gZWxzZSB7XG4gICAgY29uc3Qgd2hlcmVZID0gTnVtYmVyKGV2ZW50LnRhcmdldC5kYXRhc2V0LnkpO1xuXG4gICAgQXJyYXkuZnJvbShhY3RpdmVCb3gpLmZvckVhY2goKGFjdGl2ZSkgPT4ge1xuICAgIGFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgIH0pO1xuXG4gICAgQXJyYXkuZnJvbShlcnJvckJveCkuZm9yRWFjaCgoZXJyb3IpID0+IHtcbiAgICBlcnJvci5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3JcIik7XG4gICAgfSk7XG5cbiAgICBpZiAod2hlcmVYID4gNykge1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiZXJyb3JcIik7XG4gICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWNoZWNrVGhyZWVQbGFjZW1lbnRIb3Jpem9udGFsKHdoZXJlWCwgd2hlcmVZLCBcInBsYXllckJvYXJkXCIpKSB7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgZXZlbnQudGFyZ2V0Lm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIGV2ZW50LnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG59XG59XG5cbmZ1bmN0aW9uIGhpZ2hsaWdodFR3b0Jsb2NrU2hpcChldmVudCwgdHdvVmVydGljYWwpIHtcbmNvbnN0IHdoZXJlWCA9IE51bWJlcihldmVudC50YXJnZXQuZGF0YXNldC54KTtcblxuaWYgKHR3b1ZlcnRpY2FsKSB7XG4gICAgQXJyYXkuZnJvbShhY3RpdmVCb3gpLmZvckVhY2goKGFjdGl2ZSkgPT4ge1xuICAgIGFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgIH0pO1xuXG4gICAgQXJyYXkuZnJvbShlcnJvckJveCkuZm9yRWFjaCgoZXJyb3IpID0+IHtcbiAgICBlcnJvci5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3JcIik7XG4gICAgfSk7XG4gICAgY29uc3Qgd2hlcmVZID0gTnVtYmVyKGV2ZW50LnRhcmdldC5kYXRhc2V0LnkpO1xuXG4gICAgaWYgKHdoZXJlWSA+IDgpIHtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xuICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKFxuICAgICFjaGVja1R3b1BsYWNlbWVudFZlcnRpY2FsbHkoXG4gICAgICAgIHdoZXJlWCxcbiAgICAgICAgTnVtYmVyKGV2ZW50LnRhcmdldC5kYXRhc2V0LnkpLFxuICAgICAgICBcInBsYXllckJvYXJkXCJcbiAgICApXG4gICAgKSB7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICByZXR1cm47XG4gICAgfVxuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuXG4gICAgY29uc3Qgc2Vjb25kQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIGBbZGF0YS15PVwiJHt3aGVyZVkgKyAxfVwiXVtkYXRhLXg9XCIke3doZXJlWH1cIl1gXG4gICAgKTtcbiAgICBzZWNvbmRCbG9jay5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xufSBlbHNlIHtcbiAgICBjb25zdCB3aGVyZVkgPSBOdW1iZXIoZXZlbnQudGFyZ2V0LmRhdGFzZXQueSk7XG5cbiAgICBBcnJheS5mcm9tKGFjdGl2ZUJveCkuZm9yRWFjaCgoYWN0aXZlKSA9PiB7XG4gICAgYWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgfSk7XG5cbiAgICBBcnJheS5mcm9tKGVycm9yQm94KS5mb3JFYWNoKChlcnJvcikgPT4ge1xuICAgIGVycm9yLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvclwiKTtcbiAgICB9KTtcblxuICAgIGlmICh3aGVyZVggPiA4KSB7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghY2hlY2tUd29QbGFjZW1lbnRIb3Jpem9udGFsKHdoZXJlWCwgd2hlcmVZLCBcInBsYXllckJvYXJkXCIpKSB7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJlcnJvclwiKTtcbiAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgZXZlbnQudGFyZ2V0Lm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xufVxufVxuXG5mdW5jdGlvbiBoaWdobGlnaHRPbmVCbG9ja1NoaXAoZXZlbnQpIHtcbmNvbnN0IHdoZXJlWSA9IE51bWJlcihldmVudC50YXJnZXQuZGF0YXNldC55KTtcbmNvbnN0IHdoZXJlWCA9IE51bWJlcihldmVudC50YXJnZXQuZGF0YXNldC54KTtcblxuQXJyYXkuZnJvbShhY3RpdmVCb3gpLmZvckVhY2goKGFjdGl2ZSkgPT4ge1xuICAgIGFjdGl2ZS5jbGllbnRIZWlnaHQ7XG4gICAgYWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG59KTtcblxuQXJyYXkuZnJvbShlcnJvckJveCkuZm9yRWFjaCgoZXJyb3IpID0+IHtcbiAgICBlcnJvci5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3JcIik7XG59KTtcblxuaWYgKHdoZXJlWCA+IDkpIHtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xuICAgIHJldHVybjtcbn1cbmlmICghY2hlY2tPbmVQbGFjZW1lbnQod2hlcmVYLCB3aGVyZVksIFwicGxheWVyQm9hcmRcIikpIHtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChcImVycm9yXCIpO1xuICAgIHJldHVybjtcbn1cblxuZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG59XG5cbmV4cG9ydCB7XG4gICAgYWN0aXZlQm94LFxuICAgIGVycm9yQm94LFxuICAgIGhpZ2hsaWdodEZvdXJCbG9ja1NoaXAsXG4gICAgaGlnaGxpZ2h0VGhyZWVCbG9ja1NoaXAsXG4gICAgaGlnaGxpZ2h0VHdvQmxvY2tTaGlwLFxuICAgIGhpZ2hsaWdodE9uZUJsb2NrU2hpcCxcbn07XG4iLCJpbXBvcnQge1xuICAgIHNoaXBVc2VkLFxuICAgIEFkZGluZ0ZvdXJCbG9ja1NoaXAsXG4gICAgQWRkaW5nVGhyZWVCbG9ja1NoaXAsXG4gICAgQWRkaW5nVHdvQmxvY2tTaGlwLFxuICAgIEFkZGluZ09uZUJsb2NrU2hpcCxcbiAgfSBmcm9tIFwiLi9hZGRTaGlwLmpzXCI7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbWl6ZSh3aGF0Qm9hcmQpIHtcbiAgICBsZXQgaXNWZXJ0aWNhbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgJSAyID09PSAwID8gdHJ1ZSA6IGZhbHNlO1xuICAgIGxldCB4UG9zO1xuICAgIGxldCB5UG9zO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgd2hpbGUgKGNvdW50IDwgMSkge1xuICAgICAgICBpZiAoaXNWZXJ0aWNhbCkge1xuICAgICAgICB4UG9zID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSAlIDEwO1xuICAgICAgICB5UG9zID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSAlIDc7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIEFkZGluZ0ZvdXJCbG9ja1NoaXAoeFBvcywgeVBvcywgd2hhdEJvYXJkLCBcIm5vRXZlbnRcIiwgaXNWZXJ0aWNhbCkgPT09XG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvdW50Kys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgIHhQb3MgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICUgNztcbiAgICAgICAgeVBvcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgJSAxMDtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgQWRkaW5nRm91ckJsb2NrU2hpcCh4UG9zLCB5UG9zLCB3aGF0Qm9hcmQsIFwibm9FdmVudFwiLCBpc1ZlcnRpY2FsKSA9PT1cbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY291bnQrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICBzaGlwVXNlZC5jb3VudCA9IDA7XG4gICAgY291bnQgPSAwO1xuICAgIGlzVmVydGljYWwgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICUgMiA9PT0gMCA/IHRydWUgOiBmYWxzZTtcbiAgICB3aGlsZSAoY291bnQgPCAyKSB7XG4gICAgICAgIGlmIChpc1ZlcnRpY2FsKSB7XG4gICAgICAgIHhQb3MgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICUgMTA7XG4gICAgICAgIHlQb3MgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICUgODtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgQWRkaW5nVGhyZWVCbG9ja1NoaXAoeFBvcywgeVBvcywgd2hhdEJvYXJkLCBcIm5vRXZlbnRcIiwgaXNWZXJ0aWNhbCkgPT09XG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvdW50Kys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgIHhQb3MgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICUgODtcbiAgICAgICAgeVBvcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgJSAxMDtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgQWRkaW5nVGhyZWVCbG9ja1NoaXAoeFBvcywgeVBvcywgd2hhdEJvYXJkLCBcIm5vRXZlbnRcIiwgaXNWZXJ0aWNhbCkgPT09XG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvdW50Kys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2hpcFVzZWQuY291bnQgPSAwO1xuICAgIGNvdW50ID0gMDtcbiAgICBpc1ZlcnRpY2FsID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSAlIDIgPT09IDAgPyB0cnVlIDogZmFsc2U7XG4gICAgd2hpbGUgKGNvdW50IDwgMykge1xuICAgICAgICBpZiAoaXNWZXJ0aWNhbCkge1xuICAgICAgICB4UG9zID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSAlIDEwO1xuICAgICAgICB5UG9zID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSAlIDk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIEFkZGluZ1R3b0Jsb2NrU2hpcCh4UG9zLCB5UG9zLCB3aGF0Qm9hcmQsIFwibm9FdmVudFwiLCBpc1ZlcnRpY2FsKSA9PT1cbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY291bnQrKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgeFBvcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgJSA5O1xuICAgICAgICB5UG9zID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSAlIDEwO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBBZGRpbmdUd29CbG9ja1NoaXAoeFBvcywgeVBvcywgd2hhdEJvYXJkLCBcIm5vRXZlbnRcIiwgaXNWZXJ0aWNhbCkgPT09XG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvdW50Kys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2hpcFVzZWQuY291bnQgPSAwO1xuICAgIGNvdW50ID0gMDtcbiAgICBpc1ZlcnRpY2FsID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSAlIDIgPT09IDAgPyB0cnVlIDogZmFsc2U7XG4gICAgd2hpbGUgKGNvdW50IDwgNCkge1xuICAgICAgICBpZiAoaXNWZXJ0aWNhbCkge1xuICAgICAgICB4UG9zID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSAlIDEwO1xuICAgICAgICB5UG9zID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKSAlIDEwO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBBZGRpbmdPbmVCbG9ja1NoaXAoeFBvcywgeVBvcywgd2hhdEJvYXJkLCBcIm5vRXZlbnRcIiwgaXNWZXJ0aWNhbCkgPT09XG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvdW50Kys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgIHhQb3MgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICUgMTA7XG4gICAgICAgIHlQb3MgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICUgMTA7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIEFkZGluZ09uZUJsb2NrU2hpcCh4UG9zLCB5UG9zLCB3aGF0Qm9hcmQsIFwibm9FdmVudFwiLCBpc1ZlcnRpY2FsKSA9PT1cbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY291bnQrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICBzaGlwVXNlZC5jb3VudCA9IDA7XG59XG4gICIsImltcG9ydCB7IHZlcnRpY2FsQ2hlY2sgfSBmcm9tIFwiLi9hZGRTaGlwLmpzXCI7XG5cbmZ1bmN0aW9uIHJvdGF0ZUZvdXJCbG9ja1NoaXAoZ3JpZENvbHVtbnMpIHtcbiAgaWYgKGdyaWRDb2x1bW5zID09PSA0KSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3RTaGlwID4gZGl2XCIpLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPVxuICAgICAgXCIyMHB4XCI7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3RTaGlwID4gZGl2XCIpLnN0eWxlLmdyaWRUZW1wbGF0ZVJvd3MgPVxuICAgICAgXCJyZXBlYXQoNCwgMjBweClcIjtcbiAgICB2ZXJ0aWNhbENoZWNrLmZvdXIgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0U2hpcCA+IGRpdlwiKS5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID1cbiAgICAgIFwicmVwZWF0KDQsIDIwcHgpXCI7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3RTaGlwID4gZGl2XCIpLnN0eWxlLmdyaWRUZW1wbGF0ZVJvd3MgPSBcIjIwcHhcIjtcbiAgICB2ZXJ0aWNhbENoZWNrLmZvdXIgPSBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiByb3RhdGVUaHJlZUJsb2NrU2hpcChncmlkQ29sdW1ucykge1xuICBpZiAoZ3JpZENvbHVtbnMgPT09IDMpIHtcbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0U2hpcCA+IGRpdlwiKVxuICAgICAgLmZvckVhY2goKHNoaXApID0+IChzaGlwLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBcIjIwcHhcIikpO1xuICAgIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvckFsbChcIi5zZWxlY3RTaGlwID4gZGl2XCIpXG4gICAgICAuZm9yRWFjaCgoc2hpcCkgPT4gKHNoaXAuc3R5bGUuZ3JpZFRlbXBsYXRlUm93cyA9IFwicmVwZWF0KDMsIDIwcHgpXCIpKTtcbiAgICB2ZXJ0aWNhbENoZWNrLnRocmVlID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0U2hpcCA+IGRpdlwiKVxuICAgICAgLmZvckVhY2goKHNoaXApID0+IChzaGlwLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBcInJlcGVhdCgzLCAyMHB4KVwiKSk7XG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlbGVjdFNoaXAgPiBkaXZcIilcbiAgICAgIC5mb3JFYWNoKChzaGlwKSA9PiAoc2hpcC5zdHlsZS5ncmlkVGVtcGxhdGVSb3dzID0gXCIyMHB4XCIpKTtcbiAgICB2ZXJ0aWNhbENoZWNrLnRocmVlID0gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gcm90YXRlVHdvQmxvY2tTaGlwKGdyaWRDb2x1bW5zKSB7XG4gIGlmIChncmlkQ29sdW1ucyA9PT0gMikge1xuICAgIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvckFsbChcIi5zZWxlY3RTaGlwID4gZGl2XCIpXG4gICAgICAuZm9yRWFjaCgoc2hpcCkgPT4gKHNoaXAuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IFwiMjBweFwiKSk7XG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlbGVjdFNoaXAgPiBkaXZcIilcbiAgICAgIC5mb3JFYWNoKChzaGlwKSA9PiAoc2hpcC5zdHlsZS5ncmlkVGVtcGxhdGVSb3dzID0gXCJyZXBlYXQoMiwgMjBweClcIikpO1xuICAgIHZlcnRpY2FsQ2hlY2sudHdvID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0U2hpcCA+IGRpdlwiKVxuICAgICAgLmZvckVhY2goKHNoaXApID0+IChzaGlwLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBcInJlcGVhdCgyLCAyMHB4KVwiKSk7XG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlbGVjdFNoaXAgPiBkaXZcIilcbiAgICAgIC5mb3JFYWNoKChzaGlwKSA9PiAoc2hpcC5zdHlsZS5ncmlkVGVtcGxhdGVSb3dzID0gXCIyMHB4XCIpKTtcbiAgICB2ZXJ0aWNhbENoZWNrLnR3byA9IGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCB7IHJvdGF0ZUZvdXJCbG9ja1NoaXAsIHJvdGF0ZVRocmVlQmxvY2tTaGlwLCByb3RhdGVUd29CbG9ja1NoaXAgfTtcbiIsImltcG9ydCB7IHNoaXBVc2VkIH0gZnJvbSBcIi4vYWRkU2hpcC5qc1wiO1xuXG5mdW5jdGlvbiB1cGRhdGVGb3VyQmxvY2tTaGlwKHgsIHksIHdoYXRCb2FyZCwgZ2FtZUJvYXJkKSB7XG4gIGlmICh3aGF0Qm9hcmQgPT09IFwicGxheWVyQm9hcmRcIikge1xuICAgIGNvbnN0IGZpcnN0QmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYC4ke3doYXRCb2FyZH0gPiBbZGF0YS15PVwiJHt5fVwiXVtkYXRhLXg9XCIke3h9XCJdYFxuICAgICk7XG4gICAgY29uc3Qgc2Vjb25kQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYC4ke3doYXRCb2FyZH0gPiBbZGF0YS15PVwiJHt5fVwiXVtkYXRhLXg9XCIke3ggKyAxfVwiXWBcbiAgICApO1xuICAgIGNvbnN0IHRoaXJkQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYC4ke3doYXRCb2FyZH0gPiBbZGF0YS15PVwiJHt5fVwiXVtkYXRhLXg9XCIke3ggKyAyfVwiXWBcbiAgICApO1xuICAgIGNvbnN0IGZvdXJ0aEJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAuJHt3aGF0Qm9hcmR9ID4gW2RhdGEteT1cIiR7eX1cIl1bZGF0YS14PVwiJHt4ICsgM31cIl1gXG4gICAgKTtcblxuICAgIGZpcnN0QmxvY2suc2V0QXR0cmlidXRlKFwiZGF0YS1zaGlwXCIsIFwiZm91ci1ibG9jay0wXCIpO1xuICAgIHNlY29uZEJsb2NrLnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcFwiLCBcImZvdXItYmxvY2stMFwiKTtcbiAgICB0aGlyZEJsb2NrLnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcFwiLCBcImZvdXItYmxvY2stMFwiKTtcbiAgICBmb3VydGhCbG9jay5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNoaXBcIiwgXCJmb3VyLWJsb2NrLTBcIik7XG4gIH1cbiAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHksIHgsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTBcIik7XG4gIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4ICsgMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMFwiKTtcbiAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHksIHggKyAyLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wXCIpO1xuICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSwgeCArIDMsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTBcIik7XG5cbiAgaWYgKHggPT09IDAgJiYgeSA9PT0gMCkge1xuICAgIC8vY2hlY2sgdG9wIGxlZnQgY29ybmVyXG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4LCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4ICsgMiwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDEsIHggKyAzLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4ICsgNCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDEsIHggKyA0LCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICB9IGVsc2UgaWYgKHggPT09IDYgJiYgeSA9PT0gMCkge1xuICAgIC8vY2hlY2sgdG9wIHJpZ2h0IGNvbmVyXG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHksIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCAtIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4LCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4ICsgMiwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDEsIHggKyAzLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICB9IGVsc2UgaWYgKHggPT09IDAgJiYgeSA9PT0gOSkge1xuICAgIC8vY2hlY2sgYm90dG9tIGxlZnQgY29ybmVyXG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4LCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5IC0gMSwgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4ICsgMiwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHggKyAzLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5IC0gMSwgeCArIDQsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHksIHggKyA0LCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICB9IGVsc2UgaWYgKHggPT09IDYgJiYgeSA9PT0gOSkge1xuICAgIC8vY2hlY2sgYm90dG9tIHJpZ2h0IGNvcm5lclxuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5IC0gMSwgeCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5IC0gMSwgeCArIDIsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4ICsgMywgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgfSBlbHNlIGlmICh4ID09PSAwKSB7XG4gICAgLy9jaGVjayBmaXJzdCBjb2x1bW5cbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHgsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4LCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5IC0gMSwgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4ICsgMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHggKyAyLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCArIDIsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4ICsgMywgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDEsIHggKyAzLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4ICsgNCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHggKyA0LCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCArIDQsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gIH0gZWxzZSBpZiAoeCA9PT0gNikge1xuICAgIC8vY2hlY2sgbGFzdCBjb2x1bWU7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHksIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5IC0gMSwgeCAtIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHgsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4LCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5IC0gMSwgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4ICsgMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHggKyAyLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCArIDIsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4ICsgMywgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDEsIHggKyAzLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICB9IGVsc2UgaWYgKHkgPT09IDApIHtcbiAgICAvL2NoZWNrIGZpcnN0IHJvd1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDEsIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDEsIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCArIDIsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4ICsgMywgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDEsIHggKyA0LCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4ICsgNCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgfSBlbHNlIGlmICh5ID09PSA5KSB7XG4gICAgLy9jaGVjayBsYXN0IHJvd1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5IC0gMSwgeCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5IC0gMSwgeCArIDIsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4ICsgMywgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHggKyA0LCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4ICsgNCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgfSBlbHNlIHtcbiAgICAvL2NoZWNrIHJlc3Qgb2YgdGhlIGFycmF5XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHksIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5IC0gMSwgeCAtIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHgsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4LCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5IC0gMSwgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4ICsgMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHggKyAyLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCArIDIsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4ICsgMywgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDEsIHggKyAzLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4ICsgNCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHggKyA0LCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCArIDQsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gIH1cbn1cbmZ1bmN0aW9uIHVwZGF0ZUZvdXJCbG9ja1NoaXBWZXJ0aWNhbGx5KHgsIHksIHdoYXRCb2FyZCwgZ2FtZUJvYXJkKSB7XG4gIGlmICh3aGF0Qm9hcmQgPT09IFwicGxheWVyQm9hcmRcIikge1xuICAgIGNvbnN0IGZpcnN0QmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYC4ke3doYXRCb2FyZH0gPiBbZGF0YS15PVwiJHt5fVwiXVtkYXRhLXg9XCIke3h9XCJdYFxuICAgICk7XG4gICAgY29uc3Qgc2Vjb25kQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYC4ke3doYXRCb2FyZH0gPiBbZGF0YS15PVwiJHt5ICsgMX1cIl1bZGF0YS14PVwiJHt4fVwiXWBcbiAgICApO1xuICAgIGNvbnN0IHRoaXJkQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYC4ke3doYXRCb2FyZH0gPiBbZGF0YS15PVwiJHt5ICsgMn1cIl1bZGF0YS14PVwiJHt4fVwiXWBcbiAgICApO1xuICAgIGNvbnN0IGZvdXJ0aEJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAuJHt3aGF0Qm9hcmR9ID4gW2RhdGEteT1cIiR7eSArIDN9XCJdW2RhdGEteD1cIiR7eH1cIl1gXG4gICAgKTtcblxuICAgIGZpcnN0QmxvY2suc2V0QXR0cmlidXRlKFwiZGF0YS1zaGlwXCIsIFwiZm91ci1ibG9jay0wXCIpO1xuICAgIHNlY29uZEJsb2NrLnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcFwiLCBcImZvdXItYmxvY2stMFwiKTtcbiAgICB0aGlyZEJsb2NrLnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcFwiLCBcImZvdXItYmxvY2stMFwiKTtcbiAgICBmb3VydGhCbG9jay5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNoaXBcIiwgXCJmb3VyLWJsb2NrLTBcIik7XG4gIH1cbiAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHksIHgsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTBcIik7XG4gIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMFwiKTtcbiAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAyLCB4LCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wXCIpO1xuICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDMsIHgsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTBcIik7XG5cbiAgaWYgKHggPT09IDAgJiYgeSA9PT0gMCkge1xuICAgIC8vY2hlY2sgdG9wIGxlZnQgY29ybmVyYFxuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4ICsgMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDEsIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMiwgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAzLCB4ICsgMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDQsIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgNCwgeCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgfSBlbHNlIGlmICh4ID09PSA5ICYmIHkgPT09IDApIHtcbiAgICAvL2NoZWNrIHRvcCByaWdodCBjb3JuZXJcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSwgeCAtIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDIsIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMywgeCAtIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyA0LCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDQsIHgsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gIH0gZWxzZSBpZiAoeCA9PT0gMCAmJiB5ID09PSA2KSB7XG4gICAgLy9jaGVjayBib3R0b20gbGVmdCBjb3JuZXJcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHgsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4ICsgMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSwgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4ICsgMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDIsIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMywgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gIH0gZWxzZSBpZiAoeCA9PT0gOSAmJiB5ID09PSA2KSB7XG4gICAgLy9jaGVjayBib3R0b20gcmlnaHQgY29ybmVyXG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4LCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5IC0gMSwgeCAtIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHksIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCAtIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAyLCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDMsIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICB9IGVsc2UgaWYgKHggPT09IDApIHtcbiAgICAvL2NoZWNrIGZpcnN0IGNvbHVtblxuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5IC0gMSwgeCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4ICsgMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDEsIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMiwgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAzLCB4ICsgMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDQsIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgNCwgeCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgfSBlbHNlIGlmICh4ID09PSA5KSB7XG4gICAgLy9jaGVjayBsYXN0IGNvbHVtblxuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5IC0gMSwgeCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDEsIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMiwgeCAtIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAzLCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDQsIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgNCwgeCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgfSBlbHNlIGlmICh5ID09PSAwKSB7XG4gICAgLy9jaGVjayBmaXJzdCByb3dcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSwgeCAtIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHksIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCAtIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4ICsgMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDIsIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMiwgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAzLCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDMsIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgNCwgeCAtIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyA0LCB4ICsgMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDQsIHgsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gIH0gZWxzZSBpZiAoeSA9PT0gNikge1xuICAgIC8vY2hlY2sgbGFzdCByb3dcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHgsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgLSAxLCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSwgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDEsIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMiwgeCAtIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAyLCB4ICsgMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDMsIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMywgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gIH0gZWxzZSB7XG4gICAgLy9jaGVjayByZXN0IG9mIHRoZSBhcnJheVxuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5IC0gMSwgeCwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSAtIDEsIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5IC0gMSwgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHksIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4ICsgMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDEsIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMSwgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAyLCB4IC0gMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDIsIHggKyAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgMywgeCAtIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAzLCB4ICsgMSwgd2hhdEJvYXJkLCBcImZvdXItYmxvY2stMC1zcGFjZVwiKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDQsIHggLSAxLCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5ICsgNCwgeCArIDEsIHdoYXRCb2FyZCwgXCJmb3VyLWJsb2NrLTAtc3BhY2VcIik7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyA0LCB4LCB3aGF0Qm9hcmQsIFwiZm91ci1ibG9jay0wLXNwYWNlXCIpO1xuICB9XG59XG5mdW5jdGlvbiB1cGRhdGVUaHJlZUJsb2NrU2hpcCh4LCB5LCB3aGF0Qm9hcmQsIGdhbWVCb2FyZCkge1xuICBpZiAod2hhdEJvYXJkID09PSBcInBsYXllckJvYXJkXCIpIHtcbiAgICBjb25zdCBmaXJzdEJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAuJHt3aGF0Qm9hcmR9ID4gW2RhdGEteT1cIiR7eX1cIl1bZGF0YS14PVwiJHt4fVwiXWBcbiAgICApO1xuICAgIGNvbnN0IHNlY29uZEJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAuJHt3aGF0Qm9hcmR9ID4gW2RhdGEteT1cIiR7eX1cIl1bZGF0YS14PVwiJHt4ICsgMX1cIl1gXG4gICAgKTtcbiAgICBjb25zdCB0aGlyZEJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAuJHt3aGF0Qm9hcmR9ID4gW2RhdGEteT1cIiR7eX1cIl1bZGF0YS14PVwiJHt4ICsgMn1cIl1gXG4gICAgKTtcblxuICAgIGZpcnN0QmxvY2suc2V0QXR0cmlidXRlKFwiZGF0YS1zaGlwXCIsIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fWApO1xuICAgIHNlY29uZEJsb2NrLnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcFwiLCBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gKTtcbiAgICB0aGlyZEJsb2NrLnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcFwiLCBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gKTtcbiAgfVxuXG4gIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4LCB3aGF0Qm9hcmQsIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fWApO1xuICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSwgeCArIDEsIHdoYXRCb2FyZCwgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCk7XG4gIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4ICsgMiwgd2hhdEJvYXJkLCBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gKTtcblxuICBpZiAoeCA9PT0gMCAmJiB5ID09PSAwKSB7XG4gICAgLy9jaGVjayB0b3AgbGVmdCBjb3JuZXJcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCArIDMsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4ICsgMixcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDMsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgfSBlbHNlIGlmICh4ID09PSA3ICYmIHkgPT09IDApIHtcbiAgICAvL2NoZWNrIHRvcCByaWdodCBjb25lclxuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4ICsgMixcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9IGVsc2UgaWYgKHggPT09IDAgJiYgeSA9PT0gOSkge1xuICAgIC8vY2hlY2sgYm90dG9tIGxlZnQgY29ybmVyXG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCArIDIsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggKyAzLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggKyAzLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSBpZiAoeCA9PT0gNyAmJiB5ID09PSA5KSB7XG4gICAgLy9jaGVjayBib3R0b20gcmlnaHQgY29ybmVyXG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggKyAyLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSBpZiAoeCA9PT0gMCkge1xuICAgIC8vY2hlY2sgZmlyc3QgY29sdW1uXG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggKyAyLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4ICsgMixcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4ICsgMyxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCArIDMsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggKyAzLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSBpZiAoeCA9PT0gNykge1xuICAgIC8vY2hlY2sgbGFzdCBjb2x1bW5cbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4ICsgMixcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDIsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgfSBlbHNlIGlmICh5ID09PSAwKSB7XG4gICAgLy9jaGVjayBmaXJzdCByb3dcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDIsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggKyAzLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggKyAzLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSBpZiAoeSA9PT0gOSkge1xuICAgIC8vY2hlY2sgbGFzdCByb3dcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCArIDIsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggKyAzLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggKyAzLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy9jaGVjayByZXN0IG9mIHRoZSBhcnJheVxuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggKyAyLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4ICsgMixcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4ICsgMyxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCArIDMsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggKyAzLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH1cbn1cbmZ1bmN0aW9uIHVwZGF0ZVRocmVlQmxvY2tTaGlwVmVydGljYWxseSh4LCB5LCB3aGF0Qm9hcmQsIGdhbWVCb2FyZCkge1xuICBpZiAod2hhdEJvYXJkID09PSBcInBsYXllckJvYXJkXCIpIHtcbiAgICBjb25zdCBmaXJzdEJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAuJHt3aGF0Qm9hcmR9ID4gW2RhdGEteT1cIiR7eX1cIl1bZGF0YS14PVwiJHt4fVwiXWBcbiAgICApO1xuICAgIGNvbnN0IHNlY29uZEJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAuJHt3aGF0Qm9hcmR9ID4gW2RhdGEteT1cIiR7eSArIDF9XCJdW2RhdGEteD1cIiR7eH1cIl1gXG4gICAgKTtcbiAgICBjb25zdCB0aGlyZEJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAuJHt3aGF0Qm9hcmR9ID4gW2RhdGEteT1cIiR7eSArIDJ9XCJdW2RhdGEteD1cIiR7eH1cIl1gXG4gICAgKTtcblxuICAgIGZpcnN0QmxvY2suc2V0QXR0cmlidXRlKFwiZGF0YS1zaGlwXCIsIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fWApO1xuICAgIHNlY29uZEJsb2NrLnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcFwiLCBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gKTtcbiAgICB0aGlyZEJsb2NrLnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcFwiLCBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gKTtcbiAgfVxuICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSwgeCwgd2hhdEJvYXJkLCBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gKTtcbiAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4LCB3aGF0Qm9hcmQsIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fWApO1xuICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoeSArIDIsIHgsIHdoYXRCb2FyZCwgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCk7XG5cbiAgaWYgKHggPT09IDAgJiYgeSA9PT0gMCkge1xuICAgIC8vY2hlY2sgdG9wIGxlZnQgY29ybmVyXG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAyLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMyxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDMsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSBpZiAoeCA9PT0gOSAmJiB5ID09PSAwKSB7XG4gICAgLy9jaGVjayB0b3AgcmlnaHQgY29ybmVyXG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAyLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMyxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDMsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSBpZiAoeCA9PT0gMCAmJiB5ID09PSA3KSB7XG4gICAgLy9jaGVjayBib3R0b20gbGVmdCBjb3JuZXJcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAyLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgfSBlbHNlIGlmICh4ID09PSA5ICYmIHkgPT09IDcpIHtcbiAgICAvL2NoZWNrIGJvdHRvbSByaWdodCBjb3JuZXJcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAyLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgfSBlbHNlIGlmICh4ID09PSAwKSB7XG4gICAgLy9jaGVjayBmaXJzdCBjb2x1bW5cbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAyLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMyxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDMsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSBpZiAoeCA9PT0gOSkge1xuICAgIC8vY2hlY2sgbGFzdCBjb2x1bW5cbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAyLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMyxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDMsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSBpZiAoeSA9PT0gMCkge1xuICAgIC8vY2hlY2sgZmlyc3Qgcm93XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMixcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDIsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAzLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMyxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDMsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSBpZiAoeSA9PT0gNykge1xuICAgIC8vY2hlY2sgbGFzdCByb3dcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDIsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAyLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvL2NoZWNrIHJlc3Qgb2YgdGhlIGFycmF5XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAyLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMixcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHRocmVlLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDMsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0aHJlZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAzLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMyxcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdGhyZWUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVUd29CbG9ja1NoaXAoeCwgeSwgd2hhdEJvYXJkLCBnYW1lQm9hcmQpIHtcbiAgaWYgKHdoYXRCb2FyZCA9PT0gXCJwbGF5ZXJCb2FyZFwiKSB7XG4gICAgY29uc3QgZmlyc3RCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7d2hhdEJvYXJkfSA+IFtkYXRhLXk9XCIke3l9XCJdW2RhdGEteD1cIiR7eH1cIl1gXG4gICAgKTtcbiAgICBjb25zdCBzZWNvbmRCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7d2hhdEJvYXJkfSA+IFtkYXRhLXk9XCIke3l9XCJdW2RhdGEteD1cIiR7eCArIDF9XCJdYFxuICAgICk7XG5cbiAgICBmaXJzdEJsb2NrLnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcFwiLCBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCk7XG4gICAgc2Vjb25kQmxvY2suc2V0QXR0cmlidXRlKFwiZGF0YS1zaGlwXCIsIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gKTtcbiAgfVxuXG4gIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4LCB3aGF0Qm9hcmQsIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gKTtcbiAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHksIHggKyAxLCB3aGF0Qm9hcmQsIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gKTtcblxuICBpZiAoeCA9PT0gMCAmJiB5ID09PSAwKSB7XG4gICAgLy9jaGVjayB0b3AgbGVmdCBjb3JuZXJcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCArIDIsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4ICsgMixcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgfSBlbHNlIGlmICh4ID09PSA4ICYmIHkgPT09IDApIHtcbiAgICAvL2NoZWNrIHRvcCByaWdodCBjb25lclxuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9IGVsc2UgaWYgKHggPT09IDAgJiYgeSA9PT0gOSkge1xuICAgIC8vY2hlY2sgYm90dG9tIGxlZnQgY29ybmVyXG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4ICsgMixcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCArIDIsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSBpZiAoeCA9PT0gOCAmJiB5ID09PSA5KSB7XG4gICAgLy9jaGVjayBib3R0b20gcmlnaHQgY29ybmVyXG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSBpZiAoeCA9PT0gMCkge1xuICAgIC8vY2hlY2sgZmlyc3QgY29sdW1uXG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4ICsgMixcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggKyAyLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4ICsgMixcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgfSBlbHNlIGlmICh4ID09PSA4KSB7XG4gICAgLy9jaGVjayBsYXN0IGNvbHVtblxuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSBpZiAoeSA9PT0gMCkge1xuICAgIC8vY2hlY2sgZmlyc3Qgcm93XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4ICsgMixcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCArIDIsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSBpZiAoeSA9PT0gOSkge1xuICAgIC8vY2hlY2sgbGFzdCByb3dcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggKyAyLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4ICsgMixcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvL2NoZWNrIHJlc3Qgb2YgdGhlIGFycmF5XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggKyAyLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDIsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggKyAyLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVR3b0Jsb2NrU2hpcFZlcnRpY2FsbHkoeCwgeSwgd2hhdEJvYXJkLCBnYW1lQm9hcmQpIHtcbiAgaWYgKHdoYXRCb2FyZCA9PT0gXCJwbGF5ZXJCb2FyZFwiKSB7XG4gICAgY29uc3QgZmlyc3RCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7d2hhdEJvYXJkfSA+IFtkYXRhLXk9XCIke3l9XCJdW2RhdGEteD1cIiR7eH1cIl1gXG4gICAgKTtcbiAgICBjb25zdCBzZWNvbmRCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7d2hhdEJvYXJkfSA+IFtkYXRhLXk9XCIke3kgKyAxfVwiXVtkYXRhLXg9XCIke3h9XCJdYFxuICAgICk7XG5cbiAgICBmaXJzdEJsb2NrLnNldEF0dHJpYnV0ZShcImRhdGEtc2hpcFwiLCBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9YCk7XG4gICAgc2Vjb25kQmxvY2suc2V0QXR0cmlidXRlKFwiZGF0YS1zaGlwXCIsIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gKTtcbiAgfVxuXG4gIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4LCB3aGF0Qm9hcmQsIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gKTtcbiAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKHkgKyAxLCB4LCB3aGF0Qm9hcmQsIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gKTtcblxuICBpZiAoeCA9PT0gMCAmJiB5ID09PSAwKSB7XG4gICAgLy9jaGVjayB0b3AgbGVmdCBjb3JuZXJcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMixcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAyLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgfSBlbHNlIGlmICh4ID09PSA5ICYmIHkgPT09IDApIHtcbiAgICAvL2NoZWNrIHRvcCByaWdodCBjb3JuZXJcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMixcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAyLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgfSBlbHNlIGlmICh4ID09PSAwICYmIHkgPT09IDgpIHtcbiAgICAvL2NoZWNrIGJvdHRvbSBsZWZ0IGNvcm5lclxuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9IGVsc2UgaWYgKHggPT09IDkgJiYgeSA9PT0gOCkge1xuICAgIC8vY2hlY2sgYm90dG9tIHJpZ2h0IGNvcm5lclxuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9IGVsc2UgaWYgKHggPT09IDApIHtcbiAgICAvL2NoZWNrIGZpcnN0IGNvbHVtblxuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAyLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDIsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9IGVsc2UgaWYgKHggPT09IDkpIHtcbiAgICAvL2NoZWNrIGxhc3QgY29sdW1uXG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDIsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMixcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSBpZiAoeSA9PT0gMCkge1xuICAgIC8vY2hlY2sgZmlyc3Qgcm93XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDIsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMixcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAyLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgfSBlbHNlIGlmICh5ID09PSA4KSB7XG4gICAgLy9jaGVjayBsYXN0IHJvd1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy9jaGVjayByZXN0IG9mIHRoZSBhcnJheVxuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgdHdvLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDIsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMixcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYHR3by1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAyLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGB0d28tYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVPbmVCbG9ja1NoaXAoeCwgeSwgd2hhdEJvYXJkLCBnYW1lQm9hcmQpIHtcbiAgaWYgKHdoYXRCb2FyZCA9PT0gXCJwbGF5ZXJCb2FyZFwiKSB7XG4gICAgY29uc3QgZmlyc3RCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLiR7d2hhdEJvYXJkfSA+IFtkYXRhLXk9XCIke3l9XCJdW2RhdGEteD1cIiR7eH1cIl1gXG4gICAgKTtcblxuICAgIGZpcnN0QmxvY2suc2V0QXR0cmlidXRlKFwiZGF0YS1zaGlwXCIsIGBvbmUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gKTtcbiAgfVxuXG4gIGdhbWVCb2FyZC51cGRhdGVCb2FyZCh5LCB4LCB3aGF0Qm9hcmQsIGBvbmUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH1gKTtcblxuICBpZiAoeCA9PT0gMCAmJiB5ID09PSAwKSB7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGBvbmUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9IGVsc2UgaWYgKHggPT09IDkgJiYgeSA9PT0gMCkge1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGBvbmUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5ICsgMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGBvbmUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgfSBlbHNlIGlmICh4ID09PSAwICYmIHkgPT09IDkpIHtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGBvbmUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSBpZiAoeCA9PT0gOSAmJiB5ID09PSA5KSB7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9IGVsc2UgaWYgKHggPT09IDApIHtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGBvbmUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSBpZiAoeCA9PT0gOSkge1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHksXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGBvbmUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGBvbmUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgfSBlbHNlIGlmICh5ID09PSAwKSB7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgKyAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggKyAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICB9IGVsc2UgaWYgKHkgPT09IDkpIHtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGBvbmUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSAtIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGBvbmUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSxcbiAgICAgIHggLSAxLFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCAtIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4IC0gMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGBvbmUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5IC0gMSxcbiAgICAgIHgsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4LFxuICAgICAgd2hhdEJvYXJkLFxuICAgICAgYG9uZS1ibG9jay0ke3NoaXBVc2VkLmNvdW50fS1zcGFjZWBcbiAgICApO1xuICAgIGdhbWVCb2FyZC51cGRhdGVCb2FyZChcbiAgICAgIHkgLSAxLFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gICAgZ2FtZUJvYXJkLnVwZGF0ZUJvYXJkKFxuICAgICAgeSArIDEsXG4gICAgICB4ICsgMSxcbiAgICAgIHdoYXRCb2FyZCxcbiAgICAgIGBvbmUtYmxvY2stJHtzaGlwVXNlZC5jb3VudH0tc3BhY2VgXG4gICAgKTtcbiAgICBnYW1lQm9hcmQudXBkYXRlQm9hcmQoXG4gICAgICB5LFxuICAgICAgeCArIDEsXG4gICAgICB3aGF0Qm9hcmQsXG4gICAgICBgb25lLWJsb2NrLSR7c2hpcFVzZWQuY291bnR9LXNwYWNlYFxuICAgICk7XG4gIH1cbn1cbmV4cG9ydCB7XG4gIHVwZGF0ZUZvdXJCbG9ja1NoaXAsXG4gIHVwZGF0ZUZvdXJCbG9ja1NoaXBWZXJ0aWNhbGx5LFxuICB1cGRhdGVUaHJlZUJsb2NrU2hpcCxcbiAgdXBkYXRlVGhyZWVCbG9ja1NoaXBWZXJ0aWNhbGx5LFxuICB1cGRhdGVUd29CbG9ja1NoaXAsXG4gIHVwZGF0ZVR3b0Jsb2NrU2hpcFZlcnRpY2FsbHksXG4gIHVwZGF0ZU9uZUJsb2NrU2hpcCxcbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge1xuICBBZGRpbmdGb3VyQmxvY2tTaGlwLFxuICBBZGRpbmdUaHJlZUJsb2NrU2hpcCxcbiAgQWRkaW5nVHdvQmxvY2tTaGlwLFxuICBBZGRpbmdPbmVCbG9ja1NoaXAsXG4gIGN1cnJGb3VyLFxuICBjdXJyVGhyZWUsXG4gIGN1cnJUd28sXG4gIGN1cnJPbmUsXG4gIHZlcnRpY2FsQ2hlY2ssXG59IGZyb20gXCIuL21lbnVfaGVscGVyL2FkZFNoaXAuanNcIjtcbmltcG9ydCB7IGFkZEJlZ2luQnV0dG9uIH0gZnJvbSBcIi4vbWVudV9oZWxwZXIvYmVnaW5CdXR0b24uanNcIjtcbmltcG9ydCB7IGdlbmVyYXRlRm91ciB9IGZyb20gXCIuL21lbnVfaGVscGVyL2dlbmVyYXRlU2hpcC5qc1wiO1xuaW1wb3J0IHtcbiAgaGlnaGxpZ2h0T25lQmxvY2tTaGlwLFxuICBoaWdobGlnaHRUd29CbG9ja1NoaXAsXG4gIGhpZ2hsaWdodFRocmVlQmxvY2tTaGlwLFxuICBoaWdobGlnaHRGb3VyQmxvY2tTaGlwLFxuICBhY3RpdmVCb3gsXG4gIGVycm9yQm94LFxufSBmcm9tIFwiLi9tZW51X2hlbHBlci9oaWdobGlnaHRTaGlwLmpzXCI7XG5pbXBvcnQgeyByYW5kb21pemUgfSBmcm9tIFwiLi9tZW51X2hlbHBlci9yYW5kb21pemVTaGlwLmpzXCI7XG5pbXBvcnQge1xuICByb3RhdGVGb3VyQmxvY2tTaGlwLFxuICByb3RhdGVUaHJlZUJsb2NrU2hpcCxcbiAgcm90YXRlVHdvQmxvY2tTaGlwLFxufSBmcm9tIFwiLi9tZW51X2hlbHBlci9yb3RhdGVTaGlwLmpzXCI7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuY3Rpb24gKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0U2hpcCA+IGRpdlwiKS5mb3JFYWNoKChzaGlwKSA9PlxuICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgXCJkcmFnc3RhcnRcIixcbiAgICBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dFwiLCBldmVudC50YXJnZXQuY2xhc3NOYW1lKTtcbiAgICAgIGV2ZW50LnRhcmdldC5zdHlsZS5vcGFjaXR5ID0gXCIwLjVcIjtcbiAgICB9LFxuICAgIGZhbHNlXG4gIClcbik7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gIFwiZHJhZ2VuZFwiLFxuICBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBldmVudC50YXJnZXQuc3R5bGUub3BhY2l0eSA9IFwiXCI7XG4gICAgQXJyYXkuZnJvbShhY3RpdmVCb3gpLmZvckVhY2goKGFjdGl2ZSkgPT4ge1xuICAgICAgYWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgfSk7XG4gIH0sXG4gIGZhbHNlXG4pO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICBcImRyYWdvdmVyXCIsXG4gIGZ1bmN0aW9uIChldmVudCkge1xuICAgIC8vIHByZXZlbnQgZGVmYXVsdCB0byBhbGxvdyBkcm9wXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfSxcbiAgZmFsc2Vcbik7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyQm9hcmRcIikuYWRkRXZlbnRMaXN0ZW5lcihcbiAgXCJkcmFnZW50ZXJcIixcbiAgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgLy8gaGlnaGxpZ2h0IHBvdGVudGlhbCBkcm9wIHRhcmdldCB3aGVuIHRoZSBkcmFnZ2FibGUgZWxlbWVudCBlbnRlcnMgaXRcbiAgICBpZiAoY3VyckZvdXIpIHtcbiAgICAgIGhpZ2hsaWdodEZvdXJCbG9ja1NoaXAoZXZlbnQsIHZlcnRpY2FsQ2hlY2suZm91cik7XG4gICAgfSBlbHNlIGlmIChjdXJyVGhyZWUpIHtcbiAgICAgIGhpZ2hsaWdodFRocmVlQmxvY2tTaGlwKGV2ZW50LCB2ZXJ0aWNhbENoZWNrLnRocmVlKTtcbiAgICB9IGVsc2UgaWYgKGN1cnJUd28pIHtcbiAgICAgIGhpZ2hsaWdodFR3b0Jsb2NrU2hpcChldmVudCwgdmVydGljYWxDaGVjay50d28pO1xuICAgIH0gZWxzZSBpZiAoY3Vyck9uZSkge1xuICAgICAgaGlnaGxpZ2h0T25lQmxvY2tTaGlwKGV2ZW50KTtcbiAgICB9XG4gIH0sXG4gIGZhbHNlXG4pO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdFNoaXBcIikuYWRkRXZlbnRMaXN0ZW5lcihcbiAgLy9yZW1vdmVzIGhpZ2hsaWdodCBpZiBkcmFnIGJveCBnbyBiYWNrXG4gIFwiZHJhZ2VudGVyXCIsXG4gIGZ1bmN0aW9uIChldmVudCkge1xuICAgIEFycmF5LmZyb20oYWN0aXZlQm94KS5mb3JFYWNoKChhY3RpdmUpID0+IHtcbiAgICAgIGFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgIH0pO1xuICB9LFxuICBmYWxzZVxuKTtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXJCb2FyZFwiKS5hZGRFdmVudExpc3RlbmVyKFxuICBcImRyb3BcIixcbiAgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgLy8gcHJldmVudCBkZWZhdWx0IGFjdGlvbiAob3BlbiBhcyBsaW5rIGZvciBzb21lIGVsZW1lbnRzKVxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IC8vcHJldmVudCBib2R5IGRyb3AgZXZlbnQgZnJvbSB0cmlnZ2VyaW5nXG5cbiAgICBpZiAoY3VyckZvdXIpIHtcbiAgICAgIEFkZGluZ0ZvdXJCbG9ja1NoaXAoXG4gICAgICAgIGV2ZW50LnRhcmdldC5kYXRhc2V0LngsXG4gICAgICAgIGV2ZW50LnRhcmdldC5kYXRhc2V0LnksXG4gICAgICAgIFwicGxheWVyQm9hcmRcIixcbiAgICAgICAgZXZlbnQsXG4gICAgICAgIHZlcnRpY2FsQ2hlY2suZm91clxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKGN1cnJUaHJlZSkge1xuICAgICAgQWRkaW5nVGhyZWVCbG9ja1NoaXAoXG4gICAgICAgIGV2ZW50LnRhcmdldC5kYXRhc2V0LngsXG4gICAgICAgIGV2ZW50LnRhcmdldC5kYXRhc2V0LnksXG4gICAgICAgIFwicGxheWVyQm9hcmRcIixcbiAgICAgICAgZXZlbnQsXG4gICAgICAgIHZlcnRpY2FsQ2hlY2sudGhyZWVcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChjdXJyVHdvKSB7XG4gICAgICBBZGRpbmdUd29CbG9ja1NoaXAoXG4gICAgICAgIGV2ZW50LnRhcmdldC5kYXRhc2V0LngsXG4gICAgICAgIGV2ZW50LnRhcmdldC5kYXRhc2V0LnksXG4gICAgICAgIFwicGxheWVyQm9hcmRcIixcbiAgICAgICAgZXZlbnQsXG4gICAgICAgIHZlcnRpY2FsQ2hlY2sudHdvXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoY3Vyck9uZSkge1xuICAgICAgQWRkaW5nT25lQmxvY2tTaGlwKFxuICAgICAgICBldmVudC50YXJnZXQuZGF0YXNldC54LFxuICAgICAgICBldmVudC50YXJnZXQuZGF0YXNldC55LFxuICAgICAgICBcInBsYXllckJvYXJkXCIsXG4gICAgICAgIGV2ZW50XG4gICAgICApO1xuICAgIH1cbiAgICBBcnJheS5mcm9tKGVycm9yQm94KS5mb3JFYWNoKChlcnJvcikgPT4ge1xuICAgICAgZXJyb3IuY2xhc3NMaXN0LnJlbW92ZShcImVycm9yXCIpO1xuICAgIH0pO1xuICB9LFxuICBmYWxzZVxuKTtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcbiAgXCJkcm9wXCIsXG4gIGZ1bmN0aW9uIChlKSB7XG4gICAgQXJyYXkuZnJvbShlcnJvckJveCkuZm9yRWFjaCgoZXJyb3IpID0+IHtcbiAgICAgIGVycm9yLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvclwiKTtcbiAgICB9KTtcbiAgfSxcbiAgZmFsc2Vcbik7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmFuZG9taXplXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXRcIikuY2xpY2soKTtcbiAgcmFuZG9taXplKFwicGxheWVyQm9hcmRcIik7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VsZWN0U2hpcFwiKS50ZXh0Q29udGVudCA9IFwiXCI7XG4gIGFkZEJlZ2luQnV0dG9uKCk7XG59KTtcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucm90YXRlXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IGdldHRoaXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdFNoaXAgPiBkaXZcIik7XG5cbiAgbGV0IGdyaWRDb2x1bW5zID0gZ2V0Q29tcHV0ZWRTdHlsZShnZXR0aGlzKVxuICAgIC5nZXRQcm9wZXJ0eVZhbHVlKFwiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCIpXG4gICAgLnNwbGl0KFwiIFwiKS5sZW5ndGg7XG5cbiAgaWYgKGN1cnJGb3VyKSB7XG4gICAgcm90YXRlRm91ckJsb2NrU2hpcChncmlkQ29sdW1ucyk7XG4gIH0gZWxzZSBpZiAoY3VyclRocmVlKSB7XG4gICAgcm90YXRlVGhyZWVCbG9ja1NoaXAoZ3JpZENvbHVtbnMpO1xuICB9IGVsc2UgaWYgKGN1cnJUd28pIHtcbiAgICByb3RhdGVUd29CbG9ja1NoaXAoZ3JpZENvbHVtbnMpO1xuICB9XG59KTtcblxuZnVuY3Rpb24gY2xlYW5Cb3hTeW1ib2woYm94ZXMpIHtcbiAgYm94ZXMuZm9yRWFjaCgoc3ltYm9sKSA9PiB7XG4gICAgc3ltYm9sLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBzeW1ib2wuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIHN5bWJvbC5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBjbGVhblBsYXllckJvYXJkKCkge1xuICBjb25zdCBQTEFZRVJfQk9BUkRfQk9YRVMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBsYXllckJvYXJkID4gLmJveFwiKTtcbiAgUExBWUVSX0JPQVJEX0JPWEVTLmZvckVhY2goKGJveCkgPT4ge1xuICAgIGNvbnN0IG5ld0JveCA9IGJveC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgYm94LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld0JveCwgYm94KTtcbiAgICBuZXdCb3guc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiXCI7XG4gICAgT2JqZWN0LmtleXMobmV3Qm94LmRhdGFzZXQpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKGtleSA9PT0gXCJ4XCIgfHwga2V5ID09PSBcInlcIikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBkZWxldGUgbmV3Qm94LmRhdGFzZXRba2V5XTtcbiAgICB9KTtcbiAgICBuZXdCb3guY2xhc3NOYW1lID0gXCJib3hcIjtcbiAgICBuZXdCb3gucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIik7XG4gIH0pO1xuICBjb25zdCBQTEFZRVJfQk9BUkRfQk9YX1NZTUJPTCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgXCIucGxheWVyQm9hcmQgPiAuYm94ID4gLnN5bWJvbFwiXG4gICk7XG5cbiAgY2xlYW5Cb3hTeW1ib2woUExBWUVSX0JPQVJEX0JPWF9TWU1CT0wpO1xufVxuXG5mdW5jdGlvbiBjbGVhbkNvbXB1dGVyQm9hcmQoKSB7XG4gIGNvbnN0IENPTVBVVEVSX0JPQVJEX0JPWEVTID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICBcIi5jb21wdXRlckJvYXJkID4gLmJveFwiXG4gICk7XG4gIENPTVBVVEVSX0JPQVJEX0JPWEVTLmZvckVhY2goKGJveCkgPT4ge1xuICAgIGJveC5jbGFzc05hbWUgPSBcImJveFwiO1xuICAgIGJveC5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcbiAgfSk7XG5cbiAgY29uc3QgQ09NUFVURVJfQk9BUkRfQk9YRVNfU1lNQk9MID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICBcIi5jb21wdXRlckJvYXJkID4gLmJveCA+IC5zeW1ib2xcIlxuICApO1xuICBjbGVhbkJveFN5bWJvbChDT01QVVRFUl9CT0FSRF9CT1hFU19TWU1CT0wpO1xuXG4gIGNvbnN0IG9sZENvbXB1dGVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXB1dGVyQm9hcmRcIik7XG4gIGNvbnN0IG5ld0NvbXB1dGVyQm9hcmQgPSBkb2N1bWVudFxuICAgIC5xdWVyeVNlbGVjdG9yKFwiLmNvbXB1dGVyQm9hcmRcIilcbiAgICAuY2xvbmVOb2RlKHRydWUpO1xuICBkb2N1bWVudFxuICAgIC5xdWVyeVNlbGVjdG9yKFwiLmNvbXB1dGVyQm9hcmRDb250YWluZXJcIilcbiAgICAucmVwbGFjZUNoaWxkKG5ld0NvbXB1dGVyQm9hcmQsIG9sZENvbXB1dGVyQm9hcmQpO1xufVxuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc3RhcnRcIikuYWRkRXZlbnRMaXN0ZW5lcihcbiAgXCJjbGlja1wiLCBcbiAgZnVuY3Rpb24gKGUpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc2V0XCIpLmNsaWNrKCk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZpbmlzaFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maW5pc2hcIikuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImZvcm1cIikuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihcImZvcm1cIilcbiAgICAgIC5pbnNlcnRCZWZvcmUoXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyQm9hcmRcIiksXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXRcIilcbiAgICAgICk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW5Db250ZW50XCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW5Db250ZW50XCIpLnN0eWxlLmZpbHRlciA9IFwiXCI7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluQ29udGVudFwiKS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJcIjtcblxuICAgIGNsZWFuUGxheWVyQm9hcmQoKTtcblxuICAgIGNsZWFuQ29tcHV0ZXJCb2FyZCgpO1xufSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9