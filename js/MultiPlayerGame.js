//Code for Multiplayer Game goes here

function MultiPlayerGame(){
	this.net = new Client();
}

MultiPlayerGame.prototype.joinMultiplayerGame = function(){
	net = new Client();
}

MultiPlayerGame.prototype.tick = function(elapsed){
	game.net.send(player.x, player.y);
}

MultiPlayerGame.prototype.updateBallPosition = function(){

}