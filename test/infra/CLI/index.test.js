import { describe, it, beforeEach, afterEach } from 'mocha'
import chai from 'chai'
import CLI from '../../../src/infra/CLI/index.js'
import readline from 'readline'
import sinon from 'sinon'

const { expect } = chai

describe(CLI.name, () => {
  let sandbox = {}
  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should prompt an input from user', async () => {
    const expectedUsersInput = 'any_input'

    const prompt = {
      question: (prompt, resolve) => resolve(expectedUsersInput)
    }

    sandbox.spy(prompt, prompt.question.name)

    sandbox.stub(readline, 'createInterface').returns(prompt)
    const sut = new CLI()
    const result = await sut.readInput({ question: '' })

    expect(result).to.be.equal(expectedUsersInput)
    return expect(prompt.question.calledOnce).to.be.ok
  })

  it('should close terminal from a prompted input from user', async () => {
    const prompt = {
      close: () => {}
    }

    sandbox.spy(prompt, prompt.close.name)
    sandbox.stub(process, process.exit.name).returns()

    sandbox.stub(readline, 'createInterface').returns(prompt)

    const sut = new CLI()

    sut.close()

    // eslint-disable-next-line no-unused-expressions
    expect(prompt.close.calledOnce).to.be.ok
  })
})
