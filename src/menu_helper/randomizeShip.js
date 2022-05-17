import {
    shipUsed,
    AddingFourBlockShip,
    AddingThreeBlockShip,
    AddingTwoBlockShip,
    AddingOneBlockShip,
  } from "./addShip.js";


export function randomize(whatBoard) {
    let isVertical = Math.floor(Math.random() * 100) % 2 === 0 ? true : false;
    let xPos;
    let yPos;
    let count = 0;
    while (count < 1) {
        if (isVertical) {
        xPos = Math.floor(Math.random() * 100) % 10;
        yPos = Math.floor(Math.random() * 100) % 7;
        if (
            AddingFourBlockShip(xPos, yPos, whatBoard, "noEvent", isVertical) ===
            false
        ) {
            continue;
        }
        count++;
        } else {
        xPos = Math.floor(Math.random() * 100) % 7;
        yPos = Math.floor(Math.random() * 100) % 10;
        if (
            AddingFourBlockShip(xPos, yPos, whatBoard, "noEvent", isVertical) ===
            false
        ) {
            continue;
        }
        count++;
        }
    }
    shipUsed.count = 0;
    count = 0;
    isVertical = Math.floor(Math.random() * 100) % 2 === 0 ? true : false;
    while (count < 2) {
        if (isVertical) {
        xPos = Math.floor(Math.random() * 100) % 10;
        yPos = Math.floor(Math.random() * 100) % 8;
        if (
            AddingThreeBlockShip(xPos, yPos, whatBoard, "noEvent", isVertical) ===
            false
        ) {
            continue;
        }
        count++;
        } else {
        xPos = Math.floor(Math.random() * 100) % 8;
        yPos = Math.floor(Math.random() * 100) % 10;
        if (
            AddingThreeBlockShip(xPos, yPos, whatBoard, "noEvent", isVertical) ===
            false
        ) {
            continue;
        }
        count++;
        }
    }
    shipUsed.count = 0;
    count = 0;
    isVertical = Math.floor(Math.random() * 100) % 2 === 0 ? true : false;
    while (count < 3) {
        if (isVertical) {
        xPos = Math.floor(Math.random() * 100) % 10;
        yPos = Math.floor(Math.random() * 100) % 9;
        if (
            AddingTwoBlockShip(xPos, yPos, whatBoard, "noEvent", isVertical) ===
            false
        ) {
            continue;
        }
        count++;
        } else {
        xPos = Math.floor(Math.random() * 100) % 9;
        yPos = Math.floor(Math.random() * 100) % 10;
        if (
            AddingTwoBlockShip(xPos, yPos, whatBoard, "noEvent", isVertical) ===
            false
        ) {
            continue;
        }
        count++;
        }
    }
    shipUsed.count = 0;
    count = 0;
    isVertical = Math.floor(Math.random() * 100) % 2 === 0 ? true : false;
    while (count < 4) {
        if (isVertical) {
        xPos = Math.floor(Math.random() * 100) % 10;
        yPos = Math.floor(Math.random() * 100) % 10;
        if (
            AddingOneBlockShip(xPos, yPos, whatBoard, "noEvent", isVertical) ===
            false
        ) {
            continue;
        }
        count++;
        } else {
        xPos = Math.floor(Math.random() * 100) % 10;
        yPos = Math.floor(Math.random() * 100) % 10;
        if (
            AddingOneBlockShip(xPos, yPos, whatBoard, "noEvent", isVertical) ===
            false
        ) {
            continue;
        }
        count++;
        }
    }
    shipUsed.count = 0;
}
  