//Code for SinglePlayer Game goes here
//var xVel, sizeX, sizeY, xPos, yPos, paused, inGameMenu;


function Game(){
	this.paused = false;
	this.inGameMenu = null;

	//Player
	this. player = new Player(360, 450, 80, 20, 3)
}

Game.prototype.tick = function(elapsed){
	fps.update(elapsed);	//Shows a fps meter
	this.logic(elapsed);
	this.render();
}

Game.prototype.logic = function(elapsed){
	// --- Input
	InputManager.padUpdate();

	//Game Logic
	if (InputManager.padPressed & InputManager.PAD.CANCEL){
        this.paused = true;
		this.startInGameMenu();
    }

    if (!this.paused){
    	this.player.logic(elapsed);
    }


}

Game.prototype.render = function(){
	//Rendering
    // Clear the screen
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Render objects
    this.player.render();
}

Game.prototype.startInGameMenu = function()
{
	InputManager.reset();
	var bindThis = this;
	this.InGameMenu = new Menu("In-game Menu",
			[ "Continue", "Quit" ],
			"",
			70, 50, 400,
			function(numItem) {
				if (numItem == 0) { GameLoopManager.run(function(elapsed) { bindThis.tick(elapsed); }); bindThis.paused = false; bindThis.inGameMenu = null;  }
				else if (numItem == 1) startMainMenu();
			},
			function(elapsed) { bindThis.render(elapsed); });
	GameLoopManager.run(function(elapsed) { bindThis.InGameMenu.tick(elapsed); });
}