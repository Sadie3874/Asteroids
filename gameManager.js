class gameManager{
    constructor(){
        this.asteroidList = [];
    }

    spawnMediumAsteroid(tempAsteroidDestroy){
      this.asteroidList.push(new mediumAsteroid( this.asteroidList[tempAsteroidDestroy].position.x, this.asteroidList[tempAsteroidDestroy].position.y));
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
}

