/**
 * Created by Administrator on 2015/6/11.
 */
/* page */
$(function () {
    var audio = {
        init: function (src, config) {
            var options_audio = $.extend({
                loop: true,
                preload: "auto",
                src: src,
                autoplay: true
            }, config);
            var context = this;

            this._audio = new Audio();

            for (var key in options_audio) {
                if (options_audio.hasOwnProperty(key) && (key in context._audio)) {
                    context._audio[key] = options_audio[key];
                }
            }
            context.bind();
            context._audio.load();
        },
        bind: function () {
            var context = this, timeoutId;
            this._audio.addEventListener('canplaythrough', function () {
                clearTimeout(timeoutId);
                context.canPlay = true;
            }, false);
            this._audio.addEventListener('error', function () {
                clearTimeout(timeoutId);
                context.error = true;
            });
            this._audio.addEventListener('play', function () {
                $('.J_mp3').addClass('fadeRound').removeClass('close');
            });
            this._audio.addEventListener('pause', function () {
                $('.J_mp3').removeClass('fadeRound').addClass('close');
            });
            timeoutId = setTimeout(function () {
                context.timeout = true;
            }, 1000);
        },
        play: function () {
            this._audio.play();
        },
        pause: function () {
            this._audio.pause();
        }
    };

    var pics = [
        './images/arrow.png',
        './images/bg1.jpg',
        './images/bg2.jpg',
        './images/bg3.jpg',
        './images/bg4.jpg',
        './images/bg5.jpg',
        './images/bg6.jpg',
        './images/bg7.jpg',
        './images/gth.png',
        './images/nzdm_big.png',
        './images/nzdm_small.png',
        './images/p1-1-1.png',
        './images/p1_03.png',
        './images/p2-1.png',
        './images/p2-2.png',
        './images/p2-3.png',
        './images/p2-4.png',
        './images/p2_ren.png',
        './images/p4_1.png',
        './images/p4_2.png',
        './images/p4_3.png',
        './images/p4_4.png',
        './images/p5-1-2.png',
        './images/p5-2.png',
        './images/p5-3.png',
        './images/p5-4.png',
        './images/p5-10.png',
        './images/p6-1-2.png',
        './images/p6_03.png',
        './images/p6_06.png',
        './images/p6_07.png',
        './images/p6_08.png',
        './images/p7-1.png',
        './images/p7-2.png',
        './images/p7-3.png',
        './images/p7-4.png',
        './images/p7_05.png',
        './images/p8_1.png',
        './images/p8-2-1.png'
    ];

    var loader = {
        init: function () {
            this._loadImages(pics, function () {
                $(".loading").hide();
                $('.global').show();
                layout.init();
            });
        },
        _loadImages: function (arr, callback) {
            var newimages = [], loadedimages = 0;
            var context = this;

            function imageloadpost() {
                var percent = loadedimages / arr.length;
                if (loadedimages == arr.length - 1) {

                    context._drawLoadProgress(1);
                    callback();
                    return;
                } else {
                    loadedimages++;
                }
                context._drawLoadProgress(percent);
            }

            for (var i = 0; i < arr.length; i++) {
                newimages[i] = new Image();
                newimages[i].src = arr[i];
                newimages[i].onload = function () {
                    imageloadpost();
                };
                newimages[i].onerror = function () {
                    imageloadpost();
                };
            }
        },
        _drawLoadProgress: function (w) {
            var num = Math.floor(w * 100) >= 100 ? 100 : Math.floor(w * 100);
            $('.loading-progress').css({width: num + '%'});
            $(".loading-num").html(num + "%");
        }
    };


    var layout = window.layout = {
        timer: null,
        animate: function (i) {
            var $layout = $(".global>.layout");

            if (i == $layout.length - 1) {
                $(".swipe_tip").removeClass("fadeOutUp");
                $('.qr').hide();
            } else {
                $(".swipe_tip").addClass("fadeOutUp");
                $('.qr').show();
            }
        },
        init: function () {
            var context = this;
            var initialSlide = 0;
            this.swiper = new Swiper('body', {
                wrapperClass: 'global',
                slideClass: 'layout',
                mode: 'horizontal',
                initialSlide: initialSlide,
                noSwiping: true,
                preventClicksPropagation: false,
                onSlideChangeStart: function (swiper, direction) {
                    context.animate(swiper.activeIndex);
                }
            });

            this.animate(initialSlide);
            audio.play();
            $(document).one("touchstart", function () {
                audio.play();
            });

        }
    };

    loader.init();
    audio.init('./images/bg.mp3');
    var touch = ("createTouch" in document);
    var eventName = touch ? "touchend" : "mouseup";
    $(document).on(eventName, '.J_mp3', function (event) {
        event.stopPropagation();
        if (audio._audio.paused || audio._audio.ended) {
            audio.play();
        } else {
            audio.pause();
        }
    });
});