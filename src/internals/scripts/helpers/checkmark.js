const chalk = require('chalk')

// Add mark check symbol
function addCheckMark(callback) {
  process.stdout.write(chalk.green(' ✓'))
  if (callback) callback()
}

module.exports = addCheckMark
