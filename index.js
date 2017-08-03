const fs = require('fs')
const readline = require('readline')
const wordsTxtPath = require('words-en/path')

module.exports = async function (wildcard) {
  const regString = wildcard.replace(/\?/g, '\\w').replace(/\*/, '\\w*')
  const pattern = new RegExp('^' + regString + '$')

  return await new Promise((resolve, reject) => {
    const results = []

    const rl = readline.createInterface({
      input: fs.createReadStream(wordsTxtPath)
    })

    rl.on('line', line => {
      pattern.test(line) && results.push(line)
    })

    rl.on('close', () => resolve(results))
    rl.on('error', e => reject(e))
  })
}
