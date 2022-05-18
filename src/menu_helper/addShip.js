import {
    checkFourPlacementHorizontal,
    checkFourPlacementVertically,
    checkThreePlacementHorizontal,
    checkThreePlacementVertically,
    checkTwoPlacementHorizontal,
    checkTwoPlacementVertically,
    checkOnePlacement,
  } from "./checkShipPlacement.js";
  
import {
updateFourBlockShip,
updateFourBlockShipVertically,
updateThreeBlockShip,
updateThreeBlockShipVertically,
updateTwoBlockShip,
updateTwoBlockShipVertically,
updateOneBlockShip,
} from "./updateShip.js";

import {
generateOne,
generateTwo,
generateThree,
generateFour,
} from "./generateShip.js";

import { gameBoard } from "../factories/GameBoard.js";

import { activeBox, errorBox } from "./highlightShip.js";

import { addBeginButton } from "./beginButton.js";

import { enemy } from "../factories/Player.js";

let shipUsed = { count: 0 };
let currFour = true;
let currThree = false;
let currTwo = false;
let currOne = false;
const verticalCheck = { four: false, three: false, two: false };

export {shipUsed, currFour, currThree, currTwo, currOne, verticalCheck};

export function AddingFourBlockShip(x, y, whatBoard, event, vertical) {
const whereX = Number(x);
if (vertical) {
    const whereY = Number(y);

    if (whereY > 6) {
    return false;
    }

    if (!checkFourPlacementVertically(whereX, whereY, whatBoard)) {
    return false;
    }

    if (whatBoard === "playerBoard") {
    gameBoard.assignPlayerShip("four-block-0", 0, whereX, whereY, true);
    gameBoard.assignPlayerShip("four-block-0", 1, whereX, whereY + 1, true);
    gameBoard.assignPlayerShip("four-block-0", 2, whereX, whereY + 2, true);
    gameBoard.assignPlayerShip("four-block-0", 3, whereX, whereY + 3, true);
    } else {
    gameBoard.assignEnemyShip("four-block-0", 0, whereX, whereY, true);
    gameBoard.assignEnemyShip("four-block-0", 1, whereX, whereY + 1, true);
    gameBoard.assignEnemyShip("four-block-0", 2, whereX, whereY + 2, true);
    gameBoard.assignEnemyShip("four-block-0", 3, whereX, whereY + 3, true);
    }

    updateFourBlockShipVertically(whereX, whereY, whatBoard, gameBoard);
} else {
    const whereY = Number(y);
    if (whereX > 6) {
    return false;
    }

    if (!checkFourPlacementHorizontal(whereX, whereY, whatBoard)) {
    return false;
    }

    if (whatBoard === "playerBoard") {
    gameBoard.assignPlayerShip("four-block-0", 0, whereX, whereY, false);
    gameBoard.assignPlayerShip("four-block-0", 1, whereX + 1, whereY, false);
    gameBoard.assignPlayerShip("four-block-0", 2, whereX + 2, whereY, false);
    gameBoard.assignPlayerShip("four-block-0", 3, whereX + 3, whereY, false);
    } else {
    gameBoard.assignEnemyShip("four-block-0", 0, whereX, whereY, false);
    gameBoard.assignEnemyShip("four-block-0", 1, whereX + 1, whereY, false);
    gameBoard.assignEnemyShip("four-block-0", 2, whereX + 2, whereY, false);
    gameBoard.assignEnemyShip("four-block-0", 3, whereX + 3, whereY, false);
    }

    updateFourBlockShip(whereX, whereY, whatBoard, gameBoard);
}
if (whatBoard === "playerBoard" && event != "noEvent") {
    currFour = false;
    document.querySelector(".selectShip").textContent = "";
    document.querySelector(".whatOption").textContent =
    "Place your three-block ship";
    currThree = true;
    generateThree();
}
}

