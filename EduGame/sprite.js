function Sprite(animation, x, y, speed) {
    this.x = x;
    this.y = y;
    this.animation = animation;
    this.w = this.animation[0].width;
    this.len = this.animation.length;
    this.speed = speed;
    this.index = 0;

    this.show = function () {
        let index = mult(floor(this.index) % this.len);
        image(this.animation[index], this.x, this.y);
    }

    this.animate = function () {
        this.index += this.speed;
    }
}