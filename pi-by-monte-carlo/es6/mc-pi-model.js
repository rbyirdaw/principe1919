class MCpiModel {
    
  constructor(radius) {

    this.this.radius = radius,
    this.x;
    this.y;
    this.hits;
    this.isHit;
    this.totalPoints;
    this.piByMC;
  }

  //=============================================================================

  init() {
    this.x = 0;
    this.y = 0;
    this.hits = 0;
    this.isHit = false;
    this.totalPoints = 0;
    this.piByMC = 0;

  }
  //=============================================================================
  /*
   * Returns a random number between lowerBound and upperBound, inclusive.
   */
  getRandomCoord(lowerBound, upperBound) {

    return Math.floor(lowerBound + Math.random()*(upperBound + 1));

  }

//=============================================================================

  generatePoints() {
    this.x = this.getRandomCoord(0, (this.radius - 1));
    this.y = this.getRandomCoord(0, (this.radius - 1));

  }

//=============================================================================
  isHit() {

    return (Math.pow(this.x,2) + Math.pow(this.y,2) <= Math.pow(this.radius,2));

  };



  //=============================================================================

  getRadius() {

    return  this.radius;

  }

  //=============================================================================

  getParameters() {

    return {radius: this.radius};

  }

  //=============================================================================
  getObservables() {

    return {
      x: this.x,
      y: this.y,
      hits: this.hits,
      isHit: this.isHit,
      totalPoints: this.totalPoints,
      piByMC: this.piByMC.toFixed(7)
    }

  }

  //=============================================================================

  stepSim() {

    this.generatePoints();
    this.totalPoints++;

    if (this.isHit()) {
      this.isHit = true;
      this.hits++;
      this.piByMC = 4*(this.hits/this.totalPoints);
    } else {
      this.isHit = false;
    }

  }

}//MCpiModel

