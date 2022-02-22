"use strict";
exports.__esModule = true;
exports.Viewport = exports.use = void 0;
// Dev Configuration
var DEV_MODE = true;
var DEBUG_SHOW_SUCCESS_MESSAGES = DEV_MODE;
var FIXAR_STYLES = {
    "wrapper": {
        // "position": "absolute",
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
var LOADED_LIBS = {};
var LIB_IDENTIFIERS = {
    "THREE": "Object3D",
    "PIXI": "ProjectionSystem",
    // What about Phaser CE?
    "PHASER3": "Game",
    "BABYLON": "PhysicsImpostor" // Explanation: Seemed pretty sus, not gonna lie
    // ...
};
var use = function () {
    var libs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        libs[_i] = arguments[_i];
    }
    for (var _a = 0, libs_1 = libs; _a < libs_1.length; _a++) {
        var lib = libs_1[_a];
        var supported = false;
        for (var _b = 0, _c = Object.entries(LIB_IDENTIFIERS); _b < _c.length; _b++) {
            var _d = _c[_b], key = _d[0], value = _d[1];
            if (lib[value]) {
                supported = true;
                if (!LOADED_LIBS[key]) {
                    LOADED_LIBS[key] = lib;
                    if (DEBUG_SHOW_SUCCESS_MESSAGES)
                        console.log("%cSuccessfully loaded the ".concat(key, " library!"), "color:green");
                }
                else {
                    console.warn("Library already provided, it has been ignored");
                }
            }
        }
        if (!supported)
            console.warn("Library unsupported");
    }
};
exports.use = use;
var Viewport = /** @class */ (function () {
    function Viewport(_a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, _c = _b.ar, ar = _c === void 0 ? 16 / 9 : _c, _d = _b.renderingLibrary, renderingLibrary = _d === void 0 ? "THREE" : _d, _e = _b.quality, quality = _e === void 0 ? 1 : _e, _f = _b.wrapperColor, wrapperColor = _f === void 0 ? "#000000" : _f, _g = _b.camera, camera = _g === void 0 ? null : _g, _h = _b.renderer, renderer = _h === void 0 ? null : _h;
        this.registerComponents = function (camera, renderer) {
            _this.camera = camera;
            _this.renderer = renderer;
        };
        this.resize = function () {
            if (_this._camera === null || _this._renderer === null)
                throw new Error("(TODO FIX THIS ERROR MESSAGE) Both Camera and Renderer must be available first");
            console.log("run");
            var width = _this._wrapper.children[0].width, height = _this._wrapper.children[0].height;
            var newWidth = _this._wrapper.clientWidth, newHeight = _this._wrapper.clientHeight;
            newWidth = (newWidth > newHeight * _this._ar) ? newHeight * _this._ar : newWidth;
            newHeight = (newWidth <= newHeight * _this._ar) ? newWidth / _this._ar : newHeight;
            _this._renderer.setPixelRatio(window.devicePixelRatio / _this._quality);
            if (width != newWidth || height != newHeight) {
                _this._camera.aspect = newWidth / newHeight;
                _this._camera.updateProjectionMatrix();
                _this._renderer.setSize(newWidth, newHeight);
            }
        };
        // trim/uppercase the rendering library string in case the user passed it in slightly incorrectly
        renderingLibrary = renderingLibrary.trim().toUpperCase();
        // Check if the rendering library type is supported
        if (!Object.keys(LIB_IDENTIFIERS).includes(renderingLibrary))
            throw new Error("Rendering library \"".concat(renderingLibrary, "\" is not supported"));
        // Check if the rendering library the user wants to use has been previously loaded using FIXAR.use()
        if (Object.keys(LOADED_LIBS).includes(renderingLibrary)) {
            if (DEBUG_SHOW_SUCCESS_MESSAGES)
                console.log("%cSuccessfully initialized Viewport!", "color:green");
        }
        else {
            throw new Error("The \"".concat(renderingLibrary, "\" rendering library hasn't been provided to FIXAR. You must first call FIXAR.use(").concat(renderingLibrary, ") before attempting to create a viewport using that rendering library."));
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
        for (var _i = 0, _j = Object.entries(FIXAR_STYLES.container); _i < _j.length; _i++) {
            var _k = _j[_i], key = _k[0], value = _k[1];
            this._container.style[key] = value;
        }
        this._wrapper = document.createElement("div");
        this._wrapper.setAttribute("id", "fixar-wrapper");
        for (var _l = 0, _m = Object.entries(FIXAR_STYLES.wrapper); _l < _m.length; _l++) {
            var _o = _m[_l], key = _o[0], value = _o[1];
            this._wrapper.style[key] = value;
        }
        this._wrapper.style.backgroundColor = this._wrapperColor;
        this._container.appendChild(this._wrapper);
    }
    Object.defineProperty(Viewport.prototype, "camera", {
        get: function () {
            return this._camera;
        },
        set: function (camera) {
            if (camera === null) {
                this._camera = null;
            }
            else {
                switch (this._renderingLibrary) {
                    case "THREE":
                        if (camera.constructor.name === LOADED_LIBS.THREE.PerspectiveCamera.name || camera.constructor.name === LOADED_LIBS.THREE.OrthographicCamera.name) {
                            this._camera = camera;
                        }
                        else {
                            throw new Error("Please provide ".concat(LOADED_LIBS.THREE.PerspectiveCamera.name, " or ").concat(LOADED_LIBS.THREE.OrthographicCamera.name, ", you provided ").concat(camera.constructor.name));
                        }
                        break;
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Viewport.prototype, "renderer", {
        get: function () {
            return this._renderer;
        },
        set: function (renderer) {
            if (renderer === null) {
                this._renderer = null;
            }
            else {
                switch (this._renderingLibrary) {
                    case "THREE":
                        if (renderer.constructor.name === LOADED_LIBS.THREE.WebGLRenderer.name) {
                            this._renderer = renderer;
                            this._wrapper.appendChild(this._renderer.domElement); // kinda questioning position absolute for wrapper...
                        }
                        else {
                            throw new Error("Please provide ".concat(LOADED_LIBS.THREE.WebGLRenderer.name, ", you provided ").concat(renderer.constructor.name));
                        }
                        break;
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Viewport.prototype, "quality", {
        get: function () {
            return this._quality;
        },
        set: function (quality) {
            this._quality = quality;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Viewport.prototype, "domElement", {
        get: function () {
            return this._container;
        },
        enumerable: false,
        configurable: true
    });
    return Viewport;
}());
exports.Viewport = Viewport;
;
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
