class bullet extends baseCharacter{
    constructor(x, y, angle, img){
        super(x, y, 5);
        this.angle = angle;
        this.speed = 5;
        this.img = img;
    }
}