angular.module("randomWalkersApp", [])
  .controller("RandomWalkersCtrl", function($scope, $interval) {

    $scope.rwModel = new RandomWalkModel(200, 250, 150);
    $scope.simRunning = false;

    $scope.initSim = function() {
      $scope.rwModel.init();
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