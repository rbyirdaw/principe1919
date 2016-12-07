
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
		  this.x = this.getRandomCoord();
		  this.y = this.getRandomCoord();

		  this.totalPoints++;

		  if (this.isHit()) {
			this.hits++;
		  }
		},

		isHit: function() {
		  return (Math.pow(this.x,2) + Math.pow(this.y,2) <= Math.pow(this.radius,2));
		},

		getRadius: function() {
		  return this.radius;
		},

		getTotalPoints: function() {
		  return this.totalPoints;
		}

	  } //model		

	  $scope.mcPi = mcPiModel;
	  $scope.totalPoints = mcPiModel.totalPoints;

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


	}) //controller

    .directive("simCanvas", function() {
	  var canvasH,
	      ctx,
		  x,
		  y,
		  pointColor;
	  
	  function updateCanvas() {

		ctx.strokeStyle = pointColor;

		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x+1, y+1);
		ctx.stroke();
		
		console.log("x "+x+", y "+y);
	  }
	  		
	  function link(scope, element, attrs) {

		element.append(angular.element("<canvas width='300' height='300' id='mcpi-canvas'>"));

		canvasH = element.find("canvas");
		ctx = canvasH[0].getContext("2d");

		if (ctx) {
		  ctx.beginPath();
		  ctx.arc(0, 0, scope.mcPi.getRadius(), 0, (3/2)*Math.PI);
		  ctx.strokeStyle = "tomato";
		  ctx.stroke();
        }
		
		var watcherFunc = function() {
		  return scope.mcPi.totalPoints;
		}

		scope.$watch(watcherFunc, function(newValue, oldValue) {
	  	  scope.mcPi.isHit() ? pointColor = "#77c1c7" : pointColor = "#ff9900";
		  x = scope.mcPi.x;
		  y = scope.mcPi.y;

		  updateCanvas();
		});

      }//link

      return {
        link: link
      };

    }); //directive



		
