
(function(window) {

  function SimView() {
    this.canvas = document.querySelector("[title='simCanvas']");
    this.ctx = this.canvas.getContext("2d");

    this.startStop = document.querySelector("[title='startStop']");
    this.clear = document.querySelector("[title='clear']");

    this.obsTable = {
      xMean: document.querySelector("[title='xMean']"),
      yMean: document.querySelector("[title='yMean']"),
      rMean: document.querySelector("[title='rMean']")
    }
  }

  //============================================================================
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

  //============================================================================
  SimView.prototype.init = function() {

    this.clearCanvas();
    this.clearObsTable();

   };

   //===========================================================================
   SimView.prototype.clearCanvas = function() {
     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
   }

  //===========================================================================

   SimView.prototype.updateCanvas = function(pointSet) {

     if (pointSet[1].hasOwnProperty("pointColor")) {
       for (i = 0; i < pointSet.length; i++) {
         this.drawPoint(pointSet[i].x, pointSet[i].y, pointSet[i].pointColor);
       }
     } else {

       for (i = 0; i < pointSet.length; i++) {
         this.drawPoint(pointSet[i].x, pointSet[i].y, "#0000cc");
       }

     }

   };

   //===========================================================================

   SimView.prototype.drawPoint = function(x, y, pointColor) {

     if (x < 0) {
        x = this.canvas.width - 10;
     } else if (x > this.canvas.width) {
       x = 10;
     }
     if (y < 0) {
        y = this.canvas.height - 10;
     } else if (y > this.canvas.height) {
       y = 10;
     }

     if (pointColor === undefined) {
       pointColor = "#0000cc";
     }

     this.ctx.beginPath();
     this.ctx.moveTo(x, y);
     this.ctx.lineTo(x+1, y+1);
     this.ctx.strokeStyle = pointColor;
     this.ctx.stroke();
   };

   //===========================================================================

   SimView.prototype.updateObservables = function(obs) {

     for (obsName in this.obsTable) {
       this.obsTable[obsName].innerHTML = obs[obsName];
     }
   };

   //===========================================================================

   SimView.prototype.clearObsTable = function() {

     for (obsName in this.obsTable) {
       this.obsTable[obsName].innerHTML = "";
     }
   };

   //===========================================================================

   window.rwApp = window.rwApp || {};
   window.rwApp.View = SimView;

})(window);
