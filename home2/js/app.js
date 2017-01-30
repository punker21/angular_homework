(function() {
	angular
		.module('myApp', [])
		.controller('MainController', ['$scope', function($scope) {

			$scope.countPerPage = 5;
			$scope.offset = 0;

			// angular.fromJson(window.localStorage.getItem('taskList')) || []
			$scope.newTaskName = '';
			$scope.taskList = angular.fromJson(window.localStorage.getItem('taskList')) || [];

			$scope.addTask = function() {
				if ($scope.newTaskName) {
					$scope.taskList.push({
						id: $scope.taskList.length,
						name: $scope.newTaskName,
						done: false
					});
					$scope.newTaskName = '';
				}
			};

			$scope.removeTask = function(taskId) {
				for (var i = 0; i < $scope.taskList.length; i++) {
					if ($scope.taskList[i].id === taskId) {
						if (confirm('Are you sure you want to delete item `' + $scope.taskList[i].name + '`')) {
							$scope.taskList.splice(i, 1);
						}
						break;
					}
				}
			};

		$scope.$watch('taskList', function(newVal, oldVal) {
				if (newVal !== oldVal) {
					window.localStorage.setItem('taskList', angular.toJson($scope.taskList));
				}
			}, true);
		}]);


})();