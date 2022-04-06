import readline from 'readline'
import DraftLog from 'draftlog'
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
    terminal,
    console: {
      draft: obj => console.draft(obj)
    },
    closeTerminal: function () {
      terminal.close()
    }
  }
}
