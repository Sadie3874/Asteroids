class particalSystem extends baseCharacter{
    constructor(x, y){
        super(x, y, 2.5);
        this.direction = random(0, TWO_PI);
        this.lifeSpan = random(100, 200);
    }

    movement(){
        circle(this.position.x, this.position.y, this.size);
        this.velocity = p5.Vector.fromAngle(this.direction);
        this.velocity.mult(this.speed * 2);
        this.position.add(this.velocity);
        this.screenWrap();
    }

    checkLife(){
        this.lifeSpan--;
        if(this.lifeSpan <= 0){
            return true;
        }
        else{
            return false;
        }
    }
}