import Person from './domain/Person/index.js'
import database from './infra/database/database.json'
import Internationalization from './infra/Internationalization/index.js'
import Table from './infra/Table/index.js'
import { createCustomTerminal } from './infra/Terminal/customTerminal.js'
import TerminalController from './presentation/controllers/TerminalController/index.js'
import DateFormat from './utils/DateFormat/index.js'

const DEFAULT_LANG = 'pt-BR'
const customTerminal = createCustomTerminal()
const data = database.map(item => new Person(item, new Internationalization(), new DateFormat()))
const table = new Table({language: DEFAULT_LANG, data})

const terminalController = new TerminalController({ customTerminal, table })

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
