(function() {
    "use strict";

    angular.module('superClock', [])
    .controller('ClockController', ['$scope', '$interval', function($scope, $interval) {

        $scope.time = new Date();
        $interval(function() {
            $scope.time = new Date();
        }, 1000);

    }]);

})();