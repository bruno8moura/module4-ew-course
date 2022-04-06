import chalkTable from 'chalk-table'
import chalk from 'chalk'

export default class Table {
  constructor ({ language, data }) {
    this.language = language
    this.data = data
  }

  drawTable () {
    return chalkTable(this.getTableOptions(), this.data.map(item => item.formatted(this.language)))
  }

  getTableOptions () {
    return {
      leftPad: 2,
      columns: [
        { field: 'id', name: chalk.cyan('ID') },
        { field: 'vehicles', name: chalk.magenta('Vehicles') },
        { field: 'kmTraveled', name: chalk.cyan('Km Traveled') },
        { field: 'from', name: chalk.cyan('From') },
        { field: 'to', name: chalk.cyan('To') }
      ]
    }
  }

  updateTable (item) {
    this.data.push(item)
  }
}
