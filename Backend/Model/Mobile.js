function Mobile(resource, playground, team, layoutContext){
	this.layoutContext = layoutContext;
	//selection
	this.selectedSprite = new Sprite(resource["selectedCeil.png"]);
	this.selectedSprite.alpha = 0;
	this.isSelected = false;

	this.dustIndex = 0;
	this.wheelIndex = 0;
	this.wheelTiming = 1;

	//target
	this.target = null;

	//dust
	this.resource = resource;
	this.playground = playground;
	this.dusts = [];
	
	//team
	this.team = team;
	this.team.units.push(this);
	
	//general
	this.sprites = [];
	this.base = [];

	//wheels
	this.wheels = [];
	this.currentWheel = 0;

	//position
	this.x = 0
	this.y = 0;
	this.size = 50;

	//path finder
	this.goalCeils = [];
	this.currentCeil = null;
	this.nextCeil = null;
	this.baseRadius = 0;
	this.topRadius = 0;
	this.goalRadius = 0;
};

Mobile.prototype.SetSelection = function(val){
	this.isSelected = val;
	
	if(this.isSelected)
	{
		this.selectedSprite.alpha = 1;
	}
	else
	{
		this.selectedSprite.alpha = 0;
	}
};


Mobile.prototype.SetRelativePosition = function(x,y,zoom){
	for(var i = 0; i < this.sprites.length; i++)
	{
		this.sprites[i].x = zoom * (this.x + x + this.size/2);
		this.sprites[i].y = zoom * (this.y + y + this.size/2);
		this.sprites[i].width = zoom * this.size;
		this.sprites[i].height = zoom * this.size;
	}
	for (var i = 0; i < this.dusts.length; i++) {
		if(this.dusts[i] != null && this.dusts[i].isDone == 0)
		{
			this.dusts[i].SetRelativePosition(x,y,zoom);
		}
	}
};

Mobile.prototype.SetPosition = function(x,y){
	this.x = x;
	this.y = y;
	for(var i = 0; i < this.sprites.length; i++)
	{
		this.sprites[i].x = this.x;
		this.sprites[i].y = this.y;
		this.sprites[i].width = this.size;
		this.sprites[i].height = this.size;
	}
};

Mobile.prototype.GetCenter = function(){
	return (this.x + this.size/2);
};

Mobile.prototype.GetMiddle = function(){
	return (this.y + this.size/2);
};

Mobile.prototype.Moving = function()
{
	var previous = this.currentWheel; 

	this.wheelIndex += 1;

	if(this.wheelIndex % this.wheelTiming == 0)
	{
		this.currentWheel += 1;
		if(this.wheels.length <= this.currentWheel)
		{
			this.currentWheel = 0;
		}

		this.wheels[this.currentWheel].alpha = 1;
		this.wheels[previous].alpha = 0;
	}
	
	this.dustIndex += 1;

	if(this.dustIndex % 12 == 0)
	{
		this.CreateDust(this.GetCenter() + 15*Math.cos(this.baseRadius), this.GetMiddle()+ 15*Math.sin(this.baseRadius));
		this.CreateDust(this.GetCenter() - 15*Math.cos(this.baseRadius), this.GetMiddle()- 15*Math.sin(this.baseRadius));
	}
};

Mobile.prototype.CreateDust = function(x, y){
	var dust = new Dust(this.playground, this.resource, x, y);

	for (var i = 0; i < dust.sprites.length; i++) 
	{
		//console.log("dust " + i);
		this.playground.addChildAt(dust.sprites[i],this.playground.getChildIndex(this.sprites[0]));
	}
	this.dusts.push(dust);
};

Mobile.prototype.DustUpdate = function()
{
	for (var i = 0; i < this.dusts.length; i++) 
	{
		this.dusts[i].Update();
	}

	if(0 < this.dusts.length)
	{
		var indexes = [];
		for (var i = 0; i < this.dusts.length; i++) 
		{
			if(this.dusts[i].isDone == 1)
			{
				this.dusts[i].Clear();
				indexes.push(i);
			}
		}
		for (var i =indexes.length-1; -1 < i; i--)
		{
			this.dusts.splice(indexes[i],1);
		}
	}	
};

Mobile.prototype.Update = function()
{
	this.DustUpdate();
	this.BaseUpdate();
};

Mobile.prototype.GetRadius = function(ceil){
	var aPoint = new PIXI.Point(this.x + 25, this.y + 25);
	var bPoint = new PIXI.Point(this.x + 25, this.y + 26);
	var cPoint = new PIXI.Point(ceil.GetCenter(), ceil.GetMiddle());
	var radius = Math.atan2(cPoint.y - bPoint.y, cPoint.x - bPoint.x) - Math.atan2(aPoint.y - bPoint.y, aPoint.x - bPoint.x);
	return radius;
};

Mobile.prototype.BaseRotating = function(){
	for(var i = 0; i < this.base.length; i++)
	{
		this.base[i].rotation = this.baseRadius;
	}
};

Mobile.prototype.BaseUpdate = function(){
	if(this.goalCeils.length != 0 || this.nextCeil != null)
	{
		if(this.nextCeil == null)
		{
			this.nextCeil = this.goalCeils[0];
			this.goalCeils.splice(0,1);
			
			if(this.currentCeil == null)
			{
				this.goalRadius = this.baseRadius;
			}
			else
			{
				this.goalRadius = this.GetRadius(this.nextCeil);
				if((((2*Math.PI) - this.goalRadius) + this.baseRadius) < Math.abs(this.goalRadius - this.baseRadius))
				{
					this.goalRadius = this.goalRadius -(2*Math.PI); 
				}
			}
		}
		else
		{
			if(this.baseRadius != this.goalRadius)
			{

				if(this.baseRadius < this.goalRadius)
				{
					this.baseRadius +=0.03;
				}
				else
				{
					this.baseRadius -=0.03;
				}

				if(Math.abs(this.baseRadius - this.goalRadius) < 0.03)
				{
					this.baseRadius = this.goalRadius;
				}

				this.BaseRotating();
			}
			else
			{

				if(this.nextCeil.GetCenter() < this.GetCenter())
				{
					this.x -= 1;
				}
				else if(this.GetCenter() < this.nextCeil.GetCenter())
				{
					this.x += 1;
				}

				if(Math.abs(this.GetCenter() - this.nextCeil.GetCenter()) < 1){
					this.x = this.nextCeil.x;
				}

				if(this.nextCeil.GetMiddle() < this.GetMiddle())
				{
					this.y -= 0.65;
				}
				else if(this.GetMiddle() < this.nextCeil.GetMiddle())
				{
					this.y += 0.65;
				}

				if(Math.abs(this.GetMiddle() - this.nextCeil.GetMiddle()) < 1){
					this.y = this.nextCeil.y;
				}

				if(this.GetMiddle() == this.nextCeil.GetMiddle() 
					&& this.GetCenter() == this.nextCeil.GetCenter())
				{
					this.currentCeil = this.nextCeil;
					this.nextCeil = null;
				}
			}
			this.Moving();
		}
	}
};