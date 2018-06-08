
class SimView {

  constructor() {

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

  setListener(action, eveHandler) {

    let self = this;

    if (action === 'startStop') {
      this.startStop.addEventListener("click", function() {
        eveHandler(this.value);
        (this.value === 'Start') ?
            self.startStop.value = 'Stop': self.startStop.value = "Start";

      });
    } else if (action === 'clear') {
      this.clear.addEventListener("click", function() {
        eveHandler();
      });
    }

  }

  //=============================================================================

  init(initParam) {

    this.clearCanvas();
    this.drawArc(initParam);
    this.clearObsTable();

  }


  //=============================================================================

  clearCanvas() {

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  //=============================================================================

  updateCanvas(pointSet) {

    for (let i = 0; i < pointSet.length; i++) {
      this.drawPoint(pointSet[i].x, pointSet[i].y, pointSet[i].pointColor);
    }

  }

  //=============================================================================

  drawArc(arcParam) {

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

  }


  //=============================================================================

  drawPoint(x, y, pointColor) {

    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x+1, y+1);
    this.ctx.strokeStyle = pointColor;
    this.ctx.stroke();
  }

  //=============================================================================

  updateObservables(obs) {
    let obsName;
    for (obsName in this.obsTable) {
      this.obsTable[obsName].innerHTML = obs[obsName];
    }

  }

  //=============================================================================

  clearObsTable() {
    let obsName;
    for (obsName in this.obsTable) {
      this.obsTable[obsName].innerHTML = "";
    }

  }

}