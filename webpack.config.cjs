const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: {
        index: "./blocks/hero-banner/index.js",
        style: "./blocks/hero-banner/style.scss",
        editor: "./blocks/hero-banner/editor.scss",
        view: "./blocks/hero-banner/view.js"
    },
    output: {
        filename: (pathData) => {
            return ["index", "style", "editor", "view"].includes(pathData.chunk.name)
                ? "blocks/hero-banner/build/[name].js"
                : "assets/js/[name].js";
        },
        path: path.resolve(__dirname)
    },
    resolve: {
        extensions: [".js"]
    
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@wordpress/babel-preset-default"],
                        plugins: ["@babel/plugin-syntax-import-meta"]
                    }
                }
            },
            {
                test: /\.scss$/,
                oneOf: [
                    {
                        include: path.resolve(__dirname, "blocks/hero-banner/"),
                        use: [
                            MiniCssExtractPlugin.loader,
                            "css-loader",
                            "sass-loader"
                        ]
                    },
                    {
                        include: path.resolve(__dirname, "src/scss/"),
                        use: [
                            MiniCssExtractPlugin.loader,
                            "css-loader",
                            "sass-loader"
                        ]
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: (pathData) => {
                return ["style", "editor"].includes(pathData.chunk.name)
                    ? "blocks/hero-banner/build/[name].css"
                    : "assets/css/[name].css";
            }
        })
    ],
    optimization: {
        splitChunks: false
    },
    externals: {
        "@wordpress/blocks": "wp.blocks",
        "@wordpress/element": "wp.element",
        "@wordpress/block-editor": "wp.blockEditor",
        "@wordpress/components": "wp.components",
        "@wordpress/i18n": "wp.i18n",
    }
};
