# grinde-pathfinding

Pathfinding graphs can either be created using static convenience functions
```javascript
var Pathfinding = require('../Pathfinding');

// Create a 64x64 grid of nodes
var graph = Pathfinding.Graph.createGrid(64, 64, {

    // Add diagonal connections
    allowDiagonal: true,
    
    // Define the cost of moving along the edge from nodeA to nodeB
    costfn: (nodeA, nodeB) => {
        var dx = nodeB.x - nodeA.x,
            dy = nodeB.y - nodeA.y;
            
        return Math.sqrt(dx*dx + dy*dy);
    }
});

// Calculate the path from startNode to endNode using A*
var path = graph.astar(startNode, endNode, Pathfinding.Heuristics.euclidean);
```

Or manually for custom geometry

```javascript
var Pathfinding = require('../Pathfinding');

// Create a new graph
var graph = new Pathfinding.Graph(),
    nodes = graph.nodes;

// Add nodes
var a = graph.addNode(0, 0),
    b = graph.addNode(1, 0),
    c = graph.addNode(1, 1),
    d = graph.addNode(0, 1);

// Set edges
graph.addEdge(a, b, 1, false);
graph.addEdge(b, c, 1, false);
graph.addEdge(c, d, 1, false);
graph.addEdge(d, a, 1, false);
graph.addEdge(a, c, 1, true);

// a → b
// ↑ ⤡ ↓
// d ← c
```