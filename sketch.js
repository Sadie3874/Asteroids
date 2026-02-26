// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let displayManager1;
let player1;
let playerShipImg;
let playerShipBoostImg;
let bullets = [];
let asteroids = [];

let enterClicked = false;

function setup() {
  createCanvas(400, 400);

  displayManager1 = new displayManager();
  player1 = new player(200, 200);
  asteroids.push(new asteroid(100, 100, 30));
  asteroids.push(new asteroid(200, 300, 30)); 
  asteroids.push(new asteroid(300, 100, 30)); 
  asteroids.push(new asteroid(150, 200, 30));
  
}

function draw() {
  background(220);
  displayHealth(player1.health);
  player1.processInput();
  player1.playerDisplay();

  if(keyIsDown(32)){
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

  if(player1.invincible == true){
    invinciblePlayerTimer();
  }
  else{
    checkCollision();
  }
  
}
function CheckCircleCircleCollision(c1x, c1y, c1r, c2x, c2y, c2r) {
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
    if(CheckCircleCircleCollision(player1.position.x, player1.position.y, player1.size/2, asteroids[i].position.x, asteroids[i].position.y, asteroids[i].size/2)){
      player1.health--;
      player1.resetLocation();
      player1.invincible = true;
    
      if(player1.health  <= 0){
        console.log("Game Over");
        // display game over screen 
      }
    }
  }
}

function invinciblePlayerTimer(){
    if(frameCount % 240 == 0){
      console.log("Player is no longer invincible");
      player1.invincible = false;
    }
}


function displayHealth(){
    displayManager1.displayPlayerLives(player1.health);
}