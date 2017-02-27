function Ceil(resource){
	this.id = "ceil.png";
	this.sprite = new Sprite(resource[this.id]);
	this.sprite.width = 50;
	this.sprite.height = 50;
}

Ceil.prototype = new Item();

Item.prototype.Update = function(){
	//this.SetSprite();
}
