import * as THREE from "https://unpkg.com/three@latest/build/three.module.js";
import * as FIXAR from "../../fixar.js";



const viewport = new FIXAR.Viewport({
    // wrapperColor: `#0000FF`,
    ar: 16/10
}); viewport.init();

const scene = new THREE.Scene(); // Define our scene
const camera = new THREE.PerspectiveCamera(75, viewport.wrapper.clientWidth / viewport.wrapper.clientHeight, 0.1, 100); // Define our camera
const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true}); // Define our renderer with a clear background and antialiasing enabled

viewport.registerComponents("THREE", camera, renderer);

const geometry = new THREE.BoxGeometry(); // Define the geometry for our cube
const material = new THREE.MeshBasicMaterial( { color: "#00FF00" } ); // Define the material for our cube
const cube = new THREE.Mesh( geometry, material ); // Define our cube
scene.add( cube ); // Add our cube to our scene
camera.position.z = 3; // Move our camera back 3 units so it doesn't intersect with the midpoint of our cube

viewport.resize();
viewport.autoResize();

const animate = ()=> {

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // viewport.setWrapperColor('#'+Math.random().toString(16).substr(2,6));

    renderer.render( scene, camera );

    requestAnimationFrame(animate);
};  animate(); // Define the animate() function and call it immediately