
class player extends baseCharacter{
  //, img, imgBoost
  constructor(x, y){
    super(x, y, 20);
    // vectors 
    this.impulse = createVector(0, 0);
    this.acceleration = createVector(0,0);
    // var
    this.x = x;
    this.y = y;
    // ints
    this.size = 20;
    this.angle = 0;
    this.drag = 0.9;
    this.knockbackForce = -10;
    this.health = 3;
    // bool 
    this.coolDown = false;
    this.invincible = false;
    this.knockback = false;
    this.movementPlayer = false;
    // sound
    this.boostSound = loadSound("/Asteroids/Audio/Boost.mp3");
    this.hyperDrive = loadSound("/Asteroids/Audio/HyperDriveJump.mp3");
    this.deathSound = loadSound("/Asteroids/Audio/Explosion.mp3");
  }
  
  processInput(){
    this.velocity.mult(this.drag); 
    this.position.add(this.velocity);
    // knock back foce 
    if(this.knockback){
      this.impulse = p5.Vector.fromAngle(this.angle);
      this.velocity.add(this.impulse.x * -3, this.impulse.y * -3);
      this.knockback = false;
    }
    // keyboard controls 
    if(keyIsDown(RIGHT_ARROW)){
      this.angle += 0.1;
    }
    
    if(keyIsDown(LEFT_ARROW)){
      this.angle -= 0.1;
    }

    if(keyIsDown(UP_ARROW)){
      this.movementPlayer = true;
    }
    else{
      this.movementPlayer = false;
    }

    if(this.movementPlayer){
      this.movement();
    }

    if(keyIsDown(ENTER) && !this.coolDown){
      this.hyperDrive.play();
      this.boost();
      this.coolDown = true;
    }

    if(this.coolDown){
      this.playerBoostTimer();
    }
  }

  playerBoostTimer(){
    // player cool down
    if(frameCount % 240 == 0){
      this.coolDown = false;
    }
  }

  movement(){
    // adding force and impluse to the player movement 
    this.impulse = p5.Vector.fromAngle(this.angle);
    this.impulse.mult(0.1);
    this.velocity.add(this.impulse);
    // make sure to call screen wrap 
    this.screenWrap()
  }

  
  playerDisplay(){
    push()
      translate(this.position.x, this.position.y);
      rotate(this.angle)
      // moving our rotate point to the center of our object 
      rectMode(CENTER)
      // displaying the players invincible power up 
      if(this.invincible){
        fill(0, 255, 0);
      }
      else{
        fill(255);
      }
      // display the triangle
      triangle(this.size/2, 0, -this.size/2, this.size/2, -this.size/2, -this.size/2);
    pop()
  
  }

  // remove player heath. 
  RemoveHealth(){
    this.health--;
    this.deathSound.play();
    if(this.health <= 0){
        gameOver = true;
    }
  }

  // teleport the player to a new location 
  boost(){
    let randomX = random(0, width);
    let randomY = random(0, height);
    this.position = createVector(randomX, randomY);
  }

  // upon death, move the player to the middle of the screen. 
  resetLocation(){
    this.position = createVector(width/2, height/2);
  }

}