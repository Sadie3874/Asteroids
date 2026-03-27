class gameManager{
    constructor(saucerPresent, playerShoot, deathSound){
        // lists
        this.asteroidList = [];
        this.bulletList = [];
        this.bulletListSaucer = [];
        this.particals = [];
        // bools
        this.activeSaucer = false;
        this.reset = false;
        this.soundPlaying = false;
        // ints
        this.level = 1;
        this.currentAmountOfAsteroids = 4
        // var
        this.currentSaucer;
        // sound
        this.saucerSound = saucerPresent;
        this.playerShoot = playerShoot;
        this.deathSound = deathSound;
    }

    spawnMediumAsteroid(tempAsteroidDestroy){
        // spawn medium asteroids
        this.asteroidList.push(new mediumAsteroid(this.asteroidList[tempAsteroidDestroy].position.x, this.asteroidList[tempAsteroidDestroy].position.y));
        this.asteroidList.push(new mediumAsteroid(this.asteroidList[tempAsteroidDestroy].position.x, this.asteroidList[tempAsteroidDestroy].position.y));
    }

    // spawn small asteroids after the medium ones 
    spawnSmallAsteroid(tempAsteroidDestroy){
        this.asteroidList.push(new smallAsteroid(this.asteroidList[tempAsteroidDestroy].position.x, this.asteroidList[tempAsteroidDestroy].position.y));
        this.asteroidList.push(new smallAsteroid(this.asteroidList[tempAsteroidDestroy].position.x, this.asteroidList[tempAsteroidDestroy].position.y));
    }

    startLevel(amountOfAsteroids){
        // after each level spawn a certin amount of large asteroids
        for(let i = 0; i < amountOfAsteroids; i++){
            this.asteroidList.push(new asteroid(random(0, width), random(0, height), 30));
        }
    }

    // spawn bullet and play sound
    spawnBullet(x, y, angle, speed){
        this.playerShoot.play();
        this.bulletList.push(new bullet(x + 5, y + 5, angle, speed));
    }

    checkBulletLifePlayer(index){
        this.bulletList[index].movement();

        if(this.bulletList[index].lifeSpan()){
            this.removeBulletPlayer(this.bulletList[index]);
            return true;
        }
    }

    checkBulletLifeSaucer(index){
        this.bulletListSaucer[index].movement();

        if(this.bulletListSaucer[index].lifeSpan()){
            this.removeBulletSaucer(this.bulletListSaucer[index]);
            return true;
        }
    }

    removeBulletPlayer(tempBullet){
        this.bulletList.splice(tempBullet, 1);
    }

    removeBulletSaucer(tempBullet){
        this.bulletListSaucer.splice(tempBullet, 1);
    }


    // spawning saucer bullet this is seperate from the player bullets 
    spawnSaucerBullet(x, y, angle, speed){
        this.playerShoot.play();
        this.bulletListSaucer.push(new bullet(x + 5, y + 5, angle, speed));
    }

    // moving the asteroids 
    moveAsteroids(){
        for(let i = 0; i < this.asteroidList.length; i++){
          this.asteroidList[i].spawnAsteroid();
          this.asteroidList[i].asteroidMovement();
        }
    }

    // remove the large asteroids and spawn medium ones and play sound
    removeLargeAsteroid(tempAsteroidDestroy){
      this.spawnMediumAsteroid(tempAsteroidDestroy);
      this.asteroidList.splice(tempAsteroidDestroy, 1);
      this.deathSound.play();
    }

    // remove the medium asteroids and spawn small ones and play sound
    removeMediumAsteroid(tempAsteroidDestroy){
      this.spawnSmallAsteroid(tempAsteroidDestroy);
      this.asteroidList.splice(tempAsteroidDestroy, 1);
      this.deathSound.play();
    }
    // remove small asteroids
    removeSmallAsteroid(tempAsteroidDestroy){
      this.asteroidList.splice(tempAsteroidDestroy, 1);
      this.deathSound.play();
    }

    // spawn our saucer and play sound 
    spawnSaucer(){
        this.saucerSound.play();
        this.soundPlaying = true;
        this.currentSaucer = new saucers(0, 0);
        this.activeSaucer = true;
    }

    // if saucer sound is still playing stop it and remove saucer 
    removeSaucer(){
        if(this.soundPlaying){
            this.saucerSound.stop();
            this.soundPlaying = false;
        }
        this.currentSaucer;
        this.activeSaucer = false;
    }

    spawnParticals(tempAsteroidDestory){
        let randomAmount = random(10, 20);
        for(let i = 0; i < randomAmount; i++){
            this.particals.push(new particalSystem(this.asteroidList[tempAsteroidDestory].position.x, this.asteroidList[tempAsteroidDestory].position.y));
        }
    }

    spawnParticalsSaucerDeath(){
        let randomAmount = random(10, 20);
        for(let i = 0; i < randomAmount; i++){
            this.particals.push(new particalSystem(this.currentSaucer.currentPosition, height/4));
        }
    }

    spawnParticalsPlayerDeath(x, y){
        let randomAmount = random(10, 20);
        for(let i = 0; i < randomAmount; i++){
            this.particals.push(new particalSystem(width/2, height/2));
        }
    }

    checkLife(){
        for(let i = 0; i < this.particals.length; i++){
        //     this.particals[i].spawn();
            this.particals[i].movement();

            if(this.particals[i].checkLife()){
                this.removeParticals(this.particals[i]);
            }
        }
    }

    removeParticals(removePartical){
        this.particals.splice(removePartical, 1);
    }

    // increase the asteroids for next level and set saucer spawn to false
    nextLevel(){
        if(this.asteroidList.length <= 0 && !this.reset){
            this.currentAmountOfAsteroids = this.currentAmountOfAsteroids + 2;
            this.level++;
            this.startLevel(this.currentAmountOfAsteroids);
            this.activeSaucer = false;
        }
    }
    // remove all present asteroids on screen and saucer if active and restart the game 
    resetAsteroids(){
        this.reset = true;
        for(let i = 0; i < this.asteroidList.length; i++){
            this.asteroidList.splice(this.asteroidList[i]);
        }
        if(this.activeSaucer){
            this.removeSaucer();
        }
        this.currentAmountOfAsteroids = 4;
        this.startLevel(4);
        this.reset = false;
    }
}

