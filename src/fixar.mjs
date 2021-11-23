// Dev Configuration
const DEV_MODE = true;
const DEBUG_SHOW_SUCCESS_MESSAGES = DEV_MODE;



const FIXAR_STYLES = {
    "wrapper": {
        "position": "absolute",
        "width": "100%",
        "height": "100%",
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center"
    },
    "container": {
        "display": "block",
        "backgroundColor": "#FFF"
    }
};

const LOADED_LIBS = {};
const LIB_IDENTIFIERS = { // Supply a short name for each supported graphics library along with a unique class from that library used to identify it
    "THREE": "Object3D", // Explanation: "Object3D" is one of the most common, deeply-rooted classes in Three.js, it will likely never be removed from the API
    "PIXI": "ProjectionSystem", // Explanation: idk it just works for now ¯\_(ツ)_/¯ - HEY MAYBE USE APPLICATION! seems like a core part of their docs
    // What about Phaser CE?
    "PHASER3": "Game", // They've really been pushing ES6 and NPM within the last few years but Skypack seems broken atm? :( Explanation: "Game" is THE most common class in Phaser3, it will likely never be removed from the API
    "BABYLON": "PhysicsImpostor" // Explanation: Seemed pretty sus, not gonna lie
    
    
    // ...
};
export const use = (...libs) => { // Allows FIXAR to access graphics rendering libraries
    for (const lib of libs) {
        let supported = false;
        for (const [key, value] of Object.entries(LIB_IDENTIFIERS)) {
            if (lib[value]) {
                supported = true;
                if (!LOADED_LIBS[key]) {
                    LOADED_LIBS[key] = lib;
                    if (DEBUG_SHOW_SUCCESS_MESSAGES) console.log(`%cSuccessfully loaded the ${key} library!`, "color:green");
                } else {
                    console.warn("Library already provided, it has been ignored");
                }
            }
        }
        if (!supported) console.warn("Library unsupported");
    }
};



export class Viewport {
    constructor({
        ar = 16/9,
        renderingLibrary = "THREE",
        quality = 1,
        wrapperColor = `#000000`,
        camera = null,
        renderer = null
    }={}) {
        // trim/uppercase the rendering library string in case the user passed it in slightly incorrectly
        renderingLibrary = renderingLibrary.trim().toUpperCase();
        // Check if the rendering library type is supported
        if (!Object.keys(LIB_IDENTIFIERS).includes(renderingLibrary)) throw new Error(`Rendering library "${renderingLibrary}" is not supported`);
        // Check if the rendering library the user wants to use has been previously loaded using FIXAR.use()
        if (Object.keys(LOADED_LIBS).includes(renderingLibrary)) {
            if (DEBUG_SHOW_SUCCESS_MESSAGES) console.log("%cSuccessfully initialized Viewport!", "color:green");
        } else {
            throw new Error(`The "${renderingLibrary}" rendering library hasn't been provided to FIXAR. You must first call FIXAR.use(${renderingLibrary}) before attempting to create a viewport using that rendering library.`);
        }

        this._NEED_TO_RESIZE = true;
        this._INITIALIZED = false;

        this._ar = ar;
        this._renderingLibrary = renderingLibrary;
        this._quality = quality;
        this._wrapperColor = wrapperColor;
        this.registerComponents(camera, renderer);


        
        // Initialize main viewport components
        this._container = document.createElement("div");
        this._container.setAttribute("id", "fixar-container");
        for (const [key, value] of Object.entries(FIXAR_STYLES.container)) {
            this._container.style[key] = value;
        }
        this._wrapper = document.createElement("div");
        this._wrapper.setAttribute("id", "fixar-wrapper");
        for (const [key, value] of Object.entries(FIXAR_STYLES.wrapper)) {
            this._wrapper.style[key] = value;
        }
        this._wrapper.style.backgroundColor = this._wrapperColor;

        this._container.appendChild(this._wrapper);
    }

    registerComponents = (camera, renderer)=>{
        this.camera = camera;
        this.renderer = renderer;
    }
    
    set camera(camera) {
        if (camera === null) {
            this._camera = null;
        } else {
            switch (this._renderingLibrary) {
                case "THREE":
                    if (camera.constructor.name === LOADED_LIBS.THREE.PerspectiveCamera.name || camera.constructor.name === LOADED_LIBS.THREE.OrthographicCamera.name) {
                        this._camera = camera;
                    } else {
                        throw new Error(`Please provide ${LOADED_LIBS.THREE.PerspectiveCamera.name} or ${LOADED_LIBS.THREE.OrthographicCamera.name}, you provided ${camera.constructor.name}`);
                    }
                    break;
            }
        }
    } get camera() {
        return this._camera;
    }

    set renderer(renderer) {
        if (renderer === null) {
            this._renderer = null;
        } else {
        switch (this._renderingLibrary) {
            case "THREE":
                if (renderer.constructor.name === LOADED_LIBS.THREE.WebGLRenderer.name) {
                    this._renderer = renderer;
                    this._wrapper.appendChild(this._renderer.domElement); // kinda questioning position absolute for wrapper...
                } else {
                    throw new Error(`Please provide ${LOADED_LIBS.THREE.WebGLRenderer.name}, you provided ${renderer.constructor.name}`);
                }
                break;
        }
    }
    } get renderer() {
        return this._renderer;
    }
};











































