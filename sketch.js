// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let player1;
function preload() {
 
  playerShipImg = loadImage('Asteroids/Images/Ship.png');
  playerShipBoostImg = loadImage('Asteroids/Images/Ship_Boost.png');
}
function setup() {
  createCanvas(400, 400);
  player1 = new player(200, 200, playerShipImg, playerShipBoostImg);
}

function draw() {
  background(220);
  player1.processInput();
  player1.playerDisplay();
}
