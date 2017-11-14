var app = angular.module("gadgets");

app.controller("headerController", function($scope, $location){
	$scope.appName = "Gadgets";
	var url = $location.url();
	if(url == '/')
	{
		$scope.activeNav = 'home';
	}
	else if(url == '/phone')
	{
		$scope.activeNav = 'phone';
	}
	else
	{
		$scope.activeNav = 'cart';
	}

	$scope.navChange = function(nav)
	{
		$scope.activeNav = nav;
	}

});