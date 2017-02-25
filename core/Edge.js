'use strict';

class Edge {
    constructor(node, cost) {
        this.node = node;
        
        /**
         * The cost of moving along this edge. For normally traversible terrain
         * this should simply be the distance. A cost of 0 implies that the edge
         * is not traversible.
         */
        this.cost = cost;
    }
}

module.exports = Edge;
