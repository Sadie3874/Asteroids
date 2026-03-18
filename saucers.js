class saucers extends baseCharacter{
    constructor(x, y){
        super(x, y);
        // ints 
        this.size = 20;
        this.points = 200;
        this.currentPosition = 0;
        this.fireTimer = 5;
        // bools
        this.MoveLeft = false;
    }

    movement(){
        // moving left and right 
        if(!this.MoveLeft){
            this.currentPosition++;
        }
        else{
            this.currentPosition--;
        }

        // moving left and right without using vectors 
        push()
            fill(255, 0, 0);
            circle(this.currentPosition, height/4, 30);
            ellipse(this.currentPosition, height/4, 70, 10);
            translate(this.currentPosition, height/4);
        pop()
        // checking if the saucer is about to go off screen 
        if(this.currentPosition >= width){
            this.MoveLeft = true;
        }
        
        if(this.currentPosition <= 0){
            this.MoveLeft = false;
        }
        this.fireBullet();
    }

    // fire rate timer 
    fireBullet(){
        this.fireTimer--;
        if(this.fireTimer <= 0){
            gameManager1.spawnSaucerBullet(this.currentPosition + 5, height/4, HALF_PI, 5);
            this.fireTimer = 150;
        }
    }
}