const FIXAR_STYLES = `
    body {
        margin: 0;
    }

    #wrapper {
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

        this._ar=ar;
        this._quality=quality;
        this._mode=mode;
        this._wrapperColor=wrapperColor;
        this._CAMERA_FOV=CAMERA_FOV;
        this._CAMERA_NCP=CAMERA_NCP;
        this._CAMERA_FCP=CAMERA_FCP;
    }



    get ar() { return this._ar; }
    set ar(ar) { this._ar = ar; }
    setAr = (x, y)=> {
        if (y === undefined) {
            this._ar = x;
        } else {
            this._ar = x/y;
        }
    }

    get mode() { return this._mode; }
    // set mode(mode) { console.error("FIXAR Error: You cannot modify mode after it has been initialized"); }

    get quality() { return this._quality; }
    set quality(quality) { this._quality = quality; }
    setQuality = (quality)=> {
        this._quality = quality;
    }

    get wrapperColor() { return this._wrapperColor; }
    set wrapperColor(color) { this._wrapperColor = color; }
    setWrapperColor = (color)=> {
        this._wrapperColor = color;
    }



    init = ()=> {
        this.styles = document.createElement("style");
        this.styles.innerHTML = FIXAR_STYLES;
        document.body.appendChild(this.styles);

        this.container = document.createElement(`div`);
        this.container.id = `fixar-container`;

        this.wrapper = document.createElement(`div`);
        this.wrapper.id = `fixar-wrapper`;

        document.body.appendChild(this.container);
        document.getElementById(`fixar-container`).appendChild(this.wrapper);
    }

    registerRenderer = renderer=> {
        this.wrapper.appendChild(renderer.domElement);
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
    Viewport
};