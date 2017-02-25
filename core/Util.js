'use strict';

class Util {
    static buildPath(fromArray, node) {
        var path = [], i =0;
        
        while (node && i++ < 100) {
            path.push(node);
            node = fromArray[node.i];
        }
        
        return path;
    }
    
    static compressPath(path) {
        
    }
    
    static smoothPath(path) {
        
    }
}

module.exports = Util;
