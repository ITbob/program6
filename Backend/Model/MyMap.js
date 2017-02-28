function MyMap(resource){
	this.ceils = [];
	this.BuildMap(resource);
}

MyMap.prototype.BuildMap = function(resource){
	for(var l = 0; l < 3; l++){
		for(var i = 0; i < 3; i++){
			var ceil = new Ceil(resource);
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

			this.ceils.push(ceil);
		}
	}
}

MyMap.prototype.Zoom = function(value){
	for(var i = 0; i < this.ceils.count; i++){
		this.ceils[i].SetZoom(value);
	}
}