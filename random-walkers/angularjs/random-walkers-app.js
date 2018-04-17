angular.module("randomWalkersApp", [])
  .controller("RandomWalkersCtrl", function($scope, $interval) {

    $scope.rwModel = new RandomWalkModel(200, 250, 150);
    $scope.simRunning = false;
    $scope.obs = {};
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
      $scope.totalSteps = undefined;
      $scope.obs = {};
    };

    $scope.stepSim = function() {
      $scope.rwModel.stepSim();
      $scope.obs = $scope.rwModel.getObservables();
      $scope.totalSteps = $scope.rwModel.getTotalSteps();
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

    function updateCanvas(pointSet) {
 
      for (var i = 0; i < pointSet.length; i++) {        
        drawPoint(pointSet[i].x, pointSet[i].y);
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
        if ((newValue === 0 || newValue === undefined) && (oldValue > 0) ) {
          clearCanvas();
          
        } else if (newValue > oldValue) {
          clearCanvas();
          updateCanvas(scope.obs.pointSet);
        }
      });

    } // link



    return {
      link: link
    }

  });