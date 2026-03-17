class asteroid extends baseCharacter{
    constructor(x, y){
        super(x, y, 40);
        // when spawning, get random direction 
        this.direction = random(0, TWO_PI);
        this.points = 20;
    }

    // just spawn a circle
    spawnAsteroid(){
        circle(this.position.x, this.position.y, this.size);
    }

    // asteroid movement 
    asteroidMovement(){
        this.velocity = p5.Vector.fromAngle(this.direction);
        this.velocity.mult(this.speed);
        this.position.add(this.velocity);
        this.screenWrap();
    }
}