// exports.test = ()=>{console.log("Module was loaded properly");};

// ---------------------------------------------------[ CONFIGURE HERE ]---------------------------------------------------
// -[ GLOBALLY ACCESSABLE FLAGS ]-
let FLAG_needToResize = true; // Set to true so that the resize() function runs once, and then again only when needed
// ------------------------------------------------------------------------------------------------------------------------

export default class Fixar {
  constructor({
    _ar = 16/9,
    _mode = `THREE`,
    _quality = 1,
    _wrapperColor = `#000000`,
    _CAMERA_FOV = 75, // We'll use Three.js's default FOV from their documentation
    _CAMERA_NCP = 0.1,
    _CAMERA_FCP = 100 // Three.js normally uses 1000, but that's a little overkill
  } = {}) {
    this.ar=_ar;
    this.quality=_quality;
    this.mode=_mode;
    this.wrapperColor=_wrapperColor;
    this.CAMERA_FOV=_CAMERA_FOV;
    this.CAMERA_NCP=_CAMERA_NCP;
    this.CAMERA_FCP=_CAMERA_FCP;
  }
  
  init = ()=> {
    this.container = document.createElement(`div`);
    this.container.id = `fixar-container`;

    this.wrapper = document.createElement(`div`);
    this.wrapper.id = `fixar-wrapper`;

    document.body.appendChild(this.container);
    document.getElementById(`fixar-container`).appendChild(this.wrapper);
  }
  
  // Change the aspect ratio on the fly. Use it like this: setAspectRatio(4,3);
  // setAspectRatio = (x,y)=> {
  //   this.ar = x/y;
  //   FLAG_needToResize = true;
  // };
  
  get DEBUG_simplifiedAr() {
    switch (FIXAR.ar.toString().substr(0,5)) {
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
        return `Couldn't find a simplified aspect ratio for ${FIXAR.ar.toString().substr(0,5)}.`;
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