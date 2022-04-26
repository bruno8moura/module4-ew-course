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
})
