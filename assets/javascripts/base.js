(function () {
	'use strict';

	function barGrow(max) {
		return function(track) {
			setTimeout(function () {
				var count = track.querySelector('[data-count]').getAttribute('data-count');
				track.querySelector('.track__percentage').style.opacity = count / max;
			}, 0);
		};
	}

	function animate() {
		var tracks = document.querySelectorAll('.track');
		var max = tracks[0].querySelector('[data-count]').getAttribute('data-count');
		[].forEach.call(tracks, barGrow(max));
	}

	function onSearchSubmit(e) {
		e.preventDefault();

		var artist = document.querySelector('.search input').value;
		if (artist !== '') {
			window.location = artist;
		}
	}

	document.querySelector('.search').addEventListener('submit', onSearchSubmit);

	animate();

})();
