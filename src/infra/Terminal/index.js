import readline from 'readline'
import DraftLog from 'draftlog'

export default class Terminal {
  constructor () {
    // Increments, on demand, the table drawn in the terminal
    DraftLog(console).addLineListener(process.stdin)

    this.stopTerminal = ':q'
  }

  create () {
    const interfaceTerminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    return {
      terminal: {
        question: async (question) => {
          return new Promise((resolve, reject) => {
            interfaceTerminal.question(question, resolve)
          })
        }
      },
      console: {
        draft: obj => console.draft(obj)
      },
      closeTerminal: code => {
        if (code === this.stopTerminal) {
          interfaceTerminal.close()
          process.exit(0)
        }
      }
    }
  }
}
