var portal1X = 250;
var portal1Y = 350;
var portal2X = 560;
var portal2Y = 100;
const PORTAL_HEIGHT = 180;
const PORTAL_WIDTH = 33;
var portal1Active = true;
var portal2Active = true;

function movePortals() {
	var time = new Date().getTime();
	//fire blue portal
	if (pressedKeys[68]) {
		
		portal1Active = false;
		
		portal1Y = paddle1Y;
		portal1X = Math.min((time - pressedKeys[68])/2, canvas.width / 2 - 5 + PORTAL_WIDTH);
		portal1X = Math.max(portal1X - PORTAL_WIDTH, 50);		
	}
	//activate portal
	else if (portal1Active == false) {
		portal1Active = true;
		portalSet.play();
	}
	
	//fire orange portal
	if (pressedKeys[37]) {
		
		portal2Active = false;		
		portal2Y = paddle2Y;
		
		portal2X = Math.max(canvas.width - (time - pressedKeys[37])/2, canvas.width / 2 + 5);
		portal2X = Math.min(portal2X, canvas.width - 50);
		
	}
	//activate portal
	else if (portal2Active == false) {
		portal2Active = true;
		portalSet.play();
	}
	
}


function portalsDraw() {
	if (portal1Active) context.drawImage(blPortImg, portal1X - PORTAL_WIDTH, portal1Y - 7);		
	else context.drawImage(blPortTransImg, portal1X - PORTAL_WIDTH, portal1Y - 7);
	
	if (portal2Active) context.drawImage(orPortImg, portal2X, portal2Y - 7);
	else context.drawImage(orPortTransImg, portal2X, portal2Y - 7);
}

// try to teleport the ball (bounce if can't)
function teleport(portal1) {
	
		//check the ball's direction 
		if (ballSpeedX > 0) { //goes right
			//check which portal is activated
			if (portal1) {
				ballX = portal2X + PORTAL_WIDTH + ballRadius;
				ballY = ballY - portal1Y + portal2Y;
				portalThrough.play();
			}
			else {				
				ballSpeedX *= -1;
				ballSound1.play();
			}
		}
		else { //ball goes left
			//check which portal is activated
			if (portal1) {				
				ballSpeedX *= -1;
			}
			else {
				ballX = portal1X - ballRadius;
				ballY = ballY - portal2Y + portal1Y;
				portalThrough.play();
				ballSound1.play();
			}
		}		
	
}