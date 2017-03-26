function MyMap(resource){
	this.ceils = [];
	this.aStarSearch = new AStarSearch();
	this.unit = new Unit(resource, 0);

	this.xManager = new AccelerationEffectManager(0,-500,1);
	this.yManager = new AccelerationEffectManager(0,-500,1);
	this.zoomManager = new AccelerationEffectManager(1,0.5,0.4);

	this.BuildMap(resource);
};

MyMap.prototype.MouseWheel = function(event){
	if(0 < event.wheelDelta)
	{
		this.ZoomIn();
	}
	else
	{
		this.ZoomOut();
	}
};

MyMap.prototype.ZoomIn = function(){
	this.zoomManager.Increase();
}

MyMap.prototype.ZoomOut = function(){
	this.zoomManager.Decrease();
}

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
					//this.originCeil.selectedSprite.alpha = 1;
					this.unit.SetPosition(this.originCeil.x,this.originCeil.y);
					console.log("allo");
				}
				else
				{
					this.goalCeil = this.ceils[i][l];
					this.goalCeil.selectedSprite.alpha = 1;
					var path = this.aStarSearch.FindPath(new AStarNode(this.originCeil), new AStarNode(this.goalCeil));
					this.unit.goalCeils = path;
				}
				break;
			}
		}
	}
};

MyMap.prototype.BuildMap = function(resource){
	for(var l = 0; l < 15; l++){
		this.ceils[l] = [];
		for(var i = 0; i < 10; i++){
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
			ceil.row = l;
			ceil.column = i;

			this.ceils[l].push(ceil);
		}
	}

	for(var l = 0; l < this.ceils.length; l++){
		for(var i = 0; i < this.ceils[l].length; i++){
			if(l % 2 == 0)
			{
				if(0 <= (l-2))
				{
					this.ceils[l][i].top = this.ceils[l-2][i]; //top
				}
				
				if(0 <= (l-1))
				{
					this.ceils[l][i].rightTop = this.ceils[l-1][i]; //right top
				}
				
				if((l+1) < this.ceils.length)
				{
					this.ceils[l][i].rightBottom = this.ceils[l+1][i]; // right bottom
				}

				if((l+2) < this.ceils.length)
				{
					this.ceils[l][i].bottom = this.ceils[l+2][i]; //bottom
				}

				if((l+1) < this.ceils.length && 0 <= (i-1))
				{
					this.ceils[l][i].leftBottom = this.ceils[l+1][i-1]; // left bottom
				}
				
				if(0 <= (l-1) && 0 <= (i-1))
				{
					this.ceils[l][i].leftTop = this.ceils[l-1][i-1]; // left top
				}
			}
			else
			{
				if(0 <= (l-2))
				{
					this.ceils[l][i].top = this.ceils[l-2][i]; // top
				}
				
				if(0 <= (l-1) && (i+1) < this.ceils[l].length)
				{
					this.ceils[l][i].rightTop = this.ceils[l-1][i+1]; // right top
				}
				
				if((l+1) < this.ceils.length && (i+1) < this.ceils[l].length)
				{
					this.ceils[l][i].rightBottom = this.ceils[l+1][i+1]; // right bottom
				}

				if((l+2) < this.ceils.length)
				{
					this.ceils[l][i].bottom = this.ceils[l+2][i]; // bottom
				}

				if((l+1) < this.ceils.length)
				{
					this.ceils[l][i].leftBottom = this.ceils[l+1][i]; // left bottom
				}
				
				if(0 <= (l-1))
				{
					this.ceils[l][i].leftTop = this.ceils[l-1][i]; // left top
				}
			}
		}
	}

	this.ceils[10][4].SetBlocked();
	this.ceils[11][3].SetBlocked();
	
	this.ceils[2][4].SetBlocked();
	this.ceils[3][3].SetBlocked();
	
	this.ceils[4][3].SetBlocked();
	this.ceils[6][3].SetBlocked();
	this.ceils[8][3].SetBlocked();
	this.ceils[10][3].SetBlocked();
	this.ceils[12][3].SetBlocked();
	//this.ceils[14][3].SetBlocked();
};


MyMap.prototype.MoveX = function(increase){
	if(increase == 1)
	{
		this.xManager.Increase();
	}
	else
	{
		this.xManager.Decrease();
	}
};

MyMap.prototype.MoveY = function(increase){
	if(increase == 1)
	{
		this.yManager.Increase();
	}
	else
	{
		this.yManager.Decrease();
	}
};

MyMap.prototype.Update = function()
{
	this.zoomManager.Update();
	this.xManager.Update();
	this.yManager.Update();
	this.SetZoom();
};

MyMap.prototype.SetZoom = function(){
	for (var i = 0; i < map.ceils.length; i++) {
		for(var l = 0; l < map.ceils[i].length; l++){
			this.ceils[i][l].SetRelativePosition(this.xManager.val, this.yManager.val, this.zoomManager.val);
		}
	}
	this.unit.SetRelativePosition(this.xManager.val, this.yManager.val, this.zoomManager.val);
};

