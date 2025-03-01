const path = require('path');

module.exports = {
    mode: 'development', // ili 'production' za optimizovanu verziju
    entry: {
        index: './blocks/hero-banner/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'blocks/hero-banner/build'), // Kompajliraj u build/
        filename: '[name].js',
        library: {
            name: 'HeroBanner',
            type: 'window',
        }
    },
    resolve: {
        extensions: ['.js'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@wordpress/babel-preset-default']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass')
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
};
