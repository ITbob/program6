function AStarNode(ceil){
	this.ceil = ceil;
	this.costFromStart = 0;
	this.estimatedCostToGoal = 0;
	this.pathParent = null;
};

AStarNode.prototype.Compare = function(otherNode){
	return (this.GetCost() < otherNode.GetCost());
};

AStarNode.prototype.GetCost = function(){
	return (this.costFromStart + this.estimatedCostToGoal);
};

AStarNode.prototype.GetNeighbourCost = function(node){
	return this.GetDistance(node);
};

AStarNode.prototype.GetDistance = function(node){
	var aX = this.ceil.GetCenter();
	var aY = this.ceil.GetMiddle();

	var bX = node.ceil.GetCenter();
	var bY = node.ceil.GetMiddle();

	return Math.sqrt(Math.pow(bX - aX,2)) + Math.sqrt(Math.pow(bY- aY,2));	
};

AStarNode.prototype.GetEstimatedCost = function(node)
{ 
	return this.GetDistance(node);// / node.ceil.size;
};