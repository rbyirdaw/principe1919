/*
 * Demonstration of the Monte Carlo method throw dice throws. MC is used to 
 * simulate a throw of 5 dice.  Probabilities of specific sum outcomes are
 * calculated directly from the simulation.
 * 
 * Robel B. Yirdaw, 09/04/2015
 *
 */
 
 //main global object
var mcDice = {};

function init() {
	mcDice = {
		numDice: 5,
		diceSet: [
		    new Dice(40,40), new Dice(190,40), new Dice(340,40),
			new Dice(115,190), new Dice(265,190)
			],
		totalThrows: 0,
		sum5: 0,
		sum12: 0,
		sum18: 0,
		sum23: 0,
		sum30: 0,
		ctx: (document.getElementById("mc-dice-canvas")).getContext("2d"),
		intervalID: null,
		prevSumCellID: null,
		simRunning: false,
		dotColor: "white",
		dieColor: "CornflowerBlue",
		
		totalThrowsDisp: document.getElementById("totalThrows"),
		sumDisp: document.getElementById("sum"),
		sum5Disp: document.getElementById("sum5"),
		sum12Disp: document.getElementById("sum12"),
		sum18Disp: document.getElementById("sum18"),
		sum23Disp: document.getElementById("sum23"),
		sum30Disp: document.getElementById("sum30"),
		prob5Disp: document.getElementById("prob5"),
		prob12Disp: document.getElementById("prob12"),
		prob18Disp: document.getElementById("prob18"),
		prob23Disp: document.getElementById("prob23"),
		prob30Disp: document.getElementById("prob30")		
	};
	
	//Display the dice to start
	for(i = 0; i < mcDice.numDice; i++){
		rand = Math.floor(1 + 6*Math.random());
		sum += rand;
		mcDice.diceSet[i].setDieValue(rand);
		mcDice.diceSet[i].drawDie(mcDice.ctx,mcDice.dieColor,null);
		mcDice.diceSet[i].drawDieFace(mcDice.ctx,mcDice.dotColor);	
	}

	resetValues();
}


/******************************************************************************/

function resetDice() {
	mcDice.sum5 = 0;
	mcDice.sum12 = 0;
	mcDice.sum18 = 0;
	mcDice.sum23 = 0;
	mcDice.sum30 = 0;
	mcDice.totalThrows = 0;
}
/******************************************************************************/
function resetValues() {
		
	mcDice.totalThrowsDisp.innerHTML = 0;
	mcDice.sumDisp.innerHTML = 0;
	mcDice.sum5Disp.innerHTML = 0;
	mcDice.sum12Disp.innerHTML = 0;
	mcDice.sum18Disp.innerHTML = 0;
	mcDice.sum23Disp.innerHTML = 0;
	mcDice.sum30Disp.innerHTML = 0;
	mcDice.prob5Disp.innerHTML = 0;
	mcDice.prob12Disp.innerHTML = 0;
	mcDice.prob18Disp.innerHTML = 0;
	mcDice.prob23Disp.innerHTML = 0;
	mcDice.prob30Disp.innerHTML = 0;
	
}

/******************************************************************************/
function toggleAnim(){

	if(mcDice.simRunning){
		clearInterval(mcDice.intervalId);
		mcDice.simRunning = false;
		document.getElementById("startStopBtn").value = "Start";
	}
	else{
		mcDice.intervalId = setInterval(throwDice,mcDice.numDice);
		mcDice.simRunning = true;
		document.getElementById("startStopBtn").value = "Stop";
	}
}

/******************************************************************************/
function clearAnim(){

	
	resetDice();
	resetValues();

	if(mcDice.simRunning){		
		clearInterval(mcDice.intervalId);
		mcDice.simRunning = false;
		document.getElementById("startStopBtn").value = "Start";
	}	
}
/******************************************************************************/
//Simulate throw of dice
function throwDice(){
	var sum = 0,
	    rand = 0;
	
	for(i = 0; i < mcDice.numDice; i++){
		rand = Math.floor(1 + 6*Math.random());
		sum += rand;
		mcDice.diceSet[i].setDieValue(rand);
		mcDice.diceSet[i].drawDie(mcDice.ctx,mcDice.dieColor,null);
		mcDice.diceSet[i].drawDieFace(mcDice.ctx,mcDice.dotColor);	
	}
	
	mcDice.totalThrowsDisp.innerHTML = ++mcDice.totalThrows;
	
	//Update total outcomes and probabilities
	updateSumsProbs(sum);

	//Highlight corresponding table row if sum is a match
	//Turn off previous highlight if it exists
	if (mcDice.prevSumCellID !== null) {
		toggleRowHighlight(mcDice.prevSumCellID);
		mcDice.prevSumCellID = null;
	}
	
	if ( (sum === 5) || (sum===12) || (sum === 18) || 
	    (sum === 23) || (sum === 30)) {

		toggleRowHighlight('#sum'+sum);
		mcDice.prevSumCellID = '#sum'+sum;
	}
}

