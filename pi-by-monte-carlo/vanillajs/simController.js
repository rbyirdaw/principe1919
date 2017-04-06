
(function(window) {

  function SimController(simModel, simView) {
    
    var self = this;
    
    this.simModel = simModel;
    this.simView = simView;

    this.simModel.init();

    this.simRunning = false;
    this.intervalId = undefined;

    this.simView.setListener('startStop', function(val) {
      if (val === 'Start') {
        self.startSim();
      } else if (val === 'Stop') {
        self.stopSim();
      }
    });

  }

//=============================================================================

  SimController.prototype.stepSim = function() {
    
    var obs,
        pointColor;

    this.simModel.stepSim();

    obs = this.simModel.getObservables();
    obs.hit === true ? pointColor = "#77c1c7" : pointColor = "#ff9900";
    this.simView.updateCanvas([{x: obs.x, y:obs.y, pointColor: pointColor}]);

  };

//=============================================================================

  SimController.prototype.startSim = function() {

    var self = this;

    if (!this.simRunning) {

      this.simRunning = true;
      this.intervalId = setInterval(self.stepSim, 5);

    } else {
      //sim is already running
    }

  };

//=============================================================================

  SimController.prototype.stopSim = function() {

    if (this.simRunning) {

      clearInterval(this.intervalId);
      this.simRunning = false;

    } else {
      //sim is not running
    }

  };


//=============================================================================

  window.mcPiApp = window.mcPiApp || {};
  window.mcPiApp.Controller = SimController;  

})(window);

