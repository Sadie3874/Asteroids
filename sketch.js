let displayManager1;
let player1;

let bullets = [];
//let asteroids = [];
let tempAsteroidDestroy = null;

let enterClicked = false;

function setup() {
  createCanvas(400, 400);

  // create a master game object 
  gameManager1 = new gameManager();
  gameManager1.startGame();
  displayManager1 = new displayManager();
  player1 = new player(200, 200);

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
    bulletController();
  }

  for(let i = 0; i < gameManager1.asteroidList.length; i++){
    gameManager1.asteroidList[i].spawnAsteroid();
    gameManager1.asteroidList[i].asteroidMovement();
  }

  if(player1.invincible == true){
    invinciblePlayerTimer();
  }
  else{
    if(checkCollision(player1) == true){
      gameManager1.asteroidList.splice(tempAsteroidDestroy, 1);
      tempAsteroidDestroy = null;
      player1.RemoveHealth();
      player1.resetLocation();
      player1.invincible = true;
    }
  }
}
  
function CheckCircleCircleCollision(c1x, c1y, c1r, c2x, c2y, c2r) {
  let distX = c1x - c2x;
  let distY = c1y - c2y;
  let distance = sqrt( (distX*distX) + (distY*distY));

  if (distance <= c1r+c2r) {
    return true;
  }
  return false;
}

function checkCollision(object){
  for(let i = 0; i < gameManager1.asteroidList.length; i++){
    if(CheckCircleCircleCollision(object.position.x, object.position.y, object.size/2, gameManager1.asteroidList[i].position.x, gameManager1.asteroidList[i].position.y, gameManager1.asteroidList[i].size/2)){
      tempAsteroidDestroy = i;
      return true;
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

function bulletController(){
  for(let i = 0; i < bullets.length; i++){
      bullets[i].movement();
      bullets[i].spawnBullet();
      bullets[i].lifeSpan();

      if(bullets[i].lifeSpan() == true){
        bullets.splice(i, 1);
        break;
      }

      if(checkCollision(bullets[i]) == true){
        gameManager1.spawnMediumAsteroid(tempAsteroidDestroy);
        gameManager1.asteroidList.splice(tempAsteroidDestroy, 1);
        bullets.splice(i, 1);
        tempAsteroidDestroy = null;
        break;
      }
  }
}