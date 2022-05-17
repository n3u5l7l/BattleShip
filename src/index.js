import {
  AddingFourBlockShip,
  AddingThreeBlockShip,
  AddingTwoBlockShip,
  AddingOneBlockShip,
  currFour,
  currThree,
  currTwo,
  currOne,
  verticalCheck,
} from "./menu_helper/addShip.js";
import { addBeginButton } from "./menu_helper/beginButton.js";
import { generateFour } from "./menu_helper/generateShip.js";
import {
  highlightOneBlockShip,
  highlightTwoBlockShip,
  highlightThreeBlockShip,
  highlightFourBlockShip,
  activeBox,
  errorBox,
} from "./menu_helper/highlightShip.js";
import { randomize } from "./menu_helper/randomizeShip.js";
import {
  rotateFourBlockShip,
  rotateThreeBlockShip,
  rotateTwoBlockShip,
} from "./menu_helper/rotateShip.js";

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
    Array.from(activeBox).forEach((active) => {
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
    if (currFour) {
      highlightFourBlockShip(event, verticalCheck.four);
    } else if (currThree) {
      highlightThreeBlockShip(event, verticalCheck.three);
    } else if (currTwo) {
      highlightTwoBlockShip(event, verticalCheck.two);
    } else if (currOne) {
      highlightOneBlockShip(event);
    }
  },
  false
);

document.querySelector(".selectShip").addEventListener(
  //removes highlight if drag box go back
  "dragenter",
  function (event) {
    Array.from(activeBox).forEach((active) => {
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

    if (currFour) {
      AddingFourBlockShip(
        event.target.dataset.x,
        event.target.dataset.y,
        "playerBoard",
        event,
        verticalCheck.four
      );
    } else if (currThree) {
      AddingThreeBlockShip(
        event.target.dataset.x,
        event.target.dataset.y,
        "playerBoard",
        event,
        verticalCheck.three
      );
    } else if (currTwo) {
      AddingTwoBlockShip(
        event.target.dataset.x,
        event.target.dataset.y,
        "playerBoard",
        event,
        verticalCheck.two
      );
    } else if (currOne) {
      AddingOneBlockShip(
        event.target.dataset.x,
        event.target.dataset.y,
        "playerBoard",
        event
      );
    }
    Array.from(errorBox).forEach((error) => {
      error.classList.remove("error");
    });
  },
  false
);

document.querySelector("body").addEventListener(
  "drop",
  function (e) {
    Array.from(errorBox).forEach((error) => {
      error.classList.remove("error");
    });
  },
  false
);

document.querySelector(".randomize").addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".reset").click();
  randomize("playerBoard");
  document.querySelector(".selectShip").textContent = "";
  addBeginButton();
});
document.querySelector(".rotate").addEventListener("click", function (e) {
  e.preventDefault();
  const getthis = document.querySelector(".selectShip > div");

  let gridColumns = getComputedStyle(getthis)
    .getPropertyValue("grid-template-columns")
    .split(" ").length;

  if (currFour) {
    rotateFourBlockShip(gridColumns);
  } else if (currThree) {
    rotateThreeBlockShip(gridColumns);
  } else if (currTwo) {
    rotateTwoBlockShip(gridColumns);
  }
});
