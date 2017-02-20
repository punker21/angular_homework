(function() {
	angular
		.module('myApp')
		.controller('MainController', ['$scope', 'settings', 'paging', function($scope, settings, paging) {

            $scope.table = {
                checkAll: false,
                countPerPage: paging.perPage,
                offset: 0,
                currentPage: 0
            };

			restoreList();

            $scope.countPerPageEnum = [
                {id: 0, value: null, 	text: 'All'},
                {id: 1, value: 5,		text: 'five'},
                {id: 2, value: 10, 		text: 'ten'},
                {id: 3, value: 20, 		text: 'twenty'}
            ];
            updateNavButtonsArray();

			function getPagesCount() {
                return $scope.taskList && $scope.table.countPerPage
						? new Array(Math.ceil($scope.taskList.length / $scope.table.countPerPage))
						: [];
            }

			$scope.newTaskName = '';

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
							checkToChangeCurrentPage();
						}
						break;
					}
				}
			};

			$scope.toggleCheckAll = function () {
                $scope.table.checkAll = !$scope.table.checkAll;
                iterateTaskListRange(function(i) {
                    if ($scope.taskList[i]) {
                        $scope.taskList[i].done = $scope.table.checkAll;
                    }
                });
            };

			$scope.removeAllTasks = function () {
			    if (!confirm('Are U fucking sure?!')) return;
                var range = getRangeIndexes();
                $scope.taskList.splice(range.from, range.count);
                checkToChangeCurrentPage();
            };

			$scope.changePage = function (pageIndex) {
				$scope.table.currentPage = pageIndex;
				$scope.table.offset = $scope.table.countPerPage * pageIndex;
				updateCheckAll();
            };

            function updateCheckAll() {
                $scope.table.checkAll = false;
                var isAllChecked = true;
                iterateTaskListRange(function(i) {
                    if ($scope.taskList[i].done === false) {
                        isAllChecked = false;
                        return false;
                    }
                });
                $scope.table.checkAll = isAllChecked;
            }

            function checkToChangeCurrentPage() {
                var range = getRangeIndexes();
                if (range.count === 0) {
                    $scope.changePage($scope.table.currentPage - 1);
                }
            }

			$scope.$watch('taskList', function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    updateCheckAll();
                    saveList();
                    updateNavButtonsArray();
                }
			}, true);

			$scope.$watch('table.countPerPage', function(newVal, oldVal) {
					if (newVal !== oldVal) {
                        updateNavButtonsArray();
                        updateCheckAll();
					}
			});

			function iterateTaskListRange(callback) {
			    var range = getRangeIndexes();
                var shouldContinue = true;

                for (var i = range.from; i < range.to; i++) {
                    if (typeof callback === 'function') {
                        shouldContinue = callback(i);
                        if (shouldContinue === false) {
                            console.log('loop was broken');
                            break;
                        }
                    }
                }
            }

            function getRangeIndexes() {
                var range = {
                    from: $scope.table.offset,
                    to: $scope.table.countPerPage ?
                        $scope.table.countPerPage + $scope.table.offset <= $scope.taskList.length
                            ? $scope.table.countPerPage + $scope.table.offset
                            : $scope.taskList.length
                        : $scope.taskList.length
                };
                range.count = range.to - range.from;
                return range;
            }

            // $scope.$watch('table.checkAll', function (isChecked) {
            //     iterateTaskListRange(function(i) {
            //         if ($scope.taskList[i]) {
            //             $scope.taskList[i].done = isChecked;
            //         }
            //     });
            // });

            function updateNavButtonsArray() {
                $scope.navButtonsArray = getPagesCount();
            }
            function saveList() {
                window.localStorage.setItem('taskList', angular.toJson($scope.taskList));
            }
            function restoreList() {
                $scope.taskList = angular.fromJson(window.localStorage.getItem('taskList')) || [];
            }

		}]);


})();