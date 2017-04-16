function Team(skin1, skin2, resource, location){
	this.units = [];
	this.skin1 = skin1;
	this.skin2 = skin2;
	this.base = new Base(resource, location);
};