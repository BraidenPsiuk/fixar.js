// --------------------------------------------------------[ INFO ]--------------------------------------------------------
// 
//        Date: 11/25/2020
//       Title: Three.js - Keep Aspect Ratio
//      Author: BRAIDEN S. PSIUK
//      Credit: (please refer to the very bottom of this file)
//     Version: 1.4
//     License: Feel free to use this code for anything (even commercial use), credit completely optional but appriciated!
//   Libraries: Three.js (r122)
// Description: This pen contains a resize() function that helps maintain aspect ratio in projects that uses the canvas
//              element, such as Three.js projects. You can see the effect in action by resizing the window. Notice the
//              pillarboxing/letterboxing effect! I cobbled this example together after trying and failing to create this
//              effect strictly using CSS properties, specifically 'object-fit'. This seems like a better solution, and
//              you can even adjust the aspect ratio on the fly. I hope to use this in electron-based applications and
//              other web projects, and I'd love to see others fork it and do cool things with it!
// 
// ------------------------------------------------------------------------------------------------------------------------


// ---------------------------------------------------[ CONFIGURE HERE ]---------------------------------------------------
// -[ CONFIGURABLE VARIABLES ]-
let ASPECT_RATIO = 16/9;
let QUALITY = 1;
const CAMERA_FOV = 75; // We'll use Three.js's default FOV from their documentation
const CAMERA_NCP = 0.1;
const CAMERA_FCP = 100; // We can even get away with about 4 here. Three.js uses 1000. I thought that was overkill here!
const CAMERA_POSITION_Z = 3; // Three.js uses a traditional coordinate system as opposed to a Z-up coordinate system...

// -[ GLOBALLY ACCESSABLE FLAGS ]-
let FLAG_needToResize=true; // Set to true so that the resize() function runs once, and then again only when needed
// ------------------------------------------------------------------------------------------------------------------------










// --------------------------[ DEFINE HANDLES FOR THE TWO DIVS THAT WILL ENCAPSULATE OUR CANVAS ]--------------------------
const container = document.getElementById("container"); // outer-most div that holds our wrapper div
const wrapper = document.getElementById("wrapper"); // inner-most div that holds our Three.js canvas
// ------------------------------------------------------------------------------------------------------------------------


// --------------[ DEFINE SCENE, CAMERA, RENDERER, AND OTHER INSTANCES TYPICALLY FOUND IN THREE.JS PROJECTS ]--------------
// Define our scene
const scene = new THREE.Scene();
// Define our camera
const camera = new THREE.PerspectiveCamera(CAMERA_FOV, wrapper.clientWidth / wrapper.clientHeight, CAMERA_NCP, CAMERA_FCP);
// Define our renderer with a clear background and antialiasing enabled, and append it's domElement to our wrapper div
const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
renderer.domElement.id = "three-canvas";
wrapper.appendChild(renderer.domElement); // This line creates our canvas

// Define the geometry for our cube
const geometry = new THREE.BoxGeometry();
// Define the material for our cube
const material = new THREE.MeshBasicMaterial( { color: "#000" } );
// Define our cube
const cube = new THREE.Mesh( geometry, material );
let lagCubes=[];
for (let i=0; i<6000; i++) {
  lagCubes.push(new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: '#'+Math.random().toString(16).substr(2,6) } ) ));
  scene.add(lagCubes[i]);
  lagCubes[i].position.x = getRandomArbitrary(-20, 20);
  lagCubes[i].position.y = getRandomArbitrary(-20, 20);
  lagCubes[i].position.z = getRandomArbitrary(-20, -3);
}
// Add our cube to our scene
scene.add( cube );
// Move our camera back 5 units so it doesn't intersect with the midpoint of our cube
camera.position.z = CAMERA_POSITION_Z;
// Define a handle for our canvas, now that it's initialized and accessible via the DOM
const canvas = document.getElementById("three-canvas");
// ------------------------------------------------------------------------------------------------------------------------


