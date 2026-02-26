class mediumAsteroid extends asteroid{
    constructor(x, y){
        super(x, y, 15);
        this.points = 50;
    }

    movement(){
        this.velocity = p5.Vector.fromAngle(this.direction);
        this.velocity.mult(this.speed * 1.5);
        this.position.add(this.velocity);
        this.screenWrap();
    }
}
