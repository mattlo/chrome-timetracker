// @TODO current digest cycle is running 3 times, and it has nothing to do with any of the impl
app.controller('DateDelegator', function ($rootScope, $scope, $log, WeekFactory, Util) {

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
	 * @type {Moment}
	 */
	$scope.weekContext = moment();

	/**
	 * Initializer
	 * @return {undefined} 
	 */
	$scope.init = function () {
		$scope.setWeek($scope.weekContext);

		function setWeekContext(method, n) {
			var d = $scope.weekContext;

			$scope.weekContext = d[method].call(d, n, 'days')

			$scope.setWeek(d);
		}

		// event set current week
		$rootScope.$on('setCurrentWeek', function () {
			$log.info('setting to this week...');

			$scope.weekContext = moment();

			$scope.setWeek($scope.weekContext);
		});

		// event set last week
		$rootScope.$on('setLastWeek', function () {
			$log.info('setting to last week');

			setWeekContext('subtract', 7);
		});

		// event set next week
		$rootScope.$on('setNextWeek', function () {
			$log.info('setting to next week');

			setWeekContext('add', 7);
		});
	};

	/**
	 * Create week configuration
	 * @param {String|Date|Moment} date 
	 * @param {Boolean} clearWeeks Defaults to true, clears weeks before appending
	 * @return {undefined}
	 */
	$scope.setWeek = function (date, clearWeeks) {
		var days = $scope.createWeek(date),
			start = days[$scope.START_DAY],
			end = days[$scope.END_DAY],
			tasks = $scope.getTasks(start, end);

		// clear weeks
		if (clearWeeks !== false) {
			$scope.weeks = [];
		}

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
				data[task.id] = null;
			}
		});

		// @TODO add localStorage loader
	};

	/**
	 * Calculates range of date hours
	 * @param  {Moment} startDay 
	 * @param  {Moment} endDay   
	 * @return {Number}          
	 */
	$scope.calculate = function (startDay, endDay) {
		// using this to manipulate so we don't create N of new objects to throw away
		var base = moment(startDay);

		// create day keys from day range
		function getDayKeys(v, index) {
			return base.add(index === 0 ? 0 : 1, 'days').format($scope.DATA_KEY);
		}

		function getHoursByDay(key) {
			var data = $scope.hoursData[key];

			function getTaskHours(key) {
				return data[key];
			}

			if (typeof data !== 'undefined') {
				return Object.keys(data)
					.map(getTaskHours)
					.reduce(Util.add);
			} else {
				return 0;
			}
		}

		// get totla hours
		return Util.range(endDay.diff(startDay, 'days'))
			.map(getDayKeys)
			.map(getHoursByDay)
			.reduce(Util.add);
	};
});