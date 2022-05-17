import {
    checkFourPlacementHorizontal,
    checkFourPlacementVertically,
    checkThreePlacementHorizontal,
    checkThreePlacementVertically,
    checkTwoPlacementHorizontal,
    checkTwoPlacementVertically,
    checkOnePlacement,
  } from "./checkShipPlacement.js";
  
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

    if (!checkFourPlacementVertically(whereX, whereY, "playerBoard")) {
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
    if (!checkFourPlacementHorizontal(whereX, whereY, "playerBoard")) {
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
    !checkThreePlacementVertically(
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
    if (!checkThreePlacementHorizontal(whereX, whereY, "playerBoard")) {
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
    !checkTwoPlacementVertically(
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
    if (!checkTwoPlacementHorizontal(whereX, whereY, "playerBoard")) {
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
if (!checkOnePlacement(whereX, whereY, "playerBoard")) {
    event.target.classList.add("error");
    return;
}

event.target.classList.add("active");
}

export {
    activeBox,
    errorBox,
    highlightFourBlockShip,
    highlightThreeBlockShip,
    highlightTwoBlockShip,
    highlightOneBlockShip,
};
