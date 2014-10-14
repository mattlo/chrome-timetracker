app.directive('canFocus', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			var reference = element;
			
			if (attrs.canFocus !== null) {
				// assumes attribute is a DOM element
				reference = angular.element(window[attrs.canFocus]);
			}
			
			reference.on('focus', function () {
				element.addClass('focus-active');
			});
			
			reference.on('blur', function () {
				element.removeClass('focus-active');
			});
		}
	};
});