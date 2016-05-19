/**
 * The contents of this file are subject to the OpenMRS Public License
 * Version 1.0 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://license.openmrs.org
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
 * License for the specific language governing rights and limitations
 * under the License.
 * Copyright (C) OpenMRS, LLC.  All Rights Reserved.
 */
// generated on 2016-05-10 using generator-openmrs-owa 0.2.0
'use strict';
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const env = require('yargs').argv.mode;

const UglifyPlugin = webpack.optimize.UglifyJsPlugin;
const CommonsChunkPlugin =  webpack.optimize.CommonsChunkPlugin;
const DedupePlugin = webpack.optimize.DedupePlugin;

const HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin')

const nodeModulesDir = path.resolve(__dirname, '../node_modules');

var plugins = [];
const nodeModules = {};

let outputFile = `.bundle`;
let outputPath;

let devtool;

/** Minify for production */
if (env === 'production') {
	  plugins.push(new UglifyPlugin({
	    output: {
	      comments: false,
	    },
	    minimize: true,
	    sourceMap: false,
	    compress: {
	        warnings: false
	    }
	  }));
	  plugins.push(new DedupePlugin());
	  outputFile = `${outputFile}.min.js`;
	  outputPath = `${__dirname}/dist/`;
} else if (env === 'dev') {
	  outputFile = `${outputFile}.js`;
	  outputPath = `${__dirname}/dist/`;
	  devtool = 'source-map';
}

plugins.push(new CommonsChunkPlugin("vendor", "vendor.bundle.js"));

plugins.push(new HtmlWebpackPlugin({
    template: './app/index.html',
    inject: 'body'
}));

plugins.push(new CopyWebpackPlugin([
	{
		from: './app/manifest.webapp'
	},
	{
	    from: './app/img/esaude-icon.png',
			to: 'img'
	},
	{
	    from: './app/img/circles.png',
			to: 'img'
	},
	{
	    from: './app/apps.json',
	    to: 'apps.json'
	}
]));

var webpackConfig = {
  quiet: false,
  entry: {
	  app : `${__dirname}/app/js/landing.js`,
	  css: `${__dirname}/app/css/landing.css`,
	  vendor : ['jquery']
  },
  devtool: devtool,
  output: {
    path: outputPath,
    filename: '[name]'+outputFile,
  },
  module: {
    loaders: [{
	    test: /\.jsx?$/,
	    loader: 'babel-loader',
	    exclude: /node_modules/,
	    query: {
	        presets: ['es2015'],
	        cacheDirectory : true
	    }
    },{
	    test: /\.css$/,
	    loader: 'style-loader!css-loader'
	}, {
	    test: /\.(png|jpg|jpeg|gif|svg)$/,
	    loader: 'url'
	}, {
	    test: /\.html$/,
	    loader: 'html'
	}],
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js'],
  },
  plugins,
  externals: nodeModules,
};

module.exports = webpackConfig;
