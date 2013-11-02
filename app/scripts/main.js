/* global Masonry*/

require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        jqueryeasing: '../bower_components/jquery.easing/js/jquery.easing',
        three: '../bower_components/threejs/build/three',
        chroma: '../bower_components/chroma-js/chroma',
        bootstrapAffix: '../bower_components/sass-bootstrap/js/affix',
        bootstrapAlert: '../bower_components/sass-bootstrap/js/alert',
        bootstrapButton: '../bower_components/sass-bootstrap/js/button',
        bootstrapCarousel: '../bower_components/sass-bootstrap/js/carousel',
        bootstrapCollapse: '../bower_components/sass-bootstrap/js/collapse',
        bootstrapDropdown: '../bower_components/sass-bootstrap/js/dropdown',
        bootstrapModal: '../bower_components/sass-bootstrap/js/modal',
        bootstrapPopover: '../bower_components/sass-bootstrap/js/popover',
        bootstrapScrollspy: '../bower_components/sass-bootstrap/js/scrollspy',
        bootstrapTab: '../bower_components/sass-bootstrap/js/tab',
        bootstrapTooltip: '../bower_components/sass-bootstrap/js/tooltip',
        bootstrapTransition: '../bower_components/sass-bootstrap/js/transition'
    },
    shim: {
        bootstrapAffix: {
            deps: ['jquery']
        },
        bootstrapAlert: {
            deps: ['jquery', 'bootstrapTransition']
        },
        bootstrapButton: {
            deps: ['jquery']
        },
        bootstrapCarousel: {
            deps: ['jquery', 'bootstrapTransition']
        },
        bootstrapCollapse: {
            deps: ['jquery', 'bootstrapTransition']
        },
        bootstrapDropdown: {
            deps: ['jquery']
        },
        bootstrapModal:{
            deps: ['jquery', 'bootstrapTransition']
        },
        bootstrapPopover: {
            deps: ['jquery', 'bootstrapTooltip']
        },
        bootstrapScrollspy: {
            deps: ['jquery']
        },
        bootstrapTab: {
            deps: ['jquery', 'bootstrapTransition']
        },
        bootstrapTooltip: {
            deps: ['jquery', 'bootstrapTransition']
        },
        bootstrapTransition: {
            deps: ['jquery']
        }
    }
});

(function () {
    'use strict';
    require(['jquery'],function ($) {
        $('.page').css({
            'padding-top': $('#myNav').height()
        });
        require(['jqueryeasing', 'requestAnimSingleton', 'bootstrapScrollspy', 'bootstrapCollapse'], function (easings, AnimRequest, scrollspy, bootstrapCollapse) {
            var tops = [];
            var timeOuts = [];
            $('.page').each(function (a,b) {
                var title = b.dataset.pagetitle;
                if(title) {
                    var key = title.replace(/[^a-zA-Z0-9-]/ig,'').toLowerCase();
                    b.id = key;
                    var newLink = $('<li><a href="#' + key + '">' + title + '</a></li>');
                    $('#insertNavHere').append(newLink);
                }
            });
            $('.navbar-collapse a, .navbar-nav a').on('click', function (e) {
                e.preventDefault();
                $('.navbar-collapse').toggleClass('in collapse');
                console.log('sending click');
                var $anchor = $(this).attr('href');
                $('html, body').stop().animate({
                    scrollTop: $($anchor).offset().top
                }, 3000,'easeOutExpo');
            });

            var doer = new AnimRequest();
            $(window).bind('mousewheel', function () {
                $('html, body').stop();
            });
            $( window ).resize(function() {
                doer.once('resize', function () {
                    tops = [];
                    $('[data-spy="scroll"]').each(function () {
                        $(this).scrollspy('refresh');
                    });
                    $(window).scroll();
                });
            });

            doer.once('firstFrame', function () {
                $(window).scroll();
            });

            $(window).on('scroll', function () {
                doer.once('scroll', function () {
                    window.clearTimeout(timeOuts[0]);
                    timeOuts[0] = window.setTimeout(function () {
                        var pos = $(window).scrollTop();
                        if (tops.length === 0) {
                            $('.page').each(function (a,b) {
                                tops[a] = {el: b, top: $(b).offset().top};
                            });
                        }
                        var t = tops.map(function (a) {return {el: a.el, top: Math.abs(pos - a.top)};}).sort(function (a, b) {return (a.top - b.top);});
                        for(var e in t) {
                            t[e].el.classList.remove('active');
                        }
                        t[0].el.classList.add('active');
                        var nextTop = $(t[0].el).offset().top;
                        if (Math.abs(nextTop - pos) > 30) {
                            $('html, body').stop().animate({
                                scrollTop: nextTop
                            }, 1000,'easeOutExpo');
                        }
                    }, 500);
                });
            });

            var topicBox = $('.topicBox');
            var topicBalls = [];
            $.get('http://api.klout.com/v2/user.json/26458652576095451/topics?key=27vfh8jqjqsga2tqyztgwvm4', function (data) {
                data.forEach(function (d, i) {
                    var newTopic = document.createElement('div');
                    newTopic.innerHTML = '<p>' + d.displayName + '</p>';
                    newTopic.style.height = newTopic.style.width = ((20 + (data.length-i-1)*3)*6)+'px';
                    newTopic.classList.add('topicBall');
                    topicBalls.push(newTopic);
                });
                topicBox.append(topicBalls.sort(function () {
                    return Math.random() - 0.5;
                }));
                new Masonry( topicBox.get(0) , {
                    itemSelector: '.topicBall',
                    columnWidth: 10
                });
            }, 'jsonp');
        });
    });
})();