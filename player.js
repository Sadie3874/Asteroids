
class player extends baseCharacter{
  constructor(x, y, img, imgBoost){
    super(x, y, 20, img);
    this.x = x;
    this.y = y;
    this.size = 20;
    this.angle = 0;
    this.imgBoost = imgBoost;
    this.impulse = createVector(0, 0);
    this.acceleration = createVector(0,0);
    this.drag = 0.7;
    this.movementPlayer = false;
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
      console.log("up");
      
      this.movementPlayer = true;
    }else{
      this.movementPlayer = false;
      
      
    }

    if(this.movementPlayer){
      
      this.movement();
    }
    
  }
  // move to actor
  movement(){
    
    this.impulse = p5.Vector.fromAngle(this.angle);
    this.impulse.mult(0.1);
    console.log(this.impulse);
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
      this.img(0, 0, this.size, this.size)
    pop()
  
  }


}