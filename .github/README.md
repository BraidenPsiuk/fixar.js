# THIS PROJECT IS CURRENTLY ARCHIVED

Unfortunatly, I am archiving Fixar.js until further notice to give myself more time to work on other projects.

I will continue working on it if requested, or once I have more of a need for it myself.

# fixar.js (Github)

> **FixAR** **Fix**es your **A**spect **R**atio.

![](/files/icons/fixar-logo-hires.png)

![GitHub](https://img.shields.io/badge/Supported%3A-Three.js-brightgreen)
![GitHub](https://img.shields.io/badge/Currently%20Unsupported:-Babylon.js,%20PixiJS,%20Phaser%203/4,%20and%20several%20other%20libraries-red)

![GitHub Repo stars](https://img.shields.io/github/stars/BraidenPsiuk/fixar.js?color=yellow)
![ES file size in bytes](https://img.shields.io/github/size/BraidenPsiuk/fixar.js/build/fixar.es.js?label=es%20size)
![UMD file size in bytes](https://img.shields.io/github/size/BraidenPsiuk/fixar.js/build/fixar.umd.js?label=umd%20size)
![GitHub](https://img.shields.io/github/license/BraidenPsiuk/fixar.js)

![](/files/examples/fixar-basic-example.gif)

## NOTE: FIXAR IS STILL IN THE VERY EARLY STAGES OF DEVELOPMENT. It is currently in version 0.x.x (NPM) and is unusable in its current state.

<!-- FULL DOCUMENT OPEN

This library currently has a few limitations due to it being in early stages of development:
1. You can only really create 1 Viewport, and it must be appended to the document body. I am planning to use flexbox to make multiple viewports easy to achieve. It currently works like this because I only intended for this to run in an Electron app when I started developing this.
2. Can't customize letterbox/pillarbox styles past just color, this probably won't change for a while.
3. You can only register one camera and one renderer. You can't unregister them as well at the moment.
4. Looks a little strange on some mobile devices (this is only designed with desktop in mind for now though).

___

## JavaScript rendering tools library. Designed for use with Three.js.

Take full control over how your 2D/3D scene is viewed! **FIXAR** automatically resizes your scene to make it as large as possible while maintaining an aspect ratio **YOU** define (and can change at any time). It does this by creating a letterboxing/pillarboxing effect around your canvas, which avoids stretching or cropping (which can look ugly or cause a loss of detail, respectively).

**FIXAR** is designed to be BYOL (Bring Your Own Library)-compliant. That's a term I just made up. [Aren't acronyms just the best?](https://gist.github.com/anonymous/ca9721fbf27e77667abb) Anyway, whatever library you want to use for the actual rendering should work well when combined with **FIXAR**, but only after I add support for each additional library. Currently, THREE, Three.js, three.js (whatever you want to call it...) is the only supported library, but I'm not making it a dependency because I don't want THREE to be the *only* option.

___

Development start!
requires nodejs with npm, bet that caught you by surprise?
```zsh
git clone project with [...git clone https:// whatever....]
cd fixar
npm i
vite
```
or a one(two?)-liner
```zsh
git clone https://github.com/BraidenPsiuk/fixar.git && cd fixar && npm i # Sets up dev environment

vite # Starts the dev server with SUPER ULTRA FAST hot "reloading" (Vite is so epic)
```
vite starts the dev server, and that's literally it I think

___

The aim of the project is to create an easy to use, lightweight JavaScript library that pairs nicely with other libraries that render to a canvas, such as Mr. Doob's Three.js.

-->

<!-- I've always dreamed of making 3D visualizations and games in JavaScript. Three.js provides the means to do these things in a graspable way, but I've found that browser window resizes can be difficult to develop around. Users can resize their window at any time, which can introduce problems if you intended for your scene to be viewed at a specific aspect ratio.

By automatically setting up letterboxing/pillarboxing, you no longer have to worry about handling window resizes or users getting a peek at things in your scene they're not intended to see by resizing the window.-->


<!-- ## Usage

Explain what the code below does

We can have 2 import methods:
- CDN (for websites)
- Local (for Electron apps)
```sh
npm i fixar
``` -->

<!--

## Yeah, yeah... I know the drill. Let's make a cube already!
You don't *have* to make it green, I guess... But you should totally make it green.

```javascript
import * as THREE from "https://unpkg.com/three@latest/build/three.module.js";
import * as FIXAR from "https://unpkg.com/fixar@latest/fixar.js";

// I AM STILL WRITING THE EXAMPLE FOR THIS. I will update this within the week (by 3/16/2021)
// There are currently two ways to use it - importing from a CDN, and importing it locally.
// I will most likely follow in THREE's footsteps for the examples, and show multiple methods to use the lib.
// In the meantime, check out examples/basic-browser if you want to get an idea of how this library should work.
```
> Oh yeah, almost forgot. Make sure to run the above code as a [module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules). Otherwise, you won't be able to use `import` statements!

FULL DOCUMENT CLOSE -->
