/* globals define */
define(['three', 'doob-perlin'], function (three, Perlin) {
	var perlin = new Perlin(true);
	function getPerlin(point, min, max, zoom) {
		var x = point.x;
		var y = point.y;
		var z = point.z;
		var noise = perlin.noise(x/(10 * zoom),y/(10 * zoom),z/(10 * zoom));
		if (noise < min) {
			noise = min;
		}
		if (noise > max) {
			noise = max;
		}
		noise = noise - min;
		noise *= 1/(max - min);
		return noise;
	}
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
    camera.position = {x:0, y:200, z:1300};
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
    pointLight.position = {x: 500, y: 500, z: 5030};

    var cube = new THREE.Mesh( new THREE.CubeGeometry( 100, 100, 100 ), new THREE.MeshNormalMaterial({color: 0xff0000}) );
    cube.position = {x: 0, y: 0, z: 0};

    var sea = new THREE.Geometry();
    var vertices = [];
    var nX = 75, nY = 30;
    var scale = 50;
    for (var x=0;x<nX;x++){
    	vertices [x] = [];
    	var h = Math.sqrt(3)/2;
	    for (var y=0;y<nY;y++){
	    	var zD = h*(y - nY/2)*scale;
	    	var xD = (x - nX/2)*scale*(300+(zD/5))/300 + scale*(0.5+0.5*(y%2));
	    	var yD = 20*scale*getPerlin({x: xD, y: zD, z: 0}, -1, 1, scale);
	    	vertices[x][y] = sea.vertices.push(new THREE.Vector3(xD, yD, zD)) - 1;
	    }
    }
    for (x=0;x<nX-1;x++){
	    for (y=0;y<nY-1;y++){
	    	sea.faces.push(new THREE.Face3(vertices[x][y], vertices[x+1][y], vertices[x][y+1]));
	    	sea.faces.push(new THREE.Face3(vertices[x+1][y], vertices[x+1][y+1], vertices[x][y+1]));
	    }
    }
	sea.computeCentroids();
	sea.computeFaceNormals();
	sea.computeVertexNormals();
	var material = new THREE.MeshLambertMaterial({
		color:  0xFFFFFF
	});
	var seaModel = new THREE.Object3D();
	seaModel.add(new THREE.Mesh(sea, material));
	seaModel.rotation.x = Math.PI;
    // add to the scene
    addObject({
        camera: camera,
        light: pointLight,
        cube: cube,
        seaModel: seaModel
    });
    renderer.scene = scene;
    renderer.camera = camera;
    renderer.sceneObjects = sceneObjects;
    var z=0;
    var oldT;
    renderer.runme = function () {
    	//console.log(Math.floor(1000/(Date.now()-oldT)));
    	oldT = Date.now();
        renderer.render(renderer.scene, renderer.camera);
        renderer.sceneObjects.cube.rotation.y+=0.01;
        z+=1;
        for(var v in sea.vertices) {
        	sea.vertices[v].y = 20*scale*getPerlin({x: sea.vertices[v].x, y: sea.vertices[v].z, z: z}, -1, 1, scale);
        }
		sea.computeVertexNormals();
		sea.computeFaceNormals();
        sea.verticesNeedUpdate = true;
        sea.normalsNeedUpdate = true;
    }
    console.log(sea);
   	return renderer;
});