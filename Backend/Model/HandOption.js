function HandOption(){
    //this.id = "hand1.png";
	//this.id2 = "hand2.png";
	//this.activatedSprite = new sprite(resource[this.id]);
    //this.unActivatedSprite = new sprite(resource[this.id2]);
	this.handMode = true;

    //this.x = 20;
    //this.y = 450;
    //this.size = 125;

    //this.activatedSprite.x = this.x;
    //this.unActivatedSprite.x = this.x;
    //this.activatedSprite.y = this.y;
    //this.unActivatedSprite.y = this.y;
    //this.activatedSprite.width = this.size;
    //this.unActivatedSprite.width = this.size;
    //this.activatedSprite.height = this.size;
    //this.unActivatedSprite.height = this.size;

	this.xMouse = -1;
	this.yMouse = -1;
};

HandOption.prototype.IsInit = function(){
	if(this.xMouse == -1 && this.yMouse == -1)
	{
		return true;
	}
	else
	{true
		return false;
	}
};

HandOption.prototype.Revert = function(){
	if(this.activatedSprite.alpha == 1)
	{
        //this.activatedSprite.alpha = 0;
        //this.unActivatedSprite.alpha = 1;
		this.handMode = true;
		this.xMouse = -1;
		this.yMouse = -1;
	}
	else
	{
        //this.handMode = false;
        //this.activatedSprite.alpha = 1;
        //this.unActivatedSprite.alpha = 0;
	}
};