import * as FIXAR from "../../src/fixar.mjs";

import * as THREE from "https://cdn.skypack.dev/three@latest";
import * as PIXI from 'https://cdn.skypack.dev/pixi.js';
import _ from "https://cdn.skypack.dev/lodash@latest"; // Unsupported library for testing
import * as BABYLON_DEFAULT from 'https://cdn.skypack.dev/babylonjs@latest';
const BABYLON = BABYLON_DEFAULT.default; // Not sure how to avoid doing this...

// console.log(PIXI);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true}); // Define our renderer with a clear background and antialiasing enabled

FIXAR.use(THREE, PIXI); // Can be called multiple times, with as many parameters as you want.
const view1 = new FIXAR.Viewport({
    ar: 4/3,
    renderingLibrary: "THREE",
    quality: 1,
    wrapperColor: `#000000`,
    camera: camera,
    renderer: renderer
});

// view1.registerComponents( camera, renderer );
// Or,
// view1.camera = camera;
// view1.renderer = renderer;

// view1.registerComponents(new THREE.MeshBasicMaterial());



// document.body.appendChild( renderer.domElement );

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// camera.position.z = 5;

// const animate = function () {
//     requestAnimationFrame( animate );

//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;

//     renderer.render( scene, camera );
// };

// animate();



// FIXAR.use(THREE);
// const view1 = new FIXAR.Viewport();
// console.log(view1.createPerspectiveCamera(1,1,1));




// const any = (...libs)=>{
//     if (libs.length===0) throw new Error("Must provide at least one argument");

//     //VERIFY THE LIBS AND FIND THEIR MATCH
//     // warn that "lib_x" is unsupported
//     console.log(libs);
// };











// const autoDetectLib = lib => {
//     // Handle user failing to pass an arg
//     if (lib === undefined) throw new Error("Requires one argument");

//     // Try to choose from one of the (supported) external library choices
//     if (lib[LIB_MATCHES.THREE]) EXTERNAL_LIBRARY_TYPE = "THREE"; // Three.js
//     // if (lib.SOME_BABYLON_CLASS) EXTERNAL_LIBRARY_TYPE = "BABYLON"; // Babylon.js
//     // if (lib.SOME_PIXI_CLASS) EXTERNAL_LIBRARY_TYPE = "PIXI"; // PixiJS
//     // if (lib.SOME_PHASER3_CLASS) EXTERNAL_LIBRARY_TYPE = "PHASER3"; // Phaser 3
//     // if (lib.SOME_PHASER4_CLASS) EXTERNAL_LIBRARY_TYPE = "PHASER4"; // Phaser 4

//     // Failed to detect external lib
//     if (!EXTERNAL_LIBRARY_TYPE) throw new Error("Unable to recognize your graphics library, please make sure to use a supported one"); // TODO: Link to a list of supported libs
//     EXTERNAL_LIBRARY_INITIALIZED = true
//     console.log(`FIXAR successfully initialized with ${EXTERNAL_LIBRARY_TYPE}!`);
// };


// const SupportedLibraries = {
//     "3D": {
//         "THREE": "THREE",
//         "BABYLON": "BABYLON"
//     },
//     "2D": {
//         "PIXI": "PIXI",
//         "PHASER3": "PHASER3",
//         "PHASER4": "PHASER4"
//     }
// };
// const LOADED_LIBS = {};
// const LIB_IDENTIFIERS = { // Supply a short name for each supported graphics library along with a unique class from that library used to identify it
//     "THREE": "Object3D", // Explaination: "Object3D" is one of the most common, deeply-rooted classes in Three.js, it will likely never be removed from the API
//     "BABYLON": "PhysicsImpostor", // Explaination: Seemed pretty sus, not gonna lie
//     "PIXI": "ProjectionSystem" // Explaination: Seemed pretty sus, not gonna lie
// };

// const SHOW_SUCCESS_MESSAGES = true;

// export const use = (...libs) => {
//     for (const lib of libs) {
//         let supported = false;
//         for (const [key, value] of Object.entries(LIB_IDENTIFIERS)) {
//             if (lib[value]) {
//                 supported = true;
//                 if (!LOADED_LIBS[key]) {
//                     LOADED_LIBS[key] = lib;
//                     if (SHOW_SUCCESS_MESSAGES) console.log(`%cSuccessfully loaded the ${key} library!`, "color:green");
//                 } else {
//                     console.warn("Library already provided, it has been ignored");
//                 }
//             }
//         }
//         if (!supported) console.warn("Library unsupported");
//     }



    // Do stuff with the loaded libs if needed



    // External library detection
    // if (EXTERNAL_LIBRARY_ALREADY_PROVIDED) throw new Error("Cannot switch to another external library at runtime, this may change in a future version, are you using the latest release?");
    // EXTERNAL_LIBRARY_PROVIDED = true;
    // console.log("User provided an external library");
    // autoDetectLib(lib);
// };


// use(THREE, BABYLON, PIXI);
// console.log(PIXI);



// var canvas = document.body.append(document.createElement("canvas"));
// var engine = new BABYLON.default.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
// console.log(BABYLON);