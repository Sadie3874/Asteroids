class mediumAsteroid extends asteroid{
    constructor(x, y){
        super(x, y, 15);
        // respecfive points and size 
        this.points = 50;
        this.size = 30;
    }

    // update the speed of the medium asteroids
    movement(){
        this.velocity.mult(this.speed * 1.5);
    }
}
