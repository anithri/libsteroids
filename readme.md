# Libsteroids

Inspired by chriz001's [Reacteroids](https://github.com/chriz001/Reacteroids), Libsteroids is a means to test out popular JavaScript libraries beyond the limited scope of DOM-based "Todo" applications.  In addition to manipulating DOM elements, Libsteroids requires displaying visual game updates at 60fps and playing sounds in response to game events.


## Examples

All examples below use [Howler](https://github.com/goldfire/howler.js), [Pixi.js](https://github.com/pixijs/pixi.js) and [Three.js](https://github.com/mrdoob/three.js) and demonstrate four different ways to render game objects: SVG, 2D canvas (using Pixi.js) and 3D canvas (with either Pixi.js or Three.js).  Transpiling ES6+ is handled by [Babel](https://github.com/babel/babel), bundling is handled by [Webpack 2](https://github.com/webpack/webpack) and development server is made with [Koa 2](https://github.com/koajs/koa) and [Socket.io](https://github.com/socketio/socket.io) in each example.

### React Redux

Run the [React Redux](https://github.com/movecodemove/libsteroids/tree/master/examples/react-redux) example:

```
git clone git@github.com:movecodemove/libsteroids.git

cd libsteroids/examples/react-redux
npm install
npm run serve

open http://localhost:3000/

```


### React MobX

Run the [React MobX](https://github.com/movecodemove/libsteroids/tree/master/examples/react-mobx) example:

```
git clone git@github.com:movecodemove/libsteroids.git

cd libsteroids/examples/react-mobx
npm install
npm run serve

open http://localhost:3000/

```


### Preact Redux

Run the [Preact Redux](https://github.com/movecodemove/libsteroids/tree/master/examples/preact-redux) example:

```
git clone git@github.com:movecodemove/libsteroids.git

cd libsteroids/examples/preact-redux
npm install
npm run serve

open http://localhost:3000/

```


### Inferno Redux

Run the [Inferno Redux](https://github.com/movecodemove/libsteroids/tree/master/examples/inferno-redux) example:

```
git clone git@github.com:movecodemove/libsteroids.git

cd libsteroids/examples/inferno-redux
npm install
npm run serve

open http://localhost:3000/

```


## Credits

### Favicon:

&nbsp;&nbsp;From chriz001's [Reacteroids](https://github.com/chriz001/Reacteroids/tree/gh-pages)

### Font:

&nbsp;&nbsp;[Press Start 2P](http://www.fontspace.com/codeman38/press-start-2p)

### Sounds:

&nbsp;&nbsp;Ship spawn sound from [https://www.freesound.org/people/LittleRobotSoundFactory/sounds/270341/](https://www.freesound.org/people/LittleRobotSoundFactory/sounds/270341/)

&nbsp;&nbsp;All other sounds from [http://www.classicgaming.cc/classics/asteroids/sounds](http://www.classicgaming.cc/classics/asteroids/sounds)
