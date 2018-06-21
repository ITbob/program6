function SuperCeil(resource, hexAxial, map){
    this.hexAxial = hexAxial;
    this.id = "ceil.png";
    this.selectedId = "selectedCeil.png";
    this.pathId = "pathCeil.png";
    this.blockedId = "blockedCeil.png";
    this.sprite = new Sprite(resource[this.id]);
    this.sprite.interactive = true;
    this.map = map;
    this.selectedSprite = new Sprite(resource[this.selectedId]);
    this.selectedSprite.interactive = true;
    this.selectedSprite.alpha = 0;

    this.pathSprite = new Sprite(resource[this.pathId]);
    this.pathSprite.interactive = true;
    this.pathSprite.alpha = 0;

    this.blockedSprite = new Sprite(resource[this.blockedId]);
    this.blockedSprite.interactive = true;
    this.blockedSprite.alpha = 0;
    this.subsize = 100;
    this.isBlocked = false;


    this.size = 50;
    var pos = this.hexAxial.toPixel(this.size);

    this.x = pos[0];
    this.y = pos[1];

    //console.log("ceil x "+ this.x + ", y " + this.y);

    this.decoratonSprite = null;
    this.DiamondField = null;
    //this.DefineDecoration(resource);
};

SuperCeil.prototype.DefineDecoration = function (resource) {
    var random = Math.random();
    if(random < 0.3 && !this.isBlocked){
        var decorationRandom = Math.random();

        if(decorationRandom <= 0.3)
        {
            this.decoratonSprite = new Sprite(resource["stone.png"]);
        }
        else if(decorationRandom <= 0.8)
        {
            this.decoratonSprite = new Sprite(resource["flower.png"]);
        }
        else
        {
            this.decoratonSprite = new Sprite(resource["water.png"]);
        }
        //var rotationRandom = Math.random();
        //this.decoratonSprite.x = this.x;
        //this.decoratonSprite.y = this.y;
        //this.decoratonSprite.width = 50;
        //this.decoratonSprite.height = 50;
        //this.decoratonSprite.pivot.set(this.GetCenter(),this.GetMiddle());
        //this.decoratonSprite.rotation = rotationRandom * 360;
        //this.decorationX = this.decoratonSprite.x;
        //this.decorationY = this.decoratonSprite.y;
    }
};

SuperCeil.prototype.SetBlocked = function(){
    this.blockedSprite.alpha = 1;
    this.isBlocked = true;
};

SuperCeil.prototype.GetNeighbourhood = function()
{
    var neighbourhood = [];
    for (var direction = 0; direction < 6; direction++)
    {
        var pos = this.hexAxial.getNeighbour(direction);
        console.log("pos.q " + pos.q + " pos.r " + pos.r + " " + this.map[this.hexAxial].alpha);
        if(this.map.hasOwnProperty(pos) && !this.map[pos].isBlocked)
        {
            neighbourhood.push(this.map[pos]);
        }
    }
    return neighbourhood;
};

SuperCeil.prototype.DefineDiamondField = function (playground, resource,layoutContext) {
    this.DiamondField = new DiamondField(playground,resource,layoutContext,this);
};


//Ceil.prototype = new Item();

SuperCeil.prototype.GetCenter = function(){
    return (this.hexAxial.toPixel(this.size)[0] + this.size/2);
};

SuperCeil.prototype.GetMiddle = function(){
    return (this.hexAxial.toPixel(this.size)[1] + this.size/2);
};

SuperCeil.prototype.SetPosition = function(x,y){
    this.x = x;
    this.y = y;

    this.sprite.x = x;
    this.sprite.y = y;

    this.selectedSprite.x = x;
    this.selectedSprite.y = y;

    this.pathSprite.x = x;
    this.pathSprite.y = y;

    this.blockedSprite.x = x;
    this.blockedSprite.y = y;

    if(this.decoratonSprite != null)
    {
        this.decoratonSprite.x = x;
        this.decoratonSprite.y = y;
    }

    if(this.DiamondField != null)
    {
        this.DiamondField.x = x;
        this.DiamondField.y = y;
    }
};

SuperCeil.prototype.Update = function () {
    if(this.DiamondField != null)
    {
        this.DiamondField.Update();
    }
}

SuperCeil.prototype.SetRelativePosition = function(x,y,zoom){
    this.sprite.x = zoom * (this.x + x);
    this.sprite.y = zoom * (this.y + y);
    this.sprite.width = zoom * this.subsize;
    this.sprite.height = zoom * this.subsize;

    this.selectedSprite.x = zoom * (this.x + x);
    this.selectedSprite.y = zoom * (this.y + y);
    this.selectedSprite.width = zoom * this.subsize;
    this.selectedSprite.height = zoom * this.subsize;

    this.pathSprite.x = zoom * (this.x + x);
    this.pathSprite.y = zoom * (this.y + y);
    this.pathSprite.width = zoom * this.subsize;
    this.pathSprite.height = zoom * this.subsize;

    this.blockedSprite.x = zoom * (this.x + x);
    this.blockedSprite.y = zoom * (this.y + y);
    this.blockedSprite.width = zoom * this.subsize;
    this.blockedSprite.height = zoom * this.subsize;

    if(this.decoratonSprite != null)
    {
        this.decoratonSprite.x = zoom * (this.x + x );
        this.decoratonSprite.y = zoom * (this.y + y );
        this.decoratonSprite.width = zoom * this.subsize;
        this.decoratonSprite.height = zoom * this.subsize;
    }

    if(this.DiamondField != null)
    {
        this.DiamondField.SetRelativePosition(x,y,zoom);
    }
};
