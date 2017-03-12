function AStarSearch(){

};

AStarSearch.prototype.ConstructPath = function(node){
	var path = [];
	//var goalNode = node;
	while(node.pathParent != null)
	{
		//console.log("rw:" + ((node.ceil.row)+1) + " cl:" + ((node.ceil.column)+1) + " dst:" + node.GetDistance(goalNode));
		path.splice(0, 0, node.ceil);
		node.ceil.selectedSprite.alpha = 0;
		node.ceil.pathSprite.alpha = 1;
		node = node.pathParent;
	}
	node.ceil.selectedSprite.alpha = 0;
	node.ceil.pathSprite.alpha = 1;
	//console.log("length = " + path.length);
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
	var i = 0;
	while(i < list.length)
	{
		//console.log(i + " : Item : " + list[i].GetCost())
		if(node.Compare(list[i]))
		{
			//console.log(i + " Insert -> rw:" + ((node.ceil.row)+1) + " cl:" + ((node.ceil.column)+1));
			list.splice(i, 0, node);
			return;
		}
		i += 1;
	}
	//console.log(i + " Insert -> rw:" + ((node.ceil.row)+1) + " cl:" + ((node.ceil.column)+1));
	list.push(node);
};

AStarSearch.prototype.FindPath = function(startNode, goalNode){
	var openList = [];
	var closeList = [];

	startNode.costFromStart = 0;
	startNode.estimatedCostToGoal = startNode.GetEstimatedCost(goalNode);
	startNode.pathParent = null;
	this.Append(openList, startNode);

	while(0 < openList.length)
	{
		console.log("---> GET " + ((openList[0].ceil.row)+1) + " cl:" + ((openList[0].ceil.column)+1))
		var currentNode = openList[0];
		openList.splice(0,1);

		if(currentNode.ceil == goalNode.ceil)
		{
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
	}

	//no path found
	return null;
};