export function AddingThreeBlockShip(x, y, whatBoard, event, vertical) {
const whereX = Number(x);

if (vertical) {
    const whereY = Number(y);

    if (whereY > 7) {
    return false;
    }

    if (!checkThreePlacementVertically(whereX, whereY, whatBoard)) {
    return false;
    }

    if (whatBoard === "playerBoard") {
    gameBoard.assignPlayerShip(
        `three-block-${shipUsed.count}`,
        0,
        whereX,
        whereY,
        true
    );
    gameBoard.assignPlayerShip(
        `three-block-${shipUsed.count}`,
        1,
        whereX,
        whereY + 1,
        true
    );
    gameBoard.assignPlayerShip(
        `three-block-${shipUsed.count}`,
        2,
        whereX,
        whereY + 2,
        true
    );
    } else {
    gameBoard.assignEnemyShip(
        `three-block-${shipUsed.count}`,
        0,
        whereX,
        whereY,
        true
    );
    gameBoard.assignEnemyShip(
        `three-block-${shipUsed.count}`,
        1,
        whereX,
        whereY + 1,
        true
    );
    gameBoard.assignEnemyShip(
        `three-block-${shipUsed.count}`,
        2,
        whereX,
        whereY + 2,
        true
    );
    }

    updateThreeBlockShipVertically(whereX, whereY, whatBoard, gameBoard);
    shipUsed.count++;
} else {
    const whereY = Number(y);

    if (whereX > 7) {
    return false;
    }
    if (!checkThreePlacementHorizontal(whereX, whereY, whatBoard)) {
    return false;
    }
    if (whatBoard === "playerBoard") {
    gameBoard.assignPlayerShip(
        `three-block-${shipUsed.count}`,
        0,
        whereX,
        whereY,
        false
    );
    gameBoard.assignPlayerShip(
        `three-block-${shipUsed.count}`,
        1,
        whereX + 1,
        whereY,
        false
    );
    gameBoard.assignPlayerShip(
        `three-block-${shipUsed.count}`,
        2,
        whereX + 2,
        whereY,
        false
    );
    } else {
    gameBoard.assignEnemyShip(
        `three-block-${shipUsed.count}`,
        0,
        whereX,
        whereY,
        false
    );
    gameBoard.assignEnemyShip(
        `three-block-${shipUsed.count}`,
        1,
        whereX + 1,
        whereY,
        false
    );
    gameBoard.assignEnemyShip(
        `three-block-${shipUsed.count}`,
        2,
        whereX + 2,
        whereY,
        false
    );
    }

    updateThreeBlockShip(whereX, whereY, whatBoard, gameBoard);
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
    generateTwo();
    currTwo = true;
    }
}
}

export function AddingTwoBlockShip(x, y, whatBoard, event, vertical) {
const whereX = Number(x);

if (vertical) {
    const whereY = Number(y);

    if (whereY > 8) {
    return false;
    }
    if (!checkTwoPlacementVertically(whereX, whereY, whatBoard)) {
    return false;
    }
    if (whatBoard === "playerBoard") {
    gameBoard.assignPlayerShip(
        `two-block-${shipUsed.count}`,
        0,
        whereX,
        whereY,
        true
    );
    gameBoard.assignPlayerShip(
        `two-block-${shipUsed.count}`,
        1,
        whereX,
        whereY + 1,
        true
    );
    } else {
    gameBoard.assignEnemyShip(
        `two-block-${shipUsed.count}`,
        0,
        whereX,
        whereY,
        true
    );
    gameBoard.assignEnemyShip(
        `two-block-${shipUsed.count}`,
        1,
        whereX,
        whereY + 1,
        true
    );
    }
    updateTwoBlockShipVertically(whereX, whereY, whatBoard, gameBoard);
    shipUsed.count++;
} else {
    const whereY = Number(y);

    if (whereX > 8) {
    return false;
    }
    if (!checkTwoPlacementHorizontal(whereX, whereY, whatBoard)) {
    return false;
    }

    if (whatBoard === "playerBoard") {
    gameBoard.assignPlayerShip(
        `two-block-${shipUsed.count}`,
        0,
        whereX,
        whereY,
        false
    );
    gameBoard.assignPlayerShip(
        `two-block-${shipUsed.count}`,
        1,
        whereX + 1,
        whereY,
        false
    );
    } else {
    gameBoard.assignEnemyShip(
        `two-block-${shipUsed.count}`,
        0,
        whereX,
        whereY,
        false
    );
    gameBoard.assignEnemyShip(
        `two-block-${shipUsed.count}`,
        1,
        whereX + 1,
        whereY,
        false
    );
    }

    updateTwoBlockShip(whereX, whereY, whatBoard, gameBoard);
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
    generateOne();
    currOne = true;
    }
}
}

export function AddingOneBlockShip(x, y, whatBoard, event) {
const whereY = Number(y);
const whereX = Number(x);

if (!checkOnePlacement(whereX, whereY, whatBoard)) {
    return false;
}
if (whatBoard === "playerBoard") {
    gameBoard.assignPlayerShip(
    `one-block-${shipUsed.count}`,
    0,
    whereX,
    whereY
    );
} else {
    gameBoard.assignEnemyShip(`one-block-${shipUsed.count}`, 0, whereX, whereY);
}

updateOneBlockShip(whereX, whereY, whatBoard, gameBoard);
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
    addBeginButton();
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

gameBoard.reset();
enemy.reset();

currFour = true;
currThree = false;
currTwo = false;
currOne = false;
verticalCheck.four = false;
verticalCheck.three = false;
verticalCheck.two = false;
shipUsed = { count: 0 };
generateFour();
});