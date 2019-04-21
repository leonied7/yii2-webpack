module.exports = {
  entry: {
    index: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: file => (
          /node_modules/.test(file)
        ),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['env', {'modules': false, 'targets': {'node': 4}}]]
          },
        },
      }
    ],
  },
}