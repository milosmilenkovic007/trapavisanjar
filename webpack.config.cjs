const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: {
        // ✅ Gutenberg block styles (must go to /build)
        index: './blocks/hero-banner/index.js',
        style: './blocks/hero-banner/style.scss',
        editor: './blocks/hero-banner/editor.scss',

        // ✅ Theme assets (must go to /assets)
        main: './src/js/main.js',
        theme: './src/scss/style.scss'
    },
    output: {
        filename: (pathData) => {
            // ✅ Make sure all block-related files go into build/
            return ['index', 'style', 'editor'].includes(pathData.chunk.name)
                ? 'blocks/hero-banner/build/[name].js'
                : 'assets/js/[name].js'; // ✅ Theme-related JS files go to assets/js/
        },
        path: path.resolve(__dirname)
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
                oneOf: [
                    {
                        include: path.resolve(__dirname, 'blocks/hero-banner/'),
                        use: [
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            'sass-loader'
                        ]
                    },
                    {
                        include: path.resolve(__dirname, 'src/scss/'),
                        use: [
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            'sass-loader'
                        ]
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: (pathData) => {
                // ✅ Ensure block styles go to build/ and theme styles go to assets/css/
                return ['style', 'editor'].includes(pathData.chunk.name)
                    ? 'blocks/hero-banner/build/[name].css'
                    : 'assets/css/[name].css';
            }
        })
    ],
    optimization: {
        splitChunks: false,
    },
    externals: {
        '@wordpress/blocks': 'wp.blocks',
        '@wordpress/element': 'wp.element',
        '@wordpress/block-editor': 'wp.blockEditor',
        '@wordpress/components': 'wp.components',
        '@wordpress/i18n': 'wp.i18n'
    }
};
