function UnitSeparatorMenu(y, resource){
	this.sprite = new Sprite(resource["separator.png"]);

	this.x = 1;
	this.y = y; //95
	this.width = 100;
	this.height = 30;

	this.sprite.x = this.x;
	this.sprite.y = this.y;
	this.sprite.width = this.width;
	this.sprite.height = this.height;
};