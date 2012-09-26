$.fn.siteScroll = function(params) {
		var siteScroll  = {
			init : function () {

			    var	scriptArr = ['script/libs/html2canvas/html2canvas.js', 'script/libs/html2canvas/jquery.plugin.html2canvas.js'], 
			    	i,
					theHead = document.getElementsByTagName('head')[0],
					html2CanvasMaker = document.createElement('script'),
					jQueryHtml2CanvasMaker = document.createElement('script')
				;

				html2CanvasMaker.setAttribute("type", "text/javascript");
				html2CanvasMaker.setAttribute("src", scriptArr[0]);
				jQueryHtml2CanvasMaker.setAttribute("type", "text/javascript");
				jQueryHtml2CanvasMaker.setAttribute("src", scriptArr[1]);

				theHead.appendChild(html2CanvasMaker);
				theHead.appendChild(jQueryHtml2CanvasMaker);

				siteScroll.win = $(window);
				siteScroll.html = $('html');
				siteScroll.htmlBody = $('html, body');
				siteScroll.ssCanvas;
				siteScroll.ssOverlay;

			}			
		},
		self = this,
			defaults = {
	       		injectContainer : $('#inject-me'),
	       		canvasHeight : $(window).height() *.80,
				overlay : true,
				init: function() {},
				complete: function() {},
				click: function() {},
				keypress: function() {},
			}
		;
		siteScroll.init();

		$.extend(defaults, params);

		if (typeof defaults.init === 'function') {
			defaults.init(self);
		}

        if (window.setUp) {
            window.setUp();
        }

		/*
		setTimeout(function () {
			$('#wrapper').html2canvas({
				logging: true,
				profile: false,
				useCORS: false,
				complete:function () {
					$('#inject-me').append(canvas);
				}
			})
		},200);*/


		setTimeout(function () {
			html2canvas( [ document.getElementById(self.attr('id')) ], {
				onrendered: function( canvas ) {
			       defaults.injectContainer.append( canvas );
			       siteScroll.ssCanvas = defaults.injectContainer.find('canvas');

			       siteScroll.ssCanvas.css({'height' : defaults.canvasHeight});

		       		if (defaults.overlay === true) {
						defaults.injectContainer.prepend('<div id="ss-overlay"></div>');
						siteScroll.ssOverlay = $('#ss-overlay');

						var percentage = siteScroll.win.height() / siteScroll.html.height();

						siteScroll.ssOverlay
							.width(siteScroll.ssCanvas.width())
							.height(parseInt(siteScroll.win.height(),0) * percentage)
						;
					}

			    }
			});

		},100);

		var scrollThePage = {
			now : function (event, thisEl) {

				var y,
					z,
					canvas,
					canHeight,
					divHeight,
					derp,
					thisEl,
					htmlHeight,
					winHeightHalf;

				y = event.clientY;

				canvas = siteScroll.ssCanvas;
				canHeight = parseInt(canvas.height(),0);
				htmlHeight = parseInt(siteScroll.html.height(),0);
				winHeightHalf = parseInt(siteScroll.win.height(),0) / 2;

				y -= parseInt(canvas.offset().top - siteScroll.win.scrollTop() ,0);
				z = y/canHeight;
				derp = (z*htmlHeight) - winHeightHalf;

				siteScroll.htmlBody.scrollTop(derp);

				return false;

			}
		};

		var thisEl,
			ssClicked = function (event, el) {

				thisEl = el;
				scrollThePage.now(event, thisEl);

				siteScroll.html.mousemove(function (event, thisEl) {
			   		event.preventDefault();
			   		scrollThePage.now(event, thisEl);
				});

				scrollThePage.now(event, thisEl);
				return false;
			}
		;


		defaults.injectContainer.on('mousedown', 'canvas', function (event) {
			event.preventDefault();
			thisEl = $(this);
			ssClicked(event, thisEl);
		});
		defaults.injectContainer.on('mousedown', '#ss-overlay', function (event) {
			event.preventDefault();
			thisEl = $(this);
			ssClicked(event, thisEl);
		});

		siteScroll.htmlBody.mouseup(function (event) {
			siteScroll.html.unbind('mousemove');
			return false;
		});

		var moverPercent;
		var moveOverlay = {

			now : function () {
				moverPercent = siteScroll.ssCanvas.height()/ self.height()
				siteScroll.ssOverlay.css({
					'top' : siteScroll.win.scrollTop() * moverPercent + 'px'
				})

			}

		}

		if (defaults.overlay === true) {
			siteScroll.win.scroll(function () {
				moveOverlay.now();
			});
		}


		// The following shit?  Yeah, I have no idea what the fuck it is, or does.
		/*
	    function Plugin(element, options) {
	        this.element = element;

	        this.options = $.extend( {}, defaults, options) ;

	        this._defaults = defaults;
	        this._name = plugName;

	        this.init();

	    }

	    Plugin.prototype.init = function () {

	    };

	    $.fn[self] = function ( options ) {
	        return this.each(function () {
	            if (!$.data(this, 'plugin_' + self)) {
	                $.data(this, 'plugin_' + self, 
	                new Plugin( this, options ));
	            }
	        });
	    }
	    */


	    return this;
	};