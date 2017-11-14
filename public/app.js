var app = angular.module("gadgets", ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl : "./public/views/home.html",
			controller: "homeController"
		})
		.when('/phone',{
			templateUrl : "./public/views/phone.html",
			controller: "phoneController"
		})
		.when('/accessories',{
			templateUrl : "./public/views/accessories.html",
			controller: "accController"
		})
		.when('/cart',{
			templateUrl : "./public/views/cart.html",
			controller: "cartController"
		})
		.otherwise
		({
			redirectTo : "./public/views/home.html"
		})
});


