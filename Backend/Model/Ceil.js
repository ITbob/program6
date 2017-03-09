function Ceil(resource){
	this.id = "ceil.png";
	this.selectedId = "selectedCeil.png";
	this.pathId = "pathCeil.png";
	
	this.sprite = new Sprite(resource[this.id]);
	this.sprite.interactive = true;
	
	this.selectedSprite = new Sprite(resource[this.selectedId]);
	this.selectedSprite.interactive = true;
	this.selectedSprite.alpha = 0;

	this.pathSprite = new Sprite(resource[this.pathId]);
	this.pathSprite.interactive = true;
	this.pathSprite.alpha = 0;

	this.x = 0;
	this.y = 0;
	this.size = 50;

	this.leftTop = null;
	this.top = null;
	this.rightTop = null;
	this.rightBottom = null;
	this.bottom = null;
	this.leftBottom = null;
};

Ceil.prototype.GetNeighbourhood = function()
{
	var neighbourhood = [];
	if(this.top != null)
	{
		neighbourhood.push(this.top);
	} 

	if(this.rightTop != null)
	{
		neighbourhood.push(this.rightTop);
	}

	if(this.rightBottom != null)
	{
		neighbourhood.push(this.rightBottom);
	}

	if(this.Bottom != null)
	{
		neighbourhood.push(this.Bottom);
	}

	if(this.leftBottom != null)
	{
		neighbourhood.push(this.leftBottom);
	}

	if(this.leftTop != null)
	{
		neighbourhood.push(this.leftTop);
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
};

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
};
