function MyMap(resource,playground, layoutContext){
	this.ceils = [];
	this.handOption = new HandOption();
	this.aStarSearch = new AStarSearch();
	this.unitMenu = new UnitMenu(resource);
	this.xManager = new AccelerationEffectManager(0,-500,1);
	this.yManager = new AccelerationEffectManager(0,-500,1);
	this.zoomManager = new AccelerationEffectManager(1,0.5,0.4);
    this.playground = playground;
	this.BuildMap(resource);

	this.teams = [];
	var redTeam = new Team("unitBottom.png", "unitTop.png","truck1.png", resource, this.ceils[0][5]);
	var blueTeam = new Team("unitBottom2.png", "unitTop2.png", "truck2.png",resource, this.ceils[14][5]);

	this.teams.push(redTeam);
	this.teams.push(blueTeam);
	this.selectedUnit = null;
	var unit = new Unit(resource, playground, redTeam, layoutContext);
	unit.currentCeil = this.ceils[0][0];
	unit.SetPosition(this.ceils[0][0].x,this.ceils[0][0].y);

	var unit2 = new Unit(resource, playground, blueTeam, layoutContext);
	unit2.currentCeil = this.ceils[6][5];
	unit2.SetPosition(this.ceils[6][5].x,this.ceils[6][5].y);
    unit.target = unit2;

	var unit3 = new Truck(resource, playground, blueTeam, layoutContext);
	unit3.currentCeil = this.ceils[7][5];
	unit3.SetPosition(this.ceils[7][5].x,this.ceils[7][5].y);
    //this.missile = new Missile(resource,playground,unit2);
	//this.explosion = new Explosion(playground, resource, 100,100);

	this.diamond = new Diamond(playground,resource,layoutContext,this.ceils[2][2]);
	this.isDown = false;
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
	//this.xManager.Decrease();
    //this.yManager.Decrease();
};

MyMap.prototype.ZoomOut = function(){
	this.zoomManager.Decrease();
    //this.xManager.Increase();
    //this.yManager.Increase();
};

MyMap.prototype.MouseMove = function(event){
	if(this.isDown == true)
	{
		if(this.handOption.IsInit())
		{
			this.handOption.xMouse = event.data.global.x;
			this.handOption.yMouse = event.data.global.y;
		}
		else
		{
			this.xManager.val += event.data.global.x - this.handOption.xMouse;
			this.yManager.val += event.data.global.y - this.handOption.yMouse;

			this.handOption.xMouse = event.data.global.x;
			this.handOption.yMouse = event.data.global.y;
		}
	}
}

MyMap.prototype.MouseUp = function(event){
	this.isDown = false;
	this.handOption.xMouse = -1;
	this.handOption.yMouse = -1;
}

MyMap.prototype.MouseDown = function(event){
	if(!this.MoveUnit(event))
	{
        for (var i = 0; i < this.unitMenu.items.length; i++) {
            if(this.unitMenu.items[i].sprite.containsPoint(event.data.global))
            {
                this.unitMenu.items[i].Set();
                return;
            }
        }

        this.isDown = true;
	}
};

MyMap.prototype.MoveUnit = function(event)
{
	for(var i = 0; i < this.teams.length; i++)
	{
		for(var l = 0; l < this.teams[i].units.length; l++)
		{
			if(this.teams[i].units[l].sprites[0].containsPoint(event.data.global))
			{
				if(this.teams[i].units[l].isSelected == false)
				{
					if(this.selectedUnit != null)
					{
						this.teams[i].units[l].SetSelection(false);
					}
					this.teams[i].units[l].SetSelection(true);
					//console.log("allo: " + this.teams[i].units[l].selectedSprite.alpa);
					this.selectedUnit = this.teams[i].units[l];
				}
				else
				{
					this.teams[i].units[l].SetSelection(false);
					this.selectedUnit = null;
				}
                return true;
			}
		}
	}

	if(this.selectedUnit != null)
	{
		for(var i = 0; i < this.ceils.length; i++)
		{
			for(var l = 0; l < this.ceils[i].length; l++)
			{
				if(this.ceils[i][l].sprite.containsPoint(event.data.global))
				{
					this.goalCeil = this.ceils[i][l];
					this.goalCeil.selectedSprite.alpha = 1;
					var path = this.aStarSearch.FindPath(new AStarNode(this.selectedUnit.currentCeil), new AStarNode(this.goalCeil));
					this.selectedUnit.goalCeils = path;
					this.selectedUnit.SetSelection(false);
					this.selectedUnit = null;
                    return true;
				}
			}
		}
	}
	return false;
};


MyMap.prototype.SetCeilNeighbourhood = function(){
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
}

MyMap.prototype.BuildMap = function(resource){

	//set position
	for(var l = 0; l < 15; l++){
		this.ceils[l] = [];
		for(var i = 0; i < 10; i++){
			var ceil = new Ceil(resource);
            this.playground.addChild(ceil.selectedSprite);
            this.playground.addChild(ceil.pathSprite);
            this.playground.addChild(ceil.sprite);
            this.playground.addChild(ceil.blockedSprite);

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

	this.SetCeilNeighbourhood();

	this.ceils[10][4].SetBlocked();
	this.ceils[11][3].SetBlocked();
	
	this.ceils[2][4].SetBlocked();
	this.ceils[3][3].SetBlocked();
	
	this.ceils[4][3].SetBlocked();
	this.ceils[6][3].SetBlocked();
	this.ceils[8][3].SetBlocked();
	this.ceils[10][3].SetBlocked();
	this.ceils[12][3].SetBlocked();

    for(var l = 0; l < this.ceils.length; l++)
    {
        for(var i = 0; i < this.ceils[l].length; i++)
        {
        	this.ceils[l][i].DefineDecoration(resource);
            if(this.ceils[l][i].decoratonSprite != null)
            {
                this.playground.addChild(this.ceils[l][i].decoratonSprite);
            }
        }
    }
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
    //this.missile.Update();
    this.diamond.Update();
    this.zoomManager.Update();
	this.xManager.Update();
	this.yManager.Update();
    //this.explosion.Update();
	this.SetVisual();
};

MyMap.prototype.SetVisual = function()
{
	this.diamond.SetRelativePosition(this.xManager.val, this.yManager.val, this.zoomManager.val);
    //this.explosion.SetRelativePosition(this.xManager.val, this.yManager.val, this.zoomManager.val);
    //this.missile.SetRelativePosition(this.xManager.val, this.yManager.val, this.zoomManager.val);
	for (var i = 0; i < map.ceils.length; i++)
	{
		for(var l = 0; l < map.ceils[i].length; l++)
		{
            this.ceils[i][l].Update();
			this.ceils[i][l].SetRelativePosition(this.xManager.val, this.yManager.val, this.zoomManager.val);
		}
	}
	for (var i = 0; i < this.teams.length; i++)
	{
		this.teams[i].base.SetRelativePosition();
		for (var l = 0; l < this.teams[i].units.length; l++)
		{
			this.teams[i].units[l].SetRelativePosition(this.xManager.val, this.yManager.val, this.zoomManager.val);
		}
	}
};