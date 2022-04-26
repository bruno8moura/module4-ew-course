import { writeFile, readFile } from 'fs/promises'

export default class JSONRepository {
  constructor ({ databaseFile }) {
    this.databaseFile = databaseFile
  }

  async save (data) {
    const currentData = JSON.parse((await readFile(this.databaseFile)))
    currentData.push(data)

    await writeFile(this.databaseFile, JSON.stringify(currentData))
  }
}
