
var app = angular.module("gadgets");

app.controller("cartController", function($scope, phoneService)
{
	var init = function()
	{
		$scope.cart = phoneService.getCart();

		$scope.subTotal =0;
		$scope.shipping = 6;
		if($scope.cart.length>0)
		{
			$scope.cart.forEach(function(item){
				$scope.subTotal += item.price * item.qty;
			});

			$scope.totalBTax = $scope.subTotal + $scope.shipping;
			$scope.estimatedTax = ($scope.totalBTax * 6.8) /100;
			$scope.orderTotal = $scope.estimatedTax + $scope.totalBTax;
		}
	}
	init();

	$scope.deleteItem = function(item)
	{
		phoneService.deleteCartItem(item);
		init();
	}

});