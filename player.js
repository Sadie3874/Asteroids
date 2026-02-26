
class player extends baseCharacter{
  //, img, imgBoost
  constructor(x, y){
    super(x, y, 20);
    this.x = x;
    this.y = y;
    this.size = 20;
    this.angle = 0;
    this.impulse = createVector(0, 0);
    this.acceleration = createVector(0,0);
    this.drag = 0.9;
    this.movementPlayer = false;
    this.health = 3;
    this.coolDown = false;
    this.invincible = false;
  }
  
  processInput(){
    this.velocity.mult(this.drag); 
    this.position.add(this.velocity);

    if(keyIsDown(RIGHT_ARROW)){
      // rotate the object in the direction we want it to face 
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

    if(keyIsDown(ENTER) && this.coolDown == false){
      this.boost();
      this.coolDown = true;
    }

    if(this.coolDown){
      this.playerTimer();
    }
  }

  playerBoostTimer(){
    if(frameCount % 240 == 0){
      console.log("Cool down is done ");
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
      // displaying the triangle
      if(this.invincible == true){
        fill(255, 0, 0);
      }
      else{
        fill(255);
      }
      triangle(this.size/2, 0, -this.size/2, this.size/2, -this.size/2, -this.size/2);
      //rect(0, 0, this.size, this.size);
    pop()
  
  }

  // remove player heath. 
  RemoveHealth(){
    this.health--;

    if(this.health <= 0){
        console.log("Game Over");
        // display game over screen 
      }
  }

  // teleport the player to a new location 
  boost(){
    let randomX = random(0, 200);
    let randomY = random(0, 200);
    this.position = createVector(randomX, randomY);
  }

  // upon death, move the player to the middle of the screen. 
  resetLocation(){
    this.position = createVector(200, 200);
  }

}