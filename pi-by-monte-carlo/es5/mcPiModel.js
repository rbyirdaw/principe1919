
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
    /*
     * Returns a random number between lowerBound and upperBound, inclusive.
     */
    this.getRandomCoord = function(lowerBound, upperBound) {

      return Math.floor(lowerBound + Math.random()*(upperBound + 1));
  
    };

//=============================================================================

    this.generatePoints = function() {
      _x = this.getRandomCoord(0, (_radius - 1));
      _y = this.getRandomCoord(0, (_radius - 1));

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

    this.getRadius = function() {

      return  _radius;

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
        piByMC: _piByMC.toFixed(7)
      }

    };

//=============================================================================

    this.stepSim = function() {

      this.generatePoints();
      _totalPoints++;
      
      if (this.isHit()) {
       _isHit = true;
       _hits++;
      } else {
        _isHit = false;
      }

      _piByMC = 4*(_hits/_totalPoints);

    };


  }//MCpiModel

//=============================================================================

  window.mcPiApp = window.mcPiApp || {};
  window.mcPiApp.Model = MCpiModel;

})(window);

    
       
