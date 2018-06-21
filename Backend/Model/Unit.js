function Unit (resource, playground,team, layoutContext) {
	Mobile.call(this, resource, playground,team, layoutContext);

	this.canon = new UnitCanon(resource,this);
    this.restoringTimespan = 1000;

	var unitBottom = new Sprite(resource[this.team.bottomTankSkin]);
	this.top = new Sprite(resource[this.team.topTankSkin]);

	this.missiles = [];

	var wheels1 = new Sprite(resource["track1.png"]);
	var wheels2 = new Sprite(resource["track2.png"]);
	var wheels3 = new Sprite(resource["track3.png"]);
	var wheels4 = new Sprite(resource["track4.png"]);
	var wheels5 = new Sprite(resource["track5.png"]);
	var wheels6 = new Sprite(resource["track6.png"]);
	var wheels7 = new Sprite(resource["track7.png"]);

    this.sprites.push(this.top);
    this.sprites.push(this.selectedSprite);
	this.sprites.push(wheels1);
	this.sprites.push(wheels2);
	this.sprites.push(wheels3);
	this.sprites.push(wheels4);
	this.sprites.push(wheels5);
	this.sprites.push(wheels6);
	this.sprites.push(wheels7);
	this.sprites.push(unitBottom);

	for (var i = 0; i < this.sprites.length; i++) 
	{
		this.sprites[i].pivot.set(this.sprites[i].x + this.sprites[i].width/2,this.sprites[i].y + this.sprites[i].height/2);
	}

	this.wheels.push(wheels1);
	this.wheels.push(wheels2);
	this.wheels.push(wheels3);
	this.wheels.push(wheels4);
	this.wheels.push(wheels5);
	this.wheels.push(wheels6);
	this.wheels.push(wheels7);

	this.base.push(wheels1);
	this.base.push(wheels2);
	this.base.push(wheels3);
	this.base.push(wheels4);
	this.base.push(wheels5);
	this.base.push(wheels6);
	this.base.push(wheels7);
    this.base.push(unitBottom);


    for (var i = 1; i <  this.sprites.length; i++)
    {
        playground.addChild(this.sprites[i]);
    }

    playground.addChild(this.canon.sprite);

    for (var i = 0; i <  this.canon.firingSprites.length; i++)
    {
        playground.addChild(this.canon.firingSprites[i]);
        this.canon.firingSprites[i].parentGroup = this.layoutContext.topUnitGroup;
    }

    playground.addChild(this.sprites[0]);

    for (var i = 1; i <  this.base.length; i++)
    {
        this.base[i].parentGroup = this.layoutContext.bottomUnitGroup;
    }
    this.top.parentGroup = this.layoutContext.topUnitGroup;
    this.canon.sprite.parentGroup = this.layoutContext.topUnitGroup;

};


Unit.prototype = Object.create(Mobile.prototype);

Unit.prototype.constructor = Unit;

Unit.prototype.Fire = function ()
{
    if(200 <= this.restoringTimespan)
    {
        this.restoringTimespan = 0;
        this.canon.isDone = 0;
        this.fired = true;
    }
};

Unit.prototype.IsFiring = function () {
    if(this.canon.isDone != 1)
    {
        return true;
    }
    else
    {
        return false;
    }
};

Unit.prototype.TopRotating = function()
{
    this.top.rotation = this.topRadius;
    if(!this.IsFiring())
    {
        this.canon.SetRotation(this.topRadius);
    }
};

Unit.prototype.TopRotation = function(){
	if(this.currentCeil != null && this.target != null)
	{
		this.targetRadius = this.GetRadius(this.target);
		if((((2*Math.PI) - this.targetRadius) + this.baseRadius) < Math.abs(this.targetRadius - this.baseRadius))
		{
			this.targetRadius = this.targetRadius - (2*Math.PI); 
		}

		if(this.topRadius != this.targetRadius)
		{

			if(this.topRadius < this.targetRadius)
			{
				this.topRadius += 0.05;
			}
			else
			{
				this.topRadius -= 0.05;
			}

			if(Math.abs(this.topRadius - this.targetRadius) < 0.05)
			{
				this.topRadius = this.targetRadius;
			}


			this.TopRotating();
		}
	}
};

Unit.prototype.SetRelativePosition = function(x,y,zoom)
{
    if(this.canon != null)
    {
        this.canon.SetRelativePosition(x,y,zoom);
    }

    for(var i = 0; i < this.sprites.length; i++)
    {
        this.sprites[i].x = zoom * (this.x + x + this.subsize/2);
        this.sprites[i].y = zoom * (this.y + y + this.subsize/2);
        this.sprites[i].width = zoom * this.subsize;
        this.sprites[i].height = zoom * this.subsize;
    }

    for (var i = 0; i < this.dusts.length; i++)
    {
        if(this.dusts[i] != null
            && this.dusts[i].isDone == 0)
        {
            this.dusts[i].SetRelativePosition(x,y,zoom);
        }
    }

    if(0 < this.missiles.length)
    {
        for (var i = 0; i < this.missiles.length; i++)
        {
            this.missiles[i].SetRelativePosition(x,y,zoom);
        }
    }
};

Unit.prototype.Analyse = function(){
    var ceils = this.currentCeil.GetNeighbourhood();
}

Unit.prototype.Update = function()
{

    if(this.restoringTimespan < 200)
    {
        this.restoringTimespan +=1;
    }

	this.DustUpdate();
	this.TopRotation();
	this.BaseUpdate();
	this.Fire();

    if(this.canon != null)
    {
        this.canon.Update();

        if(this.fired)
        {
        	this.fired = false;
        	if(this.target != undefined)
        	{
        		var missile = new Missile(this.resource, this.layoutContainer,this.layoutContext, this.x+this.subsize/2,this.y+this.subsize/2, this.target);
        		//this.canon.
                this.missiles.push(missile);
			}
		}

        if(0 < this.missiles.length)
        {
            var indexes = [];
        	for (var i = 0; i < this.missiles.length; i++)
        	{
				this.missiles[i].Update();
				if(this.missiles[i].isDone)
				{
                    this.missiles[i].Clear();
                    indexes.push(i);
                }
			}
            for (var i =indexes.length-1; -1 < i; i--)
            {
                this.dusts.splice(indexes[i],1);
            }
		}
    }
};