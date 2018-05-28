
(function() {
  var rwModel = new RandomWalkModel(200, 250, 150),
      rwView = new SimView(),
      rwController = new SimController(rwModel, rwView);

  rwController.initSim();


})();
