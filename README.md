fixar.js (NPM README)
========

![](/img/fixar-logo-hires.png)

![GitHub](https://img.shields.io/badge/Supported%3A-Three.js-brightgreen)
![GitHub](https://img.shields.io/badge/Currently%20Unsupported%3A-Pixi.js%2C%20Several%20other%20libraries-red)

![GitHub file size in bytes](https://img.shields.io/github/size/BraidenPsiuk/fixar.js/fixar.min.js?label=minzipped%20size)
![GitHub](https://img.shields.io/github/license/BraidenPsiuk/fixar.js)

![GitHub Repo stars](https://img.shields.io/github/stars/BraidenPsiuk/fixar.js?color=yellow)

#### JavaScript rendering tools library. Designed for use with Three.js. ####

FixAR Fixes your Aspect Ratio.

The aim of the project is to create an easy to use, lightweight JavaScript library that pairs nicely with other libraries that render to a canvas, such as Mr. Doob's Three.js.

I've always dreamed of making 3D visualizations and games in JavaScript. Three.js provides the means to do these things in a graspable way, but I've found that browser window resizes can be difficult to develop around. Users can resize their window at any time, which can introduce problems if you intended for your scene to be viewed at a specific aspect ratio.

That's where this library comes in! By automatically setting up letterboxing/pillarboxing, you no longer have to worry about resizes, nor do you need to call any kind of update() functions!
This library also includes a few other neat features:
- Change the letter/pillarbox color
- Adjust resolution
- Change AR on the fly

### Usage ###

Explain what the code below does

We can have 2 import methods:
- CDN (for websites)
- Local (for Electron apps)
```sh
npm i fixar
```

```javascript
import * as THREE from './js/three.module.js';

let camera, scene, renderer;
let geometry, material, mesh;

init();

function init() {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
	camera.position.z = 1;

	scene = new THREE.Scene();

	geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	material = new THREE.MeshNormalMaterial();

	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setAnimationLoop( animation );
	document.body.appendChild( renderer.domElement );

}

function animation( time ) {

	mesh.rotation.x = time / 2000;
	mesh.rotation.y = time / 1000;

	renderer.render( scene, camera );

}
```