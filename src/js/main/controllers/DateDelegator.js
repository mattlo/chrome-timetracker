app.controller('DateDelegator', function ($scope, WeekFactory) {

	// constants
	// @TODO should we use angular constants?
	$scope.START_DAY = 0;
	$scope.END_DAY = 6;

	/**
	 * @type {Array}
	 */
	$scope.weeks = [];

	/**
	 * Initializer
	 * @return {undefined} 
	 */
	$scope.init = function () {
		$scope.setWeek();
	};

	/**
	 * Create week configuration
	 * @param {String|Date|Moment} date 
	 * @return {undefined}
	 */
	$scope.setWeek = function (date) {
		var days = $scope.createWeek(date);

		// push out week info
		$scope.weeks.push({
			days: days,
			label: $scope.getRangeLabel(days[$scope.START_DAY], days[$scope.END_DAY])
		});
	};

	/**
	 * Week factory
	 * @param  {String|Date|Moment} date 
	 * @return {Array} list of `Moment`s
	 */
	$scope.createWeek = function (date) {
		// `moment(undefined)` is now, which means an empty arg is now
		return WeekFactory.getWeekFromDay(moment(date));
	};

	/**
	 * Return range label
	 * @param  {Moment} startDate 
	 * @param  {Moment} endDate   
	 * @return {String}           
	 */
	$scope.getRangeLabel = function (startDate, endDate) {
		// format
		var fullFormat = 'MMMM Do';

		// logic to determine end label
		function getEndLabel() {
			return endDate.format(startDate.month() === endDate.month() ? 'Do' : fullFormat);
		}

		// return full string
		return [startDate.format(fullFormat),getEndLabel()].join(' - ');
	}
});