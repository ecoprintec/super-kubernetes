/*
 * This file is part of Super Kubenetes Console.
 * Copyright (C) 2019 The Super Kubenetes Console Authors.
 *
 * Super Kubenetes Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Super Kubenetes Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Super Kubenetes Console.  If not, see <https://www.gnu.org/licenses/>.
 */

const { resolve } = require('path')
const autoprefixer = require('autoprefixer')
const HappyPack = require('happypack')
const WebpackBar = require('webpackbar')
const WebpackAssetsManifest = require('webpack-assets-manifest')

const root = path => resolve(__dirname, `../${path}`)

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: {
    main: './src/core/index.js',
    terminalEntry:'./src/core/terminal.js'
  },
  moduleRules: [
    {
      test: /\.jsx?$/,
      include: root('src'),
      use: 'happypack/loader?id=jsx',
    },
    {
      test: /\.svg$/,
      issuer: { test: /\.jsx?$/ },
      use: [
        { loader: '@svgr/webpack', options: { icon: true } },
      ],
    },
    {
      test: /\.(jpg|png|svg)(\?.+)?$/,
      include: root('src/assets'),
      use: 'url-loader?limit=100000',
    },
    {
      test: /\.node$/,
      loader: 'node-loader',
    },
    {
      test: /\.md$/,
      use: "raw-loader",
    },         
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.md'],
    symlinks: false,
    modules: [root('src'), root('src/pages'), 'node_modules'],
    alias : {'@':root('docs'),},
  },
  plugins: [
    new HappyPack({
      id: 'jsx',
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: isDev ? [require.resolve('react-refresh/babel')] : [],
          },
        },
      ],
    }),
    new WebpackAssetsManifest({
      entrypoints: true,
      writeToDisk: true,
      output: '../dist/manifest.json',
    }),
    new WebpackBar(),
  ],
  postCssOptions: {
    ident: 'postcss',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      autoprefixer({
        browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
        flexbox: 'no-2009',
      }),
    ],
  },
}
