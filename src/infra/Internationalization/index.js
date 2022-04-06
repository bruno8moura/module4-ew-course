export default class Internationalization {
  listFormat ({ language, data, options }) {
    return new Intl
      .ListFormat(language, options)
      .format(data)
  }

  numberFormat ({ language, data, options }) {
    return new Intl
      .NumberFormat(language, options)
      .format(data)
  }

  dateTimeFormat ({ language, data, options }) {
    return new Intl
      .DateTimeFormat(language, options)
      .format(data)
  }
}
