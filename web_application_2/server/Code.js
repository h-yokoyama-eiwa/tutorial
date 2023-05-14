import {GPC_CONNECTION_NAME,
        GPC_USER_NAME,
        GPC_PASSWORD,
        GPC_DATABASE_NAME,
        GPC_URL
      } from './functions/globalValue'
import doGet from './functions/doGet'
// import sample from './functions/sample'
import updateBooksTable from './functions/updateBooksTable'

global.GPC_CONNECTION_NAME = GPC_CONNECTION_NAME
global.GPC_USER_NAME = GPC_USER_NAME
global.GPC_PASSWORD = GPC_PASSWORD
global.GPC_DATABASE_NAME = GPC_DATABASE_NAME
global.GPC_URL = GPC_URL
global.doGet = doGet
// global.sample = sample
global.updateBooksTable = updateBooksTable
