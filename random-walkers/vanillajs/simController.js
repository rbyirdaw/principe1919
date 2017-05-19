
(function(window) {

  function SimController(simModel, simView) {

    var self = this;

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

  SimController.prototype.initSim = function() {
    this.simModel.init();
    this.simView.init();
    this.simView.setStrokeColor("tomato");
  };

  //============================================================================

  SimController.prototype.startSim = function() {
    var self = this;

    if (!this.simRunning) {
      this.simRunning = true;
      this.intervalId = setInterval(self.stepSim, 25, self);
    }
  };

  //============================================================================

  SimController.prototype.stepSim = function(self) {
    var obs;

    self.simModel.stepSim();
    obs = self.simModel.getObservables();

    self.simView.clearCanvas();
    self.simView.updateCanvas(obs.pointSet);
    self.simView.updateObservables(obs);


  };

  //============================================================================

  SimController.prototype.stopSim  = function() {
    if (this.simRunning) {
       clearInterval(this.intervalId);
       this.simRunning = false;
     }
  };

  //============================================================================
  window.rwApp = window.rwApp || {};
  window.rwApp.Controller = SimController;

})(window);
