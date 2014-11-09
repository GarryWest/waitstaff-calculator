angular.module('waitstaffCalculatorApp', [])
	.controller('MainController', ['$scope', function($scope) {
        $scope.mealPriceError = false;
        $scope.taxRateError = false;
        $scope.tipPercentageError = false;
        $scope.custSubTotal = 0;
        $scope.custTip = 0;
        $scope.custTotal = 0;
        $scope.earningsTipTotal = 0;
        $scope.earningsMealCount = 0;
        $scope.earningsTipAverage = 0;
                
    	$scope.submit = function(){
            if ($scope.myForm.mealPrice.$error.required ||
                $scope.myForm.mealPrice.$error.pattern)
            {
                $scope.mealPriceError = true;
                $scope.taxRateError = false;
                $scope.tipPercentageError = false;
            } else if ($scope.myForm.taxRate.$error.required ||
                $scope.myForm.taxRate.$error.pattern)
            {
                $scope.mealPriceError = false;
                $scope.taxRateError = true;
                $scope.tipPercentageError = false;
            } else if ($scope.myForm.tipPercentage.$error.required ||
                $scope.myForm.tipPercentage.$error.pattern)
            {
                $scope.mealPriceError = false;
                $scope.taxRateError = false;
                $scope.tipPercentageError = true;
            } else {
                $scope.mealPriceError = false;
                $scope.taxRateError = false;
                $scope.tipPercentageError = false;
console.log($scope.mealPrice);

                $scope.custSubTotal = (Number(Number($scope.mealPrice) + ((Number($scope.mealPrice) * Number($scope.taxRate)) / 100))).toFixed(2);
                $scope.custTip = (Number($scope.custSubTotal) * Number($scope.tipPercentage) / 100).toFixed(2);
                $scope.custTotal = Number($scope.custSubTotal) + Number($scope.custTip);

                $scope.earningsTipTotal = (Number($scope.earningsTipTotal)+Number($scope.custTip)).toFixed(2);
                $scope.earningsMealCount += 1;
                $scope.earningsTipAverage = (Number($scope.earningsTipTotal) / Number($scope.earningsMealCount)).toFixed(2);
            }
    	};
        $scope.cancel = function(event){
            event.preventDefault();
            $scope.mealPrice = 0;
            $scope.taxRate = 0;
            $scope.tipPercentage = 0;
        };
    	$scope.reset = function(){
            $scope.mealPrice = 0;
            $scope.taxRate = 0;
            $scope.tipPercentage = 0;
            $scope.custSubTotal = 0;
            $scope.custTip = 0;
            $scope.custTotal = 0;
            $scope.earningsTipTotal = 0;
            $scope.earningsMealCount = 0;
            $scope.earningsTipAverage = 0;
    	};
    }]);

