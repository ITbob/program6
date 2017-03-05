function MyMap(resource){
	this.ceils = [];
	this.BuildMap(resource);
	
	this.x = 0;
	this.y = 0;

	this.t = 0;
	this.zoom = 1;
	this.acceleration = 0.4;
	this.originCeil = null;
	this.goalCeil = null;
}

MyMap.prototype.MouseDown = function(event){
	console.log("shenme" + event.data.global.x);
	if(this.originCeil != null && this.goalCeil != null){
		this.originCeil.selectedSprite.alpha = 0;
		this.goalCeil.selectedSprite.alpha = 0;
		this.originCeil = null;
		this.goalCeil = null;
	}

	for(var i = 0; i < this.ceils.length; i++){
		if(this.ceils[i].sprite.containsPoint(event.data.global)){
			if(this.originCeil == null)
			{
				this.originCeil = this.ceils[i];
				this.originCeil.selectedSprite.alpha = 1;
			}
			else
			{
				this.goalCeil = this.ceils[i];
				this.goalCeil.selectedSprite.alpha = 1;
			}
			break;
		}
	}
}


MyMap.prototype.BuildMap = function(resource){
	for(var l = 0; l < 10; l++){
		for(var i = 0; i < 3; i++){
			var ceil = new Ceil(resource);
			var x = 0;
			var y = 0;

			var margin = 37.5;

			if(l % 2 == 0){
				margin = 0;
			}

			if(i == 0)
			{
				x = 0 + margin;
			}
			else
			{
				x = i * 50 +  i * 25 + margin;
			}
			
			y = l * 25 - l;
			ceil.SetPosition(x,y);

			this.ceils.push(ceil);
		}
	}
}

MyMap.prototype.MoveX = function(x){
	this.x += x;
}

MyMap.prototype.Update = function()
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

	if(this.zoom < 0.5)
	{
		this.t = 0;
		this.zoom = 0.5;
	}

	this.SetZoom();
}

MyMap.prototype.SetZoom = function(){
	for(var i = 0; i < this.ceils.length; i++){
		this.ceils[i].SetRelativePosition(this.x, this.y, this.zoom);
	}
}

MyMap.prototype.ZoomIn = function(){
	if(this.acceleration < 0)
	{
		this.t = 0;
	}
	this.t += 0.4;
	this.acceleration = 0.4;
}

MyMap.prototype.ZoomOut = function(){
	if(0 < this.acceleration)
	{
		this.t = 0;
	}
	this.t += 0.4;
	this.acceleration = -0.4;
}