let stats = new Stats();
stats.setMode(0);

stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0';
stats.domElement.style.top = '0';

// document.body.appendChild( stats.domElement );
wrapper.appendChild( stats.domElement );


// -----------------------------------------------[ DEFINE RESIZE FUNCTION ]-----------------------------------------------
const resize = ()=> {
  const width = canvas.width, height = canvas.height;
  let newWidth = wrapper.clientWidth, newHeight = wrapper.clientHeight;
  newWidth = (newWidth>newHeight*ASPECT_RATIO) ? newHeight*ASPECT_RATIO : newWidth;
  newHeight = (newWidth<=newHeight*ASPECT_RATIO) ? newWidth/ASPECT_RATIO : newHeight;
  renderer.setPixelRatio( window.devicePixelRatio/QUALITY );
  if (width != newWidth || height != newHeight) {
    camera.aspect = newWidth/newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  }
  FLAG_needToResize = false;
}
// ------------------------------------------------------------------------------------------------------------------------


// ------------------------------------------[ DEFINE STANDARD ANIMATE FUNCTION ]------------------------------------------
const animate = ()=> {
  if (FLAG_needToResize) resize(); // Only run the resize function when we need to

  // At this point, you're free to do whatever you'd like here!
  
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render( scene, camera );
  stats.update();
  requestAnimationFrame(animate);
}; animate(); // Define the animate() function and call it immediately
// ------------------------------------------------------------------------------------------------------------------------


// ------------------------------------------------[ RESIZE EVENT HANDLER ]------------------------------------------------
window.onresize = ()=> {
  FLAG_needToResize = true;
};
// ------------------------------------------------------------------------------------------------------------------------










// ----------------------------------------------[ *** BONUS FUNCTIONS! *** ]----------------------------------------------
// You can test these out by calling them in the animate() function


// Change the aspect ratio on the fly. Use it like this: setAspectRatio(4,3);
function setAspectRatio(x,y) {
  ASPECT_RATIO = x/y;
  FLAG_needToResize = true;
};


// Change the pillarbox/letterbox color. Use it like this: setWrapperColor("#00FF00");
function setWrapperColor(color) {
  wrapper.style.backgroundColor = color;
};


// Change the rendering quality. Helps when running on a computer with limited resources. Use it like this: setQuality(2);
function setQuality(quality) {
  QUALITY = quality;
  FLAG_needToResize = true;
};


// NOTE: For these functions, I defined them using the 'function' keyword, so that you can simply uncomment them and
//       call them in the animate function. This works because functions defined using the 'function' keyword get hoisted
//       above all the other code. You can use the other format to define these functions as seen above, but you'll have
//       to move the definitions to the top of the file. Otherwise, you'll get a nasty "Uncaught ReferenceError:
//       Cannot access '[whichever function you're trying to use]' before initialization" error.
// ------------------------------------------------------------------------------------------------------------------------


// ***CREDIT***
// I originally came across this webpage in my attempt to use CSS to maintain the aspect ratio:
// https://observablehq.com/@severo/sizes-of-canvas-images-and-svg
// I adapted the above code from the "Canvas as object-fit: contain on responsive image" section of that page.
// It turns out that the person who wrote that example also adapted it and gave credit, it came from here:
// https://webglfundamentals.org/webgl/lessons/webgl-anti-patterns.html
// This page was a great read as well, and I would highy recommend checking out WebGL Fundamentals's other examples!

// https://stackoverflow.com/questions/31407778/display-scene-at-lower-resolution-in-three-js


function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}



wrapper.addEventListener("click", ()=>{
  if (QUALITY==1) {
    setQuality(2);
  } else {
    setQuality(1);
  }
  
  // setAspectRatio(Math.floor(Math.random() * (16 - 1 + 1) + 1),Math.floor(Math.random() * (16 - 1 + 1) + 1)); // Random numbers between 1 and 16
  setWrapperColor('#'+Math.random().toString(16).substr(2,6));
});