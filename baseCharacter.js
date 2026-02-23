class baseCharacter {
    constructor(x, y, size){
        this.size = size;
        this.angle = 0;
        this.speed = 0.5;
        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);
    } 
      

  screenWrap(){
    if(this.position.x >= 400){
      this.position.x = 0
    }
    else if(this.position.x <= 0){
      this.position.x = 400
    }
    
    if(this.position.y >= 400){
      this.position.y = 0
    }
    else if(this.position.y <= 0){
      this.position.y = 400
    }
  }
}