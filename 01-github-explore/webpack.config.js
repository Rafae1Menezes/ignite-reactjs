const path = require('path')

module.exports = {
   entry: path.resolve(__dirname, 'src', 'index.jsx'),
   output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
   },
   resolve: {
      extensions: ['.js', '.jsx']
   },
   module: {
      rules: [
         {
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: 'babel-loader'
         }
      ],
   }
}
