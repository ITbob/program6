function Team(bottomTankSkin, topTankSkin, truckSkin, resource, location){
	this.units = [];
	this.bottomTankSkin = bottomTankSkin;
	this.topTankSkin = topTankSkin;
	this.truckSkin = truckSkin;

	this.base = new Base(resource, location);
};