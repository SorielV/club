const env = process.env.DB || 'local'
const { [env]: database } = require('./../database.json')
import { Pool } from 'pg'

// TODO: Connection without URI
const connectionString = `postgresql://${database.user}:${
  database.password
}@postgres/${database.database}`
const connection = new Pool({ connectionString })

connection
  .query('SELECT * FROM pg_catalog.pg_tables;')
  .then(console.log)
  .catch(console.log)

export default connection
