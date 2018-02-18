function AccelerationEffectManager(val, mininimum, a){
	this.val = val;
	this.t = 0;
	this.a = a;
	this.acceleration = this.a;
	this.mininimum = mininimum;
}

AccelerationEffectManager.prototype.Update = function()
{
	if(this.t != 0)
	{
		this.t -= 0.01;
	}

	if(Math.abs(this.t) < 0.01)
	{
		this.t = 0;
	}

	this.val += this.acceleration * this.t * this.t;

	if(this.val < this.mininimum)
	{
		this.t = 0;
		this.val = this.mininimum;
	}
};

AccelerationEffectManager.prototype.Increase = function(){
	if(this.acceleration < 0)
	{
		this.t = 0;
	}
	this.t += this.a;
	this.acceleration = this.a;
};

AccelerationEffectManager.prototype.Decrease = function(){
	if(0 < this.acceleration)
	{
		this.t = 0;
	}
	this.t += this.a;
	this.acceleration = -this.a;
};