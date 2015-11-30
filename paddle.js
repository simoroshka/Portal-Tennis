var paddle1Y = 223;
var paddle2Y = 223;
const PADDLE_HEIGHT = 152;
const PADDLE_WIDTH = 30;
const PADDLE_DIST = 0;
var paddleSpeed = 150;
var maxSpeed = 40;
var collisionPointY = 250;
var computerError = 0;
var firingPortal = false;
var firingDuration = 0;

function paddlesDraw() {
	context.drawImage(leftImg, PADDLE_DIST, paddle1Y);	
	context.drawImage(rightImg, canvas.width - PADDLE_WIDTH - PADDLE_DIST, paddle2Y);	
	
}

function computerMovement() {
	
	var padCenter = paddle2Y + PADDLE_HEIGHT / 2;

	//if the ball is moving towards and is half close
	if (ballSpeedX > 0 && ballX > canvas.width  / 2.15)	{
		
		//predicted collision point
		var dest = calcCollisionPoint();
		dest = dest || canvas.height / 2; //if it is not calculated, go to the center
		var distance = Math.abs(padCenter - dest);
		
		calcComputerError(dest, distance);
		//add the error to the destination
		dest += computerError;
		
		//stay inside
		dest = Math.max(dest, 0);
		dest = Math.min(dest, canvas.height); 
		 
		
		//go faster if needed and slower if not really
		if (padCenter < dest - 35) {
			paddle2Y += Math.round(Math.abs(distance * 1000 / canvas.width / ballSpeedX));
		}
		else if (padCenter > dest + 35){
			paddle2Y -= Math.round(Math.abs(distance * 1000 / canvas.width / ballSpeedX));
		}
		
		//stay inside
		paddle2Y = Math.max(paddle2Y, 0);
		paddle2Y = Math.min(paddle2Y, canvas.height - PADDLE_HEIGHT);
	}
	else {
		//erase the error until the next time
		computerError = 0;
		//fire orange portal, maybe
		randomFirePortal();
		
	}
	
}
function randomFirePortal() {
	if (Math.random() > 0.995 && !firingPortal) {
		firingPortal = true;
		pressedKeys[37] = new Date().getTime();
		setTimeout((function() {
			pressedKeys[37] = 0;
			firingPortal = false;
		}), Math.random()*1000);
	}
	
}

function calcComputerError(dest, distance) {
	//do it if current error is not yet calculated
	if (!computerError) {
		//the higher is ball's speed, the bigger will be possible mistakes	
		//but if it goes straight, it is easier				
		var ballSpeedCoef = Math.abs(ballSpeedY) * Math.max(ballSpeedX, Math.abs(ballSpeedY)) ;
		//bigger distance to cover also amounts to bigger mistakes
		var errorCoef = Math.round(ballSpeedCoef / 10 + distance / 100);
		computerError = Math.round(Math.random()*6*errorCoef - 3*errorCoef);
	}
}

function calcCollisionPoint() {
	
	var dx = canvas.width - PADDLE_DIST - PADDLE_WIDTH - ballX;
	var dy = ballSpeedY * dx / ballSpeedX;
	var calcY = ballY + dy;
	var colY;
	
	//no collisions 
	if (calcY > 0 && calcY < canvas.height) colY = calcY;
	
	//if more than one collision - ignore, too difficult
	else if (Math.abs((calcY) / canvas.height) >= 2) return;	
	
	else {
		//get the overflow value
		var overY = calcY % canvas.height;
		//downside collision
		if (overY > 0)
			colY = canvas.height - overY;
		//upside collision
		else colY = -overY;
	
	}
	
	return Math.round(colY);
}

function playersMovement() {
	//aquire the current timestamp
	var time = new Date().getTime();
	//move the first paddle
	if (pressedKeys[87]) { //W
	
		paddle1Y -= Math.min(maxSpeed, paddleSpeed * (time - pressedKeys[87]) / 1000);
		paddle1Y = Math.max(paddle1Y, 0) ;
	}
	if (pressedKeys[83]) { //S
		paddle1Y += Math.min(maxSpeed, paddleSpeed * (time - pressedKeys[83]) / 1000);
		paddle1Y = Math.min(paddle1Y, canvas.height - PADDLE_HEIGHT);
	}
	
	//move the second paddle
	if (twoPlayers) {
		if (pressedKeys[38]) { //UP
			
			paddle2Y -= Math.min(maxSpeed, paddleSpeed * (time - pressedKeys[38]) / 1000);
			paddle2Y = Math.max(paddle2Y, 0) ;
		}
		if (pressedKeys[40]) { //DOWN
			paddle2Y += Math.min(maxSpeed, paddleSpeed * (time - pressedKeys[40]) / 1000);
			paddle2Y = Math.min(paddle2Y, canvas.height - PADDLE_HEIGHT);
		}
		
	}
	
}