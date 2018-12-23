const env = process.env.DB || 'local'
const { [env]: database } = require('./../database.json')
import { Pool } from 'pg'

const connection = new Pool(database)
console.log(connection.query)

export default connection
