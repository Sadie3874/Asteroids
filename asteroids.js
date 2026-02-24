class asteroid extends baseCharacter{
    constructor(x, y, size){
        super(x, y, size, 5);
        this.direction = random(0, TWO_PI);
    }

    spawnAsteroid(){
        circle(this.position.x, this.position.y, this.size);
    }

    asteroidMovement(){
        this.velocity = p5.Vector.fromAngle(this.direction);
        this.velocity.mult(this.speed);
        this.position.add(this.velocity);
        this.screenWrap();
    }
}