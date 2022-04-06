
export default class TerminalController {
  constructor ({ customTerminal, table }) {
    this.customTerminal = customTerminal
    this.print = this.customTerminal.console.draft(table)
  }

  async execute (obj = { question: '' }) {
    return new Promise(resolve => this.customTerminal.terminal.question(obj.question, resolve))
  }
}
