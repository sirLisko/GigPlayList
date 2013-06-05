/*global Mustache */

(function($){
	'use strict';

	function render (json) {
		var template = '{{#tracks}}<li class="track"><span class="name">{{name}}</span><span class="count">{{count}}</span><span class="color"></span></li>{{/tracks}}';
		$('.result').html(Mustache.render(template, json));
		var $tracks = $(".track");
		var max = $tracks.first().find('.count').text();
		$tracks.each(function(){
			$(this).children('.color').css('width', $(this).children('.count').text()/max*100 + "%");
		});
	}

	function problem (data) {
		if (data.status === 404) {
			$('.result').html('Not Found!');
		}
	}

	$('form').submit(function(e){
		e.preventDefault();
		var artist = $('input[name="artist"]').val();
		$.ajax({
			url: 'http://api.shouldilisten.it/' + artist,
			success: render,
			error: problem
		});
	});

})(jQuery);
