
angular.module("mcPiApp", [])
    .controller("MCPiCtrl", function($scope, $interval) {

      var mcPiModel = {
	    x: undefined,
	    y: undefined,
		radius: 300,
		hits: 0,
		totalPoints: 0,
		piByMC: 0,

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
		  
		  this.piByMC = 4*(this.hits/this.totalPoints);
		},

		isHit: function() {
		  return (Math.pow(this.x,2) + Math.pow(this.y,2) <= Math.pow(this.radius,2));
		},

		getRadius: function() {
		  return this.radius;
		},

		clearValues: function() {
	      this.x = undefined;
	      this.y = undefined;		  
		  this.hits = 0;
		  this.totalPoints = 0;
		  this.piByMC = 0;
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

		  }, 5);
		}
		$scope.dOut = "startStopSim";
	  };

	  $scope.clearSim = function() {
		$scope.mcPi.clearValues();

		if ($scope.simRunning) {
		  $scope.simRunning = false;
		  $interval.cancel(intervalId);
		  intervalId = undefined;

		}
	  }


	}) //controller

    .directive("simCanvas", function() {
	  var canvasH,
	      ctx,
		  x,
		  y,
		  pointColor;

	  function initCanvas(radius) {
		ctx.clearRect(0, 0, canvasH[0].width, canvasH[0].height);

		if (ctx) {
		  ctx.beginPath();
		  ctx.arc(0, 0, radius, 0, (3/2)*Math.PI);
		  ctx.strokeStyle = "tomato";
		  ctx.stroke();
        }
	  }
	  
	  function updateCanvas() {

		ctx.strokeStyle = pointColor;

		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x+1, y+1);
		ctx.stroke();
		
//		console.log("x "+x+", y "+y);
	  }
	  		
	  function link(scope, element, attrs) {

		element.append(angular.element("<canvas width='300' height='300' id='mcpi-canvas'>"));
		canvasH = element.find("canvas");
		ctx = canvasH[0].getContext("2d");
		initCanvas(scope.mcPi.getRadius());
		
		var watcherFunc = function() {
		  return scope.mcPi.totalPoints;
		}

		scope.$watch(watcherFunc, function(newValue, oldValue) {

		  if ( (newValue === 0) && (oldValue > 0)) {
			initCanvas(scope.mcPi.getRadius());
		  } else if (newValue > oldValue) {
	  	    scope.mcPi.isHit() ? pointColor = "#77c1c7" : pointColor = "#ff9900";
		    x = scope.mcPi.x;
		    y = scope.mcPi.y;

		    updateCanvas();
		  }
		});



      }//link

      return {
        link: link
      };

    }); //directive



		