/******************************************************************************/
//Update total outcomes and probabilities (table)
function updateSumsProbs(sum) {
	
	document.getElementById("sum").innerHTML = sum;
	
	switch(sum){
		case 5:
			mcDice.sum5Disp.innerHTML = ++mcDice.sum5;
			mcDice.prob5Disp.innerHTML = 
			    (mcDice.sum5/mcDice.totalThrows).toFixed(5);
			break;
		case 12:
			mcDice.sum12Disp.innerHTML = ++mcDice.sum12;
			mcDice.prob12Disp.innerHTML = 
			    (mcDice.sum12/mcDice.totalThrows).toFixed(5);
			break;
		case 18:
			mcDice.sum18Disp.innerHTML = ++mcDice.sum18;
			mcDice.prob18Disp.innerHTML = 
			    (mcDice.sum18/mcDice.totalThrows).toFixed(5);
			break;
		case 23:
			mcDice.sum23Disp.innerHTML = ++mcDice.sum23;
			mcDice.prob23Disp.innerHTML = 
			    (mcDice.sum23/mcDice.totalThrows).toFixed(5);
			break;		
		case 30:
			mcDice.sum30Disp.innerHTML = ++mcDice.sum30;
			mcDice.prob30Disp.innerHTML = 
			    (mcDice.sum30/mcDice.totalThrows).toFixed(5);
			break;	
	}
	
	
}
/*************************************************************/
//Dice dot
function Dot(xCenter,yCenter,dotRadius){

	this.xCenter = xCenter;
	this.yCenter = yCenter;
	this.dotRadius = dotRadius;

	//IE does not support Path2D (091515)
	this.drawDot = function(ctx,fillColor,strokeColor){
		ctx.beginPath();
		ctx.arc(xCenter,yCenter,dotRadius,0,2*Math.PI);	
		if(strokeColor !== null){
			ctx.strokeStyle = strokeColor;
			ctx.stroke();
		}
		if(fillColor !== null){
			ctx.fillStyle = fillColor;
			ctx.fill();
		}
		
	}
}
/*************************************************************/
//Dice face
function Dice(left, top){
	this.value;
	this.radius = 20;
	this.side = 110;
	this.left = left;
	this.top = top;
	
	this.dotRadius = 10;
	var topLeftDot = new Dot(
	    this.left + this.radius + Math.round(this.dotRadius/2), 
		this.top + this.radius + Math.round(this.dotRadius/2), 
		this.dotRadius);
	var topRightDot = new Dot(
	    this.left + this.side - (this.radius + Math.round(this.dotRadius/2)), 
		this.top + this.radius + Math.round(this.dotRadius/2),
		this.dotRadius);
	var middleLeftDot = new Dot(
	    this.left + this.radius + Math.round(this.dotRadius/2),
		this.top + Math.round(this.side/2),
		this.dotRadius);
	var centerDot = new Dot(
	    this.left + Math.round(this.side/2),
		this.top + Math.round(this.side/2), 
		this.dotRadius);
	var middleRightDot = new Dot(
	    this.left + this.side - (this.radius+Math.round(this.dotRadius/2)),
		this.top + Math.round(this.side/2),
		this.dotRadius);		
	var bottomLeftDot = new Dot(
	    this.left + this.radius + Math.round(this.dotRadius/2), 
		this.top + this.side - (this.radius+Math.round(this.dotRadius/2)),
		this.dotRadius);
	var bottomRightDot = new Dot(
	    this.left + this.side - (this.radius+Math.round(this.dotRadius/2)), 
		this.top + this.side - (this.radius+Math.round(this.dotRadius/2)),
		this.dotRadius);		

	//IE does not support Path2D (09/15/15)
	this.drawDie = function(ctx, faceColor, strokeColor) {	

		ctx.beginPath();
		ctx.moveTo(left, top + this.radius);
		
		ctx.lineTo(left, top + this.side - this.radius);
		ctx.quadraticCurveTo(left, top + this.side, left + this.radius,
		                     top + this.side);
		
		ctx.lineTo(left + this.side - this.radius, top + this.side);
		ctx.quadraticCurveTo(left + this.side, top + this.side,
							 left + this.side, top + this.side - this.radius);
		
		ctx.lineTo(left + this.side, top + this.radius);	
		ctx.quadraticCurveTo(left + this.side, top, 
							 left + this.side - this.radius, top);
		
		ctx.lineTo(left + this.radius, top);	
		ctx.quadraticCurveTo(left, top, left, top + this.radius);	
		
		if (strokeColor !== null) {
			ctx.strokeStyle = strokeColor;
			ctx.stroke();	
		}
		if (faceColor !== null){
			ctx.fillStyle = faceColor;
			ctx.fill();
		}
				
	}
	
	this.setDieValue = function(number){
		this.value = number;
	}
	
	this.drawDieFace = function(ctx, dotColor) {

		switch(this.value){
			case 1:
				centerDot.drawDot(ctx,dotColor,null);
				break;
			case 2:
				topLeftDot.drawDot(ctx,dotColor,null);
				bottomRightDot.drawDot(ctx,dotColor,null);
				break;
			case 3:
				topLeftDot.drawDot(ctx,dotColor,null);
				centerDot.drawDot(ctx,dotColor,null);
				bottomRightDot.drawDot(ctx,dotColor,null);
				break;
			case 4:
				topLeftDot.drawDot(ctx,dotColor,null);
				topRightDot.drawDot(ctx,dotColor,null);
				bottomLeftDot.drawDot(ctx,dotColor,null);
				bottomRightDot.drawDot(ctx,dotColor,null);
				break;
			case 5:
				topLeftDot.drawDot(ctx,dotColor,null);
				topRightDot.drawDot(ctx,dotColor,null);
				centerDot.drawDot(ctx,dotColor,null);
				bottomLeftDot.drawDot(ctx,dotColor,null);
				bottomRightDot.drawDot(ctx,dotColor,null);
				break;
			case 6:
				topLeftDot.drawDot(ctx,dotColor,null);
				topRightDot.drawDot(ctx,dotColor,null);
				middleLeftDot.drawDot(ctx,dotColor,null);
				middleRightDot.drawDot(ctx,dotColor,null);
				bottomLeftDot.drawDot(ctx,dotColor,null);
				bottomRightDot.drawDot(ctx,dotColor,null);
				break;
				
		}
	}
	

}//Dice



