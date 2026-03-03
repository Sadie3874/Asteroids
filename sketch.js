let displayManager1;
let gameManager1;
let player1;
let tempAsteroidDestroy;
let startScreen = true;
let gameOver = false;

let enterClicked = false;

function setup() {
  createCanvas(400, 400);
  player1 = new player(200, 200);
  // create a master game object 
  gameManager1 = new gameManager();
  gameManager1.startGame();
  displayManager1 = new displayManager(player1);
  

}

function draw() {

  if(!startScreen){
    background(220);
    displayHealth(player1.health);
    player1.processInput();
    player1.playerDisplay();
    displayManager1.updateScore(0);
    moveAsteroids();
  }
  else{
    displayManager1.displayStartScreen();
  }

  if(gameOver == true){
    displayManager1.displayEndScreen();
  }
  
  if(keyIsDown(32)){
    enterClicked = true;
  }

  if(!keyIsPressed && enterClicked){
    enterClicked = false;
    player1.knockback = true;
    gameManager1.spawnBullet(player1.position.x, player1.position.y, player1.angle, 5);
    
  }

  if(gameManager1.bulletList.length > 0){
    bulletController();
  }

  if(player1.invincible == true){
    invinciblePlayerTimer();
  }
  else{
    if(checkCollision(player1, gameManager1.asteroidList) == true){
      player1.RemoveHealth();
      player1.resetLocation();
      player1.invincible = true;
    }
  }
}

function mousePressed(){
  startScreen = false;
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
  for(let i = 0; i < gameManager1.bulletList.length; i++){
    gameManager1.bulletList[i].movement();
    gameManager1.bulletList[i].spawnBullet();
    gameManager1.bulletList[i].lifeSpan();

    if(gameManager1.bulletList[i].lifeSpan() == true){
      gameManager1.bulletList.splice(i, 1);
      break;
    }

    if(checkCollision(gameManager1.bulletList[i], gameManager1.asteroidList) == true && tempAsteroidDestroy != null){
      console.log(tempAsteroidDestroy);
      if(gameManager1.asteroidList[tempAsteroidDestroy].size == 40){
        gameManager1.removeLargeAsteroid(tempAsteroidDestroy);
        displayManager1.addScore(20);
      }
      else if(gameManager1.asteroidList[tempAsteroidDestroy].size == 30){
        gameManager1.removeMediumAsteroid(tempAsteroidDestroy);
        displayManager1.addScore(50);

      }
      else{
        gameManager1.removeSmallAsteroid(tempAsteroidDestroy);
        displayManager1.addScore(100);
      }
      gameManager1.bulletList.splice(i, 1);
      
      break;
    }
  }
}

function moveAsteroids(){
  for(let i = 0; i < gameManager1.asteroidList.length; i++){
    gameManager1.asteroidList[i].spawnAsteroid();
    gameManager1.asteroidList[i].asteroidMovement();
  }
}
