var	bgImg = document.createElement("img");
var leftImg = document.createElement("img");
var rightImg = document.createElement("img");
var ballImg = document.createElement("img");
var blPortImg = document.createElement("img");
var orPortImg = document.createElement("img");
var blPortTransImg = document.createElement("img");
var orPortTransImg = document.createElement("img");
var menuImg = document.createElement("img");
var blankMenuImg = document.createElement("img");

var picsToLoad = 0; // set automatically based on the image list in the loading function

function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	if (picsToLoad == 0) {
		imageLoadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = fileName; 
}

function backgroundDraw()	{	
	context.drawImage(bgImg, 0, 0);	
}


function loadImages() {
	var imageList = [
		{varName: bgImg, theFile: "assets/images/bg.png"},
		{varName: leftImg, theFile: "assets/images/pelletLeft.png"},
		{varName: rightImg, theFile: "assets/images/pelletRight.png"},
		{varName: ballImg, theFile: "assets/images/ball1.png"},
		{varName: blPortImg, theFile: "assets/images/bluePortal.png"},
		{varName: orPortImg, theFile: "assets/images/orangePortal.png"},
		{varName: blPortTransImg, theFile: "assets/images/bluePortalTrans.png"},
		{varName: orPortTransImg, theFile: "assets/images/orangePortalTrans.png"},
		{varName: menuImg, theFile: "assets/images/start.png"},
		{varName: blankMenuImg, theFile: "assets/images/screen.png"},
	];
	
	picsToLoad = imageList.length;
	
	for (var i = 0; i < imageList.length; i++) {
		beginLoadingImage(imageList[i].varName, imageList[i].theFile);
	}
}