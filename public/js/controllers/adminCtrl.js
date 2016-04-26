angular.module('ecommerceApp')
	.controller('adminCtrl', function($scope, productsSvc, productsRef) {
	
	
	$scope.products = productsRef;
	
	$scope.getProducts = function() {
		productsSvc.getProducts().then(function(response) {
			return $scope.products = response;
		})
	};
	
	console.log($scope.products);
	
	$scope.add = false;

	$scope.showEditButton = function() {
		angular.forEach($scope.products, function (product, index) {
			product.showEdit = true;
		})
	}
	$scope.exitEditing = function() {
		angular.forEach($scope.products, function (product, index) {
			product.showEdit = false;
			product.show = false;
		})
		
	}
		
	$scope.addProduct = function(product) {
		$scope.add = false;
		if(product && (product.name && product.price)) {
			productsSvc.addProduct(product)
			alert(product.name + ' with a price of $' + product.price + ' was added.');
			$scope.getProducts();
			$scope.product = '';
		} else {
			alert("Product must have product name and price!");
		}
	}
	
	$scope.editProduct = function(updatedProduct, product) {
		console.log(updatedProduct);
		
		if(updatedProduct && (updatedProduct.name || updatedProduct.price) && product._id) {
			productsSvc.editProduct(updatedProduct, product._id);
			alert("You updated " + product.name + ' ' + product.price + ' to ' + updatedProduct.name + ' ' + updatedProduct.price + '.')
			$scope.updatedProduct = '';
			
			angular.forEach($scope.products, function (product, index) {
				console.log($scope.products)
				console.log(product)
				product.showEdit = true;
				product.show = false;
			})
			
		
			
		} else {
			alert("Make sure to enter a value to edit this product.")
		}
	}
	
	
	
	
	
	
})