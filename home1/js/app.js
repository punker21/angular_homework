(function(){
	var app = angular.module('homeWork', []);
	app.controller('textBlockCtrl', function($scope) {
		$scope.textShow = true;
		$scope.btnClick = function() {
			$scope.textShow = !$scope.textShow;
		};
	});
})();