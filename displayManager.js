class displayManager{
    constructor(player1){
        this.score = 0;
        this.player1 = player1;
        
    }

    // update the score 
    updateScore(){
        textSize(20);
        fill(255)
        text("Score: " + this.score, 300, 30);
    }

    // add to the score 
    addScore(value){
        this.score += value;
        // if player reaches certin amount of points increase
        if(this.score % 240 == 0 && this.player1.health < 3){
            this.player1.health++;
        }
    }

    // checking score to see if we can spawn a saucer 
    canSpawnSaucer(){
        if(this.score % 10 == 0){
            return true;
        }
    }

    // display the players lives
    displayPlayerLives(playerLives){
        for(let i = 0; i < playerLives; i++){
            triangle(20 + (i * 20), 20, 10 + (i * 20), 30, 30 + (i * 20), 30);
        }
    }

    // display start screen 
    displayStartScreen(){
        push();
            background(0);
            textSize(45);
            fill(255);
            text("Asteroids", 100, 200);
        pop();
    }

    // display start screen 
    displayEndScreen(){
        push();
            background(0);
            textSize(30);
            fill(255);
            text("Game Over", 120, 200);
        pop();
    }
    
}