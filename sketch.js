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

// objects
let gameManager1;
let player1;
let tempAsteroidDestroy;
let restart;
let startButton;

// music 
let backgroundMusic;
let boostSound;
let hyperDrive;
let playerShoot;
let enemySaucerSound;

// bools 
let canFire = false;
let startScreen = true;
let gameOver = false;
let levelSaucer = false;

// var
let shake = 0;

function preload(){
  // preloading sound
  backgroundMusic = loadSound("/Asteroids/Audio/BackgroundMusic.mp3");  
}

function setup() {
  createCanvas(400, 400);
  // creating our classes 
  player1 = new player(200, 200);
  gameManager1 = new gameManager();
  displayManager1 = new displayManager(player1);
  gameManager1.startLevel(4);

  // start button
  startButton = createButton("Start");
  startButton.position(width/2 - 50, width/2 + 30);
  startButton.size(100, 30);
  startButton.mouseClicked(startGame);

  // reset button will always display
  restart = createButton("restart");
  restart.mousePressed(restartPlayer);
  restart.size(100, 30);

  // setting music
  backgroundMusic.setVolume(0.1);
}

function draw() {
  // screen shake, when we call screen shake function shake will become 10 and then decrease to 0 again
  let OffSetX = random(-shake, shake);
  let offSetY = random(-shake, shake);

  translate(OffSetX, offSetY);

  if(!startScreen && !gameOver){
    background(0);

    startButton.remove();
    gameManager1.nextLevel();
    player1.processInput();
    player1.playerDisplay();
    displayManager1.updateScore(0);

    moveAsteroids();
    displayHealth(player1.health);
    
    // && !gameManager1.activeSaucer 
    if(displayManager1.canSpawnSaucer() && !levelSaucer){
      levelSaucer = true;
      gameManager1.spawnSaucer();
    }
    else{
      console.log("cant spawn")
    }
    
    if(gameManager1.activeSaucer){
      gameManager1.currentSaucer.movement();
      saucerBulletController();
    }

    if(keyIsDown(32)){
      fireRateTimer();
    }

    if(canFire){
      canFire = false;
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
        cameraShake();
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
      backgroundMusic.stop();
  }

  shake *= 0.9;
}


function fireRateTimer(){
    if(frameCount % 10 == 0){
      canFire = true;
    }
}

function restartPlayer(){
  if(player.invincible){
    invincible = false;
  }

  backgroundMusic.loop();
  levelSaucer = false;
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

// checking for overlap
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

function cameraShake(){
  shake = 10;
}
