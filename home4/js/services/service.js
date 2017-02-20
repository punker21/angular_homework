(function() {
    angular.module('myApp')
        .service('User', function() {
            
            var callbacks = [];

            this.registerCallback = function (cb) {
                if (typeof cb === 'function') {
                    callbacks.push(cb);
                }
            };
            this.unRegisterCallback = function (cb) {
                for(var i = 0; i < callbacks.length; i++){
                    if(callbacks[i] === cb){
                        callbacks.splice(i,1);
                        break;
                    }
                }
            };

            function notify(data) {
                for (var i = 0; i < callbacks.length; i++) {
                    callbacks[i](data);
                }
            }
            
            var id = 100;

            this.name = 'Васян';
            this.surname = 'Пупкинян';
            this.email = 'vasya@ololo.com';

            
            this.getId = function () {
                return id;
            };

            this.setName = function (value) {
                this.name = value;
                for (var i = 0; i < callbacks.length; i++) {
                    callbacks[i](this.name);
                }
                // notify(data)
            }
        })

        .factory('Message', function () {
            var defaultStyles = 'background-color:red;';
            
            var styles = defaultStyles;

            function showMessage(text) {
                console.log('%c' + text, styles);
            }
            function setStyles(stylesString) {
                if (stylesString) {
                    styles = stylesString;   
                }
            }
            function resetStyles() {
                styles = defaultStyles;
            }
            return {
                show: showMessage,
                set: setStyles,
                reset: resetStyles
            }
        })
    
    
    
})();