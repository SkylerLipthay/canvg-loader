var canvg = require('canvg-client');
var jsdom = require('jsdom');

module.exports = function(svg) {
  var window = (new jsdom.JSDOM('')).window;
  var canvas = window.document.createElement('canvas');

  output = 'module.exports = function(gc) {\n';

  var defaults = {
    canvas: canvas,
    fillStyle: '#000000',
    filter: 'none',
    font: '10px sans-serif',
    globalAlpha: 1,
    globalCompositeOperation: 'source-over',
    lineCap: 'butt',
    lineDashOffset: 0,
    lineJoin: 'miter',
    lineWidth: 1,
    miterLimit: 10,
    shadowBlur: 0,
    shadowColor: 'rgba(0,0,0,0)',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    strokeStyle: '#000000',
    textAlign: 'start',
    textBaseline: 'alphabetic'
  };

  var mock = new Proxy(defaults, {
    get: function(target, name) {
      if (defaults.hasOwnProperty(name)) {
        return defaults[name];
      }

      return function() {
        var args = Array.prototype.slice.call(arguments);
        args = args.map(JSON.stringify).join(', ');
        output += 'gc.' + name + '(' + args + ');\n';
      };
    },

    set: function(target, name, value) {
      if (defaults.hasOwnProperty(name)) {
        defaults[name] = value;
      }

      output += 'gc.' + name + ' = ' + JSON.stringify(value) + ';\n';
    }
  });

  canvas.getContext = function() {
    return mock;
  };

  canvg(canvas, svg, { ignoreClear: true });

  output += '};'

  return output;
};
