(function() {
	angular
		.module('myApp', [])
		.controller('MainController', ['$scope', function($scope) {

			$scope.ActivePage = angular.fromJson(window.localStorage.getItem('ActivePage')) || 0;

			$scope.countPerPage = 5;

			$scope.offset = $scope.countPerPage * $scope.ActivePage;

			// angular.fromJson(window.localStorage.getItem('taskList')) || []
			$scope.newTaskName = '';
			$scope.taskList = angular.fromJson(window.localStorage.getItem('taskList')) || [];



			$scope.pageCount = Math.ceil($scope.taskList.length / 5);

			$scope.getNumber = function(num) {
				return new Array(num);
			}


			$scope.addTask = function() {
				if ($scope.newTaskName) {
					$scope.taskList.unshift({
						id: $scope.taskList.length,
						name: $scope.newTaskName,
						done: false
					});
					$scope.newTaskName = '';
					$scope.pageCount = Math.ceil($scope.taskList.length / 5);
					$scope.changePage(0);
				}
			};


			$scope.removeTask = function(taskId) {
				for (var i = 0; i < $scope.taskList.length; i++) {
					if ($scope.taskList[i].id === taskId) {
						if (confirm('Are you sure you want to delete item `' + $scope.taskList[i].name + '`')) {
							$scope.taskList.splice(i, 1);
							$scope.pageCount = Math.ceil($scope.taskList.length / 5);
							if(document.querySelector('table').getElementsByTagName('tr').length < 4){
								$scope.changePage($scope.ActivePage - 1);
							}
						}
						break;
					}
				}
			};


			$scope.removeAllTasks = function() {
				if (confirm('Are you sure you want to delete all items?')) {
					for (var i = $scope.ActivePage * $scope.countPerPage; i < $scope.ActivePage * $scope.countPerPage + $scope.countPerPage; i++) {
						if($scope.taskList[$scope.ActivePage * $scope.countPerPage]){
							$scope.taskList.splice($scope.ActivePage * $scope.countPerPage, 1);
						} else {
							break;
						}
					}
					if($scope.ActivePage > 0){
						$scope.changePage($scope.ActivePage - 1);
					} else {
						$scope.changePage(0);
					}
					$scope.pageCount = Math.ceil($scope.taskList.length / 5);
				}
			};

			$scope.checkAllTasks = function() {
				$scope.allChecked = !$scope.allChecked;
				for (var i = $scope.ActivePage * $scope.countPerPage; i < $scope.ActivePage * $scope.countPerPage + $scope.countPerPage; i++) {
					if($scope.taskList[i]){
						$scope.taskList[i].done = $scope.allChecked;
					} else {
						break;
					}
				}
			};

			$scope.changePage = function(newPage){
				$scope.allChecked = false;
				$scope.offset = $scope.countPerPage * newPage;
				$scope.ActivePage = $scope.offset / $scope.countPerPage;
				window.localStorage.setItem('ActivePage', angular.toJson($scope.ActivePage));
				return false;
			}


		$scope.$watch('taskList', function(newVal, oldVal) {
				if (newVal !== oldVal) {
					window.localStorage.setItem('taskList', angular.toJson($scope.taskList));
				}
			}, true);
		}]);


})();