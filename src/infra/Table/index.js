import chalkTable from 'chalk-table'
import chalk from 'chalk'

export default class Table {
  createTable (data) {
    this.data = data
    const table = chalkTable(this.getTableOptions(), data)

    return table
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
}
