import chalkTable from 'chalk-table'
import chalk from 'chalk'

export default class Table {
  constructor ({ data, formatter, tableFields }) {
    this.data = data
    this.formatter = formatter
    this.tableFields = tableFields
  }

  drawTable () {
    return chalkTable(this.getTableOptions(), this.data.map(item => this.formatter.format(item)))
  }

  getTableOptions () {
    return {
      leftPad: 2,
      columns: this._buildColumns()
    }
  }

  _buildColumns () {
    const objectFields = Object.keys(this.data[0])

    const objectFieldToColumnFieldMapper = this.tableFields.reduce((previous, current, i, arr) => {
      const mapper = typeof previous === 'object' ? previous : { [previous]: this._tableFieldToObjectField(previous, objectFields) }

      mapper[current] = this._tableFieldToObjectField(current, objectFields)

      return mapper
    })

    return this.tableFields.map(tableField =>
      ({ field: objectFieldToColumnFieldMapper[tableField], name: chalk.cyan(tableField) })
    )
  }

  _tableFieldToObjectField (tableField, objectFields) {
    const tableFieldFormated = tableField.toLowerCase().replace(/\s*/g, '')
    const foundObjField = objectFields.find(objField => objField.toLowerCase() === tableFieldFormated)
    return foundObjField
  }

  updateTable (item) {
    this.data.push(item)
  }
}
