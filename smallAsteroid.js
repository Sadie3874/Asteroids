class smallAsteroid extends asteroid{
    constructor(x, y){
        super(x, y, 10);
        this.points = 100;
        this.size = 15;
    }

    // small asteroids will move faster 
    movement(){
        this.velocity.mult(this.speed * 10);
    }
}
