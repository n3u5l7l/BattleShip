import { randomize } from "./randomizeShip.js";
import { player } from "../fixed/player.js";
import { gameBoard } from "../fixed/gameBoard.js";

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
      randomize("computerBoard");
      addBoardEvents("playerBoard");
      addBoardEvents("computerBoard");
      gameBoard.startGame();
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
      if (gameBoard.whosTurn === "player") {
        player.attack(e.target.dataset.x, e.target.dataset.y, e.target);
        setTimeout(() => {
          player.randomAttack();
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
      if (gameBoard.whosTurn === "player") {
        player.attack(e.target.dataset.x, e.target.dataset.y, e.target);
        setTimeout(() => {
          player.randomAttack();
        }, 1000);
      }
    }
  }
  document.querySelectorAll(`.${thisBoard} > .box`).forEach((box) => {
    if (
      gameBoard[`${thisBoard}`][box.dataset.y][box.dataset.x].split("-")
        .length === 3
    ) {
      box.addEventListener("click", containShipBox);
    } else {
      box.addEventListener("click", noShipBox);
    }
  });
}

export { addBeginButton };
