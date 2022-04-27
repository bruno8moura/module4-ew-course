import { describe, it } from 'mocha'
import { expect } from 'chai'
import ChalkTable from '../../../src/utils/ChalkTable/index.js'

describe(ChalkTable.name, () => {
  it('should draw a table', () => {
    const expected = '+--------+--------+--------+\n| \u001b[1mfieldA\u001b[22m | \u001b[1mfieldB\u001b[22m | \u001b[1mfieldC\u001b[22m |\n+--------+--------+--------+\n| a      | b      | c      |\n| a      | b      | c      |\n+--------+--------+--------+'
    const tableFields = ['Field A', 'Field B', 'Field C']
    const sut = new ChalkTable(tableFields)
    const data = [{ fieldA: 'a', fieldB: 'b', fieldC: 'c' }, { fieldA: 'a', fieldB: 'b', fieldC: 'c' }]
    const options = { option1: 1, option2: 2 }

    const result = sut.drawTable(options, data)
    expect(typeof result).to.be.equal('string')
    expect(result).to.be.equal(expected)
  })

  it('should create custom columns to chalktable', () => {
    const expected = [
      { field: undefined, name: '\x1B[36mField A\x1B[39m' },
      { field: undefined, name: '\x1B[36mField B\x1B[39m' },
      { field: undefined, name: '\x1B[36mField C\x1B[39m' }
    ]
    const tableFields = ['Field A', 'Field B', 'Field C']
    const data = [{ fieldA: 'a', fieldB: 'b', fieldC: 'c' }, { fieldA: 'a', fieldB: 'b', fieldC: 'c' }]
    const objectFields = Object.keys(data[0])

    const sut = new ChalkTable(tableFields)

    const result = sut.columns(objectFields)
    expect(typeof result).to.be.equal('object')
    expect(result).to.be.deep.equal(expected)
  })
})
