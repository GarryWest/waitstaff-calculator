angular.module('waitstaffCalculatorApp', ['ngRoute', 'ngAnimate'])
    .service('dataService', function () {
        var dataResponse = {
            mealPriceError: false,
            taxRateError: false,
            tipPercentageError : false,
            custSubTotal : 0,
            custTip : 0,
            custTotal : 0,
            earningsTipTotal : 0,
            earningsMealCount : 0,
            earningsTipAverage : 0
        };
        return {
            saveDataResponse:function (data) {
                dataResponse = data;
            },
            getDataResponse:function () {
                return dataResponse;
            }
        };
    })
	.config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            templateUrl: './home.html',
            controller: 'HomeCtrl'
        }).when('/home', {
            templateUrl: './home.html',
            controller: 'HomeCtrl'
        }).when('/newmeal', {
            templateUrl: './newmeal.html',
            controller: 'NewMealCtrl'
        }).when('/myearnings', {
            templateUrl: './myearnings.html',
            controller: 'MyEarningsCtrl'
        }).when('/error', {
            template : '<p>Error Page Not Found</p>'
        });
    }])
    .run(function($rootScope, $location, $timeout) {
        $rootScope.$on('$routeChangeError', function(){
            $location.path("/error");
        });
        $rootScope.$on('$routeChangeStart', function(){
            $rootScope.isLoading = true;
        });
        $rootScope.$on('$routeChangeSuccess', function(){
            $timeout(function(){
                $rootScope.isLoading = false;
            }, 1000);
        });
    })
    .controller('HomeCtrl', ['$scope', function($scope) {
    }])
    .controller('NewMealCtrl', ['$scope', 'dataService', function($scope, dataService) {
        $scope.Data = dataService.getDataResponse();
        $scope.submit = function(){
            if ($scope.myForm.mealPrice.$error.required ||
                $scope.myForm.mealPrice.$error.pattern)
            {
                $scope.Data.mealPriceError = true;
                $scope.Data.taxRateError = false;
                $scope.Data.tipPercentageError = false;
            } else if ($scope.myForm.taxRate.$error.required ||
                $scope.myForm.taxRate.$error.pattern)
            {
                $scope.Data.mealPriceError = false;
                $scope.Data.taxRateError = true;
                $scope.Data.tipPercentageError = false;
            } else if ($scope.myForm.tipPercentage.$error.required ||
                $scope.myForm.tipPercentage.$error.pattern)
            {
                $scope.Data.mealPriceError = false;
                $scope.Data.taxRateError = false;
                $scope.Data.tipPercentageError = true;
            } else {
                $scope.Data.mealPriceError = false;
                $scope.Data.taxRateError = false;
                $scope.Data.tipPercentageError = false;

                $scope.Data.custSubTotal = (Number(Number($scope.Data.mealPrice) + ((Number($scope.Data.mealPrice) * Number($scope.Data.taxRate)) / 100))).toFixed(2);
                $scope.Data.custTip = (Number($scope.Data.custSubTotal) * Number($scope.Data.tipPercentage) / 100).toFixed(2);
                $scope.Data.custTotal = Number($scope.Data.custSubTotal) + Number($scope.Data.custTip);

                $scope.Data.earningsTipTotal = (Number($scope.Data.earningsTipTotal)+Number($scope.Data.custTip)).toFixed(2);
                $scope.Data.earningsMealCount += 1;
                $scope.Data.earningsTipAverage = (Number($scope.Data.earningsTipTotal) / Number($scope.Data.earningsMealCount)).toFixed(2);
                // Update the earnings view data
                dataService.saveDataResponse($scope.Data);
            }
            $scope.Data.mealPrice = "";
            $scope.Data.taxRate ="";
            $scope.Data.tipPercentage = "";
            document.getElementById("mealPrice").focus();
        };
        $scope.cancel = function(event){
            event.preventDefault();
            $scope.Data.mealPrice = "";
            $scope.Data.taxRate ="";
            $scope.Data.tipPercentage = "";
            document.getElementById("mealPrice").focus();
        };
    }])
   .controller('MyEarningsCtrl', ['$scope', 'dataService', function($scope, dataService) {
        $scope.Data = dataService.getDataResponse();
        $scope.reset = function(){
            $scope.Data.mealPrice = "";
            $scope.Data.taxRate ="";
            $scope.Data.tipPercentage ="";
            $scope.Data.custSubTotal = 0;
            $scope.Data.custTip = 0;
            $scope.Data.custTotal = 0;
            $scope.Data.earningsTipTotal = 0;
            $scope.Data.earningsMealCount = 0;
            $scope.Data.earningsTipAverage = 0;
            dataService.saveDataResponse($scope.Data);
            document.getElementById("mealPrice").focus();   
        };
    }])
    