import { writeFile, readFile } from 'fs/promises'

const save = async (data) => {
  const { pathname: databaseFile } = new URL('../database/database.json', import.meta.url)
  const currentData = JSON.parse((await readFile(databaseFile)))
  currentData.push(data)

  await writeFile(databaseFile, JSON.stringify(currentData))
}

export default { save }
