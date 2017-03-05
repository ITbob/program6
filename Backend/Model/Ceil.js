function Ceil(resource){
	this.id = "ceil.png";
	this.selectedId = "selectedCeil.png"
	
	this.sprite = new Sprite(resource[this.id]);
	this.sprite.interactive = true;
	
	this.selectedSprite = new Sprite(resource[this.selectedId]);
	this.selectedSprite.interactive = true;
	this.selectedSprite.alpha = 0;

	this.x = 0;
	this.y = 0;
	this.size = 50;
}

//Ceil.prototype = new Item();

Ceil.prototype.SetPosition = function(x,y){
	this.x = x;
	this.y = y;
	this.sprite.x = x;
	this.sprite.y = y;
	this.selectedSprite.x = x;
	this.selectedSprite.y = y;
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
}
