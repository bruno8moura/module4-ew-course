import { describe, it, beforeEach, afterEach, after } from 'mocha'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import JSONRepository from '../../../src/infra/JSONRepository/index.js'
import mock from 'mock-fs'
import { readFile } from 'fs/promises'

const { expect } = chai
chai.use(chaiAsPromised)

mock({
  'path/to/fake/file/database.json': '[{ "a": 1 }]'
})

describe('JSONRepository', () => {
  let sandbox = {}

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  after(() => {
    mock.restore()
  })

  it('should save data to a json file', async () => {
    const databaseFile = 'path/to/fake/file/database.json'
    const expected = JSON.parse('[{ "a": 1 }, { "b": 2 }]')
    const sut = new JSONRepository({ databaseFile })
    await sut.save({ b: 2 })

    const result = JSON.parse((await readFile(databaseFile)))
    expect(result).to.be.deep.equal(expected)
  })
})
