
class player extends baseCharacter{
  //, img, imgBoost
  constructor(x, y){
    super(x, y, 20);
    this.x = x;
    this.y = y;
    this.size = 20;
    this.angle = 0;
    //this.imgBoost = imgBoost;
    this.impulse = createVector(0, 0);
    this.acceleration = createVector(0,0);
    this.drag = 0.9;
    this.movementPlayer = false;
    this.health = 3;
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
    
  }

  movement(){
    
    this.impulse = p5.Vector.fromAngle(this.angle);
    this.impulse.mult(0.1);
    this.velocity.add(this.impulse);
    this.screenWrap()
    
  }

  
  playerDisplay(){
    push()
      translate(this.position.x, this.position.y);
      rotate(this.angle)
      // moving our rotate point to the center of our object 
      rectMode(CENTER)
      // to make the object rotate itself we need to make the points 0,0 and translate it to our desired position 
      rect(0, 0, this.size, this.size);
      //this.img(0, 0, this.size, this.size)
    pop()
  
  }

  RemoveHealth(){
    this.health--;
  }

  boost(){
    
  }

  resetLocation(){
    this.position = createVector(200, 200);
  }

}