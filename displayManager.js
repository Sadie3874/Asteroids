class displayManager{
    constructor(player1){
        this.score = 0;
        this.player1 = player1;
    }
    updateScore(){
        textSize(20);
        
        text("Score: " + this.score, 300, 30);
    }

    addScore(value){
        this.score += value;

        if(this.score >= 1000 && this.player1.health < 3){
            this.player1.health++;
        }
    }

    displayPlayerLives(playerLives){
        for(let i = 0; i < playerLives; i++){
            triangle(20 + (i * 20), 20, 10 + (i * 20), 30, 30 + (i * 20), 30);
        }
    }

    displayStartScreen(){
        push();
            background(0);
            textSize(30);
            fill(255);
            text("Press Enter to Start", 80, 200);
        pop();
    }

    displayEndScreen(){
        push();
            background(0);
            textSize(30);
            fill(255);
            text("Game Over", 120, 200);
        pop();
    }
    
}