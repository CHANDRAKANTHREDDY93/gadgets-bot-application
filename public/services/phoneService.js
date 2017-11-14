var app = angular.module("gadgets");

app.service("phoneService", function($http){
	this.getPhones = function(){

			var response;
			return $http.get('./api/getPhones');

	}

	var cartList = [];

	this.setCart = function(obj)
	{
		cartList.push(obj);
	}

	this.getCart = function()
	{
		return cartList;
	}

	this.deleteCartItem = function(item)
	{
		cartList.forEach(function(cart , index){
			if(cart.phId === item.phId)
			{
				cartList.splice(index, 1);
			}
		});
	}
});