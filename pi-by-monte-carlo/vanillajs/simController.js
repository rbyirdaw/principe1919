
(function(window) {

  function SimController(simModel, simView) {
    
    this.simModel = simModel;
    this.simView = simView;

    this.simRunning = false;
    this.intervalId = undefined;


  }

  SimController.prototype.stepSim = function() {
    
    this.simModel.stepSim();
    this.simView.update(this.simModel.getObservables());

  };

//=============================================================================
  SimController.prototype.startSim = function() {

    if (!this.simRunning) {

      this.simRunning = true;
      this.intervalId = setInterval(this.stepSim, 50);

    } else {
      //sim is already running
    }

  };

//=============================================================================
  SimController.prototype.startSim = function() {

    if (this.simRunning) {

      clearInterval(this.intervalId);
      this.simRunning = fals;

    } else {
      //sim is not running
    }

  };


//=============================================================================

  window.mcPiApp = window.mcPiApp || {};
  window.mcPiApp.Controller = SimController;  

})(window);
