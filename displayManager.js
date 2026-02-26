class displayManager{
    constructor(){
        this.score = 0;
    }

    

    updateScore(){
        //update the score with the proper values 
    }

    displayPlayerLives(playerLives){
        for(let i = 0; i < playerLives; i++){
            triangle(20 + (i * 20), 20, 10 + (i * 20), 30, 30 + (i * 20), 30);
        }
        
    }
    
}