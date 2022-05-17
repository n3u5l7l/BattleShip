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
  
  export { generateFour, generateThree, generateTwo, generateOne };