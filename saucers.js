class saucers extends baseCharacter{
    constructor(x, y){
        super(x, y);
        this.size = 20;
        this.points = 200;
        this.MoveLeft = false;
        this.currentPosition = 0;
        this.fireTimer = 5;
        
    }

    movement(){
        if(!this.MoveLeft){
            this.currentPosition++;
        }
        else{
            this.currentPosition--;
        }

        push()
            circle(this.currentPosition, 70, 40);
            ellipse(this.currentPosition, 70, 80, 20)
            translate(this.currentPosition, 70);
        pop()

        if(this.currentPosition >= width){
            this.MoveLeft = true;
        }
        
        if(this.currentPosition <= 0){
            this.MoveLeft = false;
        }

        this.fireBullet();
    }

    fireBullet(){
        this.fireTimer--;
        if(this.fireTimer <= 0){
            
            gameManager1.spawnSaucerBullet(this.currentPosition + 5, 70, HALF_PI, 5);
            this.fireTimer = 150;
        }
    }
}