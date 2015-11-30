var	backgroundMusic	= new BackgroundMusicClass();
var	menuMusic = new BackgroundMusicClass();
var	ballSound1 = new SoundOverlapsClass("assets/sounds/bounce");
var	ballSound2 = new SoundOverlapsClass("assets/sounds/bounce2");
var portalThrough = new SoundOverlapsClass("assets/sounds/portalThrough");
var portalSet = new SoundOverlapsClass("assets/sounds/portal");

var muted = false;

var audioFormat;


function setFormat() {
	audioFormat = ".mp3";
	/* I don't have ogg anyway (but it would be useful, just in case)
  var audio = new Audio();
  if (audio.canPlayType("audio/mp3")) {
      audioFormat = ".mp3";
  } else {
      audioFormat = ".ogg";
  }*/
}

function SoundOverlapsClass(filenameWithPath)	{
				
	setFormat(); 
	
	var	altSoundTurn = false;
	var	mainSound = new Audio(filenameWithPath + audioFormat);
	var	altSound = new Audio(filenameWithPath + audioFormat);
	
	
	this.play = function() {
		if(this.altSoundTurn) {
			altSound.currentTime = 0;
			altSound.play();
		} else {
			mainSound.currentTime = 0;
			mainSound.play();
		}
				
		altSoundTurn = !altSoundTurn;	//	toggle	between	true and false
	}
}

function BackgroundMusicClass() {
	var	musicSound = null;
				
	this.loopSong = function(filenameWithPath) {
		setFormat(); 
			
		if (musicSound != null) {
			musicSound.pause();
			musicSound = null;
		}
		musicSound = new Audio(filenameWithPath + audioFormat);
		musicSound.loop	= true;
		musicSound.play();
	}
		
	this.startOrStopMusic = function()	{
		
		if(musicSound.paused) {
			musicSound.play();
		} else {
			musicSound.pause();
		}	
		
	}
	this.play = function () {
		if (musicSound) musicSound.play();
	}
	this.pause = function() {
		if (musicSound) musicSound.pause();
	}
}