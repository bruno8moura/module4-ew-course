import Person from '../../../domain/Person/index.js'
import Internationalization from '../../../infra/Internationalization/index.js'
import DateFormat from '../../../utils/DateFormat/index.js'

export default class TerminalController {
  constructor ({ customTerminal, table }) {
    this.customTerminal = customTerminal
    this.print = this.customTerminal.console.draft
    this.table = table

    this.print(this.table.drawTable())
  }

  async execute (obj = { question: '' }) {
    const answer = await new Promise(resolve => this.customTerminal.terminal.question(obj.question, resolve))
    this.customTerminal.closeTerminal(answer)

    const newPerson = Person.generateInstanceFromString(answer, new Internationalization(), new DateFormat())
    this.table.updateTable(newPerson)
    this.print(this.table.drawTable())
  }
}
