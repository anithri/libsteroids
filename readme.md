# Libsteroids

Inspired by chriz001's [Reacteroids](https://github.com/chriz001/Reacteroids) and [TodoMVC](https://github.com/tastejs/todomvc), Libsteroids goes beyond the DOM with popular JavaScript libraries.

## Game Engine

A Libsteroids app can be built around the [libsteroids-engine](https://www.npmjs.com/package/libsteroids-engine).  The engine provides:

- Game entities that are a hybrid of classic Asteroids (including enemy flying saucers; [demo](http://www.classicgaming.cc/classics/asteroids/play-asteroids)) and chriz001's Reacteroids (including particle effects for explosions and ship thrust; [demo](https://chriz001.github.io/Reacteroids))
- Game events which can be used to trigger sound effects

## Examples

All examples below use [Howler](https://github.com/goldfire/howler.js), [Pixi.js](https://github.com/pixijs/pixi.js) and [Three.js](https://github.com/mrdoob/three.js) and demonstrate five different ways to render game entities: SVG, 2D canvas using drawing methods, 2D canvas using Pixi.js and 3D canvas using either Pixi.js or Three.js.  Transpiling ES6+ is handled by [Babel](https://github.com/babel/babel) and building is handled by [Webpack 2](https://github.com/webpack/webpack) in each example.  Each example also demonstrates state management using either [Redux](https://github.com/reactjs/redux) or [MobX](https://github.com/mobxjs/mobx) and running the engine in a web worker and each also implements the following features:

- Controls that are a hybrid of chriz001's Reacteroids (both WAD and arrow keys control ship) and classic Asteroids (shift to hyperspace)
- Ability to switch renderers anytime with 1-5 keys
- Like classic Asteroids, the saving of scores with user names and the ability to return to the high scores list from the main menu.  Like chriz001's Reacteroids, the displaying of the current highest score during gameplay
- Game sounds from classic Asteroids
- Proper handling of window resize events
- The ability to start/restart the game using only the enter key (no need to ever reach for a mouse once window is focused)


### Reacteroids

Run the [Reacteroids Redux](https://github.com/movecodemove/libsteroids/tree/master/examples/reacteroids/redux) example ([demo](https://movecodemove.github.io/libsteroids/reacteroids/redux)):

```
git clone git@github.com:movecodemove/libsteroids.git

cd libsteroids/examples/reacteroids/redux
npm install
npm run serve

open http://localhost:3000/

```

Run the [Reacteroids MobX](https://github.com/movecodemove/libsteroids/tree/master/examples/reacteroids/mobx) example ([demo](https://movecodemove.github.io/libsteroids/reacteroids/mobx)):

```
git clone git@github.com:movecodemove/libsteroids.git

cd libsteroids/examples/reacteroids/mobx
npm install
npm run serve

open http://localhost:3000/

```

### Preacteroids (made with Redux)

Run the [Preact](https://github.com/movecodemove/libsteroids/tree/master/examples/preacteroids) example ([demo](https://movecodemove.github.io/libsteroids/preacteroids)):

```
git clone git@github.com:movecodemove/libsteroids.git

cd libsteroids/examples/preacteroids
npm install
npm run serve

open http://localhost:3000/

```

### Infernoroids (made with Redux)

Run the [Inferno](https://github.com/movecodemove/libsteroids/tree/master/examples/infernoroids) example ([demo](https://movecodemove.github.io/libsteroids/infernoroids)):

```
git clone git@github.com:movecodemove/libsteroids.git

cd libsteroids/examples/infernoroids
npm install
npm run serve

open http://localhost:3000/

```

## TODO

- Touch/mobile device game controls
- Benchmarks

## Credits

### Favicon:

&nbsp;&nbsp;From chriz001's [Reacteroids](https://github.com/chriz001/Reacteroids/tree/gh-pages)

### Font:

&nbsp;&nbsp;[Press Start 2P](http://www.fontspace.com/codeman38/press-start-2p)

### Sounds:

&nbsp;&nbsp;Ship spawn sound from [https://www.freesound.org/people/LittleRobotSoundFactory/sounds/270341/](https://www.freesound.org/people/LittleRobotSoundFactory/sounds/270341/)

&nbsp;&nbsp;All other sounds from [http://www.classicgaming.cc/classics/asteroids/sounds](http://www.classicgaming.cc/classics/asteroids/sounds)
