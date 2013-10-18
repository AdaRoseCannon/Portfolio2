/* globals define */
define(['three'], function (three) {
    var scene = new THREE.Scene();
    var WIDTH = 960;
    var HEIGHT = WIDTH * document.documentElement.clientHeight / document.documentElement.clientWidth;
    var VIEW_ANGLE = 45;
    var ASPECT = WIDTH / HEIGHT;
    var NEAR = 0.1;
    var FAR = 10000;
    var sceneObjects = [];
    var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    camera.position = {x:300, y:300, z:300};
    camera.lookAt({x: 0, y: 0, z: 0});

    function addObject(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                scene.add(obj[key]);
                sceneObjects[key]=(obj[key]);
            }
        }
    }
    var pointLight = new THREE.PointLight(0xFFFFFF);
    pointLight.position = {x: 10, y: 500, z: 130};

    var cube = new THREE.Mesh( new THREE.CubeGeometry( 100, 100, 100 ), new THREE.MeshNormalMaterial({color: 0xff0000}) );
    cube.position = {x: 0, y: 0, z: 0};

    // add to the scene
    addObject({
        camera: camera,
        light: pointLight,
        cube: cube
    });
    renderer.scene = scene;
    renderer.camera = camera;
    renderer.sceneObjects = sceneObjects;
   	return renderer;
});