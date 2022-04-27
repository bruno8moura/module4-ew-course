import Person from '../../../domain/Person/index.js'
export default class TerminalController {
  constructor ({ cli, table, repository }) {
    this.cli = cli
    this.table = table
    this.cli.print(this.table.drawTable())
    this.repository = repository
    this.stopReadingInput = ':q'
  }

  async execute (obj = { question: '' }) {
    const answer = await this.cli.readInput({ question: obj.question })
    if (answer === this.stopReadingInput) {
      this.cli.close()
      return false
    }
    const newPerson = Person.generateInstanceFromString(answer)
    this.table.updateTable(newPerson)
    this.cli.print(this.table.drawTable())

    await this.repository.save(newPerson)

    return true
  }
}
