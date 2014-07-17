/*global jQuery, Mustache, testResult */

(function ($) {
	'use strict';

	function render(json) {
		var template = '<ul>{{#tracks}}<li class="track"><p class="tr-name" data-count="{{count}}">{{name}}</p><p class="tr-percentage"></p></li>{{/tracks}}</ul>';
		$('.result').html(Mustache.render(template, json));

		var $tracks = $('.track');
		var max = $tracks.first().find('[data-count]').data('count');
		$tracks.each(function () {
			var track = this;
			setTimeout(function () {
				$(track).children('.tr-percentage').css('width', $(track).children('[data-count]').data('count') / max * 100 + '%');
			}, 0);
		});

	}

	function problem(data) {
		if (data.status === 404) {
			$('.result').html('Not Found!');
		}
	}

	$('form').submit(function (e) {
		e.preventDefault();
		var artist = $('input[name="artist"]').val();
		if (artist === '123prova123') {
			render(testResult);
		} else {
			$.ajax({
				url: 'http://api.shouldilisten.it/' + artist,
				success: render,
				error: problem
			});
		}
	});

})(jQuery);
