function UnitMenu(resource){
	this.items = [];
	this.items.push(new UnitMenuItem(0,"attack2.png","attack1.png",resource));
	this.items.push(new UnitMenuItem(160,"defense2.png","defense1.png",resource));
	this.items.push(new UnitMenuItem(320,"check2.png","check1.png",resource));
	this.items.push(new UnitMenuItem(470,"cancel2.png","cancel1.png",resource));
	
	this.separators = [];
	this.separators.push(new UnitSeparatorMenu(150,resource));
	this.separators.push(new UnitSeparatorMenu(310,resource));
	this.separators.push(new UnitSeparatorMenu(460,resource));

};