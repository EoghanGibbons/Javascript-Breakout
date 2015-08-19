//Code for SinglePlayer Game goes here
function Game(){
	this.paused = false;
	this.inGameMenu = null;
	this.bricks;

	//Player
	this.player = new Player(360, 450, 80, 20, 3);
	this.ball = new Ball(10, 400, 400, 200, 0);
	this.initBricks();
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
	if (this.player.lives == 0){
		this.gameOver = true;
	}

	else{
		if (InputManager.padPressed & InputManager.PAD.CANCEL){
        	this.paused = true;
			this.startInGameMenu();
    	}

    	if (!this.paused){
    		if (this.ball.outOfBounds){
    			this.player.lives += -1;
    			this.ball.setPosition(400,400);
    			this.ball.setVelocity(50,-100);
    			this.ball.outOfBounds = false;
    		}

    		this.player.logic(elapsed);
    		this.ball.logic(elapsed);
    	}
    }
}

Game.prototype.render = function(){
	//Rendering
    // Clear the screen
    //ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Render objects
    this.player.render();
    this.ball.render();
    this.drawHUD();
    //console.log(this.ball.x, this.ball.y);
}

Game.prototype.drawHUD = function(){
	ctx.textAlign = "left";
	ctx.fillStyle = "white";
	ctx.font = "20px sans-serif";
	ctx.fillText(" Lives: " + this.player.lives, 3, 460);
	if (this.gameOver)
	{
		ctx.textAlign = "center";
		ctx.fillStyle = "red";
		ctx.font = "60px sans-serif";
		ctx.fillText("Game Over", canvas.width/2, canvas.height/2);
	}
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

Game.prototype.initBricks = function(){

}