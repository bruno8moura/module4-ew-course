import mocha from 'mocha'

import chai from 'chai'

import Person from './../src/domain/Person/index.js'
import Internationalization from './../src/infra/Internationalization/index.js'
import DateFormat from './../src/utils/DateFormat/index.js'
const { describe, it } = mocha
const { expect } = chai

describe('Person', () => {
  it('should return a person instance from a string', () => {
    const person = Person.generateInstanceFromString(
      '1 Bike,Carro 20000 2020-01-01 2020-02-01',
      new Internationalization(),
      new DateFormat()
    )

    const expected = {
      from: '2020-01-01',
      to: '2020-02-01',
      vehicles: ['Bike', 'Carro'],
      kmTraveled: '20000',
      id: '1'
    }

    const { id, from, to, vehicles, kmTraveled } = person

    const p = { id, from, to, vehicles, kmTraveled }

    expect(p).to.be.deep.equal(expected)
  })

  it('should format person values', () => {
    const person = Person.generateInstanceFromString(
      '1 Bike,Carro 20000 2020-01-01 2020-02-01',
      new Internationalization(),
      new DateFormat()
    )

    const result = person.formatted('pt-BR')
    const expected = {
      id: 1,
      vehicles: 'Bike e Carro',
      kmTraveled: '20.000 km',
      from: '01 de janeiro de 2020',
      to: '01 de fevereiro de 2020'
    }

    expect(result).to.be.deep.equal(expected)
  })
})
