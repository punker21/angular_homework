(function() {
	angular
		.module('myApp', [])
		.controller('MainController', ['$scope', function($scope) {
			$scope.newTaskName = '';

			$scope.ActivePage = angular.fromJson(window.localStorage.getItem('ActivePage')) || 0;

			$scope.offset = $scope.countPerPage * $scope.ActivePage;

			$scope.taskList = angular.fromJson(window.localStorage.getItem('taskList')) || [];

			$scope.getPageCount = function() {
				if($scope.countPerPage != null){
					return $scope.pageCount = Math.ceil($scope.taskList.length / $scope.countPerPage);
				} else {
					return $scope.pageCount = 0;
				}
			};
			$scope.getNumber = function(num) {
				return new Array(num);
			}

            $scope.countPerPageEnum = [
                {id: 0, value: null, 	text: 'все'},
                {id: 1, value: 5,		text: 'пять'},
                {id: 2, value: 10, 		text: 'десять'},
                {id: 3, value: 20, 		text: 'двадцать'}
            ];

			$scope.countPerPage = $scope.countPerPageEnum[1].value;
			$scope.getPageCount();





			$scope.currentSort = null;
			$scope.sortDirection = true;
			$scope.changeCurrentSort = function(par){
				if($scope.currentSort == par && $scope.sortDirection === false){
					$scope.sortDirection = true;
				} else {
					$scope.currentSort = par;
					$scope.sortDirection = false;
				}
				sortArrayBy(par);
			}

			function sortArrayBy(sortPar) {
				// console.log('Сортировка по ' + sortPar + '. Перевернуть: ' + $scope.sortDirection);
				$scope.taskList.sort(mySort);

				function mySort(item2, item1){
					if (item1[sortPar] < item2[sortPar]) {
						if($scope.sortDirection){
							return -1;
						} else {
							return 1;
						}
					}
					if (item1[sortPar] > item2[sortPar]) {
						if(!$scope.sortDirection){
							return -1;
						} else {
							return 1;
						}
					}
					return 0;
				}
			};



			$scope.addTask = function() {
				if ($scope.newTaskName) {
					$scope.taskList.unshift({
						id: $scope.taskList.length,
						name: $scope.newTaskName,
						done: false
					});
					$scope.newTaskName = '';
					$scope.getPageCount();
					$scope.changePage(0);
				}
			};

			$scope.removeTask = function(taskId) {
				for (var i = 0; i < $scope.taskList.length; i++) {
					if ($scope.taskList[i].id === taskId) {
						if (confirm('Are you sure you want to delete item `' + $scope.taskList[i].name + '`')) {
							$scope.taskList.splice(i, 1);
							$scope.getPageCount();
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
					$scope.getPageCount();
				}
			};


			$scope.changePage = function(newPage){
				$scope.offset = $scope.countPerPage * newPage;
				$scope.ActivePage = $scope.offset / $scope.countPerPage;
				window.localStorage.setItem('ActivePage', angular.toJson($scope.ActivePage));
				return false;
			}
			$scope.changePage($scope.ActivePage);


			$scope.checkChecks = function(){
				var allCheckedFn = true;
				for(var i = $scope.ActivePage * $scope.countPerPage; i <  $scope.ActivePage * $scope.countPerPage + $scope.countPerPage; i++){
					if($scope.taskList[i]){
						if($scope.taskList[i].done == false){
							allCheckedFn = false;
							break;
						}
					}
				}
				$scope.allChecked = allCheckedFn;
			};
			$scope.checkChecks();

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

			$scope.$watch('taskList', function(newVal, oldVal) {
				if (newVal !== oldVal) {
					window.localStorage.setItem('taskList', angular.toJson($scope.taskList));
					$scope.checkChecks();
				}
			}, true);

			$scope.$watch('countPerPage', function(newVal, oldVal) {
				if (newVal !== oldVal) {
					$scope.getPageCount();
					$scope.checkChecks();
					$scope.ActivePage = Math.ceil($scope.offset / $scope.countPerPage);
				}
			}, true);


		}]);



})();