
angular.module("mcPiApp", [])
    .controller("MCPiCtrl", function($scope, $interval) {

      var mcPiModel = {
	    x: undefined,
	    y: undefined,
		radius: 300,
		hits: 0,
		totalPoints: 0,

		getRandomCoord: function() {
		  return Math.floor(1 + Math.random()*(this.radius-1));
		},

		generatePoint: function() {
		  x = this.getRandomCoord();
		  y = this.getRandomCoord();

		  this.totalPoints++;

		  if (this.isHit()) {
			this.hits++;
		  }
		},

		isHit: function() {
		  return (Math.pow(x,2) + Math.pow(y,2) <= Math.pow(this.radius,2));
		}

	  } //model		

	  $scope.mcPi = mcPiModel;
	  $scope.simRunning = false;
	  var intervalId = undefined;

	  $scope.startStopSim = function() {
		
		if ($scope.simRunning) {
		  $scope.simRunning = false;
		  $interval.cancel(intervalId);
		  intervalId = undefined;

		} else {
		  $scope.simRunning = true;
		  intervalId = $interval(function() {
			$scope.mcPi.generatePoint();
		  }, 50);
		}
		$scope.dOut = "startStopSim";
	  }

	  $scope.clearSim = function() {
		alert("stopSim");
	  }


	  

	  

	}); //controller
		
