'use strict';
angular.module('angular-jwplayer', []).directive('jwplayer', ['$rootScope', '$compile', function ($rootScope, $compile) {
    return {
        restrict: 'EC',
        scope: {
            playerId: '@',
            setupVars: '=setup'

        },
        link: function (scope, element, attrs) {
            var id = scope.playerId || 'random_player_' + Math.floor((Math.random() * 999999999) + 1),
                getTemplate = function (playerId) {
                    return '<div id="' + playerId + '"></div>';
                };

            element.html(getTemplate(id));
            $compile(element.contents())(scope);
            jwplayer(id).setup(scope.setupVars).on('playlist', function () {
                $rootScope.$emit('playlist_loaded', id);
            });
        }
    };
}]);
