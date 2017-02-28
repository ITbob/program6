function Ceil(resource){
	this.id = "ceil.png";
	this.sprite = new Sprite(resource[this.id]);
	this.sprite.width = 50;
	this.sprite.height = 50;
	this.sprite.x = 0;
	this.sprite.y = 0;
	this.size = 50;
	this.zoom = 1;
	this.acceleration = 0.4;
	this.t = 0;
}

Ceil.prototype = new Item();

Ceil.prototype.SetPosition = function(x,y){
	this.x = x;
	this.y = y;
	this.sprite.x = x;
	this.sprite.y = y;
}

Ceil.prototype.ZoomIn = function(){
	if(this.acceleration < 0)
	{
		this.t = 0;
	}
	this.t += 0.4;
	this.acceleration = 0.4;
}

Ceil.prototype.ZoomOut = function(){
	if(0 < this.acceleration)
	{
		this.t = 0;
	}
	this.t += 0.4;
	this.acceleration = -0.4;
}

Ceil.prototype.SetZoom = function(){
	if(this.zoom < 0.1)
	{
		this.t = 0;
		this.zoom = 0.1;
	}
	this.sprite.x = this.zoom * this.x;
	this.sprite.y = this.zoom * this.y;
	this.sprite.width = this.zoom * this.size;
	this.sprite.height = this.zoom * this.size;
}

Item.prototype.Update = function()
{
	if(this.t != 0)
	{
		this.t -= 0.01;
	}

	if(Math.abs(this.t) < 0.01)
	{
		this.t = 0;
	}

	this.zoom += this.acceleration * this.t * this.t;

	this.SetZoom();
}


