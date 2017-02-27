function Point(){
	this.x = 0;
	this.y = 0;
}

Point.prototype.setX = function(value){
	this.x = value
}

Point.prototype.setY = function(value){
	this.y = value
}

Point.prototype.getInfo = function(){
	return "x: " + this.x + " y: " + this.y;
}

