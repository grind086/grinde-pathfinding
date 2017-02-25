'use strict';

var Options = require('options'),
    Node = require('./Node'),
    Edge = require('./Edge');
    
const SQRT2 = Math.sqrt(2);

class Graph {
    constructor() {
        this.nodes = [];
        this.edges = [];
    }
    
    addNode(x, y) {
        var i = this.nodes.length;
        return (this.nodes[i] = new Node(i, x, y));
    }
    
    addEdge(a, b, cost, bi) {
        var edge = new Edge(b, cost);
        
        if (this.edges[a.i]) this.edges[a.i].push(edge);
        else this.edges[a.i] = [edge];
        
        if (bi) this.addEdge(b, a, cost, false);
    }
    
    static createGrid(w, h, options) {
        var opts = new Options({
            allowDiagonal: true,
            costfn: (a, b) => (a.x === b.x || a.y === b.y) ? 1 : SQRT2
        }).merge(options);
        
        var graph = new Graph(),
            allowDiagonal = opts.value.allowDiagonal,
            costfn = opts.value.costfn,
            i = 0;
            
        var x, y, node;
        
        for (y = 0; y < h; y++) {
            for (x = 0; x < w; x++) {
                graph.nodes[i] = new Node(i, x, y);
                i++;
            }
        }
        
        var gridEdge = (a, bx, by) => {
            let b = graph.nodes[by * w + bx];
            let c = costfn(a, b);
            if (c > 0) graph.addEdge(a, b, c, false);
        };
        
        i = 0;
        
        for (y = 0; y < h; y++) {
            for (x = 0; x < w; x++) {
                node = graph.nodes[i];
                
                if (x > 0)     gridEdge(node, x - 1, y);
                if (y > 0)     gridEdge(node, x, y - 1);
                if (x < w - 1) gridEdge(node, x + 1, y);
                if (y < h - 1) gridEdge(node, x, y + 1);
                
                if (allowDiagonal) {
                    if (x > 0) {
                        if (y > 0)     gridEdge(node, x - 1, y - 1);
                        if (y < h - 1) gridEdge(node, x - 1, y + 1);
                    }
                    if (x < w - 1) {
                        if (y > 0)     gridEdge(node, x + 1, y - 1);
                        if (y < h - 1) gridEdge(node, x + 1, y + 1);
                    }
                }
                
                i++;
            }
        }
        
        return graph;
    }
}

Graph.prototype.astar = require('./algorithms/astar');
Graph.prototype.astarbi = require('./algorithms/astarbi');

module.exports = Graph;
