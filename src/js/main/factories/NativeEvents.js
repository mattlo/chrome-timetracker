app.factory('NativeEvents', function ($rootScope, $log) {
	// minimize event
	$rootScope.$on('os.minimize', function () {
		$log.debug('minimizing window');
		chrome.app.window.current().minimize();
	});
	
	// close event
	$rootScope.$on('os.close', function () {
		$log.debug('closing window');
		window.close();
	});
	
	//  hide event
	$rootScope.$on('os.hide', function () {
		$log.debug('hiding window');
		chrome.app.window.current().hide();
	});
	
	return null;
});