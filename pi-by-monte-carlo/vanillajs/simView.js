
(function(window) {

  function SimView() {  

    this.canvas = document.querySelector("[title='simCanvas']");
    this.ctx = this.canvas.getContext("2d");

    this.startStop = document.querySelector("[title='startStop']");
    this.clear = document.querySelector("[title='clear']");

    this.obsTable = {
      hits: document.querySelector("[title='hits']"),
      totalPoints:document.querySelector("[title='totalPoints']"),
      mcPi: document.querySelector("[title='piByMC']")
    };


  }

//=============================================================================

  SimView.prototype.setListener = function(action, eveHandler) {

    var self = this;

    if (action === 'startStop') {
      this.startStop.addEventListener("click", function() {
        console.log("StartStop: "+this.value);        
        eveHandler(this.value);
        (this.value === 'Start') ? 
            self.startStop.value = 'Stop': self.startStop.value = "Start";

      });
    }

  };

//=============================================================================

  SimView.prototype.updateCanvas = function(pointSet) {
  
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (i = 0; i < pointSet.length; i++) {
      this.drawPoint(pointSet[i].x, pointSet[i].y, pointSet[i].pointColor);
    }

  };

//=============================================================================

  SimView.prototype.drawPoint = function(x, y, pointColor) {
    this.ctx.strokeStyle = pointColor;
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
