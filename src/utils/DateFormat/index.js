export default class DateFormat {
  stringDateToDate (stringDate) {
    const [year, month, day] = stringDate.split('-').map(Number)

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return { isValid: false, error: new Error('The string date is invalid, the right format is yyyy-mm-dd') }
    }

    return new Date(year, (month - 1), day)
  }
}
