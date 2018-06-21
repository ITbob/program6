function Boundingbox(){
	this.pos = new Point();
	this.width = 0;
	this.height = 0;
}

Boundingbox.prototype.setPos = function(value){
	this.pos = value
}

Boundingbox.prototype.getMiddle = function(){
	return new Point(this.width /2 + this.pos.x, this.height / 2 + this.pos.y)
}