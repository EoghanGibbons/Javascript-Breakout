Player = function(x, y, width, height, lives)
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height; 
	this.lives = lives
}

Player.prototype.logic = function(elapsed)
{
	if (this.lives > 0)
	{
		this.x = InputManager.lastMouseX-(this.width/2);
	}
}

Player.prototype.render = function()
{
	ctx.fillStyle = "white";
	ctx.fillRect(this.x, this.y, this.width, this.height);
}