/* global THREE */

require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
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

    function getDocHeight() {
        var D = document;
        return Math.max(
            D.body.scrollHeight, D.documentElement.scrollHeight,
            D.body.offsetHeight, D.documentElement.offsetHeight,
            D.body.clientHeight, D.documentElement.clientHeight
        );
    }

    require(['scene', 'requestAnimSingleton'], function (render ,AnimRequest) {
        render.renderer.autoClear = false;
        var cubes = [];
        for (var i = 0; i < 100; i++) {
            cubes[i] = new THREE.Mesh( new THREE.CubeGeometry(15, 15, 15 ), new THREE.MeshLambertMaterial({color: 0xff0000}) );
            cubes[i].position.y = -1 * getDocHeight()*Math.random() + 200;
            cubes[i].position.z = -Math.random() * 1000;
            cubes[i].position.x = (Math.random() - 0.5) * 2 * cubes[i].position.z;
            render.scene.add(cubes[i]);
        }

        var doer = new AnimRequest('renderloop', function () {
            render.renderer.render(render.scene, render.camera);
        });
        doer.start();
        $('body').append(render.renderer.domElement);
        $(window).on('scroll', function () {
            doer.once('scroll', function () {
                render.camera.position.y = -window.scrollY/10;
            });
        });
        render.renderer.domElement.classList.add('background');
    });
})();