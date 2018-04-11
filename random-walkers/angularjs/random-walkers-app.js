angular.module("randomWalkersApp", [])
  .controller("RandomWalkersCtrl", function($scope, $interval) {

    $scope.rwModel = new RandomWalkModel(200, 250, 150);
    $scope.simRunning = false;
    $scope.obs;
    $scope.totalSteps;

    var intervalId;

    $scope.initSim = function() {
      $scope.rwModel.init();
    };

	  $scope.startStopSim = function() {
		
      if ($scope.simRunning) {
        $scope.simRunning = false;
        $interval.cancel(intervalId);
        intervalId = undefined;
  
      } else {
        $scope.simRunning = true;
        $scope.rwModel.init();      
        intervalId = $interval($scope.stepSim, 25);
      }
    };

    $scope.clearSim = function() {
      //clear values

      $scope.startStopSim();
    };

    $scope.stepSim = function() {
      $scope.rwModel.stepSim();
      $scope.obs = $scope.rwModel.getObservables();
      $scope.totalSteps = $scope.rwModel.getTotalSteps();

      console.log($scope.totalSteps);
    }



  })
  .directive("simCanvas", function() {
    var canvasH, 
        ctx,
        canvasWidth = 500,
        canvasHeight = 300;

    function clearCanvas() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    function updateCanvas(particles) {
 
      for (var i = 0; i < particles.length; i++) {
        var dispVec = particles[i].getDisplacement();
        drawPoint(dispVec.x, dispVec.y);
      }
    }

    function drawPoint(x, y) {
      if (x < 0) {
        x = canvasWidth - 10;
      } else if (x > canvasWidth) {
        x = 10;
      }
      if (y < 0) {
          y = canvasHeight - 10;
      } else if (y > canvasHeight) {
        y = 10;
      }
  
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x+1, y+1);
      ctx.stroke();
    }

    function link(scope, element, attrs) {
      element.append(angular.element("<canvas width='" + canvasWidth + "' height='" + canvasHeight + "'>"));
      canvasH = element.find("canvas");
      ctx = canvasH[0].getContext("2d");
      ctx.strokeStyle = "tomato";
      
      var watcherFunc = function() {
        return scope.totalSteps;
      }
      
      scope.$watch(watcherFunc, function(newValue, oldValue) {
        var particles = scope.rwModel.particles;
        clearCanvas();
        updateCanvas(particles);
      });

    } // link



    return {
      link: link
    }

  });