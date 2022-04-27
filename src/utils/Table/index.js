export default class Table {
  constructor ({ data, formatter, tableFields, tableHelper }) {
    this.data = data
    this.formatter = formatter
    this.tableFields = tableFields
    this.table = tableHelper
  }

  drawTable () {
    return this.table.drawTable(this.getTableOptions(), this.data.map(item => this.formatter.format(item)))
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

    return this.table.columns(objectFieldToColumnFieldMapper)
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
