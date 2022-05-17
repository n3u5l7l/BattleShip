import { shipUsed } from "./addShip.js";

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

    firstBlock.setAttribute("data-ship", `three-block-${shipUsed.count}`);
    secondBlock.setAttribute("data-ship", `three-block-${shipUsed.count}`);
    thirdBlock.setAttribute("data-ship", `three-block-${shipUsed.count}`);
  }

  gameBoard.updateBoard(y, x, whatBoard, `three-block-${shipUsed.count}`);
  gameBoard.updateBoard(y, x + 1, whatBoard, `three-block-${shipUsed.count}`);
  gameBoard.updateBoard(y, x + 2, whatBoard, `three-block-${shipUsed.count}`);

  if (x === 0 && y === 0) {
    //check top left corner
    gameBoard.updateBoard(
      y,
      x + 3,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 2,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 3,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
  } else if (x === 7 && y === 0) {
    //check top right coner
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 2,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
  } else if (x === 0 && y === 9) {
    //check bottom left corner
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 2,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 3,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 3,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
  } else if (x === 7 && y === 9) {
    //check bottom right corner
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 2,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
  } else if (x === 0) {
    //check first column
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 2,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 2,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 3,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 3,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 3,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
  } else if (x === 7) {
    //check last column
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 2,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 2,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
  } else if (y === 0) {
    //check first row
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 2,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 3,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 3,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
  } else if (y === 9) {
    //check last row
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 2,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 3,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 3,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
  } else {
    //check rest of the array
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 2,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 2,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 3,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 3,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 3,
      whatBoard,
      `three-block-${shipUsed.count}-space`
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

    firstBlock.setAttribute("data-ship", `three-block-${shipUsed.count}`);
    secondBlock.setAttribute("data-ship", `three-block-${shipUsed.count}`);
    thirdBlock.setAttribute("data-ship", `three-block-${shipUsed.count}`);
  }
  gameBoard.updateBoard(y, x, whatBoard, `three-block-${shipUsed.count}`);
  gameBoard.updateBoard(y + 1, x, whatBoard, `three-block-${shipUsed.count}`);
  gameBoard.updateBoard(y + 2, x, whatBoard, `three-block-${shipUsed.count}`);

  if (x === 0 && y === 0) {
    //check top left corner
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 3,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 3,
      x,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
  } else if (x === 9 && y === 0) {
    //check top right corner
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 3,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 3,
      x,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
  } else if (x === 0 && y === 7) {
    //check bottom left corner
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
  } else if (x === 9 && y === 7) {
    //check bottom right corner
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
  } else if (x === 0) {
    //check first column
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 3,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 3,
      x,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
  } else if (x === 9) {
    //check last column
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 3,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 3,
      x,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
  } else if (y === 0) {
    //check first row
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 3,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 3,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 3,
      x,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
  } else if (y === 7) {
    //check last row
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
  } else {
    //check rest of the array
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 3,
      x - 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 3,
      x + 1,
      whatBoard,
      `three-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 3,
      x,
      whatBoard,
      `three-block-${shipUsed.count}-space`
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

    firstBlock.setAttribute("data-ship", `two-block-${shipUsed.count}`);
    secondBlock.setAttribute("data-ship", `two-block-${shipUsed.count}`);
  }

  gameBoard.updateBoard(y, x, whatBoard, `two-block-${shipUsed.count}`);
  gameBoard.updateBoard(y, x + 1, whatBoard, `two-block-${shipUsed.count}`);

  if (x === 0 && y === 0) {
    //check top left corner
    gameBoard.updateBoard(
      y,
      x + 2,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 2,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
  } else if (x === 8 && y === 0) {
    //check top right coner
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
  } else if (x === 0 && y === 9) {
    //check bottom left corner
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 2,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 2,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
  } else if (x === 8 && y === 9) {
    //check bottom right corner
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
  } else if (x === 0) {
    //check first column
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 2,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 2,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 2,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
  } else if (x === 8) {
    //check last column
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
  } else if (y === 0) {
    //check first row
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 2,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 2,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
  } else if (y === 9) {
    //check last row
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 2,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 2,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
  } else {
    //check rest of the array
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 2,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 2,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 2,
      whatBoard,
      `two-block-${shipUsed.count}-space`
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

    firstBlock.setAttribute("data-ship", `two-block-${shipUsed.count}`);
    secondBlock.setAttribute("data-ship", `two-block-${shipUsed.count}`);
  }

  gameBoard.updateBoard(y, x, whatBoard, `two-block-${shipUsed.count}`);
  gameBoard.updateBoard(y + 1, x, whatBoard, `two-block-${shipUsed.count}`);

  if (x === 0 && y === 0) {
    //check top left corner
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
  } else if (x === 9 && y === 0) {
    //check top right corner
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
  } else if (x === 0 && y === 8) {
    //check bottom left corner
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
  } else if (x === 9 && y === 8) {
    //check bottom right corner
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
  } else if (x === 0) {
    //check first column
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
  } else if (x === 9) {
    //check last column
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
  } else if (y === 0) {
    //check first row
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
  } else if (y === 8) {
    //check last row
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
  } else {
    //check rest of the array
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x - 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x + 1,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 2,
      x,
      whatBoard,
      `two-block-${shipUsed.count}-space`
    );
  }
}

function updateOneBlockShip(x, y, whatBoard, gameBoard) {
  if (whatBoard === "playerBoard") {
    const firstBlock = document.querySelector(
      `.${whatBoard} > [data-y="${y}"][data-x="${x}"]`
    );

    firstBlock.setAttribute("data-ship", `one-block-${shipUsed.count}`);
  }

  gameBoard.updateBoard(y, x, whatBoard, `one-block-${shipUsed.count}`);

  if (x === 0 && y === 0) {
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
  } else if (x === 9 && y === 0) {
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
  } else if (x === 0 && y === 9) {
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
  } else if (x === 9 && y === 9) {
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
  } else if (x === 0) {
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
  } else if (x === 9) {
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
  } else if (y === 0) {
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
  } else if (y === 9) {
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
  } else {
    gameBoard.updateBoard(
      y,
      x - 1,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x - 1,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x - 1,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y - 1,
      x + 1,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y + 1,
      x + 1,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
    gameBoard.updateBoard(
      y,
      x + 1,
      whatBoard,
      `one-block-${shipUsed.count}-space`
    );
  }
}
export {
  updateFourBlockShip,
  updateFourBlockShipVertically,
  updateThreeBlockShip,
  updateThreeBlockShipVertically,
  updateTwoBlockShip,
  updateTwoBlockShipVertically,
  updateOneBlockShip,
};