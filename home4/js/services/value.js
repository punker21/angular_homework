(function() {
    angular.module('myApp')
        .value('helpers', {
            rand: function(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            }
        });
})();