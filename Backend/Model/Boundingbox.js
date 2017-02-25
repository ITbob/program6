function Boundingbox(type){
	this.type = type;
	this.pos = new Point();
	this.width = 0;
	this.height = 0;
}

Boundingbox.prototype.GetMiddle = function(){
	return new Point(this.width /2 + this.pos.x, this.height / 2 + this.pos.y)
}