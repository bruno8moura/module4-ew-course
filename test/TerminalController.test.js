/* eslint-disable no-unused-expressions */
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import mocha from 'mocha'
import sinon from 'sinon'
import TerminalController from '../src/presentation/controllers/TerminalController/index.js'
import Table from '../src/infra/Table/index.js'
import repository from '../src/infra/repository/index.js'
import Person from '../src/domain/Person/index.js'
import Terminal from '../src/infra/Terminal/index.js'
import Internationalization from '../src/infra/Internationalization/index.js'
import DateFormat from '../src/utils/DateFormat/index.js'
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
    const expectedUsersInput = 'any_input'
    const terminal = new Terminal()
    const customTerminal = terminal.create()
    sandbox.stub(customTerminal.terminal, 'question').resolves(expectedUsersInput)
    sandbox.stub(customTerminal, 'closeTerminal')
    sandbox.stub(customTerminal.console, 'draft').returns(() => {})
    const table = new Table({ data: [], language: 'any_language' })
    sandbox.stub(table, 'updateTable').returns()
    sandbox.stub(table, 'drawTable').returns('a_table')
    const newPerson = { field: 'a' }
    sandbox.stub(Person, 'generateInstanceFromString').returns(newPerson)
    sandbox.stub(repository, 'save')

    const sut = new TerminalController({
      customTerminal,
      repository,
      table
    })

    expect(sut.print.calledOnce).to.be.ok

    await sut.execute()
    expect(customTerminal.closeTerminal.calledWithExactly(expectedUsersInput)).to.be.ok
    expect(Person.generateInstanceFromString.calledWithExactly(expectedUsersInput, new Internationalization(), new DateFormat())).to.be.ok
    expect(table.updateTable.calledWithExactly(newPerson)).to.be.ok
    expect(sut.print.calledWithExactly(table.drawTable())).to.be.ok
    expect(repository.save.calledWithExactly(newPerson)).to.be.ok

    expect(customTerminal.closeTerminal.calledOnce).to.be.ok
    expect(Person.generateInstanceFromString.calledOnce).to.be.ok
    expect(table.updateTable.calledOnce).to.be.ok
    expect(sut.print.calledTwice).to.be.ok
    expect(repository.save.calledOnce).to.be.ok
  })
})
