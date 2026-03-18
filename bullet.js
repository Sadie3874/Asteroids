class bullet extends baseCharacter{
    constructor(x, y, angle){
        super(x, y, 5);
        // var
        this.angle = angle;
        // int 
        this.speed = 5;
        this.liveCount = 60;
        this.damage = 1;
    }

    // move the bullet in the direction it was fired 
    movement(){
        circle(this.position.x, this.position.y, this.size);
        this.velocity = p5.Vector.fromAngle(this.angle);
        this.velocity.mult(this.speed);
        this.position.add(this.velocity);
        this.screenWrap();
    }

    // just spawning the circle 
    // spawnBullet(){
    //     circle(this.position.x, this.position.y, this.size);
    // }

    // life spawn count 
    lifeSpan(){
        this.liveCount--;
        if(this.liveCount <= 0){
            return true;
        }
        else{
            return false;
        }
    }
}