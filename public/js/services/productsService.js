angular.module('ecommerceApp')
	.service('productsSvc', function($http) {
	
	var baseUrl = 'http://localhost:3000/products/'
	
		return {
			getProducts: function() {
				return $http.get(baseUrl).then(function(response) {
					return response.data;
				})
			},
			addProduct: function (product) {
				return $http.post(baseUrl, product)
			},
			editProduct: function (product, id) {
				
				return $http.put(baseUrl + id, product)
			},
			deleteProduct: function (id) {
				return $http.delete(baseUrl + id, id)
			}
		}
	
})