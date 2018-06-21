/**
 * Created by Freddy on 2/18/2018.
 */
function PlaygroundMaker2(resource,layoutContainer){
    this.resource = resource;
    this.layoutContainer = layoutContainer;
};


PlaygroundMaker2.prototype.GetAxialHexagoneMap = function(playground, edgeSize){
    if(edgeSize < 2)
    {
        throw new Error();
    }

    if(edgeSize % 2 != 0){
        throw new Error();
    }


    var axialCeils = {};
    var ceils = [];
    for (var row = -1; row < Math.round(edgeSize*2);row++)
    {
        var startColumn = 0;
        var endColumn = Math.round(edgeSize*2);

        if(row < edgeSize-1)
        {
            startColumn = Math.round(edgeSize - (row+1));
        }

        if(edgeSize-1 < row)
        {
            var diff = row - (edgeSize-1);
            endColumn = Math.round(edgeSize*2-diff);
        }

        for (var column = startColumn; column < endColumn; column++)
        {
            console.log("row " + row + ", colum " + column);
            var hexAxial = new HexAxial(row,column);

            var superCeil = new SuperCeil(this.resource,hexAxial,axialCeils);
            superCeil.DefineDecoration(this.resource);

            this.layoutContainer.addChild(superCeil.selectedSprite);
            this.layoutContainer.addChild(superCeil.pathSprite);
            this.layoutContainer.addChild(superCeil.sprite);
            this.layoutContainer.addChild(superCeil.blockedSprite);
            if(superCeil.decoratonSprite != null)
            {
                this.layoutContainer.addChild(superCeil.decoratonSprite);
            }
            axialCeils[hexAxial] = superCeil;
            ceils.push(superCeil);
        }
    }

    playground.axialCeils = axialCeils;
    playground.ceils = ceils;
};
