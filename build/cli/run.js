#!/usr/bin/env node

require('colorful').colorful()
const gulp = require('gulp')
const program = require('commander')

program.on('--help', () => {
  console.log('  Usage:'.to.bold.blue.color)
  console.log('  -- compile: compile code')
})

program.parse(process.argv)

const task = program.args[0]

if (!task) {
  program.help()
} else {
  console.log('zero ui run', task)

  require('../gulpfile')

  gulp.start(task)
}
