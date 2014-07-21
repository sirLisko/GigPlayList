/*global jQuery, Mustache */

(function ($) {
	'use strict';

	function render(json) {
		var template = '<ul>{{#tracks}}<li class="track"><p class="track__title" data-count="{{count}}">{{title}}</p><p class="track__percentage"></p></li>{{/tracks}}</ul>';
		$('.result').html(Mustache.render(template, json));

		var $tracks = $('.track');
		var max = $tracks.first().find('[data-count]').data('count');
		$tracks.each(function () {
			var track = this;
			setTimeout(function () {
				$(track).children('.track__percentage').css('width', $(track).children('[data-count]').data('count') / max * 100 + '%');
			}, 0);
		});

	}

	function problem(data) {
		if (data.status === 404) {
			$('.result').html('Not Found!');
		}
	}

	$('.search form').submit(function (e) {
		e.preventDefault();
		var artist = $('.search__artist').val();
		if (artist !== '') {
			$.ajax({
				url: 'http://api.shouldilisten.it/v1/artist/' + artist,
				success: render,
				error: problem
			});
		}
	});

})(jQuery);
