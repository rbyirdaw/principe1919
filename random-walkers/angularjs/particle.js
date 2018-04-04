class Particle {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xDist = 0;
    this.yDist = 0;
    this.xSqDist = 0;
    this.ySqDist = 0;
    this.rSqDist = 0;
  }

  move(delX, delY) {
    this.x += delX;
    this.y += delY;
  }

  getDisplacement() {
    return {
      x: this.x,
      y: this.y
    };
  }

  updateDist(delX, delY) {
    //distance traveled along x & y
    this.xDist += delX;
    this.yDist += delY;
  }

  updateSqDist() {
    this.xSqDist = Math.pow(xDist, 2);
    this.ySqDist = Math.pow(yDist, 2);
    this.rSqDist = this.xSqDist + this.ySqDist;
  }

  getDist() {
    return {
      xDist: this.xDist,
      yDist: this.yDist
    };
  }

  getSqDist() {
    return {
      xSqDist: this.xSqDist,
      ySqDist: this.ySqDist,
      rSqDist: this.rSqDist
    };
  }
}