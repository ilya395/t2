const webpack = require('webpack');
// этот файл - инструмент сборки
const path  = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin') // работай с html
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // очистка кеша
const CopyWebpackPlugin = require('copy-webpack-plugin') // копируй-перетаскивай
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // работай с css (вставляй стили в файл css)
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // минифицируй css
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require('terser-webpack-plugin') // минифицируй js
// const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin') // через него прикрутить externals с массивом объектов, содержащих урлы с cdn библтотек
// const Dotenv = require('dotenv-webpack');

const isDev = process.env.NODE_ENV === 'development' // определяй в каком сейчас режиме
const isProd = !isDev                                //

const optimization = () => {
    const config = {
        // splitChunks: {
        //     chunks: 'all'
        // },
        splitChunks: false,
    }

    if (isProd) {
        config.minimizer = [
            // new OptimizeCssAssetsWebpackPlugin(), // ранее использовалось для сжатия css
            new CssMinimizerPlugin(), // рекомендовано для сжатия css
            new TerserWebpackPlugin(), // сжимает в строку js
        ]
    }

    return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders  = (extra) => {
    const loaders = [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {},
        },
        {
          loader: "css-loader",
          options: {},
        },
        'postcss-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                [
                  'autoprefixer',
                  {
                    // Options
                  },
                ],
              ],
            },
          }
        }
    ] // свой style-loader в комплекте

    if (extra) {
      extra === "sass-loader" ?
      (
        loaders.push({
          loader: "sass-loader",
          options: {
            sassOptions: {
              indentType: " ",
              indentWidth: 2,
              linefeed: "lf",
              outputStyle: "extended"
            }
          },
        })
      ) :
      loaders.push(extra)
    }

    return loaders
}

const babelOptions = (preset) => {
    const opts = {
        presets: [
          "@babel/preset-env"
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }

    if (preset) {
        opts.presets.push(preset)
    }

    return opts
}

const jsLoaders = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: babelOptions()
        }
    ]

    return loaders
}

const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            filename: 'home-region.html',
            template: './views/home-region/index.pug',
            minify: {
                collapseWhitespace: !isProd
            },
            inject: true,
            // chunks: ["home-region"]
        }),
        new HTMLWebpackPlugin({
          filename: 'air-passenger-traffic.html',
          template: './views/air-passenger-traffic/index.pug',
          minify: {
              collapseWhitespace: !isProd
          },
          inject: true,
          // chunks: ["air-passenger-traffic"]
        }),
        new HTMLWebpackPlugin({
          filename: 'airport-visitors.html',
          template: './views/airport-visitors/index.pug',
          minify: {
              collapseWhitespace: !isProd
          },
          inject: true,
          // chunks: ["airport-visitors"]
        }),
        new HTMLWebpackPlugin({
          filename: 'comparative-analysis.html',
          template: './views/comparative-analysis/index.pug',
          minify: {
              collapseWhitespace: !isProd
          },
          inject: true,
          // chunks: ["comparative-analysis"]
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, './src/images/**/*').replace(/\\/g, "/"), // в win пути с другими слэшами
              to: path.resolve(__dirname, './dist/'),
            },
          ]
      }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/' + filename('css'),
        }),
        // new Dotenv()
    ]

    return base
}

module.exports = {
    context: path.resolve(__dirname, 'src'),          // со всех путях удаляю эту папку
    mode: 'development',
    entry: {                                          // точка входа в приложение, откуда начать
        // 'home-region': ['@babel/polyfill', './home-region/index.js'],
        // 'air-passenger-traffic': ['@babel/polyfill', './air-passenger-traffic/index.js'],
        // 'airport-visitors': ['@babel/polyfill', './airport-visitors/index.js'],
        // 'comparative-analysis': ['@babel/polyfill', './comparative-analysis/index.js'],
        main: ['@babel/polyfill', './index.js'],
    },
    output: {                                         // куда складывать результаты работы
        filename: 'assets/js/' + filename('js'),      // итоговый файл, после сборкивсех js файлов
        path: path.resolve(__dirname, 'dist'),        // отталкиваясь от текущей директории, складывать все в dist
        publicPath: '/',                              // относительная ссылка, которая будет подставляться из браузера
    },
    resolve: {
        extensions: [                                 // какие расширения нужно понимать по умолчанию
            '.js', '.json', '.png'
        ],
       alias: {                                       // путь до корня проекта
           '@': path.resolve(__dirname, 'src')
       }
    },
    optimization: optimization(),
    devServer: {
      client: {
        logging: 'info',
        overlay: true,                              // вывод ошибок на экранб в браузер
      },
      open: true,
      port: 4200,
      hot: isDev,                                   // если разработка - true
      watchFiles: ['./src/views/']
    },
    devtool: isDev ? 'source-map' : false,
    externals: {},
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        }
                    },
                ]
            },
            {
                test: /\.(pdf|txt|doc|docx)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            // outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
            {
                test: /\.html$/,
                include: path.resolve(__dirname, 'src/assets/views'),
                use: [
                    'raw-loader',
                ]
            },
            {
              test: /\.pug$/,
              loader: 'pug-loader',
              options: {
                  pretty: true,
              }
          }
        ]
    },
    stats: {
      colors: true,
      reasons: true,
    },
    target: 'web'
}