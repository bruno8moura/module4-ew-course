import mocha from 'mocha'

import chai from 'chai'

import DateFormat from '../src/utils/DateFormat/index.js'
const { describe, it } = mocha
const { expect } = chai

describe('DateFormat', () => {
  it('should return a valid date from a string', () => {
    const expected = new Date(2022, 0, 1).toISOString()
    const result = new DateFormat().stringDateToDate('2022-01-01').toISOString()

    expect(result).to.be.deep.equal(expected)
  })

  it('should return an erro when invalid year', () => {
    const expected = {
      isValid: false,
      error: new Error('The string date is invalid, the right format is yyyy-mm-dd')
    }
    const result = new DateFormat().stringDateToDate('year-01-01')

    expect(result.isValid).to.be.equal(expected.isValid)
    expect(result.error.message).to.be.equal(expected.error.message)
  })
})
