function Unit (resource) {
	this.sprites = [];
	this.sprites.push(new Sprite(resource["unit1.png"]));
	this.sprites.push(new Sprite(resource["unit2.png"]));
	this.sprites.push(new Sprite(resource["unit3.png"]));
	this.sprites.push(new Sprite(resource["unit4.png"]));
	this.sprites.push(new Sprite(resource["unit5.png"]));
	this.sprites.push(new Sprite(resource["unit6.png"]));
	this.currentSprite = 0;
	this.goalCeils = [];
	this.nextCeil = null;
	this.x = 0
	this.y = 0;
	this.size = 50;
}

Unit.prototype.Moving = function(){
	var previous = this.currentSprite; 

	this.currentSprite += 1;
	if(this.sprites.length <= this.currentSprite)
	{
		this.currentSprite = 0;
	}

	console.log("cs: " + this.currentSprite);

	this.sprites[this.currentSprite].alpha = 1;
	this.sprites[previous].alpha = 0;

}

Unit.prototype.SetPosition = function(x,y){
	this.x = x;
	this.y = y;
	for(var i = 0; i < this.sprites.length; i++)
	{
		this.sprites[i].x = this.x;
		this.sprites[i].y = this.y;
		this.sprites[i].width = this.size;
		this.sprites[i].height = this.size;
		//this.sprites[i].alpha = 0;
	}
};

Unit.prototype.SetRelativePosition = function(x,y,zoom){
	for(var i = 0; i < this.sprites.length; i++)
	{
		//this.sprites[i].alpha = 0;
		this.sprites[i].x = zoom * (this.x + x);
		this.sprites[i].y = zoom * (this.y + y);
		this.sprites[i].width = zoom * this.size;
		this.sprites[i].height = zoom * this.size;
	}
};

Unit.prototype.GetCenter = function(){
	return (this.x + this.size/2);
};

Unit.prototype.GetMiddle = function(){
	return (this.y + this.size/2);
};

Unit.prototype.Update = function(){
	if(this.goalCeils.length != 0 || this.nextCeil != null)
	{
		if(this.nextCeil == null)
		{
			this.nextCeil = this.goalCeils[0]; 
			this.goalCeils.splice(0,1);
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
				this.y -= 1;
			}
			else if(this.GetMiddle() < this.nextCeil.GetMiddle())
			{
				this.y += 1;
			}

			if(Math.abs(this.GetMiddle() - this.nextCeil.GetMiddle()) < 1){
				this.y = this.nextCeil.y;
			}

			if(this.GetMiddle() == this.nextCeil.GetMiddle() 
				&& this.GetCenter() == this.nextCeil.GetCenter())
			{
				this.nextCeil = null;
			}
			this.Moving();
		}
	}
};