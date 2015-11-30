// ***********************************************
// Portal Tennis, by Simoroshka (Anna Kruglaia)
// October 2015
// ***********************************************

var canvas;
var canvasContext;

var twoPlayers = true;

var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 10;

var showingWinScreen = false;
var showingMenu = true;




window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	context = canvas.getContext('2d');
	
	displayLoadingScreen();
	
	loadImages();	
}

function displayLoadingScreen() {
	//blank the screen
	colorRect(0,0,canvas.width, canvas.height, 'black');
	
	//display message
	context.fillStyle = '#ddd';
	context.font = 'bold 40px Roboto Condensed';
	context.fillText("LOADING...", canvas.width / 2 - 90, canvas.height / 2 - 10);
}
function imageLoadingDoneSoStartGame() {
	var fps = 30;
	
	setInterval(updateAll, 1000/fps);
	
	menuMusic.loopSong("assets/sounds/menu");
	setupInput();	
	
}
// start actual game after menu is clicked
function startGame() {
	showingMenu = false;
	player1Score = 0;
	player2Score = 0;
	ballSpeedX = ballSpeedX * Math.random() * 10 + 10;
	ballSpeedY = (Math.random() - 0.5) * 10 + 10;
	
	menuMusic.startOrStopMusic();
	backgroundMusic.loopSong("assets/sounds/bg");
}

function updateAll() {
	moveEverything();
	drawEverything();
}

function setupInput() {
	canvas.addEventListener('mousemove', handleMouseMove);
	canvas.addEventListener('mousedown', handleMouseClick);
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);
}

function endGame() {
	ballSpeedX = ballSpeedY = 0;
	showingWinScreen = true;
	winMessage = ((player1Score > player2Score) ? "LEFT PLAYER" : "RIGHT PLAYER") + " WON!";
	backgroundMusic.startOrStopMusic();
	menuMusic.loopSong("assets/sounds/menu");
}

function moveEverything() {
	if (!twoPlayers) computerMovement();
	playersMovement();
	ballMove();	
	movePortals();
}


function drawEverything() {	
	backgroundDraw();
	
	ballDraw();
	portalsDraw();
	paddlesDraw();
	
	if (showingMenu) {
		showMenu();
	}
	else {
		showScore();
	}
	
	
	if (showingWinScreen) {
		showWinScreen();	
	}
}
function showWinScreen() {
	context.drawImage(blankMenuImg, 110, 75);
	context.fillStyle = '#ddd';
	context.font = 'bold 65px Roboto Condensed';
	var positionAdj = (player1Score > player2Score) ? 250 : 265;
	context.fillText(winMessage, canvas.width / 2 - positionAdj, canvas.height / 2 - 60);
	
	context.font = 'bold 30px Roboto Condensed';
	context.fillText("HINT: you can fire the portals!", canvas.width / 2 - 240, canvas.height / 2 + 70);
	context.fillText("LEFT PLAYER: D", canvas.width / 2 - 240, canvas.height / 2 + 100);
	context.fillText("RIGHT PLAYER: Left Arrow", canvas.width / 2 - 240, canvas.height / 2 + 130);
}
function showMenu() {	
	context.drawImage(blankMenuImg, 110, 75);
	context.fillStyle = '#ddd';
	context.font = 'bold 80px Roboto Condensed';
	context.fillText("PORTAL TENNIS", canvas.width / 2 - 260, canvas.height / 2 - 50);
	context.font = 'bold 45px Roboto Condensed';
	context.fillText("1 PLAYER", canvas.width / 2 - 250, canvas.height / 2 + 100);
	context.fillText("2 PLAYERS", canvas.width / 2 + 50, canvas.height / 2 + 100);
		
}

function showScore() {
	context.fillStyle = '#ddd';
	context.font = 'bold 40px Roboto Condensed';
	
	if (player1Score < 10)context.fillText(player1Score, 160, 50);
	else context.fillText(player1Score, 150, 50);
	
		
	if (player2Score < 10) context.fillText(player2Score, canvas.width - 177,50);
	else context.fillText(player2Score, canvas.width - 187,50);
}
function mute() {
	if (!muted) {
		backgroundMusic.pause();
		menuMusic.pause();
		muted = true;
	}
	else {
		if (showingMenu || showingWinScreen) menuMusic.play();
		else backgroundMusic.play();
		muted = false;
	}
	
}