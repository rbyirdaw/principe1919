
(function(window) {


  function Particle() {
    var _x,
        _y,
        _xSqDist,
        _ySqDist,
        _rSqDist;

    this.move = function(delX, delY) {

      _x += delX;
      _y += delY;

    };

    this.updateSqDist = function() {

      _xSqDist = Math.pow(_x, 2);
      _ySqDist = Math.pow(_y, 2);
      _rSqDist = _xSqDist + _ySqDist;
  
    };


  }

  //===========================================================================

  function RandomWalkModel(numParticles) {

    var _numParticles = numParticles,
        _particels = [];

    //=========================================================================

    this.init = function() {

    };

    //=========================================================================

    this.getParameters = function() {


    };

    //=========================================================================

    this.getObservables = function() {


    };

    //=========================================================================

    this.getRandomCoord = function(lowerBound, upperBound) {

      return Math.floor(lowerBound + Math.random()*(upperBound + 1));
  
    };


    //=========================================================================

    this.stepSim = function() {


    };


  }

  //===========================================================================

  window.rwApp = rwApp || {};
  window.rwApp.Model = RandomWalkModel;

})(window);


