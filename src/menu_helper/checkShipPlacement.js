import { gameBoard } from "../fixed/gameBoard.js";

function checkFourPlacementHorizontal(x, y, whatBoard) {
  return (
    !gameBoard[whatBoard][y][x] &&
    !gameBoard[whatBoard][y][x + 1] &&
    !gameBoard[whatBoard][y][x + 2] &&
    !gameBoard[whatBoard][y][x + 3]
  );
}
function checkFourPlacementVertically(x, y, whatBoard) {
  return (
    !gameBoard[whatBoard][y][x] &&
    !gameBoard[whatBoard][y + 1][x] &&
    !gameBoard[whatBoard][y + 2][x] &&
    !gameBoard[whatBoard][y + 3][x]
  );
}

function checkThreePlacementHorizontal(x, y, whatBoard) {
  return (
    !gameBoard[whatBoard][y][x] &&
    !gameBoard[whatBoard][y][x + 1] &&
    !gameBoard[whatBoard][y][x + 2]
  );
}
function checkThreePlacementVertically(x, y, whatBoard) {
  return (
    !gameBoard[whatBoard][y][x] &&
    !gameBoard[whatBoard][y + 1][x] &&
    !gameBoard[whatBoard][y + 2][x]
  );
}

function checkTwoPlacementHorizontal(x, y, whatBoard) {
  return !gameBoard[whatBoard][y][x] && !gameBoard[whatBoard][y][x + 1];
}

function checkTwoPlacementVertically(x, y, whatBoard) {
  return !gameBoard[whatBoard][y][x] && !gameBoard[whatBoard][y + 1][x];
}

function checkOnePlacement(x, y, whatBoard) {
  return !gameBoard[whatBoard][y][x];
}

export {
    checkFourPlacementHorizontal,
    checkFourPlacementVertically,
    checkThreePlacementHorizontal,
    checkThreePlacementVertically,
    checkTwoPlacementHorizontal,
    checkTwoPlacementVertically,
    checkOnePlacement,
};