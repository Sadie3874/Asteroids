class bullet extends baseCharacter{
    constructor(x, y, angle){
        super(x, y, 5);
        this.angle = angle;
        this.speed = 5;
        this.liveCount = 150;
        this.damage = 1;
        //this.img = img;
    }

    movement(){
        this.velocity = p5.Vector.fromAngle(this.angle);
        this.velocity.mult(this.speed);
        this.position.add(this.velocity);
        this.screenWrap();
    }

    spawnBullet(){
        circle(this.position.x, this.position.y, this.size);
    }

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