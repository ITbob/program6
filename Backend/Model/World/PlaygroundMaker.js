/**
 * Created by Freddy on 2/18/2018.
 */
function PlaygroundMaker(playground, layoutcontainer){
    this.playground = playground;
    this.layoutContainer = layoutcontainer;
};

PlaygroundMaker.prototype.SetCeilNeighbourhood = function(){
    for(var l = 0; l < this.playground.axialCeils.length; l++){
        for(var i = 0; i < this.playground.axialCeils[l].length; i++){
            if(l % 2 == 0)
            {
                if(0 <= (l-2))
                {
                    this.playground.axialCeils[l][i].top = this.playground.axialCeils[l-2][i]; //top
                }

                if(0 <= (l-1))
                {
                    this.playground.axialCeils[l][i].rightTop = this.playground.axialCeils[l-1][i]; //right top
                }

                if((l+1) < this.playground.axialCeils.length)
                {
                    this.playground.axialCeils[l][i].rightBottom = this.playground.axialCeils[l+1][i]; // right bottom
                }

                if((l+2) < this.playground.axialCeils.length)
                {
                    this.playground.axialCeils[l][i].bottom = this.playground.axialCeils[l+2][i]; //bottom
                }

                if((l+1) < this.playground.axialCeils.length && 0 <= (i-1))
                {
                    this.playground.axialCeils[l][i].leftBottom = this.playground.axialCeils[l+1][i-1]; // left bottom
                }

                if(0 <= (l-1) && 0 <= (i-1))
                {
                    this.playground.axialCeils[l][i].leftTop = this.playground.axialCeils[l-1][i-1]; // left top
                }
            }
            else
            {
                if(0 <= (l-2))
                {
                    this.playground.axialCeils[l][i].top = this.playground.axialCeils[l-2][i]; // top
                }

                if(0 <= (l-1) && (i+1) < this.playground.axialCeils[l].length)
                {
                    this.playground.axialCeils[l][i].rightTop = this.playground.axialCeils[l-1][i+1]; // right top
                }

                if((l+1) < this.playground.axialCeils.length && (i+1) < this.playground.axialCeils[l].length)
                {
                    this.playground.axialCeils[l][i].rightBottom = this.playground.axialCeils[l+1][i+1]; // right bottom
                }

                if((l+2) < this.playground.axialCeils.length)
                {
                    this.playground.axialCeils[l][i].bottom = this.playground.axialCeils[l+2][i]; // bottom
                }

                if((l+1) < this.playground.axialCeils.length)
                {
                    this.playground.axialCeils[l][i].leftBottom = this.playground.axialCeils[l+1][i]; // left bottom
                }

                if(0 <= (l-1))
                {
                    this.playground.axialCeils[l][i].leftTop = this.playground.axialCeils[l-1][i]; // left top
                }
            }
        }
    }
}

PlaygroundMaker.prototype.BuildMap = function(resource){

    //set position
    for(var l = 0; l < 15; l++){
        this.playground.axialCeils[l] = [];
        for(var i = 0; i < 10; i++){
            var ceil = new Ceil(resource);
            this.layoutContainer.addChild(ceil.selectedSprite);
            this.layoutContainer.addChild(ceil.pathSprite);
            this.layoutContainer.addChild(ceil.sprite);
            this.layoutContainer.addChild(ceil.blockedSprite);

            var x = 0;
            var y = 0;

            var margin = 37.5;

            if(l % 2 == 0){
                margin = 0;
            }

            if(i == 0)
            {
                x = 0 + margin;
            }
            else
            {
                x = i * 50 +  i * 25 + margin;
            }

            y = l * 25 - l;
            ceil.SetPosition(x,y);
            ceil.row = l;
            ceil.column = i;

            this.playground.axialCeils[l].push(ceil);
        }
    }

    this.SetCeilNeighbourhood();

    this.playground.axialCeils[10][4].SetBlocked();
    this.playground.axialCeils[11][3].SetBlocked();

    this.playground.axialCeils[2][4].SetBlocked();
    this.playground.axialCeils[3][3].SetBlocked();

    this.playground.axialCeils[4][3].SetBlocked();
    this.playground.axialCeils[6][3].SetBlocked();
    this.playground.axialCeils[8][3].SetBlocked();
    this.playground.axialCeils[10][3].SetBlocked();
    this.playground.axialCeils[12][3].SetBlocked();

    for(var l = 0; l < this.playground.axialCeils.length; l++)
    {
        for(var i = 0; i < this.playground.axialCeils[l].length; i++)
        {
            this.playground.axialCeils[l][i].DefineDecoration(resource);
            if(this.playground.axialCeils[l][i].decoratonSprite != null)
            {
                this.layoutContainer.addChild(this.playground.axialCeils[l][i].decoratonSprite);
            }
        }
    }
    //this.playground.axialCeils[14][3].SetBlocked();
};