
(function(window) {

  function MCpiModel(radius) {

    var _radius = radius,
        _x,
        _y,
        _hits,
        _isHit,
        _totalPoints,
        _piByMC;

//=============================================================================

    this.getRandomCoord = function() {

      return Math.floor(1 + Math.random()*(_radius-1));
  
    };

//=============================================================================

    this.generatePoints = function() {
      _x = this.getRandomCoord();
      _y = this.getRandomCoord();

    };

//=============================================================================
    this.isHit = function() {

      return (Math.pow(_x,2) + Math.pow(_y,2) <= Math.pow(_radius,2));

    };

//=============================================================================

    this.init = function() {
      _x = 0;
      _y = 0;
      _hits = 0;
      _isHit = false;
      _totalPoints = 0;
      _piByMC = 0;

    };

//=============================================================================

    this.getParameters = function() {

      return {radius: _radius};

    };

//=============================================================================
    this.getObservables = function() {

      return {
        x: _x,
        y: _y,
        hits: _hits,
        isHit: _isHit,
        totalPoints: _totalPoints,
        piByMc: _piByMC
      }

    };

//=============================================================================

    this.stepSim = function() {

      this.generatePoints();
      _totalPoints++;
      
      if (this.isHit()) {
       _isHit = true;
       _hits++;
      }

      _piByMC = 4*(_hits/_totalPoints);

    };


  }//MCpiModel

//=============================================================================

  window.mcPiApp = window.mcPiApp || {};
  window.mcPiApp.Model = MCpiModel;

})(window);

    
       
