const FIXAR_STYLES = `
    body {
        margin: 0;
    }

    #fixar-wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #000;
    }

    canvas {
        display: block;
        background-color: #FFF;
    }
`;

let __BETA_oneViewportCreated=false;

class Viewport {
    constructor({
        ar = 16/9,
        mode = `THREE`,
        quality = 1,
        wrapperColor = `#000000`,
        CAMERA_FOV = 75, // We'll use Three.js's default FOV from their documentation
        CAMERA_NCP = 0.1,
        CAMERA_FCP = 100 // Three.js normally uses 1000, but that's a little overkill
    }={}) {
        this._FLAG_needToResize=true;
        this._FLAG_hasBeenInitialized=false;

        // Maybe use https://www.npmjs.com/package/uuid to create a uuid to give each viewport an ID

        this._ar=ar;
        this._quality=quality;
        this._mode=mode;
        this._wrapperColor=wrapperColor;
        this._CAMERA_FOV=CAMERA_FOV;
        this._CAMERA_NCP=CAMERA_NCP;
        this._CAMERA_FCP=CAMERA_FCP;

        if (!__BETA_oneViewportCreated) {__BETA_oneViewportCreated=true;} else {console.error("FIXAR Error: ALREADY USED ONE VIEWPORT");}
    }



    get ar() { return this._ar; }
    set ar(ar) {
        this._ar = ar;
        this._FLAG_needToResize = true; 
    }
    setAr = (x, y)=> {
        if (y === undefined) {
            this._ar = x;
        } else {
            this._ar = x/y;
        }
        this._FLAG_needToResize = true;
    }

    get mode() { return this._mode; }
    // set mode(mode) { console.error("FIXAR Error: You cannot modify mode after it has been initialized"); }

    get needToResize() { return this._FLAG_needToResize; }
    set needToResize(needToResize) { this._FLAG_needToResize = needToResize; }

    get wrapper() {
        if (this._wrapper) {
            return this._wrapper
        } else {
            console.error(`FIXAR Error: _wrapper is not defined. Did you call init() on your FIXAR Viewport?`);
        }
    }

    get quality() { return this._quality; }
    set quality(quality) { this._quality = quality; }
    setQuality = (quality)=> {
        this._quality = quality;
    }

    get wrapperColor() { return this._wrapperColor; }
    set wrapperColor(color) {
        this._wrapperColor = color;
        this._wrapper.style.backgroundColor = this._wrapperColor;
    }
    setWrapperColor = (color)=> {
        this._wrapperColor = color;
        this._wrapper.style.backgroundColor = this._wrapperColor;
    }



    init = ()=> {
        this._styles = document.createElement("style");
        this._styles.innerHTML = FIXAR_STYLES;
        document.body.appendChild(this._styles);

        this._container = document.createElement(`div`);
        this._container.id = `fixar-container`;

        this._wrapper = document.createElement(`div`);
        this._wrapper.id = `fixar-wrapper`;
        this._wrapper.style.backgroundColor = this._wrapperColor;

        document.body.appendChild(this._container);
        document.getElementById(`fixar-container`).appendChild(this._wrapper);
    }

    autoResize = ()=> { // TURN AUTORESIZE INTO AN OPTION WHEN INITIALIZING THE VIEWPORT! MAKE IT CONFIGURABLE!
        window.addEventListener('resize', this.resize);
    }

    registerComponents = (mode, camera, renderer)=> {
        switch (mode) {
            case "THREE":
                this._registeredRenderer = renderer; // Create a flag to see if renderer has been registered yet, make this accessable via a getter, etc.
                this.wrapper.appendChild(renderer.domElement);
                this._registeredCamera = camera; // Create a flag to see if camera has been registered yet, make this accessable via a getter, etc.
                break;
            default:
                console.error("FIXAR Error: Did not recognize understand the mode you supplied to FIXAR.registerComponents().");
                break;
        }
    }

    resize = ()=> {
            console.log("run");
            const width = this._wrapper.children[0].width, height = this._wrapper.children[0].height;
            let newWidth = this._wrapper.clientWidth, newHeight = this._wrapper.clientHeight;
            newWidth = (newWidth>newHeight*this._ar) ? newHeight*this._ar : newWidth;
            newHeight = (newWidth<=newHeight*this._ar) ? newWidth/this._ar : newHeight;
            this._registeredRenderer.setPixelRatio( window.devicePixelRatio/this._quality );
            if (width != newWidth || height != newHeight) {
            this._registeredCamera.aspect = newWidth/newHeight;
            this._registeredCamera.updateProjectionMatrix();
            this._registeredRenderer.setSize(newWidth, newHeight);
            }
      }
  
  // Change the aspect ratio on the fly. Use it like this: setAspectRatio(4,3);
  // setAspectRatio = (x,y)=> {
  //   this.ar = x/y;
  //   FLAG_needToResize = true;
  // };
  
    get arFormattedRatio() {
        switch (this._ar.toString().substr(0,5)) {
        case (`1.777`):
            return `16/9`;
            break;
        case (`1.6`):
            return `16/10`;
            break;
        case (`1.333`):
            return `4/3`;
            break;
        case (`2.333`):
            return `21/9`;
            break;
        case (`1.25`):
            return `5/4`;
            break;
        case (`1.5`):
            return `3/2`;
            break;
        case (`1.85`):
            return `1.85/1`;
            break;
        case (`2.35`):
            return `2.35/1 OR 47/20`;
            break;
        default:
            return `Couldn't find a simplified aspect ratio for ${this._ar.toString().substr(0,5)}.`;
            break;
        }
    }
}

// const modes = {
//     "THREE": "three",
//     "PIXI": "pixi",
//     "PHANTOM": "phantom"
// };

// const usingModes = (modes)=>{
//     for (let mode of modes) {
//         if (mode === "undefined") {
//             console.error("Mode failed");
//         }
//     }
// };



// const FIXAR = new Fixar({
//   wrapperColor: `#FF0000`
// }); FIXAR.init();
// console.clear();
// console.log(JSON.stringify(FIXAR, null, 4));


// FIXAR.ar = 21/9;
// console.log(FIXAR.DEBUG_simplifiedAr);
// FIXAR.ar = 2.35;
// console.log(FIXAR.DEBUG_simplifiedAr);

export {
    // modes,
    // usingModes,
    Viewport,
    FIXAR_STYLES
};



