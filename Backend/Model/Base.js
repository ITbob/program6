function Base(resource, ceil){
	this.sprite = new Sprite(resource["base.png"]);
	this.ceil = ceil;
};

Base.prototype.SetRelativePosition = function(){
	this.sprite.x = this.ceil.sprite.x;
	this.sprite.y = this.ceil.sprite.y;
	this.sprite.width = this.ceil.sprite.width;
	this.sprite.height = this.ceil.sprite.height;
};
