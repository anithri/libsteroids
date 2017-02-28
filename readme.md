# Libsteroids

Inspired by chriz001's [Reacteroids](https://github.com/chriz001/Reacteroids) and [TodoMVC](https://github.com/tastejs/todomvc), Libsteroids goes beyond the DOM with popular JavaScript libraries.

## Game Engine

A Libsteroids app can be built around the [libsteroids-engine](https://www.npmjs.com/package/libsteroids-engine).  The engine provides:

- Game entities that are a hybrid of classic Asteroids (including enemy flying saucers; [demo](http://www.classicgaming.cc/classics/asteroids/play-asteroids)) and chriz001's Reacteroids (including particle effects for explosions and ship thrust; [demo](https://chriz001.github.io/Reacteroids))
- Game events which can be used to trigger sound effects

## Examples

All examples below use [Howler](https://github.com/goldfire/howler.js), [Pixi.js](https://github.com/pixijs/pixi.js) and [Three.js](https://github.com/mrdoob/three.js) and demonstrate five different ways to render game entities: SVG, 2D canvas using drawing methods, 2D canvas using Pixi.js and 3D canvas using either Pixi.js or Three.js.  Building is handled by [Webpack 2](https://github.com/webpack/webpack), transpiling ES6+ is handled by [Babel](https://github.com/babel/babel) and transpiling [cssnext](http://cssnext.io/) is handled by [PostCSS](https://github.com/postcss/postcss) in each example.  In the Angular 2 example, Webpack bundling of [Typescript](https://github.com/Microsoft/TypeScript) is handled by [awesome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader).  Each example also demonstrates state management using either [Redux](https://github.com/reactjs/redux), [MobX](https://github.com/mobxjs/mobx) or [@ngrx/store](https://github.com/ngrx/store).  Each also demonstrates running the game engine in a web worker and implements the following features:

- Controls that are a hybrid of chriz001's Reacteroids (both WAD and arrow keys control ship) and classic Asteroids (shift to hyperspace)
- Ability to switch renderers anytime with 1-5 keys
- Like classic Asteroids, the saving of scores with user names and the ability to return to the high scores list from the main menu.  Like chriz001's Reacteroids, the displaying of the current highest score during gameplay.
- Game sounds from classic Asteroids
- Proper handling of window resize events
- The ability to start/restart the game using only the enter key (no need to ever reach for a mouse once window is focused)

### Angular 2 (with @ngrx/store)

Run the [Angularoids](https://github.com/movecodemove/libsteroids/tree/master/examples/angularoids) example ([demo](https://movecodemove.github.io/libsteroids/angularoids)):

```
git clone git@github.com:movecodemove/libsteroids.git

cd libsteroids/examples/angularoids
npm install
npm run serve

open http://localhost:3000/

```

The production build for this example also demonstrates Angular 2 AOT compilation.  To run the build:

```
git clone git@github.com:movecodemove/libsteroids.git

cd libsteroids/examples/angularoids
npm install
npm run build

```

### React

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

### Inferno (with Redux)

Run the [Infernoroids](https://github.com/movecodemove/libsteroids/tree/master/examples/infernoroids) example ([demo](https://movecodemove.github.io/libsteroids/infernoroids)):

```
git clone git@github.com:movecodemove/libsteroids.git

cd libsteroids/examples/infernoroids
npm install
npm run serve

open http://localhost:3000/

```

### Preact (with Redux)

Run the [Preacteroids](https://github.com/movecodemove/libsteroids/tree/master/examples/preacteroids) example ([demo](https://movecodemove.github.io/libsteroids/preacteroids)):

```
git clone git@github.com:movecodemove/libsteroids.git

cd libsteroids/examples/preacteroids
npm install
npm run serve

open http://localhost:3000/

```

## TODO

- Touch/mobile device game controls
- Benchmarks
