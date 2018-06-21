
/**
 * Created by Freddy on 11/26/2017.
 */
function DiamondLight(playground, resource,layoutContext, x, y) {
    this.layoutContainer = playground;
    this.resource = resource;
    this.layoutContext = layoutContext;
    this.x = x;
    this.y = y;
    this.sprite = new Sprite(resource["diamondLight.png"]);
    this.size = 10;
    this.subsize = 10*2;

    this.sprite.alpha = 0;
    this.sprite.parentGroup = this.layoutContext.topGroup;
    this.sprite.pivot.set(this.sprite.x + this.sprite.width/2,this.sprite.y + this.sprite.height/2);
    playground.addChild(this.sprite);
    this.showItself = false;
};

DiamondLight.prototype.SetRelativePosition = function(x,y,zoom)
{
    this.sprite.x = zoom * (this.x + x + this.subsize/2);
    this.sprite.y = zoom * (this.y + y + this.subsize/2);
    this.sprite.width = zoom * this.subsize;
    this.sprite.height = zoom * this.subsize;
};

DiamondLight.prototype.DisplayLight = function (x,y) {
    this.showItself = true;
    this.sprite.alpha = 1;
    this.x = x;
    this.y = y;
}

DiamondLight.prototype.Update = function()
{
    if(this.showItself)
    {
        this.sprite.alpha -= 0.01;
        if(this.sprite.alpha <= 0)
        {
            this.showItself = false;
        }
    }
};