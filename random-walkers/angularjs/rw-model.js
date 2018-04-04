class RandomWalkModel {

  constructor(numParticles, xOrigin, yOrigin) {
    this.numParticles = numParticles;
    this.xOrigin = xOrigin;
    this.yOrigin = yOrigin;
    this.particles = [];
    this.totalSteps;
    this.obs = {};
  }

  init() {
    for (let i = 0; i < this.numParticles; i++) {
      this.particles[i] = new Particle(this.xOrigin, this.yOrigin);
    }

    this.totalSteps = 0;
  } //init

  getParameters() {
    return {numParticles: this.numParticles};
  }

  getObservables() {
    return this.obs;
  }

  getRandomCoord(lowerBound, upperBound) {
    return Math.floor(Math.random() * (upperBound - lowerBound)) + lowerBound;
  }

  stepSim() {
    
  }

}