import * as THREE from "https://unpkg.com/three@latest/build/three.module.js";
import * as FIXAR from "../fixar.js";

// debugger;
// viewport.ar = 3/4; // You can also use viewport.setAr(3, 4); or viewport.setAr(3/4);

const viewport = new FIXAR.Viewport({
    wrapperColor: `#FF0000`,
    ar: 16/10
}); viewport.init();

// Define our scene
const scene = new THREE.Scene();

// Define our camera
const camera = new THREE.PerspectiveCamera(75, viewport.wrapper.clientWidth / viewport.wrapper.clientHeight, 0.1, 100);

// Define our renderer with a clear background and antialiasing enabled
const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});


viewport.registerRenderer(renderer);



// debugger;