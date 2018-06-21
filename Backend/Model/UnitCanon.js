/**
 * Created by Freddy on 7/8/2017.
 */
function UnitCanon(resource, base) {
    this.base = base;
    this.i = 0;
    this.currentFire = -1;
    this.firingSprites = [];
    this.firingSprites.push(new Sprite(resource["fire1.png"]));
    this.firingSprites.push(new Sprite(resource["fire2.png"]));
    this.firingSprites.push(new Sprite(resource["fire3.png"]));
    this.firingSprites.push(new Sprite(resource["fire4.png"]));
    this.slowing = 3;

    for (var i = 0; i < this.firingSprites.length; i++)
    {
        this.firingSprites[i].alpha=0;
        this.firingSprites[i].pivot.set(this.firingSprites[i].x + this.firingSprites[i].width/2,this.firingSprites[i].y + this.firingSprites[i].height/2);
    }

    this.sprite = new Sprite(resource["fire0.png"]);
    this.sprite.pivot.set(this.sprite.x + this.sprite.width/2,this.sprite.y + this.sprite.height/2);

};

UnitCanon.prototype.SetRelativePosition = function(x,y,zoom)
{
    for(var i = 0; i < this.firingSprites.length; i++)
    {
        this.firingSprites[i].x = zoom * (this.base.x + x + this.base.subsize/2);
        this.firingSprites[i].y = zoom * (this.base.y + y + this.base.subsize/2);
        this.firingSprites[i].width = zoom * this.base.subsize;
        this.firingSprites[i].height = zoom * this.base.subsize;
    }

    this.sprite.x = zoom * (this.base.x + x + this.base.subsize/2);
    this.sprite.y = zoom * (this.base.y + y + this.base.subsize/2);
    this.sprite.width = zoom * this.base.subsize;
    this.sprite.height = zoom * this.base.subsize;
};

UnitCanon.prototype.SetRotation = function(radius)
{
    for(var i = 0; i < this.firingSprites.length; i++)
    {
        this.firingSprites[i].rotation = radius;
    }
    this.sprite.rotation = radius;
};

UnitCanon.prototype.Update = function()
{
    if(this.isDone == 0)
    {
        this.i += 1;

        if(this.i % this.slowing == 0)
        {
            this.slowing += 3;

            this.sprite.alpha = 0;

            this.sprite.alpha = 0;
            var previousFire = this.currentFire;
            this.currentFire += 1;

            if(this.firingSprites.length == this.currentFire)
            {
                this.slowing = 3;
                this.firingSprites[previousFire].alpha = 0;
                this.currentFire = -1;
                this.sprite.alpha = 1;
                this.isDone = 1;
            }
            else
            {
                //console.log("current")
                if(-1 < previousFire)
                {
                    this.firingSprites[previousFire].alpha = 0;
                }
                this.firingSprites[this.currentFire].alpha = 1;
            }
        }
    }
};