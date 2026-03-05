class gameManager{
    constructor(){
        this.asteroidList = [];
        this.bulletList = [];
        this.bulletListSaucer = [];
        this.currentSaucer;
        this.activeSaucer = false;
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

    startGame(){
        this.asteroidList.push(new asteroid(100, 100, 30));
        this.asteroidList.push(new asteroid(200, 300, 30)); 
        this.asteroidList.push(new asteroid(300, 100, 30)); 
        this.asteroidList.push(new asteroid(150, 200, 30));
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


}

