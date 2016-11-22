/*Calculate the value of pi via
 *the Monte Carlo method.
 */

var canvas, ctx;
var totalPoints, hits;
var simRunning = false;
var radius = 300;

/*************************************************************/
function toggleAnim(){
	toggleBtn = document.getElementById("startStopBtn");
	if(simRunning){		
		clearInterval(intervalId);
		simRunning = false;
		toggleBtn.value = "Start";
	}
	else{
		intervalId = setInterval(placePoints,5);
		simRunning = true;
		toggleBtn.value = "Stop";
	}
}

/*************************************************************/
function clearAnim(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	
	
	(document.getElementById("hits")).value = 0;
	(document.getElementById("total-points")).value = 0;
	(document.getElementById("mc-pi")).value = 0;
	
	init();

	if(simRunning){		
		clearInterval(intervalId);
		simRunning = false;
		document.getElementById("startStopBtn").value = "Start";
	}	
	
}

/*************************************************************/
function init() {
	canvas = document.getElementById("mcpi-canvas");
	
	if (canvas.getContext) {
		ctx = canvas.getContext("2d");
		
		ctx.beginPath();
		ctx.arc(0,0,radius,0,(3/2)*Math.PI);
		ctx.strokeStyle = "Tomato";
		ctx.stroke();
	}
	
	totalPoints = 0;
	hits = 0;
	
}
/*************************************************************/
function placePoints(){
	
	var x = Math.floor(1 + Math.random()*(radius-1));
	var y = Math.floor(1 + Math.random()*(radius-1));
		
	totalPoints++;
	
	if (Math.pow(x,2) + Math.pow(y,2) <= Math.pow(radius,2)) {
		hits++;
		ctx.strokeStyle = "#77c1c7";
	}
	else
		ctx.strokeStyle = "#ff9900";
	
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(x+1,y+1);
	ctx.stroke();
	
	(document.getElementById("hits")).value = hits;
	(document.getElementById("total-points")).value = totalPoints;
	(document.getElementById("mc-pi")).value = (4*(hits/totalPoints)).toFixed(7);
}
