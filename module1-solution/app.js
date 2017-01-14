(function() {
	'use strict';

	angular.module('LunchCheckerApp', [])
	.controller('MainController', MainController);

	MainController.$inject = ['$scope'];
	function MainController($scope) {
		$scope.emptyDishWarning = "Note: empty items (i.e. , ,) do not count toward dish total";
		$scope.messageColor = "black";

		$scope.CheckAmount = function() {
			var dishList = $scope.dishes;

			if (!dishList) {
				// Set dish color to red as fail status :(
				$scope.messageColor = "red";

				// If dishList is empty or only spaces, tell user to enter data first
				$scope.message = "Please enter data first";
			} else {
				// Set dish color to green as user entered data = pass!
				$scope.messageColor = "green";

				// Split the list on commas
				var dishArray = dishList.split(",");

				// remove empty items from dishArray
				dishArray = removeEmptyItems(dishArray);

				// < 4 dishes is a healthy meal. >= 4 dishes is too much!
				if (dishArray.length < 4) {
					$scope.message = "Enjoy!";
				} else {
					$scope.message = "Too much!";
				}
			}
		}
	};

	// returns an array with all empty items removed
	function removeEmptyItems(arr) {
		var newArr = [];
		for (var i = 0; i < arr.length; i++) {
			var item = arr[i];

			// if item is empty
			if (item.trim()) {
				newArr.push(item);
			}
		}
		return newArr;
	}

})();