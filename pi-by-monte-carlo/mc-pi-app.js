
angular.module("mcPiApp", [])
    .controller("MCPiCtrl", function ($scope) {

      var mcPiModel = {
	    x: undefined,
	    y: undefined,
		radius: 300,
		hits: 0,
		totalPoints: 0,

		getRandomCoord: function () {
		  return Math.floor(1 + Math.random()*(radius-1));
		},

		generatePoint: function () {
		  x = getRanomCoord();
		  y = getRanomCoord();

		  totalPoints++;

		  if (isHit()) {
			hits++;
		  }
		},

		isHit: function () {
		  return (Math.pow(x,2) + Math.pow(y,2) <= Math.pow(radius,2));
		}

	  } //model		

	  $scope.mcPi = mcPiModel;

	  $scope.startStopSim = function () {
		$scope.dOut = "startStopSim";
	  }

	  $scope.clearSim = function () {
		alert("stopSim");
	  }

	}); //controller
		
