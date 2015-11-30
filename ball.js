var ballX = 500;
var ballY = 500;
var ballSpeedX = 0;
var ballSpeedY = 0;
var ballRadius = 10;

function checkPortals() {
	
	//hit the blue portal
	if (Math.abs(ballX - portal1X) < ballRadius+1 && 
		ballY > portal1Y && 
		ballY < portal1Y + PORTAL_HEIGHT) {
			//if both portals are placed on the field - teleport the ball
			if (portal1Active && portal2Active) teleport(1);
			//if the second portal is inactive, bounce
			else if (portal1Active) ballSpeedX *= -1;
		}
			
	
	//hit the orange portal
	else if (Math.abs(ballX - portal2X) < ballRadius+1 &&
		ballY > portal2Y && 
		ballY < portal2Y + PORTAL_HEIGHT) {
			//if both portals are placed on the field - teleport the ball
			if (portal1Active && portal2Active) teleport(0);
			//if the first portal is inactive, bounce
			else if (portal2Active) ballSpeedX *= -1;			
		}
}

function ballInit() {
	ballX = canvas.width / 2 - ballRadius;
	ballY = canvas.height / 2 - ballRadius;
	
	ballSpeedX = 8;
	ballSpeedY = Math.floor(Math.random()*5);
	if (Math.random(0,1) < 0.5) ballSpeedX *= -1;
	if (Math.random(0,1) < 0.5) ballSpeedY *= -1;
	
}

//draw the ball
function ballDraw() {
	context.drawImage(ballImg, ballX-ballRadius, ballY-ballRadius);
	
}

function ballMove() {
	ballX += ballSpeedX;
	ballY += ballSpeedY;
	
	//ball hits the right paddle
	if (ballX >= canvas.width - ballRadius - PADDLE_WIDTH - PADDLE_DIST &&
		ballX < canvas.width - PADDLE_DIST &&
		ballY > paddle2Y && 
		ballY < paddle2Y + PADDLE_HEIGHT) {
	
		changeBallMovement(paddle2Y);
		
		ballSound1.play();
	}
	//misses the right paddle
	if (ballX > canvas.width - ballRadius) {
		player1Score++;
		ballReset();		
	}
	
	//ball hits the left paddle
	else if (ballX <= PADDLE_WIDTH + PADDLE_DIST + ballRadius &&
		ballX > PADDLE_DIST - 2 * ballRadius &&
		ballY > paddle1Y && 
		ballY < paddle1Y + PADDLE_HEIGHT) {
			
		changeBallMovement(paddle1Y);	
		
		ballSound1.play();
	}
	//misses the left paddle
	if (ballX < 0) {
		player2Score++;
		ballReset();		
	}
		
	//wall collision
	if (ballY > canvas.height - ballRadius || ballY < ballRadius) {
		ballSpeedY *= -1;
		ballSound2.play();
	}
	
	//portal encounter
	if (ballY > 50 && ballY < canvas.width - 50)
		checkPortals();
}

function ballReset() {
	if (player1Score >= WINNING_SCORE ||
		player2Score >= WINNING_SCORE) {
			endGame();
	}
	
	ballX = canvas.width / 2 - ballRadius;
	ballY = canvas.height / 2 - ballRadius;
	
		
	ballSpeedX *= -1;
	ballSpeedY = Math.floor(Math.random()*10) / 2;
	if (Math.random(0,1) < 0.5) ballSpeedY *= -1;
	
	
}

function changeBallMovement(paddleY) {
	ballSpeedX *= -1;
	var deltaY = ballY - (paddleY + PADDLE_HEIGHT / 2);
	ballSpeedY = deltaY * 0.30;
	
}

