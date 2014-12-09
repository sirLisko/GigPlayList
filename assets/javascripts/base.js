/*global jQuery */

(function ($) {
	'use strict';

	function animate() {
		var $tracks = $('.track');
		var max = $tracks.first().find('[data-count]').data('count');
		$tracks.each(function () {
			var track = this;
			setTimeout(function () {
				$(track).children('.track__percentage').css('width', $(track).children('[data-count]').data('count') / max * 100 + '%');
			}, 0);
		});
	}

	$('.search').on('submit', function (e) {
		e.preventDefault();

		var artist = $('.search input').val();
		if (artist !== '') {
			window.location = artist;
		}
	});

	animate();

})(jQuery);
