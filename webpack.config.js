const currentTask = process.env.npm_lifecycle_event;
const fse = require('fs-extra');
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssnanoPlugin = require('cssnano-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('postcss-hexrgba'),
    require('autoprefixer')
]

class RunAfterCompile {
    apply(compiler) {
        compiler.hooks.done.tap('Copy images', function() {
            fse.copySync('./app/assets/images', './dist/assets/images')
        })
    }
}

let cssConfig = {
    test: /\.css$/i,
    exclude: /node_modules/,
    use: [
        'css-loader?url=false', 
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: postCSSPlugins
                }
            }
        }
    ]
}

let htmlPages = fse.readdirSync('./app')
    .filter(file => file.endsWith('.html'))
    .map(htmlFile => new HtmlWebpackPlugin({ 
        filename: htmlFile,
        template: `./app/${htmlFile}`
    }))

let config = {
    entry: './app/assets/scripts/App.js',
    plugins: [ ...htmlPages ],
    module: {
        rules: [cssConfig]
    }
};

if (currentTask === "dev") {
    cssConfig.use.unshift('style-loader');

    config.output = {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app')
    };

    config.devServer = {
        before: function(app, server) {
            server._watch('./app/**/*.html')
        },
        contentBase: path.resolve(__dirname, 'app'),
        hot: true,
        port: 8000,
        host: '0.0.0.0'
    };

    config.mode = 'development';
}

if (currentTask === "build") {
    config.module.rules.push({
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
            loader: "babel-loader",
            options: {
                presets: ['@babel/preset-env']
            }
        }
    })

    cssConfig.use.unshift(MiniCssExtractPlugin.loader);

    config.output = {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    };

    config.mode = 'production';
    config.optimization = {
        splitChunks: { 
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        },
        minimizer: [
            new CssnanoPlugin()
        ]
    };
    config.plugins.push(
        new CleanWebpackPlugin(), 
        new MiniCssExtractPlugin({filename: 'styles.[chunkhash].css'}),
        new RunAfterCompile()
    )
}

module.exports = config;