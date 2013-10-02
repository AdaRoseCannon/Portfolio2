/*global define, THREE, Modernizr*/
define(['three'], function() {
    'use strict';

    var scene = new THREE.Scene();
    var WIDTH = 480;
    var HEIGHT = WIDTH * document.documentElement.clientHeight / document.documentElement.clientWidth;
    var VIEW_ANGLE = 45;
    var ASPECT = WIDTH / HEIGHT;
    var NEAR = 0.1;
    var FAR = 10000;
    var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    var renderer;
    if (Modernizr.webgl) {
        renderer = new THREE.WebGLRenderer();
    } else if (Modernizr.canvas) {
        renderer = new THREE.CanvasRenderer();
    }
    renderer.setSize(WIDTH, HEIGHT);
    //var camera = new THREE.OrthographicCamera( WIDTH / - 1, WIDTH / 1, HEIGHT / 1, HEIGHT / - 1, NEAR, FAR );
    camera.position.z = 300;
    camera.position.y = 300;
    camera.lookAt({x: 0, y: 0, z: 0});

    var pointLight = new THREE.PointLight(0xFFFFFF);
    pointLight.position = {x: 10, y: 500, z: 130};

    // add to the scene
    scene.add(camera);
    scene.add(pointLight);
    
    return {renderer: renderer, scene: scene, camera: camera};
});