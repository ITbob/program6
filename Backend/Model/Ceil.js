function Ceil(resource){
	this.id = "ceil.png";
	this.selectedId = "selectedCeil.png"
	this.sprite = new Sprite(resource[this.id]);
	this.sprite.width = 50;
	this.sprite.height = 50;
	this.sprite.x = 0;
	this.sprite.y = 0;
	this.sprite.interactive = true;
	this.selectedSprite = new Sprite(resource[this.selectedId]);
	this.selectedSprite.interactive = true;
	this.selectedSprite.alpha = 0;
	this.selectedSprite.mousedown = function(e){
		console.log("allo");
		if(this.alpha == 0)
		{
			this.alpha = 1;
		}else
		{
			this.alpha = 0;
		}
	};
	//this.sprite.on('mousemove', this.MouseDown);
	this.x = 0;
	this.y = 0;
	this.size = 50;

	this.SetPosition = function(x,y){
	this.x = x;
	this.y = y;
	this.sprite.x = x;
	this.sprite.y = y;
	this.selectedSprite.x = x;
	this.selectedSprite.y = y;
	};
}

Ceil.prototype.MouseDown = function(e)
{
	console.log("allo " + this.selectedSprite.x);
	if(this.selectedSprite.visible == true)
	{
		this.selectedSprite.visible = false;
	}
	else
	{
		this.selectedSprite.visible = true;
	}
}


//Ceil.prototype = new Item();

/*Ceil.prototype.SetPosition = function(x,y){
	this.x = x;
	this.y = y;
	this.sprite.x = x;
	this.sprite.y = y;
	this.selectedSprite.x = x;
	this.selectedSprite.y = y;
}*/

Ceil.prototype.SetZoom = function(zoom){
	
	this.sprite.x = zoom * this.x;
	this.sprite.y = zoom * this.y;
	this.sprite.width = zoom * this.size;
	this.sprite.height = zoom * this.size;

	this.selectedSprite.x = zoom * this.x;
	this.selectedSprite.y = zoom * this.y;
	this.selectedSprite.width = zoom * this.size;
	this.selectedSprite.height = zoom * this.size;
}
