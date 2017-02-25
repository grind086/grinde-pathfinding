'use strict';

var Heap = require('heap'),
    Util = require('../core/Util');

module.exports = function AStar(start, end, heuristic) {
    var heap = new Heap((a, b) => prio[a.i] - prio[b.i]),
        prio = [],
        cost = [],
        from = [],
        open = [];
        
    var current, edges, neighbor, edgeCost, newCost, n, l, i;
    
    cost[start.i] = 0;
    from[start.i] = null;
    open[start.i] = true;
    
    heap.push(start);
    
    while (!heap.empty()) {
        current = heap.pop();
        open[current.i] = false;
        
        if (current === end) {
            return Util.buildPath(from, end);
        }
        
        edges = this.edges[current.i] || [];
        
        for (n = 0, l = edges.length; n < l; n++) {
            edgeCost = edges[n].cost;
            
            if (edgeCost === 0) continue;
            
            neighbor = edges[n].node;
            i = neighbor.i;
            
            newCost = cost[current.i] + edgeCost;
            
            if (cost[i] === undefined || newCost < cost[i]) {
                prio[i] = heuristic(Math.abs(neighbor.x - end.x), Math.abs(neighbor.y - end.y));
                cost[i] = newCost;
                from[i] = current;
                
                if (open[i]) {
                    heap.updateItem(neighbor);
                } else {
                    open[i] = true;
                    heap.push(neighbor);
                }
            }
        }
    }
    
    return null;
};
