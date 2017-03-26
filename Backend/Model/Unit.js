function Unit (resource,red) {
	var unitBottom = null;
	var unitTop = null;
	if(red == 1)
	{
		unitBottom = new Sprite(resource["unitBottom.png"]);
		unitTop = new Sprite(resource["unitTop.png"]);
	}
	else{
		unitBottom = new Sprite(resource["unitBottom2.png"]);
		unitTop = new Sprite(resource["unitTop2.png"]);
	}

	var wheels1 = new Sprite(resource["wheels1.png"]);
	var wheels2 = new Sprite(resource["wheels2.png"]);
	var wheels3 = new Sprite(resource["wheels3.png"]);
	var wheels4 = new Sprite(resource["wheels4.png"]);
	var wheels5 = new Sprite(resource["wheels5.png"]);
	var wheels6 = new Sprite(resource["wheels6.png"]);
	var wheels7 = new Sprite(resource["wheels7.png"]);


	this.sprites = [];
	this.sprites.push(wheels1);
	this.sprites.push(wheels2);
	this.sprites.push(wheels3);
	this.sprites.push(wheels4);
	this.sprites.push(wheels5);
	this.sprites.push(wheels6);
	this.sprites.push(wheels7);
	this.sprites.push(unitBottom);
	this.sprites.push(unitTop);
	
	for (var i = 0; i < this.sprites.length; i++) 
	{
		this.sprites[i].pivot.set(this.sprites[i].x + this.sprites[i].width/2,this.sprites[i].y + this.sprites[i].height/2);
	}	

	this.wheels = [];
	this.wheels.push(wheels1);
	this.wheels.push(wheels2);
	this.wheels.push(wheels3);
	this.wheels.push(wheels4);
	this.wheels.push(wheels5);
	this.wheels.push(wheels6);
	this.wheels.push(wheels7);

	this.base = [];
	this.base.push(unitBottom);
	this.base.push(wheels1);
	this.base.push(wheels2);
	this.base.push(wheels3);
	this.base.push(wheels4);
	this.base.push(wheels5);
	this.base.push(wheels6);
	this.base.push(wheels7);

	this.currentWheel = 0;
	this.goalCeils = [];
	this.currentCeil = null;
	this.nextCeil = null;
	this.x = 0
	this.y = 0;
	this.size = 50;
	this.radius = 0;
	this.radiusGoal = 0;
}

Unit.prototype.Rotating = function(){
	for(var i = 0; i < this.base.length; i++){
		//this.sprites[i].anchor.set(0.5, 0.5);
		this.base[i].rotation = this.radius;
		//this.sprites[i].anchor.set(0, 0);

	}
};

Unit.prototype.Moving = function(){
	var previous = this.currentWheel; 

	this.currentWheel += 1;
	if(this.wheels.length <= this.currentWheel)
	{
		this.currentWheel = 0;
	}

	this.wheels[this.currentWheel].alpha = 1;
	this.wheels[previous].alpha = 0;

};

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
		this.sprites[i].x = zoom * (this.x + x + this.size/2);
		this.sprites[i].y = zoom * (this.y + y + this.size/2);
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

Unit.prototype.GetRadius = function(){
	var aPoint = new PIXI.Point(this.currentCeil.GetCenter(), this.currentCeil.GetMiddle());
	var bPoint = new PIXI.Point(this.currentCeil.GetCenter(), this.currentCeil.GetMiddle()+1);
	var cPoint = new PIXI.Point(this.nextCeil.GetCenter(), this.nextCeil.GetMiddle());
	var radius = Math.atan2(cPoint.y - bPoint.y, cPoint.x - bPoint.x) - Math.atan2(aPoint.y - bPoint.y, aPoint.x - bPoint.x);
	return radius;
};

Unit.prototype.Update = function(){
	if(this.goalCeils.length != 0 || this.nextCeil != null)
	{
		if(this.nextCeil == null)
		{
			this.nextCeil = this.goalCeils[0];
			this.goalCeils.splice(0,1);
			
			if(this.currentCeil == null)
			{
				this.radiusGoal = this.radius;
			}
			else
			{
				this.radiusGoal = this.GetRadius();
				console.log("pivot: " + this.sprites[0].pivot.x + ", " + this.sprites[0].pivot.y);
			}
		}
		else
		{
			if(this.radius != this.radiusGoal)
			{
				if(this.radius < this.radiusGoal)
				{
					this.radius +=0.01;
				}
				else
				{
					this.radius -=0.01;
				}

				if(Math.abs(this.radius - this.radiusGoal) < 0.01)
				{
					this.radius = this.radiusGoal;
				}

				this.Rotating();
				console.log("radius " + this.radius);
				console.log("radius goal " + this.radiusGoal);
			}
			else
			{
/*				for (var i = 0; i < this.sprites.length; i++) 
				{
					this.sprites[i].pivot.set(this.sprites[i].x,this.sprites[i].y);
				}	*/

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
					this.y -= 0.65;
				}
				else if(this.GetMiddle() < this.nextCeil.GetMiddle())
				{
					this.y += 0.65;
				}

				if(Math.abs(this.GetMiddle() - this.nextCeil.GetMiddle()) < 1){
					this.y = this.nextCeil.y;
				}

				if(this.GetMiddle() == this.nextCeil.GetMiddle() 
					&& this.GetCenter() == this.nextCeil.GetCenter())
				{
					this.currentCeil = this.nextCeil;
					this.nextCeil = null;
				}
			}
			this.Moving();
		}
	}
};