angular.module('ecommerceApp')
	.controller('productsCtrl', function($scope, productsSvc) {
	
	
	 productsSvc.getProducts().then(function(response) {
		 $scope.products = response;
	 })
	
})