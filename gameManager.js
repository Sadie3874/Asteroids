class gameManager{
    constructor(){
        this.asteroidList = [];
        this.bulletList = [];
    }

    spawnMediumAsteroid(tempAsteroidDestroy){
        this.asteroidList.push(new mediumAsteroid(this.asteroidList[tempAsteroidDestroy].position.x, this.asteroidList[tempAsteroidDestroy].position.y));
        this.asteroidList.push(new mediumAsteroid(this.asteroidList[tempAsteroidDestroy].position.x, this.asteroidList[tempAsteroidDestroy].position.y));
    }

    // spawn small asteroids after the medium ones 
    spawnSmallAsteroid(tempAsteroidDestroy){
        console.log("SMALLLLLL");
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
        this.bulletList.push(new bullet(x, y, angle, speed));
    }

    removeLargeAsteroid(tempAsteroidDestroy){
      this.asteroidList.splice(tempAsteroidDestroy, 1);
      this.spawnMediumAsteroid(tempAsteroidDestroy);
    }

    removeMediumAsteroid(tempAsteroidDestroy){
      this.asteroidList.splice(tempAsteroidDestroy, 1);
      this.spawnSmallAsteroid(tempAsteroidDestroy);
    }

    removeSmallAsteroid(tempAsteroidDestroy){
      this.asteroidList.splice(tempAsteroidDestroy, 1);
    }
}

