Yii2 Webpack integration
========================

This extension allow use [Webpack 3 or 4](https://webpack.js.org/) as the asset manager.

Installation
------------

```bash
  npm i --save yii2-webpack
```

```bash
  yarn add yii2-webpack
```

**Package.json**

The project needs a `package.json` file to specify how to start `yii2-webpack`:

```json
{
  "name": "my-app",
  "scripts": {
    "dev": "yii2-webpack-exec --yii2-webpack-config dev",
    "build": "yii2-webpack-exec --yii2-webpack-config prod"
  }
}
```

**Flags**

* `--yii2-webpack-config`: 
    * `dev` - uses `webpack-dev-server` by default and config `webpack.dev.js` located in webpack directory
    * `prod` - uses `webpack` by default and config `webpack.prod.js` located in webpack directory
* `--yii2-webpack-command` - to use different command 

> The remaining flags will be sent to the command

Howto use it
------------

`scripts` will launch yii2-webpack via `npm run dev`. The script uses the config of your development.

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
  "namespace":"@app/webpack"
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
3. The CLI will create a `yii2-webpack-settings.json` config in the webpack directory

**Options**

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**[`assetDirectory`]**|`{String}`|`assets`|`webpack` relative path to the output asset directory|
|**[`namespace`]**|`{String}`|`@app`|Namespace before your `package.json`|
|**[`webpackDirectory`]**|`{String}`||The directory up to `package.json` relative to @app. **Deprecated**, use `namespace` parameter|
|**[`devConfig`]**|`{String}`|`'webpack.dev.js'`|The file of the development configuration. Defaults to `webpack.dev.js`. You can specify a subdirectory here too (eg: `src/dev.js`)|
|**[`prodConfig`]**|`{String}`|`'webpack.prod.js'`|The file of the production configuration. Defaults to `webpack.prod.js`. You can specify a subdirectory here too (eg: `src/prod.js`)|
|**[`template`]**|`{String}`||`webpack` relative or absolute path to the template. By default it will use `<path_to_yii2-webpack>/index.ejs`. Please see the [docs](https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md) for details|

> All described parameters are passed to the template and can be obtained via `htmlWebpackPlugin.options.yii2Entry.options`