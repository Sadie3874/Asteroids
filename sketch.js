// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let player1;
function setup() {
  createCanvas(400, 400);
  player1 = new player(200, 200, 20);
}

function draw() {
  background(220);
  player1.processInput();
  //player1.movement();
  player1.playerDisplay();
}
