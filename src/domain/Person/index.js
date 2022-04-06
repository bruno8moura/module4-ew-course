export default class Person {
  constructor ({ id, vehicles, kmTraveled, from, to }, internationalization, dateFormat) {
    this.id = id
    this.vehicles = vehicles
    this.kmTraveled = kmTraveled
    this.from = from
    this.to = to

    this.internationalization = internationalization
    this.dateFormat = dateFormat
  }

  formatted (language) {
    return {
      id: Number(this.id),
      vehicles: this.internationalization
        .listFormat({ language, data: this.vehicles, options: { style: 'long', type: 'conjunction' } }),
      kmTraveled: this.internationalization
        .numberFormat({ language, data: this.kmTraveled, options: { style: 'unit', unit: 'kilometer' } }),
      from: this.internationalization
        .dateTimeFormat({ language, data: this.dateFormat.stringDateToDate(this.from), options: { month: 'long', day: '2-digit', year: 'numeric' } }),
      to: this.internationalization
        .dateTimeFormat({ language, data: this.dateFormat.stringDateToDate(this.to), options: { month: 'long', day: '2-digit', year: 'numeric' } })
    }
  }

  // 2 Bike,Aviao,Navio 200000000 2000-01-01 2002-02-01
  static generateInstanceFromString (text, internationalization, dateFormat) {
    const EMPTY_SPACE = ' '
    const [id, vehicles, kmTraveled, from, to] = text.split(EMPTY_SPACE)
    const person = new Person({
      id,
      kmTraveled,
      from,
      to,
      vehicles: vehicles.split(',')
    }, internationalization, dateFormat)

    return person
  }
}
