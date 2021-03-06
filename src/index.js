import Person from './domain/Person/index.js'
import database from './infra/database/database.json'
import Internationalization from './utils/Internationalization/index.js'
import Table from './utils/Table/index.js'
import PersonRowTableFormatter from './presentation/helpers/PersonRowTableFormatter/index.js'
import TerminalController from './presentation/controllers/TerminalController/index.js'
import DateFormat from './utils/DateFormat/index.js'
import JSONRepository from './infra/JSONRepository/index.js'
import ChalkTable from './utils/ChalkTable/index.js'
import CLI from './infra/CLI/index.js'

const DEFAULT_LANG = 'pt-BR'
const data = database.map(item => new Person(item))
const personFormatter = new PersonRowTableFormatter({dateFormat: new DateFormat(), internationalization: new Internationalization(), language: DEFAULT_LANG})
const tableFields = [ 'ID', 'Vehicles', 'Km Traveled', 'From', 'To' ]
const table = new Table({ data, formatter: personFormatter, tableFields, tableHelper: new ChalkTable(tableFields)} )

const { pathname: databaseFile} = new URL( './infra/database/database.json', import.meta.url)
const repository = new JSONRepository({databaseFile})
const cli = new CLI()
const terminalController = new TerminalController({ cli, table, repository })

async function mainLoop () {
  try {
    while(await terminalController.execute()){
      return mainLoop()
    }

    console.log('chegou aqui');
    process.exit(0)
  } catch (e) {
    console.log('erro: ', e)
  } 
}

await mainLoop()
