
(function(window) {


  function Particle(x, y) {
    var _x = x,
        _y = y,
        _xSqDist = 0,
        _ySqDist = 0,
        _rSqDist = 0;

    this.move = function(delX, delY) {

      _x += delX;
      _y += delY;

    };

    this.getDisplacement = function() {
      return {
        x: _x,
        y: _y
      };
    }

    this.updateSqDist = function() {

      _xSqDist = Math.pow(_x, 2);
      _ySqDist = Math.pow(_y, 2);
      _rSqDist = _xSqDist + _ySqDist;
    };

    this.getSqDist = function() {
      return {
        xSqDist: _xSqDist,
        ySqDist: _ySqDist,
        rSqDist: _rSqDist
      };
    }


  }

  //===========================================================================

  function RandomWalkModel(numParticles, xOrigin, yOrigin) {

    var _numParticles = numParticles,
        _xOrigin = xOrigin,
        _yOrigin = yOrigin,
        _particles = [],
        _obs = {};

    //=========================================================================

    this.init = function() {
      for (i = 0; i < _numParticles; i++) {
        _particles[i] = new Particle(_xOrigin, _yOrigin);
      }

    };

    //=========================================================================

    this.getParameters = function() {
      return {numParticles: _numParticles};
    };

    //=========================================================================

    this.getObservables = function() {
      return _obs;
    };

    //=========================================================================

    this.getRandomCoord = function(lowerBound, upperBound) {
      return Math.floor(lowerBound + Math.random()*(upperBound + 1));
    };

    //=========================================================================

    this.stepSim = function() {
      var delX = 0,
          delY = 0,
          sumX = 0,
          sumY = 0,
          sumXSqDist = 0,
          sumYSqDist = 0,
          sumRSqDist = 0;

      _obs = {
        x: [],
        y: [],
        pointSet: [],
        xMean: undefined,
        yMean: undefined,
        rMean: undefined,
        xMSD: undefined,
        yMSD: undefined,
        rMSD: undefined,
        xRMSD: undefined,
        yRMSD: undefined,
        rRMSD: undefined,

      }

      for (i = 0; i < _numParticles; i++) {
        Math.random() < 0.5 ? delX = -1 : delX = 1;
        Math.random() < 0.5 ? delY = -1 : delY = 1;

        _particles[i].move(delX, delY);
        _particles[i].updateSqDist();

        _obs.pointSet.push({
          x: _particles[i].getDisplacement().x,
          y: _particles[i].getDisplacement().y
        });

        sumX += _obs.pointSet[i].x;
        sumY += _obs.pointSet[i].y;

        sumXSqDist += _particles[i].getSqDist().xSqDist;
        sumYSqDist += _particles[i].getSqDist().ySqDist;
        sumRSqDist += _particles[i].getSqDist().rSqDist;

      }
      _obs.xMean = sumX / _numParticles;
      _obs.yMean = sumY / _numParticles;
      _obs.rMean = Math.sqrt(Math.pow(_obs.xMean, 2) +
          Math.pow(_obs.yMean, 2)).toFixed(3);

      _obs.xMSD = sumXSqDist / _numParticles;
      _obs.yMSD = sumYSqDist / _numParticles;
      _obs.rMSD = sumRSqDist / _numParticles;

      _obs.xRMSD = Math.sqrt(_obs.xMSD).toFixed(3);
      _obs.yRMSD = Math.sqrt(_obs.yMSD).toFixed(3);
      _obs.rRMSD = Math.sqrt(_obs.rMSD).toFixed(3);
    };


  }

  //===========================================================================

  window.rwApp = window.rwApp || {};
  window.rwApp.Model = RandomWalkModel;

})(window);
