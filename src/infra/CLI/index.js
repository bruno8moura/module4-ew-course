import readline from 'readline'
import DraftLog from 'draftlog'

export default class CLI {
  constructor () {
    // Increments, on demand, the table drawn in the terminal
    DraftLog(console).addLineListener(process.stdin)

    this.interfaceTerminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
  }

  async readInput ({ question = '' }) {
    return new Promise((resolve, reject) => {
      this.interfaceTerminal.question(question, resolve)
    })
  }

  // easy to test ;)
  programaticallyWriteInput ({ input }) {
    this.interfaceTerminal.write(input)
  }

  print (obj) {
    console.draft(obj)
  }

  close () {
    this.interfaceTerminal.close()
  }
}
