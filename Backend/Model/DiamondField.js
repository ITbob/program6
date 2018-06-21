/**
 * Created by Freddy on 12/10/2017.
 */
function DiamondField(playground, resource,layoutContext, ceil) {
    this.layoutContainer = playground;
    this.sprite = new Sprite(resource["diamondField.png"]);
    this.layoutContext = layoutContext;
    this.layoutContainer.addChild(this.sprite);
    this.sprite.parentGroup = this.layoutContext.bottomGroup;
    this.ceil = ceil;
    this.x = this.ceil.x;
    this.y = this.ceil.y;
    this.size = 50;
    this.subsize = 100;
    this.IsFading = false;
    this.i = 0;
}

DiamondField.prototype.SetRelativePosition = function(x,y,zoom) {
    this.sprite.x = zoom * (this.x + x );
    this.sprite.y = zoom * (this.y + y );
    this.sprite.width = zoom * this.subsize;
    this.sprite.height = zoom * this.subsize;
}


DiamondField.prototype.Update = function(){
    this.i += 1;
    if(this.i % 3 == 0)
    {
        if(this.sprite.alpha < 0)
        {
            this.IsFading = false;
        }

        if(1 < this.sprite.alpha)
        {
            this.IsFading = true;
        }

        if(this.IsFading)
        {
            this.sprite.alpha -= 0.05;
        }

        if(!this.IsFading)
        {
            this.sprite.alpha += 0.05;
        }

    }
}