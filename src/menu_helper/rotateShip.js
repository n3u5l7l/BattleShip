import { verticalCheck } from "./addShip.js";

function rotateFourBlockShip(gridColumns) {
  if (gridColumns === 4) {
    document.querySelector(".selectShip > div").style.gridTemplateColumns =
      "20px";
    document.querySelector(".selectShip > div").style.gridTemplateRows =
      "repeat(4, 20px)";
    verticalCheck.four = true;
  } else {
    document.querySelector(".selectShip > div").style.gridTemplateColumns =
      "repeat(4, 20px)";
    document.querySelector(".selectShip > div").style.gridTemplateRows = "20px";
    verticalCheck.four = false;
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
    verticalCheck.three = true;
  } else {
    document
      .querySelectorAll(".selectShip > div")
      .forEach((ship) => (ship.style.gridTemplateColumns = "repeat(3, 20px)"));
    document
      .querySelectorAll(".selectShip > div")
      .forEach((ship) => (ship.style.gridTemplateRows = "20px"));
    verticalCheck.three = false;
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
    verticalCheck.two = true;
  } else {
    document
      .querySelectorAll(".selectShip > div")
      .forEach((ship) => (ship.style.gridTemplateColumns = "repeat(2, 20px)"));
    document
      .querySelectorAll(".selectShip > div")
      .forEach((ship) => (ship.style.gridTemplateRows = "20px"));
    verticalCheck.two = false;
  }
}

export { rotateFourBlockShip, rotateThreeBlockShip, rotateTwoBlockShip };
