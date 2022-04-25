export default class PersonRowTableFormatter {
  constructor ({ language, dateFormat, internationalization }) {
    this.language = language
    this.dateFormat = dateFormat
    this.internationalization = internationalization
  }

  format (aPerson) {
    return {
      id: Number(aPerson.id),
      vehicles: this.internationalization
        .listFormat({ language: this.language, data: aPerson.vehicles, options: { style: 'long', type: 'conjunction' } }),
      kmTraveled: this.internationalization
        .numberFormat({ language: this.language, data: aPerson.kmTraveled, options: { style: 'unit', unit: 'kilometer' } }),
      from: this.internationalization
        .dateTimeFormat({ language: this.language, data: this.dateFormat.stringDateToDate(aPerson.from), options: { month: 'long', day: '2-digit', year: 'numeric' } }),
      to: this.internationalization
        .dateTimeFormat({ language: this.language, data: this.dateFormat.stringDateToDate(aPerson.to), options: { month: 'long', day: '2-digit', year: 'numeric' } })
    }
  }
}
