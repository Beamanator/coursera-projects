# coursera-projects
Repo to hold test projects, class assignments, etc.

# Notes from class
Week 1:
- Start app.js files with:
  - (function() { ... (code) ... })();
  - 'use strict';
- Protect from minification with: MainController.$inject = ['$scope', ...];

Week 2:
- Custom Filters (lecture 13)
  - 1) register w/ module -> .filter('name', factoryFunction) 2) -> add to .$inject
  - in js, add 'Filter' to 'name' ... in HTML, don't add 'Filter' to filter name
  - Filters can be chained {{ expression | filterOne : arg1 : arg2 | filterTwo }}
- How to set up watchers: (lecture 14)
  - $scope.$watch('property') -> don't do this in a controller
  - {{ property }}
  - \<input ... ng-model="property"\>
- $digest vs $apply (lecture 15)
  - $digest - directly kicks off digest cycle
  - $apply (better) - makes sure exceptions get taken care of by Angular, and automatically calls $digest
  - Why use these? Maybe necessary inside jQuery code
- binding types (lecture 16)
  - 1-time binding - {{ :: property }} -> maybe useful for showing user details on a profile page
  - if 1-time bound property is initialized, it will never get updated again
- ng-repeat (lecture 17 / 18)
  - filter with ng-repeat="item in array | filter : searchString"
  - index of array is $index
- Scope Inheritance (lecture 19)
  - Controller as syntax -> use ng-controller="mainCtrl as ctrl1" -> to not need $scope1 or $inject, just this.prop
  - $scope is based on prototypal inheritance
- .scope vs .factory vs .provider (lecture 20 - 22)
- ng-if, ng-show, ng-hide (lecture 23)
  - if ng-if="condition" condition is true, item is shown. else, html item is taken out of the DOM
  - ng-show="condition" has classes for angular to hide (ng-hide). ng-hide is opposite.

Week 3:
- Promises with $q (lecture 24)
- $http service (lecture 25)
  - response.data holds server data response. If JSON, automatically gets transformed into JS object
  - module.constant can be used as injectable constant
- Directives (lecture 26) -> this is why to use Angular!
  - DDO = directive definition object. registered faction function returns DDO
  - \<my-tag\> in HTML turns to 'myTag' in app.js
- restrict attribute of DDO (lecture 27)
  - A = attribute, E = element. default = AE - looks like usually 1 makes sense, not both
- isolate scope (lecture 28) - breaks prototypal inheritance
  - defined with scope: {property: '=prop'} -> property is in controller, prop is in html file
  - =prop is 2-way binding, '=?' means optional, @ is 1-way binding, and directive property is a string
- directives - passing by reference '&' (lecture 30)
  - & binding allows us to execute an expression (ex: function value) in the context of the parent scope
- manipulating DOM with link function ('link') - inside directory ddo (lecture 31)
  - param 'scope' = same $scope as directive / directive controller [no $ b/c its not 'injected']
  - param 'controller' = same controller injected in directive (if there is one)
  - param 'elem' = top-level dom element (w/ directive attribute, or directive element itself)
    - either jqLite or jQuery if included before angular.min.js in main html page
- transclude - ng-transclude & transclude property (lecture 32)
  - allows user to pass custom HTML elements (templates) into directives
  - content is evaluated in parent's context, not directive's context (scope = parent controller scope in example)

# Angular class assignments:
* Module 1 solution: https://goo.gl/p2IO9e
* Module 2 solution: https://goo.gl/ZNzKHM
* Module 3 solution: https://goo.gl/4ovnQS

#Useful commands:

Browser-Sync:
browser-sync start --server --directory --files "\*\*/\*"

Sublime Text 3:
subl.exe . (opens new sublime window -> usually means 2 are opened)
subl.exe . --add (opens current directory until already-opened editor -> only opens 1 window ever)
