const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'labslayer',
            meta: {
                "viewport": 'width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0',
                "property": {"property": "og:image", "content": "ogimage.jpg"}
            },
            favicon: "src/favicon.ico"
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        splitChunks: {name: 'vendor', chunks: 'all'}
    },
    // resolve: {
    //     alias: {
    //       Classes: path.resolve(__dirname, 'src/js/classes/'),
    //     }
    // },
    module: {
        rules: [
            // {
            // 	test: /\.(obj|mtl)$/,
            // 	use: { loader: 'file-loader', options: { outputPath: 'objs' } }
            // },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {outputPath: 'img'} // where to place images referenced in CSS and modules
                    }
                ]
            },
            {
                test: /\.glsl$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {outputPath: 'shaders'}
                    }
                ]
            },
            {
                test: /\.(obj)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {outputPath: 'models'} // where to place images referenced in CSS and modules
                    }
                ]
            },
            {
                test: /\.(ogg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {outputPath: 'audio'} // where to place images referenced in CSS and modules
                    }
                ]
            }
        ]
    }
};