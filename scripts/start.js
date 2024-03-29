'use strict'

// Do this as the first thing so that any code reading it knows the right env
process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code
process.on('unhandledRejection', err => {
	throw err
})

// lib requires
const fs = require('fs')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
// NOTE: rather than start second app here (never works when on hosted resource like Heroku),
// client should connect to separate running app (whether it is express or not)
// const express = require('express')
// const secondApp = express()

// react-dev-util requires
const chalk = require('react-dev-utils/chalk')
const clearConsole = require('react-dev-utils/clearConsole')
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles')
const {
	choosePort,
	createCompiler,
	prepareProxy,
	prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils')
const openBrowser = require('react-dev-utils/openBrowser')
// CRA requires explictly set browsers (to not fall back to browserslist defaults)
const { checkBrowsers } = require('react-dev-utils/browsersHelper')

// Ensure environment variables are loaded
require('../config/env')

// non-tool, non-lib requires
const paths = require('../config/paths')
const configFactory = require('../config/webpack.config')
const createDevServerConfig = require('../config/webpackDevServer.config')
// const WebSocket = require('ws')

const useYarn = fs.existsSync(paths.yarnLockFile)
const isInteractive = process.stdout.isTTY

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
	process.exit(1)
}

// read vars from process.env
// Tools like Cloud9, Heroku rely on this
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000
const HOST = process.env.HOST || '0.0.0.0'
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'
const TERMINATION_CODES = ['SIGINT', 'SIGTERM']

if (process.env.HOST) {
	const formattedHost = chalk.yellow(chalk.bold(process.env.HOST))
	console.log(chalk.cyan(`Attempting to bind to HOST environment variable: ${formattedHost}`))
	// console.log(`If this was unintentional, check that you haven't mistakenly set it in your shell.`)
	// console.log(`Learn more here: ${chalk.yellow('https://bit.ly/CRA-advanced-config')}`)
	console.log()
}

checkBrowsers(paths.appPath, isInteractive)
	.then(() => {
		// CRA attempt to use default port; if it is busy, offer option to run on a different port
		// `choosePort()` Promise resolves to the next free port
		return choosePort(HOST, DEFAULT_PORT)
	})
	.then(port => {
		if (port == null) {// We have not found a port, bail
			return
		}
		const config = configFactory('development')
		const appName = require(paths.appPackageJson).name
		const useTypeScript = fs.existsSync(paths.appTsConfig)
		const urls = prepareUrls(protocol, HOST, port)
		const devSocket = {
			warnings: warnings => devServer.sockWrite(devServer.sockets, 'warnings', warnings),
			errors: errors => devServer.sockWrite(devServer.sockets, 'errors', errors)
		}
		// Create a webpack compiler that is configured with custom messages
		const compiler = createCompiler({
			appName,
			config,
			devSocket,
			urls,
			useYarn,
			useTypeScript,
			webpack
		})
		// Load proxy config
		const proxySetting = require(paths.appPackageJson).proxy
		const proxyConfig = prepareProxy(proxySetting, paths.appPublic)
		// Serve webpack assets generated by the compiler over a web server
		const serverConfig = createDevServerConfig(proxyConfig, urls.lanUrlForConfig)
		// let wss

		// let numHits = 0
		// secondApp.get('/*', function(req, res) {
		// 	numHits++
		// 	res.json({
		// 		numHits,
		// 		req: {
		// 			url: req.url,
		// 			method: req.method,
		// 			headers: req.headers
		// 		}
		// 	})
		// })

		// const supportingAppPort = parseInt(port, 10) + 1
		// let supportingServer

		// try {
		// 	supportingServer = secondApp.listen(supportingAppPort)
		// } catch (supportingErr) {
		// 	console.log('Error in supporting server, logging and exiting process...')
		// 	if (supportingErr && supportingErr.message) {
		// 		console.log(supportingErr.message)
		// 	} else if (supportingErr) {
		// 		console.log(supportingErr)
		// 	}
		// 	process.exit(1)
		// 	return
		// }

		const devServer = new WebpackDevServer(compiler, serverConfig)
		devServer.listen(port, HOST, err => { // Launch WebpackDevServer
			if (err) {
				return console.log(err)
			}
			if (isInteractive) {
				clearConsole()
			}
			// console.log(chalk.cyan('Starting the web socket server...\n'))
			// wss = new WebSocket.Server({ port: 8080 })
			// wss.on('connection', ws => {
			// 	ws.on('message', message => {
			// 		console.log('received: %s', message)
			// 	})
	
			// 	ws.send('something')
			// })
			console.log(chalk.cyan('Starting the development server...\n'))
			openBrowser(urls.localUrlForBrowser)
			// openBrowser(urls.localUrlForBrowser.replace(`:${port}`, `:${supportingAppPort}`))
		})

		TERMINATION_CODES.forEach(function(sig) {
			process.on(sig, function() {
				// wss.close()
				// if (supportingServer) {
				// 	supportingServer.close()
				// }
				devServer.close()
				process.exit()
			})
		})
	})
	.catch(err => {
		if (err && err.message) {
			console.log(err.message)
		} else if (err) {
			console.log(err)
		}
		process.exit(1)
	})
