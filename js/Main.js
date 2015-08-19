// Global vars
fps = null; 
canvas = null;
ctx = null;

// ----------------------------------------

var game;
var menu;
var multiPlayerGame;

function main()
{
	//change version number if you suspect a problem with caching
	console.log("version 1");
	canvas = document.getElementById("screen");
	ctx = canvas.getContext("2d");
	fps = new FPSMeter("fpsmeter", document.getElementById("fpscontainer"));
	InputManager.connect(document, canvas);

	startMainMenu();
}

function startGame(){
	GameLoopManager.stop();
	menu = null;
	game = new Game();
	InputManager.reset();
	GameLoopManager.run(function(elapsed) { game.tick(elapsed); });
}

function startMainMenu(){
	GameLoopManager.stop();
	game = null;
    InputManager.reset();
	menu = new Menu("MULTIPLAYER BREAKOUT",	[ "Singleplayer", "Multiplayer", "Help", "Credits" ], "", 70, 50, 400, function(numItem) {
	 																													if (numItem == 0) startGame(); 
	 																													else if (numItem == 1) startMultiPlayerGame();}, null);
	GameLoopManager.run(function(elapsed) { menu.tick(elapsed); });
}

function startMultiPlayerGame(){

}