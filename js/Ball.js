Ball = function(radius, x, y, xVelocity, yVelocity){
	this.radius = radius;
	this.x = x;
	this.y = y;
	this.velX = xVelocity;
	this.velY = yVelocity;
	this.outOfBounds = false;
}

Ball.prototype.logic = function(elapsed){
	this.x += this.velX*elapsed;
	this.y += this.velY*elapsed;

	if ((((this.x + this.radius) >= 800) &&(this.velX>0)) || ( ((this.x - this.radius) <= 0) &&(this.velX<0) ) ){
		this.bounce(true);
	}

	if (((this.y - this.radius) <= 0)){
		this.bounce(false);
	}
	else if ((this.y + this.radius) >= 500){
		this.outOfBounds = true;
	}
}

Ball.prototype.render = function(){
	ctx.fillStyle = "white"
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0*Math.PI,2*Math.PI);
	ctx.closePath();
	ctx.fill();
}

Ball.prototype.bounce = function(axis){
	if(axis){//true is x, false is y, this way we're only passing a bool (1 bit)
		this.velX = this.velX *-1;
	}
	else{
		this.velY = this.velY *-1;
	}
	bounceEffect.play();
	//console.log("calling bounce");
}

Ball.prototype.setPosition = function(xPos, yPos){
	this.x = xPos;
	this.y = yPos;
}

Ball.prototype.setVelocity = function(xVel, yVel){
	this.velX = xVel;
	this.velY = yVel; 
}