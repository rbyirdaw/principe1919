
  class SimController {

    constructor(simModel, simView) {
      let self = this,
          arcParam;

      this.simModel = simModel;
      this.simView = simView;

      this.simRunning = false;
      this.intervalId;

      this.simView.setListener('startStop', function(val) {
        if (val === 'Start') {
          self.startSim();
        } else if (val === 'Stop') {
          self.stopSim();
        }
      });

      this.simView.setListener('clear', function() {
        self.initSim();
      });

    }

  //=============================================================================

  stepSim(self) {

    let obs,
        pointColor;

    self.simModel.stepSim();

    obs = self.simModel.getObservables();
    obs.isHit === true ? pointColor = "#77c1c7" : pointColor = "#ff9900";

    self.simView.updateCanvas([{x: obs.x, y: obs.y, pointColor: pointColor}]);

    self.simView.updateObservables(obs);

  }

  //=============================================================================

  startSim() {

    let self = this;

    if (!this.simRunning) {

      this.simRunning = true;
      this.intervalId = setInterval(self.stepSim, 5, self);

    } else {
      //sim is already running
      console.log("Simulation already running. Interval id "+this.intervalId);
    }

  }

  //=============================================================================

  stopSim() {

    if (this.simRunning) {

      clearInterval(this.intervalId);
      this.simRunning = false;

    } else {
      //sim is not running
      console.log("Simulation not running. Interval id "+this.intervalId);      
    }

  }

  //=============================================================================

  initSim() {

    let arcParam = {
      x: 0,
      y: 0,
      arcRadius: this.simModel.getRadius(),
      startAng: 0,
      endAng: (3/2)*Math.PI,
      strokeColor: "tomato"
    };

    this.simModel.init();
    this.simView.init(arcParam);
    this.simView.updateObservables(this.simModel.getObservables());

  }

}