
class SimController {

  constructor(simModel, simView) {
    let self = this;
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

  //============================================================================

  initSim() {
    this.simModel.init();
    this.simView.init();
    this.simView.setStrokeColor("tomato");
  }

  //============================================================================

  startSim() {
    let self = this;

    if (!this.simRunning) {
      this.simRunning = true;
      this.intervalId = setInterval(self.stepSim, 25, self);
    }
  }

  //============================================================================

  stepSim(self) {
    let obs;

    self.simModel.stepSim();
    obs = self.simModel.getObservables();

    self.simView.clearCanvas();
    self.simView.updateCanvas(obs.pointSet);
    self.simView.updateObservables(obs);
  }

  //============================================================================

  stopSim() {
    
    if (this.simRunning) {
      clearInterval(this.intervalId);
      this.simRunning = false;
    }

  }

}

