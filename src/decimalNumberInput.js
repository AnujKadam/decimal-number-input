angular.module('decimalNumberInput', [])
	.directive('decimalNumberInput', function () {
    return {
        require: '?ngModel',
        scope: {
            decimalScale: '@'
        },
        link: function (scope, element, attrs, ngModelCtrl) {
            if (!ngModelCtrl) {
                return;
            }

            ngModelCtrl.$parsers.push(function (val) {
                if (angular.isUndefined(val)) {
                    var val = '';
                }
                var clean = val.replace(/[^0-9\.]/g, '');
                var decimalCheck = clean.split('.');

                if (!angular.isUndefined(decimalCheck[1])) {
                    if (!scope.decimalScale) {
                        scope.decimalScale = 2; //Set default decimal scale to 2.
                    }
                    scope.decimalScale = parseInt(scope.decimalScale);
                    decimalCheck[1] = decimalCheck[1].slice(0, scope.decimalScale);
                    clean = decimalCheck[0] + '.' + decimalCheck[1];
                }

                if (val == '.') {
                    clean = '';
                }

                if (val !== clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }

                if (val.substr(val.length - 1) == '.') {
                    ngModelCtrl.$setValidity('invalidFormat', false);
                }
                else {
                    ngModelCtrl.$setValidity('invalidFormat', true);
                }

                return clean;
            });
        }
    };
});
