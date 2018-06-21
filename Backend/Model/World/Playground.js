function Playground(resource, layoutContainer, layoutContext){

	this.handOption = new HandOption();
	this.aStarSearch = new AStarSearch();
	this.unitMenu = new UnitMenu(resource);
	this.xManager = new AccelerationEffectManager(0,-500,1);
	this.yManager = new AccelerationEffectManager(0,-500,1);
	this.zoomManager = new AccelerationEffectManager(1,0.5,0.4);
    this.layoutContainer = layoutContainer;
    this.playgroundBuilder = new PlaygroundMaker2(resource, layoutContainer);
	this.axialCeils = null;
	this.ceils = null;
	this.playgroundBuilder.GetAxialHexagoneMap(this, 4);

	this.teams = [];
	var redTeam = new Team("unitBottom.png", "unitTop.png","truck1.png", resource, this.ceils[0]);
	var blueTeam = new Team("unitBottom2.png", "unitTop2.png", "truck2.png",resource, this.ceils[2]);

	this.teams.push(redTeam);
	this.teams.push(blueTeam);
	this.selectedUnit = null;
	var unit = new Unit(resource, layoutContainer, redTeam, layoutContext);
	unit.currentCeil = this.ceils[2];
	unit.SetPosition(unit.currentCeil.x,unit.currentCeil.y);

	var unit2 = new Unit(resource, layoutContainer, blueTeam, layoutContext);
	unit2.currentCeil = this.ceils[5];
	unit2.SetPosition(unit2.currentCeil.x,unit2.currentCeil.y);
    unit.target = unit2;

	var unit3 = new Truck(resource, layoutContainer, blueTeam, layoutContext);
	unit3.currentCeil = this.ceils[8];
	unit3.SetPosition(unit3.currentCeil.x,unit3.currentCeil.y);
    //this.missile = new Missile(resource,layoutContainer,unit2);
	//this.explosion = new Explosion(layoutContainer, resource, 100,100);

	this.diamond = new Diamond(layoutContainer,resource,layoutContext,this.ceils[13]);
	this.isDown = false;
}

const Size = 50;


Playground.prototype.MouseWheel = function(event){

	if(0 < event.wheelDelta)
	{
		this.ZoomIn();
	}
	else
	{
		this.ZoomOut();
	}
};

Playground.prototype.ZoomIn = function(){
	this.zoomManager.Increase();
	//this.xManager.Decrease();
    //this.yManager.Decrease();
};

Playground.prototype.ZoomOut = function(){
	this.zoomManager.Decrease();
    //this.xManager.Increase();
    //this.yManager.Increase();
};

Playground.prototype.MouseMove = function(event){
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

Playground.prototype.MouseUp = function(event){
	this.isDown = false;
	this.handOption.xMouse = -1;
	this.handOption.yMouse = -1;
}

Playground.prototype.MouseDown = function(event){
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

Playground.prototype.MoveUnit = function(event)
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
            if(this.ceils[i].sprite.containsPoint(event.data.global))
            {
                this.goalCeil = this.ceils[i];
                console.log("goal ceil " + i);
                this.goalCeil.selectedSprite.alpha = 1;
                var path = this.aStarSearch.FindPath(new AStarNode(this.selectedUnit.currentCeil), new AStarNode(this.goalCeil));
                this.selectedUnit.goalCeils = path;
                this.selectedUnit.SetSelection(false);
                this.selectedUnit = null;
                return true;
            }
		}
	}
	return false;
};


Playground.prototype.MoveX = function(increase){
	if(increase == 1)
	{
		this.xManager.Increase();
	}
	else
	{
		this.xManager.Decrease();
	}
};

Playground.prototype.MoveY = function(increase){
	if(increase == 1)
	{
		this.yManager.Increase();
	}
	else
	{
		this.yManager.Decrease();
	}
};

Playground.prototype.Update = function()
{
    //this.missile.Update();
    this.diamond.Update();
    this.zoomManager.Update();
	this.xManager.Update();
	this.yManager.Update();
    //this.explosion.Update();
	this.SetVisual();
};

Playground.prototype.SetVisual = function()
{
	this.diamond.SetRelativePosition(this.xManager.val, this.yManager.val, this.zoomManager.val);
    //this.explosion.SetRelativePosition(this.xManager.val, this.yManager.val, this.zoomManager.val);
    //this.missile.SetRelativePosition(this.xManager.val, this.yManager.val, this.zoomManager.val);
	for (var i = 0; i < this.ceils.length; i++)
	{
        this.ceils[i].Update();
        this.ceils[i].SetRelativePosition(this.xManager.val, this.yManager.val, this.zoomManager.val);
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