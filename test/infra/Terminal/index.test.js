import { describe, it, beforeEach, afterEach } from 'mocha'
import chai from 'chai'
import Terminal from '../../../src/infra/Terminal/index.js'
import readline from 'readline'
import sinon from 'sinon'

const { expect } = chai

describe(Terminal.name, () => {
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

    const sut = new Terminal()

    const customTerminal = sut.create()

    const promptQuestion = 'prompt something...'
    const result = await customTerminal.terminal.question(promptQuestion)

    expect(result).to.be.equal(expectedUsersInput)
    return expect(prompt.question.calledOnce).to.be.ok
  })

  it('should close terminal from a prompted input from user', async () => {
    const expectedUsersInput = ':q'
    const prompt = {
      question: (prompt, resolve) => resolve(expectedUsersInput),
      close: () => {}
    }

    sandbox.spy(prompt, prompt.question.name)
    sandbox.spy(prompt, prompt.close.name)
    sandbox.stub(process, process.exit.name).returns()

    sandbox.stub(readline, 'createInterface').returns(prompt)

    const sut = new Terminal()

    const customTerminal = sut.create()

    const promptQuestion = 'prompt something...'
    const result = await customTerminal.terminal.question(promptQuestion)

    customTerminal.closeTerminal(result)

    expect(result).to.be.equal(expectedUsersInput)
    // eslint-disable-next-line no-unused-expressions
    expect(prompt.question.calledOnce).to.be.ok
    // eslint-disable-next-line no-unused-expressions
    expect(prompt.close.calledOnce).to.be.ok
    // eslint-disable-next-line no-unused-expressions
    expect(process.exit.calledOnce).to.be.ok
  })
})
