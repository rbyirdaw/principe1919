
(function(window) {

  function SimView() {

    this.canvas = document.querySelector("[title='simCanvas']");
    this.ctx = this.canvas.getContext("2d");

    this.obsTable = {
      hits: document.querySelector("[title='hits']"),
      totalPoints:document.querySelector("[title='totalPoints']"),
      mcPi: document.querySelector("[title='piByMC']")
    };


  }

//=============================================================================

  SimView.prototype.updateCanvas = function(pointSet) {
  
    this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (i = 0; i < pointSet.length; i++) {
      this.drawPoint(pointSet[i][1], pointSet[i][2]);
    }

  };

//=============================================================================

  SimView.prototype.drawPoint = function(x, y) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x+1, y+1);
    this.ctx.stroke();
  };

//=============================================================================

  SimView.prototype.updateObservable = function(obs) {

    var obsName = Object.keys(obs)[1];
    this.obsTable[obsName].innerHTML = obs[obsName];

  };


//=============================================================================

  window.mcPiApp = window.mcPiApp || {};
  window.mcPiApp.View = SimView;

})(window);
