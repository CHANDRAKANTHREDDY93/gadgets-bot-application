var app = angular.module("gadgets");

app.controller("phoneController", function($scope, phoneService, $window, $timeout){
	var init = function(){
		$scope.phQty = 1;
		var phones = phoneService.getPhones();
		phones.then(function(res){
			$scope.phones =res.data;
		});
		$scope.quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	}	
	
	$scope.selectPhone= function(phone)
	{
		$scope.phoneDetails = phone;
	}

	$scope.addToCart = function(phoneDetails, quantity)
	{
		var obj = {
			brand : phoneDetails.brand, 
			phone : phoneDetails.phone,
			image : phoneDetails.image,
			price : phoneDetails.price,
			phId  : phoneDetails.phId,
			qty   : quantity
		};
		phoneService.setCart(obj);

	}

	$scope.goToCart = function()
	{
		$window.location= '#!/cart';
		$('#confirmModal').close();
		//$window.location= '#!/cart';

		 //$location.path('#!/cart');
	}

	init();					//calling function
});