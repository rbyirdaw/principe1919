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

  getTotalSteps() {
    return this.totalSteps;
  }

  getRandomCoord(lowerBound, upperBound) {
    return Math.floor(Math.random() * (upperBound - lowerBound)) + lowerBound;
  }

  stepSim() {
    let delX = 0,
        delY = 0,
        sumX = 0,
        sumY = 0,
        sumXSqDist = 0,
        sumYSqDist = 0,
        sumRSqDist = 0;

    this.obs = {
      x: [],
      y: [],
      pointSet: [],
      xMean: undefined,
      yMean: undefined,
      rMean: undefined,
      xMSD: undefined,
      yMSD: undefined,
      rMSD: undefined,
      xRMSD: undefined,
      yRMSD: undefined,
      rRMSD: undefined
    };

    this.totalSteps++;

    for (var i = 0; i < this.numParticles; i++) {
      Math.random() < 0.5 ? delX = -1 : delX = 1;
      Math.random() < 0.5 ? delY = -1 : delY = 1;

      this.particles[i].move(delX, delY);
      this.particles[i].updateDist(delX, delY);
      this.particles[i].updateSqDist();

      this.obs.pointSet.push({
        x: this.particles[i].getDisplacement().x,
        y: this.particles[i].getDisplacement().y
      });

      sumX += this.particles[i].getDist().xDist;
      sumY += this.particles[i].getDist().yDist;

      sumXSqDist += this.particles[i].getSqDist().xSqDist;
      sumYSqDist += this.particles[i].getSqDist().ySqDist;
      sumRSqDist += this.particles[i].getSqDist().rSqDist;

    }
    this.obs.xMean = sumX / this.numParticles;
    this.obs.yMean = sumY / this.numParticles;
    this.obs.rMean = Math.sqrt(Math.pow(this.obs.xMean, 2) +
        Math.pow(this.obs.yMean, 2)).toFixed(3);

    this.obs.xMSD = sumXSqDist / this.numParticles;
    this.obs.yMSD = sumYSqDist / this.numParticles;
    this.obs.rMSD = sumRSqDist / this.numParticles;

    this.obs.xRMSD = Math.sqrt(this.obs.xMSD).toFixed(3);
    this.obs.yRMSD = Math.sqrt(this.obs.yMSD).toFixed(3);
    this.obs.rRMSD = Math.sqrt(this.obs.rMSD).toFixed(3);

    this.obs.totalSteps = this.totalSteps;
    this.obs.stepsByStepSize = Math.sqrt(this.totalSteps).toFixed(3);

  }

}