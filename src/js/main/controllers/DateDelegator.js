app.controller('DateDelegator', function ($scope, WeekFactory) {

	// constants
	// @TODO should we use angular constants?
	$scope.START_DAY = 0;
	$scope.END_DAY = 6;
	$scope.DATA_KEY = 'YYYY-MM-DD';

	/**
	 * @type {Array}
	 */
	$scope.weeks = [];

	/**
	 * Hours object
	 * @type {Object}
	 */
	$scope.hoursData = {};

	/**
	 * Tasks object
	 * @type {Object}
	 */
	$scope.tasks = {};

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
		var days = $scope.createWeek(date),
			start = days[$scope.START_DAY],
			end = days[$scope.END_DAY],
			tasks = $scope.getTasks(start, end);

		// push out week info
		$scope.weeks.push({
			days: days,
			label: $scope.getRangeLabel(start, end),
			tasks: tasks
		});

		// prepare data
		days.forEach(function (day) {
			$scope.loadData(day, tasks);
		});

		console.log($scope.hoursData);
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
	};

	/**
	 * Get tasks (stub)
	 * @param  {Moment} start 
	 * @param  {Moment} end   
	 * @return {Array}       
	 */
	$scope.getTasks = function (start, end) {
		return [
			{
				id: 1,
				label: 'Front-end Development'
			}
		];
	}

	$scope.loadData = function (day, tasks) {
		// resolve namespace
		var formattedDay = day.format($scope.DATA_KEY),
			data = $scope.hoursData[formattedDay] = $scope.hoursData[formattedDay] || {};

		// resolve tasks
		tasks.forEach(function (task) {
			if (typeof data[task.id] === 'undefined') {
				data[task.id] = 0;
			}
		});

		// @TODO add localStorage loader
	};
});