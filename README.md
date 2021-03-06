# webpack5-externals-plugin (webpack 5+ supported)

**This is a fork of [webpack-externals-plugin](https://github.com/Morhaus/webpack-externals-plugin), but that works in Webpack 5+!**

This is inspired by [tomasAlabes/webpack2-externals-plugin](https://github.com/tomasAlabes/webpack2-externals-plugin), thank you Tomas!

Provides more powerful [externals](https://webpack.github.io/docs/configuration.html#externals) configuration options.

## Usage

`new ExternalsPlugin({ type, test, include, exclude })`, where:

- `type` represents the type of external (`/var|this|commonjs2?|amd|umd/`). Defaults to `options.output.libraryTarget`.
- `test`, `include`, `exclude` work as they do with loader configuration.

## Example

The following webpack configuration considers all modules under the local `node_modules/` directory as externals.

`webpack.config.js`:

```js
var ExternalsPlugin = require('webpack5-externals-plugin');
module.exports = {
  entry: './app.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  plugins: [
    new ExternalsPlugin({
      type: 'commonjs',
      include: __dirname + '/node_modules',
    }),
  ],
};
```

## Differences with `options.externals`

Webpack externals are only filtered depending on the user request (`require('webpack')` => `webpack`).

With this plugin, externals are filtered depending on the path of the _resolved module_ (`require('webpack')` => `<dir_path>/node_modules/webpack/lib/webpack.js`).

This lets you include or exclude entire directories depending on the actual path of the resolved module.
