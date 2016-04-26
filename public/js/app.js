angular.module('ecommerceApp', ['ui.router'])
	.config(function($stateProvider, $urlRouterProvider) {
	
		$stateProvider
			
			.state('home', {
				url: '/',
				templateUrl: '../views/homeView.html' 
			})
			.state('products', {
				url: '/products',
				templateUrl: '../views/productsView.html',
				controller: 'productsCtrl'
			})
			.state('admin', {
				url: '/admin',
				templateUrl: '../views/adminView.html',
				controller: 'adminCtrl',
				resolve: {
					productsRef: function(productsSvc) {
						return productsSvc.getProducts();
					},
				}
			})
		
		$urlRouterProvider.otherwise('/');
	
	
})