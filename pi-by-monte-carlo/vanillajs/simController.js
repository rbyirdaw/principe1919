
(function(window) {

  function SimController(simModel, simView) {
    
    var self = this,
        arcParam;
    
    this.simModel = simModel;
    this.simView = simView;

    this.simRunning = false;
    this.intervalId = undefined;

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

  SimController.prototype.stepSim = function(self) {

    var obs,
        pointColor;

    self.simModel.stepSim();

    obs = self.simModel.getObservables();
    obs.isHit === true ? pointColor = "#77c1c7" : pointColor = "#ff9900";

    self.simView.updateCanvas([{x: obs.x, y:obs.y, pointColor: pointColor}]);

    self.simView.updateObservables(obs);

  };

//=============================================================================

  SimController.prototype.startSim = function() {

    var self = this;

    if (!this.simRunning) {

      this.simRunning = true;
      this.intervalId = setInterval(self.stepSim, 5, self);

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

  SimController.prototype.initSim = function() {
    
    var arcParam = {
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

  };

//=============================================================================

  window.mcPiApp = window.mcPiApp || {};
  window.mcPiApp.Controller = SimController;  

})(window);

