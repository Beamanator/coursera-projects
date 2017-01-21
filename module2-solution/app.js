(function() {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	// controller for 'to buy' list
	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService) {
		var ToBuyList = this;

		ToBuyList.toBuyList = ShoppingListCheckOffService.getItemsToBuy();

		ToBuyList.buyItem = function(index) {
			ShoppingListCheckOffService.buyItem(index);
		}
	};

	// controller for 'already bought' list
	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListCheckOffService) {
		var BoughtList = this;

		BoughtList.BoughtList = ShoppingListCheckOffService.getItemsBought();
	};

	function ShoppingListCheckOffService() {
		var service = this;

		// List of initial Shopping List Items:
		// NOTE: items is not service.items, meaning it's internal to the service.
		//   this can be exposed to controllers in service.get()
		var itemsToBuy = [
			{	name: 'Cookies',	quantity: '10'	},
			{	name: 'Peanuts',	quantity: '5k'	},
			{	name: 'Waffles',	quantity: '7'	},
			{	name: 'Apples',		quantity: '4'	},
			{	name: 'Tissues',	quantity: '15'	}
		];
		var itemsBought = [];

		service.getItemsToBuy = function() {
			return itemsToBuy;
		};

		// add item (index = index) to itemsBought array & remove from itemsToBuy array
		service.buyItem = function(index) {
			itemsBought.push(itemsToBuy[index]);
			itemsToBuy = itemsToBuy.splice(index);
		};

		service.getItemsBought = function() {
			return itemsBought;
		}
	};

})();