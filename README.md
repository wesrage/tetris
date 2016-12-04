# tetris
Web-based Tetris clone built with React and Redux

## Description
This is an experiment and a bit of a sandbox for trying out some new technologies in perhaps a somewhat unusual setting—a browser-based game.

## Demo
https://tetris-eluhjoxfyj.now.sh/

## Instructions
To run locally, clone this repo. Then run:
```
npm install
```
```
npm run dev
```
Now open Chrome to `localhost:3000`.

## Browser Support
Current only Chrome is fully supported. The game works in Firefox except for the background music. There are some problems with Edge and Internet Explorer that shouldn't be too difficult to fix. Contributions welcome!

## Technologies Used
* [React](https://github.com/facebook/react)
* [Redux](https://github.com/reactjs/redux)
* [styled-components](https://github.com/styled-components/styled-components)
* [react-music](https://github.com/FormidableLabs/react-music)
* [Jest](https://github.com/facebook/jest)
* [Webpack](https://github.com/webpack/webpack)
* [Babel](https://github.com/babel/babel)

**NOTE:** The background music may lag a lot in development mode. To turn it off, simply change the props passed to the `BackgroundMusicPlayer` component in `Game.jsx`:
```js
<BackgroundMusicPlayer playing={false}/>
```
