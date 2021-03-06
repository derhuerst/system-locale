#!/usr/bin/env node
'use strict'

const assert = require('assert')
const isPromise = require('is-promise')

const locale = require('.')

const showError = (err) => {
	console.error(err.stack)
	process.exit(1)
	throw err
}

console.info('platform:', process.platform)



assert(typeof locale.sync(), 'string', 'result is not a string')
console.info('sync:', locale.sync())

assert(isPromise(locale()), 'not a promise')

locale()
.then((locale) => {
	assert(typeof locale, 'string', 'result is not a string')
	console.info('async:', locale)
})
.catch(showError)

