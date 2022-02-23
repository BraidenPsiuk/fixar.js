# fixar.js (Development Guide)

<!-- > **FixAR** **Fix**es your **A**spect **R**atio. -->

![](/files/icons/fixar-logo-hires.png)

![GitHub](https://img.shields.io/badge/Supported%3A-Three.js-brightgreen)
<!-- ![GitHub](https://img.shields.io/badge/Currently%20Unsupported:-Babylon.js,%20PixiJS,%20Phaser%203/4,%20and%20several%20other%20libraries-red) -->

![GitHub Repo stars](https://img.shields.io/github/stars/BraidenPsiuk/fixar.js?color=yellow)
![ES file size in bytes](https://img.shields.io/github/size/BraidenPsiuk/fixar.js/build/fixar.es.js?label=es%20size)
![UMD file size in bytes](https://img.shields.io/github/size/BraidenPsiuk/fixar.js/build/fixar.umd.js?label=umd%20size)
![GitHub](https://img.shields.io/github/license/BraidenPsiuk/fixar.js)

![](/files/examples/fixar-basic-example.gif)

## 🚧 HEADS UP! 🚧
**This document is only useful if you're looking to contribute to the development of the fixar.js library. If you're simply looking to use fixar.js in a project, please see the [quick-start guide](https://www.npmjs.com/package/fixar) or check out the [full documentation](https://fixarjs.org).**

___

## What is fixar.js?

FixAR provides you with tools that allow you more control over your Three.js scenes. FixAR got it's name from it's main feature - it automatically resizes your scene to make it as large as possible while maintaining an aspect ratio **YOU** define (and can change at any time). It does this by creating a letterboxing/pillarboxing effect around your canvas, which avoids stretching or cropping (which can look ugly or cause a loss of detail, respectively).

**A note from the developer:** FixAR's development started when I aimed to create a helper script/library to maintain aspect ratio in single Three.js scene. It was intended to work well when used in an Electron application. However, I then decided I wanted to support several libraries besides Three.js, including Babylon.js, Pixi.js, Phaser, and more. Unfortunately, supporting multiple libraries seemed to be too much for me as a single developer, so I've recently decided to focus support just on Three.js. This decision, although somewhat unfortunate, has allowed me to focus on adding some cool tools to help design Three.js scenes.

library you want to use for the actual rendering should work well when combined with **FIXAR**, but only after I add support for each additional library. Currently, THREE, Three.js, three.js (whatever you want to call it...) is the only supported library, but I'm not making it a dependency because I don't want THREE to be the *only* option.

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

<!-- I've always dreamed of making 3D visualizations and games in JavaScript. Three.js provides the means to do these things in a graspable way, but I've found that browser window resizes can be difficult to develop around. Users can resize their window at any time, which can introduce problems if you intended for your scene to be viewed at a specific aspect ratio. -->

By automatically setting up letterboxing/pillarboxing, you no longer have to worry about handling window resizes or users getting a peek at things in your scene they're not intended to see by resizing the window.


<!-- ## Usage

Explain what the code below does

We can have 2 import methods:
- CDN (for websites)
- Local (for Electron apps)
```sh
npm i fixar
``` -->

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
