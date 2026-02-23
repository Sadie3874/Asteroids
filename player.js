
class player extends baseCharacter{
  constructor(x, y){
    super(x, y, 20);
    this.x = x;
    this.y = y;
    this.size = 20;
    this.angle = 0;
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0,0);
    this.horizontalMovementForce = 0.5;
  }
  
  processInput(){
      

    if(keyIsDown(RIGHT_ARROW)){
      // rotate the object in the direction we want it to face 
      this.angle += 0.1;
    }
    
    if(keyIsDown(LEFT_ARROW)){
      this.angle -= 0.1;
    }

    if(keyIsDown(UP_ARROW)){
      console.log("up");
      this.movement();
    }else{
      this.acceleration = this.horizontalMovementForce;
    }
    
  }
  // move to actor
  movement(){
    this.position.add(this.velocity);
    
    this.velocity = p5.Vector.fromAngle(this.angle);
    this.screenWrap()
    
  }
  
  playerDisplay(){
    push()
      translate(this.position.x, this.position.y);
      rotate(this.angle)
      // moving our rotate point to the center of our object 
      rectMode(CENTER)
      // to make the object rotate itself we need to make the points 0,0 and translate it to our desired position 
      rect(0, 0, this.size, this.size)
    pop()
  
  }


}