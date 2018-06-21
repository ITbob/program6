/**
 * Created by Freddy on 11/26/2017.
 */
function Diamond(playground, resource,layoutContext, ceil){
    this.layoutContainer = playground;
    this.layoutContext = layoutContext;
    this.i = 0;
    this.currentDust = 0;
    this.currentAlpha = 1;
    this.size = 50;
    this.subsize = this.size*2;
    this.sprite = new Sprite(resource["diamond.png"]);
    this.lights = [];
    this.lights.push(new DiamondLight(playground,resource,layoutContext,0,0));
    this.lights.push(new DiamondLight(playground,resource,layoutContext,0,0));
    this.lights.push(new DiamondLight(playground,resource,layoutContext,0,0));
    this.ceil = ceil;
    this.ceil.isBlocked = true;

    this.sprite.alpha = 1;
    this.sprite.parentGroup = this.layoutContext.middleGroup;
    this.sprite.pivot.set(this.sprite.x + this.sprite.width/2,this.sprite.y + this.sprite.height/2);
    this.sleep = 0;
    playground.addChild(this.sprite);

    var neighbours = this.ceil.GetNeighbourhood();
    for (var i = 0; i< neighbours.length; i++)
    {
        neighbours[i].DefineDiamondField(playground, resource,layoutContext);
    }

};

Diamond.prototype.SetRelativePosition = function(x,y,zoom)
{
    this.sprite.x = zoom * (this.ceil.x + x + this.subsize/2);
    this.sprite.y = zoom * (this.ceil.y + y + this.subsize/2);
    this.sprite.width = zoom * this.subsize;
    this.sprite.height = zoom * this.subsize;
    for (var i = 0 ; i < this.lights.length; i++)
    {
        this.lights[i].SetRelativePosition(x,y,zoom);
    }
};

Diamond.prototype.Update = function()
{
    this.sleep += 1;
    if(this.sleep % 25 == 0)
    {
        for (var i = 0; i < this.lights.length; i++)
        {
            if(!this.lights[i].showItself)
            {
                var randomX = Math.random();
                var randomY = Math.random();
                var randomXsign = Math.random();
                var randomYsign = Math.random();
                var base = this.size/4;


                if(randomXsign < 0.5)
                {
                    randomX = -base * randomX;
                }
                else
                {
                    randomX = base * randomX;
                }

                if(randomYsign < 0.5)
                {
                    randomY = -base * randomY;
                }
                else
                {
                    randomY = base * randomY;
                }

                this.lights[i].DisplayLight(this.ceil.GetCenter() + randomX, this.ceil.GetMiddle() + randomY);
                break;
            }
        }
    }
    for (var i = 0; i < this.lights.length; i++)
    {
        if(this.lights[i].showItself)
        {
            this.lights[i].Update();
        }
    }

};
