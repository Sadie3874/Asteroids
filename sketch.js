// The creation of asteroids was a lot more pleasant than I thought it would be. At first all the tasks seemed impossible, 
// however when I started ticking off the boxes it felt rewarding and encouraged me to push further. As the weeks went on,
// I slowly started to see the project grow. However, while the program grew so did my problems. One of the main issues I had were collisions. 
// Collisions needed to be called from ‘draw ()’ always, however I needed to check lists of objects like asteroids or bullets. 
// So, I needed a collision function with a ‘for loop’. This would check for player or bullet position with asteroid positions. 
// When it came to implement the saucer, I only had 1 object so I couldn’t go through a for loop but instead the if statement.
// So, I created another function that removed the ‘for’ loop. At the time I didn’t realize by saucer implementation was slightly
// different from the player, and in JavaScript fashion, the program didn’t warn me of this error. So, it took me a while to figure out
// why my collisions weren’t working. When I finally realized, I had to create a whole separate function for the saucers specific position values. 
// The same thing had to be done with saucer and asteroid collision. If I had more time, I would love to clean it up and make a more modular system. 
// Overall, I enjoyed this project a lot more than I thought I would. At first the work seemed overwhelming and paralyzing, 
// but it slowly grew into a project that I was happy to work on throughout the week. 

let gameManager1;
let player1;
let tempAsteroidDestroy;
let startScreen = true;
let gameOver = false;
let levelSaucer = false;
let backgroundMusic;
let boostSound;
let hyperDrive;
let playerShoot;
let enemySaucerSound;
// let maxAngle = 40;
// let maxOffset = 10;
// let shake = 15;
let restart;
let startButton;
let clickedRestart = false;
let slider;

let enterClicked = false;

function preload(){
  backgroundMusic = loadSound("/Asteroids/Audio/BackgroundMusic.mp3");
  boostSound = loadSound("/Asteroids/Audio/Boost.mp3");
  hyperDrive = loadSound("/Asteroids/Audio/HyperDriveJump.mp3");
  playerShoot = loadSound("/Asteroids/Audio/PlayerShoot.mp3");
  enemySaucerSound = loadSound("/Asteroids/Audio/SaucerPresent.mp3");
}

function setup() {
  createCanvas(400, 400);
  player1 = new player(200, 200);
  gameManager1 = new gameManager();
  gameManager1.startLevel(4);
  displayManager1 = new displayManager(player1);

  startButton = createButton("Start");
  startButton.position(width/2 - 50, width/2 + 30);
  startButton.size(100, 30);
  startButton.mouseClicked(startGame);

  
  restart = createButton("restart");
  restart.mousePressed(restartPlayer);
  restart.size(100, 30);
  slider = createSlider(0, 10);
  slider.position(50, 450)
  //text("Volume:", 0, 450)
}

function draw() {
  backgroundMusic.setVolume(slider.value()/15);

  if(!startScreen && !gameOver){
    background(0);
    startButton.remove();
    
    gameManager1.nextLevel();
    displayHealth(player1.health);
    player1.processInput();
    player1.playerDisplay();
    displayManager1.updateScore(0);
    moveAsteroids();
    
    
    if(displayManager1.canSpawnSaucer() && !gameManager1.activeSaucer && !levelSaucer){
      levelSaucer = true;
      gameManager1.spawnSaucer();
      
    }
    
    if(gameManager1.activeSaucer){
      moveSaucers();
      saucerBulletController();
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

    if(player1.invincible){
      invinciblePlayerTimer();
    }
    else{
      if(checkCollision(player1)){
          player1.RemoveHealth();
          player1.resetLocation();
          player1.invincible = true;
      }
    }

    if(gameManager1.activeSaucer){
      if(checkCollisionSaucerToAsteroid(gameManager1.currentSaucer)){
        
        gameManager1.removeSaucer();
      }
    }
  }
  else{
    displayManager1.displayStartScreen();
    
  }

  if(gameOver){
      displayManager1.displayEndScreen();
      clickedRestart = true;
      backgroundMusic.stop();

  }

}

function restartPlayer(){
  if(player.invincible){
    invincible = false;
  }
  clickedRestart = false;
  backgroundMusic.loop();
  player1.health = 3;
  displayManager1.score = 0;
  player1.resetLocation();
  gameManager1.resetAsteroids();
  if(gameOver){
    gameOver = false;
  }
}

function startGame(){
  startScreen = false;
}

function mouseClicked(){
  backgroundMusic.loop();
}

// change vars 
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


function checkCollisionSaucerToAsteroid(){
  for(let i = 0; i < gameManager1.asteroidList.length; i++){
    if(CheckCircleCircleCollision(gameManager1.currentSaucer.currentPosition, 70, gameManager1.currentSaucer.size/2, gameManager1.asteroidList[i].position.x, gameManager1.asteroidList[i].position.y, gameManager1.asteroidList[i].size/2)){
      return true;
    }
  }
}

function checkCollisionSaucer(object){
  if(CheckCircleCircleCollision(object.position.x, object.position.y, object.size/2, gameManager1.currentSaucer.currentPosition, 70, gameManager1.currentSaucer.size/2)){
    return true;
  }
}

function checkSaucerBulletCollision(object){
  if(CheckCircleCircleCollision(object.position.x, object.position.y, object.size/2, player1.position.x, player1.position.y, player1.size/2)){
    console.log("Hit player");
    return true;
  }
}

function invinciblePlayerTimer(){
    if(frameCount % 240 == 0){
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

    if(gameManager1.bulletList[i].lifeSpan()){
      gameManager1.bulletList.splice(i, 1);
      break;
    }

    if(gameManager1.activeSaucer){
      if(checkCollisionSaucer(gameManager1.bulletList[i])){
        gameManager1.removeSaucer();
        displayManager1.addScore(200);
      }
    }
    

    if(checkCollision(gameManager1.bulletList[i]) && tempAsteroidDestroy != null){
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

function saucerBulletController(){
  for(let i = 0; i < gameManager1.bulletListSaucer.length; i++){
    gameManager1.bulletListSaucer[i].movement();
    gameManager1.bulletListSaucer[i].spawnBullet();
    gameManager1.bulletListSaucer[i].lifeSpan();

    if(gameManager1.bulletListSaucer[i].lifeSpan()){
      gameManager1.bulletListSaucer.splice(i, 1);
      break;
    }

   if(checkSaucerBulletCollision(gameManager1.bulletListSaucer[i])){
      gameManager1.bulletListSaucer.splice(i, 1);
      player1.RemoveHealth();
      player1.resetLocation();
      player1.invincible = true;
      break;
   }

   if(checkCollision(gameManager1.bulletListSaucer[i]) && tempAsteroidDestroy != null){
     if(gameManager1.asteroidList[tempAsteroidDestroy].size == 40){
       gameManager1.removeLargeAsteroid(tempAsteroidDestroy);
     }
     else if(gameManager1.asteroidList[tempAsteroidDestroy].size == 30){
       gameManager1.removeMediumAsteroid(tempAsteroidDestroy);
     }
     else{
       gameManager1.removeSmallAsteroid(tempAsteroidDestroy);
     }
     gameManager1.bulletListSaucer.splice(i, 1);
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

function moveSaucers(){
  gameManager1.currentSaucer.movement();
}

function cameraShake(){
  let angle = maxAngle * shake * random(-1, 1);
  let OffSetX = maxOffset * shake * random(-1, 1);
  let offSetY = maxOffset * shake * random(-1, 1);

  Camera.angle = Camera.angle + angle;
  // camera.center = Camera.center + Vec2(offsetx, offestY)
}
