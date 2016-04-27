angular.module('ecommerceApp')
	.controller('adminCtrl', function($scope, productsSvc) {
	
	$scope.getProducts = function() {
		productsSvc.getProducts().then(function(response) {
			console.log(response)

			
			return $scope.products = response;
		})
	};

	$scope.getProducts();
	
	//////////////EDIT PRODUCTS/////////
	$scope.editProduct = function(updatedProduct, product) {
		console.log(product)
		var productToEdit = product;
		if(updatedProduct.title && updatedProduct.price && updatedProduct.description && productToEdit._id) {
			productsSvc.editProduct(updatedProduct, productToEdit._id);
			$scope.getProducts();
			alert("Changed " + productToEdit.title + ' with a price of $' + productToEdit.price + ' to ' + updatedProduct.title + ' with a price of $' + updatedProduct.price + '!')
		} else if(!updatedProduct.title && updatedProduct.price && productToEdit._id) {
			updatedProduct.title = productToEdit.title;
			productsSvc.editProduct(updatedProduct, productToEdit._id);
			$scope.getProducts();
			alert("Changed price of " + productToEdit.title + " from $" + productToEdit.price + " to " + "$"  + updatedProduct.price + '!');
		} else if(!updatedProduct.price && updatedProduct.title && productToEdit._id) {
			updatedProduct.price = productToEdit.price;
			productsSvc.editProduct(updatedProduct, productToEdit._id);
			$scope.getProducts();
			alert("Changed " + productToEdit.title + " to " + updatedProduct.title + '!');
		} else if(updatedProduct.description && !updatedProduct.title && !updatedProduct.price && productToEdit._id) {
			updatedProduct.price = productToEdit.price;
			productsSvc.editProduct(updatedProduct, productToEdit._id);
			$scope.getProducts();
			alert("Changed " + productToEdit.title + "'s description from " + productToEdit.description + " to "+ updatedProduct.description + '!');
		} else {
			alert("Make sure to enter a value to edit this product.")
		}
	}
	//////////////////////////////////////////////////////////||||||||
	
	
	/////////////////////ADD PRODUCTS////////////////////////////////
	$scope.addProduct = function(product) {
		$scope.add = false;
		if(product.title && product.price && product.description) {
			productsSvc.addProduct(product)
			alert(product.title + ' with a price of $' + product.price + ' and a description of ' + product.description +  ' was added.');
			$scope.getProducts();
			$scope.product = '';
		} else {
			alert("Product must have product name, description and price!");
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