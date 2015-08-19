//Code for SinglePlayer Game goes here

var fps, canvas, ctx;
var xVel = 0; 
var sizeX = 80; 
var sizeY = 20;
var xPos = (800/2) - (sizeX/2);
var yPos = 480 - (sizeY + 10);

function Game(){
	canvas = document.getElementById("screen");
    ctx = canvas.getContext("2d");
    fps = new FPSMeter("fpsmeter", document.getElementById("fpscontainer"));
    GameLoopManager.run(GameTick);
}

function GameTick(elapsed){
	fps.update(elapsed);	//Shows a fps meter

	//Game Logic
	xPos += xVel * elapsed;
	if ( (xPos <= 0 && xVel < 0) || (xPos >= canvas.width-sizeX && xVel > 0) )
        xVel = 0;

    //Rendering
    // Clear the screen
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Render objects
    ctx.fillStyle = "white"
    ctx.fillRect(xPos, yPos, sizeX, sizeY);
}