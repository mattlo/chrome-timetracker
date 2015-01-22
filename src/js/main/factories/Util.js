app.factory('Util', function () {
	return {
		/**
		 * Creates empty list by length
		 * @param  {Number} length 
		 * @return {Array}        
		 */
		range: function (length) {
			return Array(length).join(0).split(0);
		},
		/**
		 * Add method
		 * @param {Number} a 
		 * @param {Number} b 
		 * @return {Number}
		 */
		add: function (a, b) {
			return a + b;
		}
	};
});