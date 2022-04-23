import readline from 'readline'
import DraftLog from 'draftlog'
const STOP_TERM = ':q'
export const createCustomTerminal = () => {
  // Increments, on demand, the table drawn in the terminal
  DraftLog(console).addLineListener(process.stdin)

  // get user input from terminal
  // take back the process result to terminal
  const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return {
    terminal: {
      question: async (question) => {
        return new Promise((resolve, reject) => {
          terminal.question(question, resolve)
        })
      }
    },
    console: {
      draft: obj => console.draft(obj)
    },
    closeTerminal: function (code) {
      if (code === STOP_TERM) {
        terminal.close()
        process.exit(0)
      }
    }
  }
}
