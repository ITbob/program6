function MyMap(resource){
	this.ceils = [];
	var size = 50;

	for(var l = 0; l < 15; l++){
		for(var i = 0; i < 10; i++){
			var ceil = new Ceil(resource);
			ceil.sprite.width = size;
			ceil.sprite.height = size;

			var margin = 37.5;

			if(l % 2 == 0){
				margin = 0;
			}

			if(i == 0)
			{
				ceil.sprite.x = 0 + margin;
			}
			else
			{
				ceil.sprite.x = i * 50 +  i * 25 + margin;
			}
			


			ceil.sprite.y = l * 25;

			this.ceils.push(ceil);
		}
	}
}