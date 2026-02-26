class smallAsteroid extends asteroid{
    constructor(x, y){
        super(x, y, 10);
        this.points = 100;
    }

    movement(){
        this.velocity = p5.Vector.fromAngle(this.direction);
        this.velocity.mult(this.speed * 2);
        this.position.add(this.velocity);
        this.screenWrap();
    }
}
