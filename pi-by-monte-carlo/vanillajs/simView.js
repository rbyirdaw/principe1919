
(function(window) {

  function SimView() {  

    this.canvas = document.querySelector("[title='simCanvas']");
    this.ctx = this.canvas.getContext("2d");

    this.startStop = document.querySelector("[title='startStop']");
    this.clear = document.querySelector("[title='clear']");

    this.obsTable = {
      hits: document.querySelector("[title='hits']"),
      totalPoints:document.querySelector("[title='totalPoints']"),
      piByMC: document.querySelector("[title='piByMC']")
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
    } else if (action === 'clear') {
      this.clear.addEventListener("click", function() {     
        eveHandler();
      });
    }

  };

//=============================================================================

  SimView.prototype.init = function(initParam) {

    this.clearCanvas();
    this.drawArc(initParam);
    this.clearObsTable();

  };


//=============================================================================

  SimView.prototype.clearCanvas = function() {

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

//=============================================================================

  SimView.prototype.updateCanvas = function(pointSet) {
  
    for (i = 0; i < pointSet.length; i++) {
      this.drawPoint(pointSet[i].x, pointSet[i].y, pointSet[i].pointColor);
    }

  };

//=============================================================================

  SimView.prototype.drawArc = function(arcParam) {

    this.ctx.beginPath();
    this.ctx.arc(
        arcParam.x,
        arcParam.y,
        arcParam.arcRadius,
        arcParam.startAng,
        arcParam.endAng
       );
    this.ctx.strokeStyle = arcParam.strokeColor;
    this.ctx.stroke();

  };


//=============================================================================

  SimView.prototype.drawPoint = function(x, y, pointColor) {

    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x+1, y+1);
    this.ctx.strokeStyle = pointColor;
    this.ctx.stroke();
  };

//=============================================================================

  SimView.prototype.updateObservables = function(obs) {


    for (obsName in this.obsTable) {
      this.obsTable[obsName].innerHTML = obs[obsName];
    }

  };

//=============================================================================

  SimView.prototype.clearObsTable = function() {

    for (obsName in this.obsTable) {
      this.obsTable[obsName].innerHTML = "";
    }

  }

//=============================================================================

  window.mcPiApp = window.mcPiApp || {};
  window.mcPiApp.View = SimView;

})(window);


