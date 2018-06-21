function Dust(playground, resource, x, y){
	this.layoutContainer = playground;
	this.i = 0;
	this.currentDust = -1;
	this.currentAlpha = 1;
	this.x = x-6.25;
	this.y = y-6.25;
	this.size = 12.5;
    this.subsize = this.size *2;
	this.sprites = [];
	this.sprites.push(new Sprite(resource["dust1.png"]));
	this.sprites.push(new Sprite(resource["dust2.png"]));
	this.sprites.push(new Sprite(resource["dust3.png"]));
	this.sprites.push(new Sprite(resource["dust4.png"]));
	this.sprites.push(new Sprite(resource["dust5.png"]));

	for (var i = 0; i < this.sprites.length; i++) 
	{
		this.sprites[i].alpha = 0;
		this.sprites[i].pivot.set(this.sprites[i].x + this.sprites[i].width/2,this.sprites[i].y + this.sprites[i].height/2);
	}

	this.isDone = 0;
};

Dust.prototype.SetRelativePosition = function(x,y,zoom)
{
	for(var i = 0; i < this.sprites.length; i++)
	{
		this.sprites[i].x = zoom * (this.x + x + this.subsize/2);
		this.sprites[i].y = zoom * (this.y + y + this.subsize/2);
		this.sprites[i].width = zoom * this.subsize;
		this.sprites[i].height = zoom * this.subsize;
	}
};

Dust.prototype.Clear = function()
{
    for (var i = 0; i < this.sprites.length; i++)
    {
        this.sprites[i].alpha = 0;
        this.layoutContainer.removeChild(this.sprites[i]);
        this.sprites[i].destroy();
    }
}

Dust.prototype.Update = function()
{
	if(this.isDone == 0)
	{
		this.i += 1;

		if(0 <= this.currentDust 
			&& this.currentDust < this.sprites.length)
		{
			this.sprites[this.currentDust].rotation += 0.1;
			this.sprites[this.currentDust].alpha = this.currentAlpha;
		}

		this.currentAlpha -= 0.01;

		if(this.currentAlpha < 0)
		{
			this.currentAlpha = 0;			
		}

		if(this.i % 15 == 0)
		{
			var previous = this.currentDust; 
			this.currentDust += 1;

			if(this.sprites.length == this.currentDust)
			{
				this.sprites[previous].alpha = 0;
				this.isDone = 1;
			}
			else
			{
				if(-1 < previous)
				{
					this.sprites[previous].alpha = 0;
				}
				this.sprites[this.currentDust].alpha = this.currentAlpha;
			}
		}
	}
};
