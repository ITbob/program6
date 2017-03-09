function MyMap(resource){
	this.ceils = [];
	this.aStarSearch = new AStarSearch();

	this.x = 0;
	this.y = 0;

	this.t = 0;
	this.zoom = 1;
	this.acceleration = 0.4;

	this.BuildMap(resource);
};

MyMap.prototype.MouseDown = function(event){
	if(this.originCeil != null && this.goalCeil != null){
		this.originCeil.selectedSprite.alpha = 0;
		this.goalCeil.selectedSprite.alpha = 0;
		this.originCeil = null;
		this.goalCeil = null;
	}

	for(var i = 0; i < this.ceils.length; i++)
	{
		for(var l = 0; l < this.ceils[i].length; l++)
		{
			if(this.ceils[i][l].sprite.containsPoint(event.data.global))
			{
				if(this.originCeil == null)
				{
					this.originCeil = this.ceils[i][l];
					this.originCeil.selectedSprite.alpha = 1;
				}
				else
				{
					this.goalCeil = this.ceils[i][l];
					this.goalCeil.selectedSprite.alpha = 1;
					this.aStarSearch.FindPath(new AStarNode(this.originCeil), new AStarNode(this.goalCeil));
				}
				break;
			}
		}
	}
};

MyMap.prototype.BuildMap = function(resource){
	for(var l = 0; l < 10; l++){
		this.ceils[l] = [];
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

			this.ceils[l].push(ceil);
		}
	}

	for(var l = 0; l < this.ceils.length; l++){
		for(var i = 0; i < this.ceils[l].length; i++){
			if(l % 2 == 0)
			{
				if(0 <= l-2)
				{
					this.ceils[l][i].top = this.ceils[l-2][i];
				}
				
				if(0 <= l-1)
				{
					this.ceils[l][i].rightTop = this.ceils[l-1][i];
				}
				
				if(l+1 < this.ceils.length)
				{
					this.ceils[l][i].rightBottom = this.ceils[l+1][i];
				}

				if(l+2 < this.ceils.length)
				{
					this.ceils[l][i].bottom = this.ceils[l+2][i];
				}

				if(l+1 < this.ceils.length && 0 <= i-1)
				{
					this.ceils[l][i].leftBottom = this.ceils[l+1][i-1];
				}
				
				if(0 <= l-1 && 0 <= i-1)
				{
					this.ceils[l][i].leftTop = this.ceils[l-1][i-1];
				}
			}
			else
			{
				if(0 <= l-2)
				{
					this.ceils[l][i].top = this.ceils[l-2][i];
				}
				
				if(0 <= l-1 && i+1 < this.ceils[l].length)
				{
					this.ceils[l][i].rightTop = this.ceils[l-1][i+1];
				}
				
				if(l+1 < this.ceils.length && i+1 < this.ceils[l].length)
				{
					this.ceils[l][i].rightBottom = this.ceils[l+1][i+1];
				}

				if(l+2 < this.ceils.length)
				{
					this.ceils[l][i].bottom = this.ceils[l+2][i];
				}

				if(l+1 < this.ceils.length)
				{
					this.ceils[l][i].leftBottom = this.ceils[l+1][i];
				}
				
				if(0 <= l-1)
				{
					this.ceils[l][i].leftTop = this.ceils[l-1][i];
				}
			}


		}
	}
};


MyMap.prototype.MoveX = function(x){
	this.x += x;
};

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
};

MyMap.prototype.SetZoom = function(){
	for (var i = 0; i < map.ceils.length; i++) {
		for(var l = 0; l < map.ceils[i].length; l++){
			this.ceils[i][l].SetRelativePosition(this.x, this.y, this.zoom);
		}
	}
};

MyMap.prototype.ZoomIn = function(){
	if(this.acceleration < 0)
	{
		this.t = 0;
	}
	this.t += 0.4;
	this.acceleration = 0.4;
};

MyMap.prototype.ZoomOut = function(){
	if(0 < this.acceleration)
	{
		this.t = 0;
	}
	this.t += 0.4;
	this.acceleration = -0.4;
};
