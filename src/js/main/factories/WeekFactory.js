app.factory('WeekFactory', function ($rootScope, $log, Util) {
	return {
		/**
		 * Generates a list of Moment days
		 * @param  {Moment} date
		 * @return {Array}     
		 */
		getWeekFromDay: function (date) {
			// return day given index
			function addDays(v, index) {
				// lets create a day, starting with a monday, relative to the date provided
				return moment(date).day(index + 1);
			}

			// add days to 7 length list (a week)
			return Util.range(7).map(addDays);
		}
	};
});