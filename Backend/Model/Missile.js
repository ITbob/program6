/**
 * Created by Freddy on 7/9/2017.
 */
function Missile (resource, playground, layoutContext, x,y, target){
    this.sprites = [];
    this.sprites.push(new Sprite(resource["missile1.png"]));
    this.sprites.push(new Sprite(resource["missile2.png"]));
    this.sprites.push(new Sprite(resource["missile3.png"]));
    this.sprites.push(new Sprite(resource["missile4.png"]));
    this.target = target;
    this.currentId = 0;

    this.resource = resource;
    this.playground = playground;
    this.layoutContext = layoutContext;


    for (var i = 0; i < this.sprites.length; i++)
    {
        this.sprites[i].alpha = 0;
        playground.addChild(this.sprites[i]);
        this.sprites[i].parentGroup = this.layoutContext.middleGroup;
    }

    this.sprites[0].alpha = 1;
    //this.damage = 10;
    this.isDone = false;
    this.speed = 0.3;
    this.slowing = 2;
    this.i = 0;

    //position
    this.width = 15;
    this.height = 22.5;
    this.x = x-this.width/2;//shooter.x;
    this.y = y-this.height/2;//shooter.y;

    this.radius = this.GetAngle();
    this.firstRadius = this.radius;
    for (var i = 0; i < this.sprites.length; i++)
    {
        this.sprites[i].pivot.set(this.sprites[i].x + this.sprites[i].width/2,this.sprites[i].y + this.sprites[i].height/2);
    }
    this.SetRotation();
};


Missile.prototype.SetRotation = function(){
    for(var i = 0; i < this.sprites.length; i++)
    {
        this.sprites[i].rotation = this.radius;
    }
};

Missile.prototype.GetAngle = function(){
    var aPoint = new PIXI.Point(this.x + 7.5, this.y + 7.5);
    var bPoint = new PIXI.Point(this.x + 7.5, this.y + 8);
    var cPoint = new PIXI.Point(this.target.currentCeil.GetCenter(), this.target.currentCeil.GetMiddle());
    var radius = Math.atan2(cPoint.y - bPoint.y, cPoint.x - bPoint.x) - Math.atan2(aPoint.y - bPoint.y, aPoint.x - bPoint.x);
    return radius;
};

Missile.prototype.SetRelativePosition = function(x,y,zoom){
    if(!this.isDone)
    {
        for(var i = 0; i < this.sprites.length; i++)
        {
            this.sprites[i].x = zoom * (this.x + x + this.width/2);
            this.sprites[i].y = zoom * (this.y + y + this.height/2);
            this.sprites[i].width = zoom * this.width;
            this.sprites[i].height = zoom * this.height;
        }
    }


    if(this.explosion != null)
    {
        this.explosion.SetRelativePosition(x,y,zoom);
    }
};

Missile.prototype.IsTargetReached = function(){
    //console.log("target " + (this.target.x+25) + " ,x " + this.x);
    if(Math.abs((this.target.x+25) - this.x) < 10
        && Math.abs((this.target.y+25) - this.y) < 10)
    {
        return true;
    }else
    {
        return false;
    }
};


Missile.prototype.Update = function()
{
    if(!this.IsTargetReached())
    {
        var angle = this.GetAngle();
        var speedX = -this.speed*Math.cos(angle);
        var speedY = this.speed*Math.sin(angle);


        //console.log("angle " + angle);
        //console.log("radius " + this.radius);
        this.radius = this.firstRadius - angle;
        if(this.radius != 0)
        {
            //this.SetRotation();
        }

        this.x += speedY*6;
        this.y += speedX*6;

        this.i += 1;

        if(this.i % this.slowing == 0)
        {
            var previousId = this.currentId;
            this.currentId += 1;
        }
        if(this.sprites.length == this.currentId)
        {
            this.slowing = 3;
            this.sprites[previousId].alpha = 0;
            this.currentId = 0;
            this.sprites[this.currentId].alpha = 1;
        }
        else
        {
            if(-1 < previousId)
            {
                this.sprites[previousId].alpha = 0;
            }
            this.sprites[this.currentId].alpha = 1;
        }
    }
    else
    {
        if(this.explosion == null)
        {
            for (var i = 0; i < this.sprites.length; i++)
            {
                this.sprites[i].alpha = 0;
            }
            this.explosion = new Explosion(this.playground,this.resource,this.layoutContext, this.target.x,this.target.y);
            this.isDone = true;
        }
        else
        {
            if(this.explosion.isDone)
            {
                //remove everything
            }
            else
            {
                this.explosion.Update();
            }
        }

    }
};

Missile.prototype.Clear = function()
{
    for (var i = 0; i < this.sprites.length; i++)
    {
        this.sprites[i].alpha = 0;
        this.playground.removeChild(this.sprites[i]);
        this.sprites[i].destroy();
    }
};