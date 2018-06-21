function Truck(resource, playground,team){
	Mobile.call(this,resource, playground,team);
	
	//this.wheelTiming = 6;

	var unitBottom = new Sprite(resource[this.team.truckSkin]);

	this.i = 0;

    var wheels1 = new Sprite(resource["track1.png"]);
    var wheels2 = new Sprite(resource["track2.png"]);
    var wheels3 = new Sprite(resource["track3.png"]);
    var wheels4 = new Sprite(resource["track4.png"]);
    var wheels5 = new Sprite(resource["track5.png"]);
    var wheels6 = new Sprite(resource["track6.png"]);
    var wheels7 = new Sprite(resource["track7.png"]);

    var diamonds1 = new Sprite(resource["gatheredDiamond1.png"]);
    var diamonds2 = new Sprite(resource["gatheredDiamond2.png"]);
    var diamonds3 = new Sprite(resource["gatheredDiamond3.png"]);
    var diamonds4 = new Sprite(resource["gatheredDiamond4.png"]);
    var diamonds5 = new Sprite(resource["gatheredDiamond5.png"]);
    var diamonds6 = new Sprite(resource["gatheredDiamond6.png"]);
    var diamonds7 = new Sprite(resource["gatheredDiamond7.png"]);

    this.diamonds = [];
    this.diamonds.push(diamonds1);
    this.diamonds.push(diamonds2);
    this.diamonds.push(diamonds3);
    this.diamonds.push(diamonds4);
    this.diamonds.push(diamonds5);
    this.diamonds.push(diamonds6);
    this.diamonds.push(diamonds7);
	this.diamondId = -1;

    this.wheels.push(wheels1);
    this.wheels.push(wheels2);
    this.wheels.push(wheels3);
    this.wheels.push(wheels4);
    this.wheels.push(wheels5);
    this.wheels.push(wheels6);
    this.wheels.push(wheels7);

    this.sprites.push(this.selectedSprite);
    this.sprites.push(wheels1);
    this.sprites.push(wheels2);
    this.sprites.push(wheels3);
    this.sprites.push(wheels4);
    this.sprites.push(wheels5);
    this.sprites.push(wheels6);
    this.sprites.push(wheels7);

	this.sprites.push(unitBottom);

    this.sprites.push(diamonds1);
    this.sprites.push(diamonds2);
    this.sprites.push(diamonds3);
    this.sprites.push(diamonds4);
    this.sprites.push(diamonds5);
    this.sprites.push(diamonds6);
    this.sprites.push(diamonds7);

    for (var i = 0; i < this.diamonds.length; i++){
    	this.diamonds[i].alpha = 0;
	}

    this.base.push(wheels1);
    this.base.push(wheels2);
    this.base.push(wheels3);
    this.base.push(wheels4);
    this.base.push(wheels5);
    this.base.push(wheels6);
    this.base.push(wheels7);
	this.base.push(unitBottom);

    this.base.push(diamonds1);
    this.base.push(diamonds2);
    this.base.push(diamonds3);
    this.base.push(diamonds4);
    this.base.push(diamonds5);
    this.base.push(diamonds6);
    this.base.push(diamonds7);

	for (var i = 0; i < this.sprites.length; i++) 
	{
		this.sprites[i].pivot.set(this.sprites[i].x + this.sprites[i].width/2,this.sprites[i].y + this.sprites[i].height/2);
	}

    for (var i = 0; i <  this.sprites.length; i++)
    {
        playground.addChild(this.sprites[i]);
    }
};

Truck.prototype = Object.create(Mobile.prototype);

Truck.prototype.constructor = Truck;

Truck.prototype.IsLoaded = function () {
	if(this.diamondId == 6)
	{
		return true;
	}
	else
	{
		return false;
	}
};

Truck.prototype.Update = function (){
    if(this.currentCeil.DiamondField != null)
    {
        this.i += 1;
		if(this.i % 20 == 0)
		{
            if(!this.IsLoaded())
			{
				if(-1 < this.diamondId)
				{
                    this.diamonds[this.diamondId].alpha = 0;
                }
                this.diamondId += 1;
                this.diamonds[this.diamondId].alpha = 1;
            }
		}
    }
    this.DustUpdate();
    this.BaseUpdate();
}