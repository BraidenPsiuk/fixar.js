var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const FIXAR_STYLES = {
  "wrapper": {
    "width": "100%",
    "height": "100%",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "container": {
    "display": "block",
    "width": "100%",
    "height": "100%",
    "backgroundColor": "#FFF"
  }
};
const LOADED_LIBS = {};
const LIB_IDENTIFIERS = {
  "THREE": "Object3D",
  "PIXI": "ProjectionSystem",
  "PHASER3": "Game",
  "BABYLON": "PhysicsImpostor"
};
const use = (...libs) => {
  for (const lib of libs) {
    let supported = false;
    for (const [key, value] of Object.entries(LIB_IDENTIFIERS)) {
      if (lib[value]) {
        supported = true;
        if (!LOADED_LIBS[key]) {
          LOADED_LIBS[key] = lib;
          console.log(`%cSuccessfully loaded the ${key} library!`, "color:green");
        } else {
          console.warn("Library already provided, it has been ignored");
        }
      }
    }
    if (!supported)
      console.warn("Library unsupported");
  }
};
class Viewport {
  constructor({
    ar = 16 / 9,
    renderingLibrary = "THREE",
    quality = 1,
    wrapperColor = `#000000`,
    camera = null,
    renderer = null
  } = {}) {
    __publicField(this, "registerComponents", (camera, renderer) => {
      this.camera = camera;
      this.renderer = renderer;
    });
    __publicField(this, "resize", () => {
      if (this._camera === null || this._renderer === null)
        throw new Error("(TODO FIX THIS ERROR MESSAGE) Both Camera and Renderer must be available first");
      console.log("run");
      const width = this._wrapper.children[0].width, height = this._wrapper.children[0].height;
      let newWidth = this._wrapper.clientWidth, newHeight = this._wrapper.clientHeight;
      newWidth = newWidth > newHeight * this._ar ? newHeight * this._ar : newWidth;
      newHeight = newWidth <= newHeight * this._ar ? newWidth / this._ar : newHeight;
      this._renderer.setPixelRatio(window.devicePixelRatio / this._quality);
      if (width != newWidth || height != newHeight) {
        this._camera.aspect = newWidth / newHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(newWidth, newHeight);
      }
    });
    renderingLibrary = renderingLibrary.trim().toUpperCase();
    if (!Object.keys(LIB_IDENTIFIERS).includes(renderingLibrary))
      throw new Error(`Rendering library "${renderingLibrary}" is not supported`);
    if (Object.keys(LOADED_LIBS).includes(renderingLibrary)) {
      console.log("%cSuccessfully initialized Viewport!", "color:green");
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
  }
  get camera() {
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
            this._wrapper.appendChild(this._renderer.domElement);
          } else {
            throw new Error(`Please provide ${LOADED_LIBS.THREE.WebGLRenderer.name}, you provided ${renderer.constructor.name}`);
          }
          break;
      }
    }
  }
  get renderer() {
    return this._renderer;
  }
  set quality(quality) {
    this._quality = quality;
  }
  get quality() {
    return this._quality;
  }
  get domElement() {
    return this._container;
  }
}
export { Viewport, use };
