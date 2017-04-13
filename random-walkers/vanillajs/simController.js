
(function(window) {

  function SimController(simModel, simView) {

    var self = this;

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

  //============================================================================

  SimController.prototype.initSim = function() {

  };

  //============================================================================

  SimController.prototype.startSim = function() {

  };

  //============================================================================

  SimController.prototype.stepSim = function(self) {

  };

  //============================================================================

  SimController.prototype.stopSim  = function() {

  };

  //============================================================================
  window.rwApp = window.rwApp || {};
  window.rwApp.Controller = SimController;

})(window);
