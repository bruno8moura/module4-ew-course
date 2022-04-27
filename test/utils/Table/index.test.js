import { describe, it, beforeEach, afterEach } from 'mocha'
import Table from '../../../src/utils/Table/index.js'
import chai from 'chai'
import sinon from 'sinon'
import ChalkTable from '../../../src/utils/ChalkTable/index.js'

const { expect } = chai

describe(Table.name, () => {
  let sandbox = {}
  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should update data table', () => {
    const data = []
    const sut = new Table({ data, formatter: {}, tableFields: [] })

    const addItem = { a: 1 }
    sut.updateTable(addItem)

    const expectedData = [addItem]
    expect(data).to.be.deep.equal(expectedData)
  })

  it('should convert table fields to object fields', () => {
    const tableFields = ['Field A', 'Field B', 'Field C']
    const anObject = {
      fieldA: 'a',
      fieldB: 'b',
      fieldC: 'c'
    }
    const data = [anObject]
    const sut = new Table({ data, formatter: {}, tableFields, tableHelper: new ChalkTable(tableFields) })

    const [itemA, itemB, itemC] = sut._buildColumns()

    const [keyA, keyB, keyC] = Object.keys(anObject)
    expect(itemA.field).to.be.equal(keyA)
    expect(itemB.field).to.be.equal(keyB)
    expect(itemC.field).to.be.equal(keyC)
  })

  it('should draw a table', () => {
    const tableFields = ['Field A', 'Field B', 'Field C']
    const anObject = {
      fieldA: 'a',
      fieldB: 'b',
      fieldC: 'c'
    }

    const formatter = { format: item => {} }
    const formattedObject = { fieldA: 1 }
    sandbox.stub(formatter, 'format').returns(formattedObject)

    const chalkTable = new ChalkTable(tableFields)
    sandbox.stub(chalkTable, chalkTable.drawTable.name).returns('a table drawn')
    sandbox.stub(chalkTable, chalkTable.columns.name).returns({})

    const data = [anObject]
    const sut = new Table({ data, formatter, tableFields, tableHelper: chalkTable })
    sut.drawTable()

    // eslint-disable-next-line no-unused-expressions
    expect(chalkTable.drawTable.calledOnce).to.be.ok
  })
})
