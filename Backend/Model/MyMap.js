function MyMap(resource){
	this.ceils = [];
	this.BuildMap(resource);
	this.zoom = 1;
	this.acceleration = 0.4;
	this.t = 0;
}

//Ceil.prototype = new Item();

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

MyMap.prototype.BuildMap = function(resource){
	for(var l = 0; l < 3; l++){
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
	console.log(this.zoom);
	for(var i = 0; i < this.ceils.length; i++){
		//console.log(i);
		this.ceils[i].SetZoom(this.zoom);
	}
}