# canvg Webpack Loader

This is a [Webpack](http://webpack.github.io/) loader based on the [canvg-client](https://github.com/syntheticore/node-canvg) library that converts an SVG file into a function containing list of JavaScript Canvas (`CanvasRenderingContext2D`, more specifically) commands at compile time. This function is then called at runtime to draw the SVG file onto a canvas.

This library is fairly untested. There are potentially plenty of holes in its functionality. Use at your own risk!

## Getting started

Install the plugin:

```
npm install --save-dev canvg-loader
```

## Usage

### Webpack configuration

```js
module: {
  rules: {
    test: /\.svg$/,
    oneOf: [
      {
        resourceQuery: /canvas/,
        use: 'canvg-loader'
      },
    ],
  }
};
```

### Application code

```js
var drawCheckmark = require('checkmark.svg?canvas');
var canvas = document.createElement('canvas');
var gc = canvas.getContext('2d');
var x = 10;
var y = 10;
gc.save();
gc.translate(x, y);
drawCheckmark(gc);
gc.restore();
```

## License

MIT
