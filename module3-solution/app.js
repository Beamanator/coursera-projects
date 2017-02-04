(function() {
	'use strict';

	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', FoundItemsDirective)
	.directive('itemsLoaderIndicator', ItemsLoaderIndicatorDirective)
	.constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

	function ItemsLoaderIndicatorDirective() {
		var ddo = {
			templateUrl: 'loader/itemsloaderindicator.template.html'
		};

		return ddo;
	}

	function FoundItemsDirective() {
		var ddo = {
			templateUrl: 'foundItemsTemplate.html',
			scope: {
				found: '<',
				onRemove: '&'
			},
			controller: FoundItemsDirectiveController,
			controllerAs: 'foundItemsCtrl',
			bindToController: true
		};

		return ddo;
	}

	function FoundItemsDirectiveController() {
		var foundItemsCtrl = this;

		foundItemsCtrl.title = "Found Items:";
	}

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		var ctrl = this;

		ctrl.searchTerm = '';
		ctrl.foundItems = [];
		ctrl.showLoader = false;

		ctrl.NarrowItDown = function() {
			ctrl.showLoader = true;

			MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
			.then(function( responseList ) {
				if (responseList.length === 0) {
					// display warning
					ctrl.showError = 1;

					// display empty list
					ctrl.foundItems = [];
				} else {
					// hide error
					ctrl.showError = 0;

					// display list
					ctrl.foundItems = responseList;
				}
				ctrl.showLoader = false;
			})
			.catch(function(err) {
				console.log(err);
				alert(err);
			});
		}

		ctrl.removeItem = function(index) {
			ctrl.foundItems.splice(index, 1);
		}
	}

	MenuSearchService.$inject = ['$http', 'ApiBasePath'];
	function MenuSearchService($http, ApiBasePath) {
		var service = this;

		service.getMatchedMenuItems = function(searchTerm) {
			// steps:
			// 1) reach out to server (using $http service)
			// 2) loop through items, pick ones whose description matches the searchTerm
			// 3) return the list (via promise)
			return $http({
					method: "GET",
					url: (ApiBasePath + "/menu_items.json")
				})
				.then(function(results) {
					// do stuff with results.
					if (searchTerm === '') return [];
					else {
						var allItems = results.data.menu_items;
						var foundItems = [];

						angular.forEach(allItems, function(item, index) {
							if (item.description.indexOf(searchTerm) !== -1) {
								foundItems.push( allItems[index] );
							}
						});

						return foundItems;
					}
				});
		};
	};

})();