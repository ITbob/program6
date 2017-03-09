function AStarSearch(){

};

AStarSearch.prototype.ConstructPath = function(node){
	var path = [];
	while(node.pathParent != null)
	{
		path.splice(0, 0, node);
		node.ceil.selectedSprite.alpha = 0;
		node.ceil.pathSprite.alpha = 1;
		console.log("p: " + node.ceil.GetMiddle());
		node = node.pathParent;
	}
	node.ceil.selectedSprite.alpha = 0;
	node.ceil.pathSprite.alpha = 1;
	console.log("length = " + path.length);
	return path;
};

AStarSearch.prototype.Contains = function(list, ceil){
	for(var i = 0; i < list.length; i++)
	{
		if(list[i].ceil == ceil)
		{
			return true;
		}
	}
	return false;
};

AStarSearch.prototype.GetNode = function(ceil, openList, closeList){
	for(var i = 0; i < openList.length; i++)
	{
		if(openList[i].ceil == ceil)
		{
			return openList[i];
		}
	}

	for(var i = 0; i < closeList.length; i++)
	{
		if(closeList[i].ceil == ceil)
		{
			return closeList[i];
		}
	}
	return new AStarNode(ceil);
};

AStarSearch.prototype.Append = function(list, node){
	if(list.length == 0)
	{
		list.push(node);
	}
	
	for(var i = 0; i < list.length; i++)
	{
		console.log(i + " : Item : " + list[i].GetCost())
		if(node.Compare(list[i]))
		{
			console.log(i + " -> Insert : " + node.GetCost())
			list.splice(i,0,node);
			return;
		}
	}
	list.push(node);
};

AStarSearch.prototype.FindPath = function(startNode, goalNode){
	var openList = [];
	var closeList = [];

	startNode.costFromStart = 0;
	startNode.estimatedCostToGoal = startNode.GetEstimatedCost(goalNode);
	startNode.pathParent = null;
	this.Append(openList, startNode);

	var l = 0;

	while(0 < openList.length)
	{
		var currentNode = openList[0];
		openList.splice(0,1);

		if(currentNode.ceil == goalNode.ceil)
		{
			console.log("YES WE DID");
			return this.ConstructPath(currentNode);
		}

		var ceilNeighbourhood = currentNode.ceil.GetNeighbourhood(); 
		for(var i = 0; i < ceilNeighbourhood.length; i++)
		{
			var neighbourCeil = ceilNeighbourhood[i];
			var neighbourNode = this.GetNode(neighbourCeil, openList, closeList);
			
			var isOpen = this.Contains(openList, neighbourCeil);
			var isClosed = this.Contains(closeList, neighbourCeil);

			var costFromStart = currentNode.costFromStart + currentNode.GetNeighbourCost(neighbourNode);

			if((!isOpen && !isClosed) || costFromStart < neighbourNode.costFromStart)
			{
				neighbourNode.pathParent = currentNode;
				neighbourNode.costFromStart = costFromStart;
				neighbourNode.estimatedCostToGoal = neighbourNode.GetEstimatedCost(goalNode);

				if(isClosed)
				{
					closeList.splice(closeList.indexOf(neighbourNode),1);
				}

				if(!isOpen)
				{
					this.Append(openList,neighbourNode);
				}
			}
		}
		closeList.push(currentNode);
		l += 1;
	}

	//no path found
	return null;
};

