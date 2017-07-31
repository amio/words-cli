const words = require('words-en')

module.exports = function (wildcard) {
  const regString = wildcard.replace(/\?/g, '\\w').replace(/\*/, '\\w*')
  const pattern = new RegExp('\\b' + regString + '\\b', 'g')

  return words.match(pattern)
}
