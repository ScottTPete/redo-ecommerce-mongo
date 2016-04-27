angular.module('ecommerceApp')
	.service('productsSvc', function($http) {
	
	var baseUrl = 'http://localhost:3000'
	
		return {
			getProducts: function() {
				return $http.get(baseUrl + '/api/products').then(function(response) {
					return response.data;
				})
			},
			addProduct: function (product) {
				return $http.post(baseUrl + '/api/products', product)
			},
			editProduct: function (product, id) {
				
				return $http.put(baseUrl + '/api/products/' + id, product)
			},
			deleteProduct: function (id) {
				return $http.delete(baseUrl + '/api/products/' + id, id)
			}
		}
	
})