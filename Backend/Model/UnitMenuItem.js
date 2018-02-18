function UnitMenuItem(y, image1, image2, resource){
	this.sprite = new Sprite(resource[image1]);
	this.sprite2 = new Sprite(resource[image2]);

	this.x = 1;
	this.y = y;//20
	this.width = 100;//75
	this.height = 150;//93

	this.sprite.x = this.x;
	this.sprite.y = this.y;
	this.sprite.width = this.width;
	this.sprite.height = this.height;

	this.sprite2.x = this.x;
	this.sprite2.y = this.y;
	this.sprite2.width = this.width;
	this.sprite2.height = this.height;	
	this.sprite2.alpha = 0;
};

UnitMenuItem.prototype.Set = function() {
	if(this.sprite.alpha == 1)
	{
		this.sprite.alpha = 0;
		this.sprite2.alpha = 1;
	}
	else
	{
		this.sprite.alpha = 1;
		this.sprite2.alpha = 0;
	}
};