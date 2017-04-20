
(function() {
  var rwModel = new rwApp.Model(5, 250, 150),
      rwView = new rwApp.View(),
      rwController = new rwApp.Controller(rwModel, rwView);

  rwController.initSim();


})();
