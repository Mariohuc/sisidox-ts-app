const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader')
/***  LOADERRRSS  */

function vueRules(){
  return [
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    }
  ];
}

function babelRules() {
  return [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    },
  ];
}

function sassRules() {
  return [
    {
      // Apply rule for .sass, .scss or .css files
      test: /\.(sa|sc|c)ss$/,

      // Set loaders to transform files.
      // Loaders are applying from right to left(!)
      // The first loader will be applied after others
      use: [
        {
          // After all CSS loaders, we use a plugin to do its work.
          // It gets all transformed CSS and extracts it into separate
          // single bundled file
          loader: MiniCssExtractPlugin.loader
        },
        {
          // This loader resolves url() and @imports inside CSS
          loader: "css-loader",
        },
        {
          // Then we apply postCSS fixes like autoprefixer and minifying
          loader: "postcss-loader",
        },
        {
          // First we transform SASS to standard CSS
          loader: "sass-loader",
          options: {
            implementation: require("sass"),
          },
        },
      ],
    },
  ];
}


// This is the main configuration object.
// Here, you write different options and tell Webpack what to do
module.exports = {
  // Path to your entry point. From this file Webpack will begin its work
  entry: {
    welcome: "./resources/assets/scripts/welcome.js",
  },
  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, "public/assets"),
    filename: "js/[name].bundle.js",
  },
  module: {
    rules: vueRules().concat(babelRules()).concat(sassRules()),
  },
  plugins: [

    new MiniCssExtractPlugin({
      filename: "css/[name].bundle.css"
    }),

    new VueLoaderPlugin()

  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' para webpack 1
    }
  },
  devtool: "source-map"
};
