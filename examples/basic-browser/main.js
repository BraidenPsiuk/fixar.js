import * as THREE from "https://unpkg.com/three@latest/build/three.module.js";
import * as FIXAR from "../../fixar.js";

const viewport = new FIXAR.Viewport({
    wrapperColor: `#FF0000`,
    ar: 16/10
}); viewport.init();



const scene = new THREE.Scene(); // Define our scene
const camera = new THREE.PerspectiveCamera(75, viewport.wrapper.clientWidth / viewport.wrapper.clientHeight, 0.1, 100); // Define our camera
const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true}); // Define our renderer with a clear background and antialiasing enabled
renderer.domElement.id = "three-canvas"; // HERE FOR DEBUGGING ONLY! PLEASE REMOVE IN FUTURE VERSION!



viewport.registerCamera(camera);
viewport.registerRenderer(renderer); // Pass the THREE Renderer to the FIXAR Viewport we set up



const geometry = new THREE.BoxGeometry(); // Define the geometry for our cube
const material = new THREE.MeshBasicMaterial( { color: "#00FF00" } ); // Define the material for our cube
const cube = new THREE.Mesh( geometry, material ); // Define our cube
scene.add( cube ); // Add our cube to our scene
camera.position.z = 3; // Move our camera back 3 units so it doesn't intersect with the midpoint of our cube



const animate = ()=> {
    viewport.resize();

    // At this point, you're free to do whatever you'd like here!
  
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );

    requestAnimationFrame(animate);
};  animate(); // Define the animate() function and call it immediately

// debugger;











// if (typeof(THREE) == undefined) {console.log("yes");}

// viewport.ar = 3/4; // You can also use viewport.setAr(3, 4); or viewport.setAr(3/4);