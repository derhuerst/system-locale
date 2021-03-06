'use strict'

const path = require('path')
const child = require('child_process')



const executeSync = (file) => {
	try {
		const stdout = child.execFileSync(path.join(__dirname, file))
		return stdout.toString().trim()
	} catch (e) {
		throw new Error('Cannot read locale.')
	}
}

const executeAsync = (file) => new Promise((yay, nay) => {
	child.execFile(path.join(__dirname, file), (err, stdout, stderr) => {
		if (err || !stdout.toString()) nay(new Error('Cannot read locale.'))
		yay(stdout.toString().trim())
	})
})

const locale = (execute = executeAsync) => {
	if (process.platform === 'darwin') return execute('os-x-locale')
	if (process.platform === 'win32') return execute('windows-locale.cmd')
	if (process.platform === 'linux') return execute('linux-locale')
	return Promise.reject('Cannot read locale, unknown operating system.')
}

module.exports = Object.assign(locale, {sync: () => locale(executeSync)})
