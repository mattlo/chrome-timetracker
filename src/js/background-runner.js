chrome.app.runtime.onLaunched.addListener(function () {
	chrome.app.window.create('src/views/app.html', {
		id: "chromeTimetracker",
		frame: 'none',
		innerBounds: {
			width: 1000,
			height: 600,
			minWidth: 800,
			minHeight: 400
		}
	});
});