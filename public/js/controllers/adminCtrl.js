angular.module('ecommerceApp')
	.controller('adminCtrl', function($scope, productsSvc) {
	
	$scope.getProducts = function() {
		productsSvc.getProducts().then(function(response) {
			return $scope.products = response;
		})
	};

	$scope.getProducts();
	
	//////////////EDIT PRODUCTS/////////
	$scope.editProduct = function(updatedProduct, product) {
		var productToEdit = product;
		if(updatedProduct.name && updatedProduct.price && productToEdit._id) {
			productsSvc.editProduct(updatedProduct, productToEdit._id);
			$scope.getProducts();
			alert("Changed " + productToEdit.name + ' with a price of $' + productToEdit.price + ' to ' + updatedProduct.name + '  with a price of $' + updatedProduct.price + '!')
		} else if(!updatedProduct.name && updatedProduct.price && productToEdit._id) {
			updatedProduct.name = product.name;
			productsSvc.editProduct(updatedProduct, productToEdit._id);
			$scope.getProducts();
			alert("Changed price of " + product.name + " from $" + product.price + " to " + "$"  + updatedProduct.price + '!');
		} else if(!updatedProduct.price && updatedProduct.name && productToEdit._id) {
			updatedProduct.price = product.price;
			productsSvc.editProduct(updatedProduct, productToEdit._id);
			$scope.getProducts();
			alert("Changed " + product.name + " to " + updatedProduct.name + '!');
		} else {
			alert("Make sure to enter a value to edit this product.")
		}
	}
	//////////////////////////////////////////////////////////||||||||
	
	
	/////////////////////ADD PRODUCTS////////////////////////////////
	$scope.addProduct = function(product) {
		console.log(product)
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
	/////////////////////////////////////////////////////////////|||||||
	
	////////////DELETE PRODUCTS//////////////////////////////
	$scope.deleteProduct = function (product) {
		console.log(product)
		var id = product._id
		productsSvc.deleteProduct(id).then(function(response) {
			console.log(response);
			$scope.getProducts();
		})
	}
	/////////////////////////////////////////////////////////////
	
	
})