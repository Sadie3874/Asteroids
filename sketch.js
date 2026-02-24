// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let player1;
let playerShipImg;
let playerShipBoostImg;
let bullets = [];
let asteroids = [];

let enterClicked = false;
function preload() {
 
  //playerShipImg = loadImage('Asteroids\Images\Ship.png');
  //playerShipBoostImg = loadImage('Asteroids/Images/BoostShip.png');
}
function setup() {
  createCanvas(400, 400);
  // , playerShipImg, playerShipBoostImg
  player1 = new player(200, 200);
  asteroids.push(new asteroid(100, 100, 30));
  asteroids.push(new asteroid(200, 300, 30)); 
  asteroids.push(new asteroid(300, 100, 30)); 
  asteroids.push(new asteroid(150, 200, 30));
}

function draw() {
  background(220);
  player1.processInput();
  player1.playerDisplay();

  if(keyIsDown(ENTER)){
    enterClicked = true;
  }

  if(!keyIsPressed && enterClicked){
    enterClicked = false;
    let newBullet = new bullet(player1.position.x, player1.position.y, player1.angle);
    bullets.push(newBullet);
  }

  if(bullets.length > 0){
    for(let i = 0; i < bullets.length; i++){
      bullets[i].movement();
      bullets[i].spawnBullet();
      bullets[i].lifeSpan();
      if(bullets[i].lifeSpan() == true){
        console.log("dead");
        bullets.splice(i, 1);
      }
    }
  }

  for(let i = 0; i < asteroids.length; i++){
    asteroids[i].spawnAsteroid();
    asteroids[i].asteroidMovement();
  }

  checkCollision();

}
function circleCircle(c1x, c1y, c1r, c2x, c2y, c2r) {

  // get distance between the circle's centers
  // use the Pythagorean Theorem to compute the distance
  let distX = c1x - c2x;
  let distY = c1y - c2y;
  let distance = sqrt( (distX*distX) + (distY*distY) );

  // if the distance is less than the sum of the circle's
  // radii, the circles are touching!
  if (distance <= c1r+c2r) {
    return true;
  }
  return false;
}

function checkCollision(){
  for(let i = 0; i < asteroids.length; i++){
    if(circleCircle(player1.position.x, player1.position.y, player1.size/2, asteroids[i].position.x, asteroids[i].position.y, asteroids[i].size/2)){
      if(player1.RemoveHealth() == true){
        console.log("Game Over");
        // reset player
        // player.position = createVector(200, 200);
        // player.health = 2;
        // restart from beginging 
      }
    }
  }
}