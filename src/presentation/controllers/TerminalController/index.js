import Person from '../../../domain/Person/index.js'
import Internationalization from '../../../infra/Internationalization/index.js'
import DateFormat from '../../../utils/DateFormat/index.js'

export default class TerminalController {
  constructor ({ customTerminal, table, repository }) {
    this.customTerminal = customTerminal
    this.print = this.customTerminal.console.draft
    this.table = table

    this.print(this.table.drawTable())

    this.repository = repository
  }

  async execute (obj = { question: '' }) {
    const answer = await this.customTerminal.terminal.question(obj.question)
    this.customTerminal.closeTerminal(answer)
    const newPerson = Person.generateInstanceFromString(answer, new Internationalization(), new DateFormat())
    this.table.updateTable(newPerson)
    this.print(this.table.drawTable())

    await this.repository.save(newPerson)
  }
}
