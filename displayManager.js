class displayManager{
    constructor(){
        this.score = 0;
    }
    updateScore(){
        textSize(20);
        
        text("Score: " + this.score, 300, 30);
    }

    addScore(value){
        this.score += value;
    }

    displayPlayerLives(playerLives){
        for(let i = 0; i < playerLives; i++){
            triangle(20 + (i * 20), 20, 10 + (i * 20), 30, 30 + (i * 20), 30);
        }
        
    }
    
}