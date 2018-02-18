/**
 * Created by Freddy on 11/22/2017.
 */
function Explosion(playground, resource,layoutContext, x, y){
    this.playground = playground;
    this.layoutContext = layoutContext;
    this.i = 0;
    this.currentDust = 0;
    this.currentAlpha = 1;
    this.x = x;
    this.y = y;
    this.size = 50;
    this.sprites = [];
    this.sprites.push(new Sprite(resource["explosion1.png"]));
    this.sprites.push(new Sprite(resource["explosion2.png"]));
    this.sprites.push(new Sprite(resource["explosion3.png"]));
    this.sprites.push(new Sprite(resource["explosion4.png"]));
    //this.sprites.push(new Sprite(resource["explosion5.png"]));

    for (var i = 0; i < this.sprites.length; i++)
    {
        this.sprites[i].alpha = 0;
        this.sprites[i].parentGroup = this.layoutContext.topGroup;
        this.sprites[i].pivot.set(this.sprites[i].x + this.sprites[i].width/2,this.sprites[i].y + this.sprites[i].height/2);
    }

    for (var i = 0; i < this.sprites.length; i++)
    {
        playground.addChild(this.sprites[i]);
    }

    this.isDone = 0;
};

Explosion.prototype.SetRelativePosition = function(x,y,zoom)
{
    for(var i = 0; i < this.sprites.length; i++)
    {
        this.sprites[i].x = zoom * (this.x + x + this.size/2);
        this.sprites[i].y = zoom * (this.y + y + this.size/2);
        this.sprites[i].width = zoom * this.size;
        this.sprites[i].height = zoom * this.size;
    }
};

Explosion.prototype.Clear = function()
{
    for (var i = 0; i < this.sprites.length; i++)
    {
        this.sprites[i].alpha = 0;
        this.playground.removeChild(this.sprites[i]);
        this.sprites[i].destroy();
    }
}

Explosion.prototype.Update = function()
{
    if(this.isDone == 0)
    {
        this.i += 1;

        if(0 <= this.currentDust
            && this.currentDust < this.sprites.length)
        {
            this.sprites[this.currentDust].rotation += 0.001;
            this.sprites[this.currentDust].alpha = this.currentAlpha;
        }

        this.currentAlpha -= 0.01;

        if(this.currentAlpha < 0)
        {
            this.currentAlpha = 0;
        }

        if(this.i % 30 == 0)
        {
            var previous = this.currentDust;
            this.currentDust += 1;

            if(this.sprites.length == this.currentDust)
            {
                this.sprites[previous].alpha = 0;
                this.isDone = true;
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
