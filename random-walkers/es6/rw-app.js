
(function() {
  var rwModel = new RandomWalkModel(200, 250, 150),
      //rwView = new rwApp.View(),
      rwController = new SimController(rwModel, rwView);

  rwController.initSim();


})();
