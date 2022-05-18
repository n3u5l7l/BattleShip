import { gameBoard } from "./gameBoard.js";
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

export const player = new Player(gameBoard);
export const enemy = new Player(gameBoard);