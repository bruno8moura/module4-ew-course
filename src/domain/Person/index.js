export default class Person {
  constructor ({ id, vehicles, kmTraveled, from, to }) {
    this.id = id
    this.vehicles = vehicles
    this.kmTraveled = kmTraveled
    this.from = from
    this.to = to
  }

  // 2 Bike,Aviao,Navio 200000000 2000-01-01 2002-02-01
  static generateInstanceFromString (text) {
    const EMPTY_SPACE = ' '
    const [id, vehicles, kmTraveled, from, to] = text.split(EMPTY_SPACE)
    const person = new Person({
      id,
      kmTraveled,
      from,
      to,
      vehicles: vehicles.split(',')
    })

    return person
  }
}
