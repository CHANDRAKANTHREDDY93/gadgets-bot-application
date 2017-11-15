var app = angular.module("gadgets");

app.service("phoneService", function($http){
	this.getPhones = function(){

			var response;
			return $http.get('./api/getPhones');

	};

	var cartList = [];

	this.setCart = function(obj)
	{
		var temp = -1;
		cartList.forEach(function (item, index) {
			if(item.phId === obj.phId){
                temp = index;
			}
        });

		if(temp === -1){
            cartList.push(obj);
		} else {
            cartList[temp].qty += obj.qty;
		}

	};

	this.getCart = function()
	{
		return cartList;
	};

	this.deleteCartItem = function(item)
	{
		cartList.forEach(function(cart , index){
			if(cart.phId === item.phId)
			{
				cartList.splice(index, 1);
			}
		});
	};

	this.emptyCart = function() {
        cartList = [];
	};
});