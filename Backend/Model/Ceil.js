
/*
function Ceil(resource){
	this.id = "ceil.png";
	this.selectedId = "selectedCeil.png";
	this.pathId = "pathCeil.png";
	this.blockedId = "blockedCeil.png";
	this.sprite = new Sprite(resource[this.id]);
	this.sprite.interactive = true;
	
	this.selectedSprite = new Sprite(resource[this.selectedId]);
	this.selectedSprite.interactive = true;
	this.selectedSprite.alpha = 0;

	this.pathSprite = new Sprite(resource[this.pathId]);
	this.pathSprite.interactive = true;
	this.pathSprite.alpha = 0;

	this.blockedSprite = new Sprite(resource[this.blockedId]);
	this.blockedSprite.interactive = true;
	this.blockedSprite.alpha = 0;

	this.row = 0;
	this.column = 0;

	this.isBlocked = false;

	this.x = 0;
	this.y = 0;
	this.size = 50;

	this.leftTop = null;
	this.top = null;
	this.rightTop = null;
	this.rightBottom = null;
	this.bottom = null;
	this.leftBottom = null;
    this.decoratonSprite = null;
    this.DiamondField = null;
    //this.DefineDecoration(resource);
};

Ceil.prototype.DefineDiamondField = function (playground, resource,layoutContext) {
	this.DiamondField = new DiamondField(playground,resource,layoutContext,this);
};

Ceil.prototype.DefineDecoration = function (resource) {
	var random = Math.random();
	if(random < 0.3 && !this.isBlocked){
		var decorationRandom = Math.random();

		if(decorationRandom <= 0.3)
		{
			this.decoratonSprite = new Sprite(resource["stone.png"]);
		}
		else if(decorationRandom <= 0.8)
		{
            this.decoratonSprite = new Sprite(resource["flower.png"]);
		}
		else
		{
            this.decoratonSprite = new Sprite(resource["water.png"]);
		}
        //var rotationRandom = Math.random();
        //this.decoratonSprite.x = this.x;
        //this.decoratonSprite.y = this.y;
        //this.decoratonSprite.width = 50;
        //this.decoratonSprite.height = 50;
        //this.decoratonSprite.pivot.set(this.GetCenter(),this.GetMiddle());
        //this.decoratonSprite.rotation = rotationRandom * 360;
        //this.decorationX = this.decoratonSprite.x;
        //this.decorationY = this.decoratonSprite.y;
    }
};

Ceil.prototype.SetBlocked = function(){
	this.blockedSprite.alpha = 1;
	this.isBlocked = true;
};

Ceil.prototype.GetNeighbourhood = function()
{
	var neighbourhood = [];
	if(this.top != null)
	{
		if(!this.top.isBlocked)
		{
			neighbourhood.push(this.top);
		}
	} 

	if(this.bottom != null)
	{
		if(!this.bottom.isBlocked)
		{
			neighbourhood.push(this.bottom);
		}
	}

	if(this.leftBottom != null)
	{
		if(!this.leftBottom.isBlocked)
		{
			neighbourhood.push(this.leftBottom);
		}
	}

	if(this.rightBottom != null)
	{
		if(!this.rightBottom.isBlocked)
		{
			neighbourhood.push(this.rightBottom);
		}
	}

	if(this.rightTop != null)
	{
		if(!this.rightTop.isBlocked)
		{
			neighbourhood.push(this.rightTop);
		}
	}

	if(this.leftTop != null)
	{
		if(!this.leftTop.isBlocked)
		{
			neighbourhood.push(this.leftTop);
		}
	}

	return neighbourhood;
};

//Ceil.prototype = new Item();

Ceil.prototype.GetCenter = function(){
	return (this.x + this.size/2);
};

Ceil.prototype.GetMiddle = function(){
	return (this.y + this.size/2);
};

Ceil.prototype.SetPosition = function(x,y){
	this.x = x;
	this.y = y;
	
	this.sprite.x = x;
	this.sprite.y = y;
	
	this.selectedSprite.x = x;
	this.selectedSprite.y = y;

	this.pathSprite.x = x;
	this.pathSprite.y = y;

	this.blockedSprite.x = x;
	this.blockedSprite.y = y;

	if(this.decoratonSprite != null)
	{
        this.decoratonSprite.x = x;
        this.decoratonSprite.y = y;
	}

    if(this.DiamondField != null)
    {
        this.DiamondField.x = x;
        this.DiamondField.y = y;
    }
};

Ceil.prototype.Update = function () {
	if(this.DiamondField != null){
		this.DiamondField.Update();
	}
}

Ceil.prototype.SetRelativePosition = function(x,y,zoom){
	this.sprite.x = zoom * (this.x + x);
	this.sprite.y = zoom * (this.y + y);
	this.sprite.width = zoom * this.size;
	this.sprite.height = zoom * this.size;

	this.selectedSprite.x = zoom * (this.x + x);
	this.selectedSprite.y = zoom * (this.y + y);
	this.selectedSprite.width = zoom * this.size;
	this.selectedSprite.height = zoom * this.size;

	this.pathSprite.x = zoom * (this.x + x);
	this.pathSprite.y = zoom * (this.y + y);
	this.pathSprite.width = zoom * this.size;
	this.pathSprite.height = zoom * this.size;

	this.blockedSprite.x = zoom * (this.x + x);
	this.blockedSprite.y = zoom * (this.y + y);
	this.blockedSprite.width = zoom * this.size;
	this.blockedSprite.height = zoom * this.size;

    if(this.decoratonSprite != null)
    {
        this.decoratonSprite.x = zoom * (this.x + x );
        this.decoratonSprite.y = zoom * (this.y + y );
        this.decoratonSprite.width = zoom * this.size;
        this.decoratonSprite.height = zoom * this.size;
    }

    if(this.DiamondField != null)
    {
        this.DiamondField.SetRelativePosition(x,y,zoom);
	}
};


	*/