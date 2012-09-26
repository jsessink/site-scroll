;(function (window, document, $, undefined) {

	'use strict';

	$(function () {

		$('#canverse').siteScroll();

		$('#canverse').on('mousedown', 'canvas', function (event) {

			thisEl = $(this);

			function mover (e, event) {

				y = event.clientY;

				canvas = thisEl;
				canHeight = parseInt(canvas.height(),0);
				divHeight = parseInt($('#canverse').height(),0);

				y -= parseInt(canvas.offset().top - $(window).scrollTop() ,0);
				z = y/canHeight;
				derp = z*divHeight;

				$('html, body').scrollTop(derp);

				return false;

			}

			$('html').mousemove(function (event) {

		   		document.body.focus();
		   		mover(thisEl, event);

			});

			mover(thisEl, event)
			return false;

		});

		$('html, body').mouseup(function (event) {

			$('html').unbind('mousemove');
			return false;

		});

	});

})(window, document, jQuery);