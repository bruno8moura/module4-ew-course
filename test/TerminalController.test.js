/* eslint-disable no-unused-expressions */
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import mocha from 'mocha'
import sinon from 'sinon'
import TerminalController from '../src/presentation/controllers/TerminalController/index.js'
import Table from '../src/utils/Table/index.js'
import JSONRepository from '../src/infra/JSONRepository/index.js'
import Person from '../src/domain/Person/index.js'
import CLI from '../src/infra/CLI/index.js'
const { describe, it, beforeEach, afterEach } = mocha
chai.use(chaiAsPromised)

const { expect } = chai

describe('TerminalController', () => {
  let sandbox = {}
  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it("should print in terminal the person's table from an user's input", async () => {
    const repository = new JSONRepository({ databaseFile: 'any_path' })
    const expectedUsersInput = 'any_input'
    const cli = new CLI()
    sandbox.stub(cli, 'readInput').resolves(expectedUsersInput)
    sandbox.stub(cli, 'close')
    sandbox.stub(cli, 'print').returns(() => {})
    const table = new Table({ data: [], language: 'any_language' })
    sandbox.stub(table, 'updateTable').returns()
    sandbox.stub(table, 'drawTable').returns('a_table')
    const newPerson = { field: 'a' }
    sandbox.stub(Person, 'generateInstanceFromString').returns(newPerson)
    sandbox.stub(repository, 'save')

    const sut = new TerminalController({
      cli,
      repository,
      table
    })

    expect(cli.print.calledOnce).to.be.ok

    await sut.execute()
    expect(Person.generateInstanceFromString.calledWithExactly(expectedUsersInput)).to.be.ok
    expect(table.updateTable.calledWithExactly(newPerson)).to.be.ok
    expect(cli.print.calledWithExactly(table.drawTable())).to.be.ok
    expect(repository.save.calledWithExactly(newPerson)).to.be.ok

    expect(Person.generateInstanceFromString.calledOnce).to.be.ok
    expect(table.updateTable.calledOnce).to.be.ok
    expect(cli.print.calledTwice).to.be.ok
    expect(repository.save.calledOnce).to.be.ok
  })
})
