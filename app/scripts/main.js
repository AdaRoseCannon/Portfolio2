/* global THREE */

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

function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

(function () {
    'use strict';

    require(['jquery','jqueryeasing', 'requestAnimSingleton', 'bootstrapScrollspy'], function ($, easings, AnimRequest, scrollspy) {
        $('.page').css({
            'padding-top': $('#myNav').height()
        });
        $('.page').each(function (a,b) {
            var title = b.dataset.pagetitle;
            if(title) {
                var key = title.replace(/[^a-zA-Z0-9-]/ig,'').toLowerCase();
                b.id = key;
                var newLink = $('<li><a href="#' + key + '">' + title + '</a></li>');
                newLink.find('a').on('click', function (e) {
                    e.preventDefault();
                    var $anchor = $(this);
                    $('html, body').stop().animate({
                        scrollTop: $($anchor.attr('href')).offset().top
                    }, 3000,'easeOutExpo');
                })
                $('#insertNavHere').append(newLink);
            }
        });
        $('body').scrollspy();
        var doer = new AnimRequest();
        $(window).bind('mousewheel', function () {
            $('html, body').stop();
        });
        $(window).on('scroll', function () {
            doer.once('scroll', function () {

            });
        });
        require(['bg1'], function (renderer) {
            $('.page1').append(renderer.domElement);
            renderer.domElement.classList.add('background');
            var doer = new AnimRequest('bg1', function () {
                renderer.render(renderer.scene, renderer.camera);
                renderer.sceneObjects.cube.rotation.y+=0.1;
            });
            doer.start();
        });
    });
})();