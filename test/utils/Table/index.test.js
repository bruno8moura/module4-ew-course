import { describe, it } from 'mocha'
import Table from '../../../src/utils/Table/index.js'
import chai from 'chai'

const { expect } = chai

describe(Table.name, () => {
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
    const sut = new Table({ data, formatter: {}, tableFields })

    const [itemA, itemB, itemC] = sut._buildColumns()

    const [keyA, keyB, keyC] = Object.keys(anObject)
    expect(itemA.field).to.be.equal(keyA)
    expect(itemB.field).to.be.equal(keyB)
    expect(itemC.field).to.be.equal(keyC)
  })
})
