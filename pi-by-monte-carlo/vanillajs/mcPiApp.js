
(function() {

  var mcPiModel,
      mcPiView,
      mcPiController,
      radius = 300;

  mcPiModel = new mcPiApp.Model(radius);
  mcPiView = new mcPiApp.View();
  mcPiController = new mcPiApp.Controller(mcPiModel, mcPiView);
  mcPiController.initSim();


})();
