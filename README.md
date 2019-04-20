Yii2 Webpack integration
========================

This extension allow use [Webpack 3 or 4](https://webpack.js.org/) as the asset manager.

Installation
------------


```bash
  npm i --save html-webpack-plugin
```

```bash
  yarn add html-webpack-plugin
```

**Package.json**

The project needs a `package.json` file to specify how to start `yii2-webpack`:

```json
{
  "name": "my-app",
  "scripts": {
    "dev": "yii2-webpack-exec --yii2-webpack-config dev"
  }
}
```

**Flags**

* `--yii2-webpack-config`: 
    * `dev` - uses `webpack-dev-server` by default and dev config
    * `prod` - uses `webpack` by default and prod config
* `--yii2-webpack-command` - to use different command 

> The remaining flags will be sent to the command

Howto use it
------------

`scripts` will launch yii2-webpack via `npm run dev`

All entries must be described by an object. The key is used for the asset name.

Examples
--------

Webpack config:
```
{
  ...
  entry: {
    main: './src/main.js',
    bootstrap: './src/bootstrap.js'
  }
  ...
}
```
yii2-webpack-settings.json:
```json
{
  "assetDirectory":"assets",
  "webpackDirectory":"webpack"
}
```

Creates an asset directory in `webpack/assets` with the following contents:
* MainAsset.php
* BootstrapAsset.php


Configuration
-------------

>By default, the plugin works with relation to the project root and creates assets in the `assets` directory

Use the CLI for change the configuration
1. Add to `package.json` script `yii2-webpack`
    ```json
    {
      "name": "my-app",
      "scripts": {
        "yii2-webpack": "yii2-webpack",
        "dev": "yii2-webpack-exec --yii2-webpack-config dev"
      }
    }
    ```
2. Run via command line `yii2-webpack`
3. The CLI will create a `yii2-webpack-settings.json` config in the root directory

**Options**

Additional parameters `yii2-webpack-settings.json`:

* `template` - `webpack` relative or absolute path to the template. By default it will use `<path_to_yii2-webpack>/index.ejs`

> All described parameters are passed to the template and can be obtained via `htmlWebpackPlugin.options.yii2Entry.options`