// export class Viewport {
//     constructor({
//         ar = 16/9,
//         mode = `THREE`,
//         quality = 1,
//         wrapperColor = `#000000`,
//         CAMERA_FOV = 75, // We'll use Three.js's default FOV from their documentation
//         CAMERA_NCP = 0.1,
//         CAMERA_FCP = 100 // Three.js normally uses 1000, but that's a little overkill
//     }={}) {
//         this._FLAG_needToResize=true;
//         this._FLAG_hasBeenInitialized=false;

//         this._ar=ar;
//         this._quality=quality;
//         this._mode=mode;
//         this._wrapperColor=wrapperColor;
//         this._CAMERA_FOV=CAMERA_FOV;
//         this._CAMERA_NCP=CAMERA_NCP;
//         this._CAMERA_FCP=CAMERA_FCP;

//         if (!__BETA_oneViewportCreated) {__BETA_oneViewportCreated=true;} else {console.error("FIXAR Error: ALREADY USED ONE VIEWPORT");}
//     }



//     get ar() { return this._ar; }
//     set ar(ar) {
//         this._ar = ar;
//         this._FLAG_needToResize = true; 
//     }
//     setAr = (x, y)=> {
//         if (y === undefined) {
//             this._ar = x;
//         } else {
//             this._ar = x/y;
//         }
//         this._FLAG_needToResize = true;
//     }

//     get mode() { return this._mode; }
//     // set mode(mode) { console.error("FIXAR Error: You cannot modify mode after it has been initialized"); }

//     get needToResize() { return this._FLAG_needToResize; }
//     set needToResize(needToResize) { this._FLAG_needToResize = needToResize; }

//     get wrapper() {
//         if (this._wrapper) {
//             return this._wrapper
//         } else {
//             console.error(`FIXAR Error: _wrapper is not defined. Did you call init() on your FIXAR Viewport?`);
//         }
//     }

//     get quality() { return this._quality; }
//     set quality(quality) { this._quality = quality; }
//     setQuality = (quality)=> {
//         this._quality = quality;
//     }

//     get wrapperColor() { return this._wrapperColor; }
//     set wrapperColor(color) {
//         this._wrapperColor = color;
//         this._wrapper.style.backgroundColor = this._wrapperColor;
//     }
//     setWrapperColor = (color)=> {
//         this._wrapperColor = color;
//         this._wrapper.style.backgroundColor = this._wrapperColor;
//     }



//     init = ()=> {
//         this._styles = document.createElement("style");
//         this._styles.innerHTML = FIXAR_STYLES;
//         document.body.appendChild(this._styles);

//         this._container = document.createElement(`div`);
//         this._container.id = `fixar-container`;

//         this._wrapper = document.createElement(`div`);
//         this._wrapper.id = `fixar-wrapper`;
//         this._wrapper.style.backgroundColor = this._wrapperColor;

//         document.body.appendChild(this._container);
//         document.getElementById(`fixar-container`).appendChild(this._wrapper);
//     }

//     autoResize = ()=> { // TURN AUTORESIZE INTO AN OPTION WHEN INITIALIZING THE VIEWPORT! MAKE IT CONFIGURABLE!
//         window.addEventListener('resize', this.resize);
//         // Will need to add a small timeout to trigger one last resize after a few ms for when devtools is not open, for electron apps
//     }

//     registerComponents = (mode, camera, renderer)=> {
//         switch (mode) {
//             case "THREE":
//                 this._registeredRenderer = renderer; // Create a flag to see if renderer has been registered yet, make this accessable via a getter, etc.
//                 this.wrapper.appendChild(renderer.domElement);
//                 this._registeredCamera = camera; // Create a flag to see if camera has been registered yet, make this accessable via a getter, etc.
//                 break;
//             default:
//                 console.error("FIXAR Error: Did not recognize understand the mode you supplied to FIXAR.registerComponents().");
//                 break;
//         }
//     }

//     resize = ()=> {
//             // console.log("run");
//             const width = this._wrapper.children[0].width, height = this._wrapper.children[0].height;
//             let newWidth = this._wrapper.clientWidth, newHeight = this._wrapper.clientHeight;
//             newWidth = (newWidth>newHeight*this._ar) ? newHeight*this._ar : newWidth;
//             newHeight = (newWidth<=newHeight*this._ar) ? newWidth/this._ar : newHeight;
//             this._registeredRenderer.setPixelRatio( window.devicePixelRatio/this._quality );
//             if (width != newWidth || height != newHeight) {
//             this._registeredCamera.aspect = newWidth/newHeight;
//             this._registeredCamera.updateProjectionMatrix();
//             this._registeredRenderer.setSize(newWidth, newHeight);
//             }
//       }

//   // Change the aspect ratio on the fly. Use it like this: setAspectRatio(4,3);
//   // setAspectRatio = (x,y)=> {
//   //   this.ar = x/y;
//   //   FLAG_needToResize = true;
//   // };

//     get arFormattedRatio() {
//         switch (this._ar.toString().substr(0,5)) {
//         case (`1.777`):
//             return `16/9`;
//             break;
//         case (`1.6`):
//             return `16/10`;
//             break;
//         case (`1.333`):
//             return `4/3`;
//             break;
//         case (`2.333`):
//             return `21/9`;
//             break;
//         case (`1.25`):
//             return `5/4`;
//             break;
//         case (`1.5`):
//             return `3/2`;
//             break;
//         case (`1.85`):
//             return `1.85/1`;
//             break;
//         case (`2.35`):
//             return `2.35/1 OR 47/20`;
//             break;
//         default:
//             return `Couldn't find a simplified aspect ratio for ${this._ar.toString().substr(0,5)}.`;
//             break;
//         }
//     }
// }