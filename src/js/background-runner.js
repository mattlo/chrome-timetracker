chrome.app.runtime.onLaunched.addListener(function () {
	chrome.app.window.create('src/views/app.html', {
		id: "chromeTimetracker",
		innerBounds: {
			width: 244,
			height: 380,
			minWidth: 244,
			minHeight: 380
		}
	});
});