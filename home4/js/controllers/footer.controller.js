(function() {
    angular.module('myApp')
    .controller('FooterController', function($scope, User) {
        $scope.user = User.name;


        $scope.$emit('случилось что-то веселое', 'ололо =)');
        
        
        function updateName(newName) {
            $scope.user = newName;
        }

        User.name = 123123;
        User.setName('ИМЯ');
        
        User.registerCallback(updateName);

        $scope.stopRepeating = function() {
            User.unRegisterCallback(updateName);
        };
    })
})();