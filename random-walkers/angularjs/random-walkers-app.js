angular.module("randomWalkersApp", [])
  .controller("RandomWalkersCtrl", function($scope, $interval) {

    $scope.rwModel = new RandomWalkModel(200, 250, 150);
    $scope.simRunning = false;
    $scope.totalSteps = $scope.rwModel.totalSteps;

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
        intervalId = $interval(function() {

        }, 0);
      }
    };

    $scope.clearSim = function() {
      //clear values

      $scope.startStopSim();
    };



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