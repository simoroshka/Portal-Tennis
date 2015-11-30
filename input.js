var pressedKeys = {};

function handleMouseClick(event) {
	
	if (showingMenu) {
		var pos = calcMousePos(event);
		
		// click on 1 player "button"
		if (pos.x > 200 && pos.x < 390 && pos.y > 350 && pos.y < 415) {
			twoPlayers = false;
			startGame();
			
			
		}
		// 2 players
		else if (pos.x > 500 && pos.x < 700 && pos.y > 350 && pos.y < 415) {
			twoPlayers = true;
			startGame();
			
		}
		
	}
	if (showingWinScreen) {
		showingWinScreen = false;
		showingMenu = true;
	}
}


function calcMousePos(event) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = event.clientX - rect.left - root.scrollLeft;
	var mouseY = event.clientY - rect.top - root.scrollTop;
	return {
		x: mouseX,
		y: mouseY
	};
}

function handleMouseMove(evt) {
	
	//mouse movements for single player - not used any more
	/*if (!twoPlayers) {
		var mousePos = calcMousePos(evt);
		paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
	}*/
	
}

function keyPressed(e) {
	
	if (e.keyCode == 27) {
		mute();
		return;
	}
	if ( pressedKeys[e.keyCode] ) return;
    pressedKeys[e.keyCode] = e.timeStamp;	

}

function keyReleased (e) {
	if ( !pressedKeys[e.keyCode] ) return;
	var duration = ( e.timeStamp - pressedKeys[e.which] ) / 1000;
	pressedKeys[e.keyCode] = 0;
	
}