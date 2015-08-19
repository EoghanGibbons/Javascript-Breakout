Brick = function(xPos, yPos, health){
	this.x = xPos;
	this.y = yPos;
	this.hp = health;
	this.width = 80;
	this.height = 20;
}

Brick.prototype.render = function(){
	ctx.fillRect(this.x, this.y, this.width, this.height);
}