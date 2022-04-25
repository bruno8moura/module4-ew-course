import Person from './domain/Person/index.js'
import database from './infra/database/database.json'
import Internationalization from './utils/Internationalization/index.js'
import Table from './utils/Table/index.js'
import PersonRowTableFormatter from './data/helpers/PersonRowTableFormatter/index.js'
import Terminal from './infra/Terminal/index.js'
import TerminalController from './presentation/controllers/TerminalController/index.js'
import DateFormat from './utils/DateFormat/index.js'
import repository from './infra/repository/index.js'

const DEFAULT_LANG = 'pt-BR'
const customTerminal = new Terminal().create()
const data = database.map(item => new Person(item))
const personFormatter = new PersonRowTableFormatter({dateFormat: new DateFormat(), internationalization: new Internationalization(), language: DEFAULT_LANG})
const table = new Table({ data, formatter: personFormatter, tableFields: [ 'ID', 'Vehicles', 'Km Traveled', 'From', 'To' ]})

const terminalController = new TerminalController({ customTerminal, table, repository })

async function mainLoop () {
  try {
    await terminalController.execute()
    
    return mainLoop()
  } catch (e) {
    console.log('erro: ', e)
    return mainLoop()
  }
}

await mainLoop()
