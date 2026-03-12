class gameManager{
    constructor(){
        this.asteroidList = [];
        this.bulletList = [];
        this.bulletListSaucer = [];
        this.currentSaucer;
        this.activeSaucer = false;
        this.level = 1;
        this.currentAmountOfAsteroids = 4
        this.reset = false;
    }

    spawnMediumAsteroid(tempAsteroidDestroy){
        this.asteroidList.push(new mediumAsteroid(this.asteroidList[tempAsteroidDestroy].position.x, this.asteroidList[tempAsteroidDestroy].position.y));
        this.asteroidList.push(new mediumAsteroid(this.asteroidList[tempAsteroidDestroy].position.x, this.asteroidList[tempAsteroidDestroy].position.y));
    }

    // spawn small asteroids after the medium ones 
    spawnSmallAsteroid(tempAsteroidDestroy){
        
        this.asteroidList.push(new smallAsteroid(this.asteroidList[tempAsteroidDestroy].position.x, this.asteroidList[tempAsteroidDestroy].position.y));
        this.asteroidList.push(new smallAsteroid(this.asteroidList[tempAsteroidDestroy].position.x, this.asteroidList[tempAsteroidDestroy].position.y));
    }

    startLevel(amountOfAsteroids){
        for(let i = 0; i < amountOfAsteroids; i++){
            this.asteroidList.push(new asteroid(random(100, 300), random(100, 300), 30));
        }
    }

    spawnBullet(x, y, angle, speed){
        this.bulletList.push(new bullet(x + 5, y + 5, angle, speed));
    }

    spawnSaucerBullet(x, y, angle, speed){
        this.bulletListSaucer.push(new bullet(x + 5, y + 5, angle, speed));
    }

    removeLargeAsteroid(tempAsteroidDestroy){
      this.spawnMediumAsteroid(tempAsteroidDestroy);
      this.asteroidList.splice(tempAsteroidDestroy, 1);
    }

    removeMediumAsteroid(tempAsteroidDestroy){
      this.spawnSmallAsteroid(tempAsteroidDestroy);
      this.asteroidList.splice(tempAsteroidDestroy, 1);
    }

    removeSmallAsteroid(tempAsteroidDestroy){
      this.asteroidList.splice(tempAsteroidDestroy, 1);
    }

    // call when player reaches certin score 
    spawnSaucer(){
        this.currentSaucer = new saucers(0, 70);
        this.activeSaucer = true;
    }

    removeSaucer(){
        this.currentSaucer;
        this.activeSaucer = false;
    }

    nextLevel(){
        if(this.asteroidList.length <= 0 && !this.reset){
            this.currentAmountOfAsteroids = this.currentAmountOfAsteroids + 2;
            this.level++;
            console.log(this.level);
            this.startLevel(this.currentAmountOfAsteroids);
            this.activeSauce = false;
        }
    }

    resetAsteroids(){
        this.reset = true;
        for(let i = 0; i < this.asteroidList.length; i++){
            this.asteroidList.splice(this.asteroidList[i])
        }
        this.currentAmountOfAsteroids = 4
        this.startLevel(4);
        this.reset = false;
    }
}

