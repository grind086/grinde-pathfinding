'use strict';

module.exports = {
    euclidean: function(dx, dy) {
        return Math.sqrt(dx * dx + dy * dy)
    },
    manhattan: function(dx, dy) {
        return dx + dy;
    }
};
