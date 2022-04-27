import chalkTable from 'chalk-table'
import chalk from 'chalk'

export default class ChalkTable {
  constructor (tableFields) {
    this.tableFields = tableFields
  }

  drawTable (options, data) {
    return chalkTable(options, data)
  }

  columns (objectFields) {
    return this.tableFields.map(tableField =>
      ({ field: objectFields[tableField], name: chalk.cyan(tableField) })
    )
  }
}
