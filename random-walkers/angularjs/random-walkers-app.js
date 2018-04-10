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
    var canvasH, ctx;

    function link(scope, element, attrs) {
      element.append(angular.element("<canvas width='500' height='300'>"));
      canvasH = element.find("canvas");
      ctx = canvasH[0].getContext("2d");      
    } // link

    return {
      link: link
    }

  });