class baseCharacter {
    constructor(x, y, size){
      // var
      this.size = size;
      // ints
      this.angle = 0;
      this.speed = 0.5;
      // vectors
      this.position = createVector(x, y);
      this.velocity = createVector(0, 0);
    } 

    // screen wrap the object 
    screenWrap(){
      if(this.position.x >= width){
        this.position.x = 0
      }
      else if(this.position.x <= 0){
        this.position.x = width
      }

      if(this.position.y >= height){
        this.position.y = 0
      }
      else if(this.position.y <= 0){
        this.position.y = height
      }
    }
}