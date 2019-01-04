const Knex = require('knex')
const knex = Knex({ client: 'pg' })
const faker = require('faker')


const env = process.env.DB || 'local'
const { [env]: database } = require('./../database.json')
const { Pool } = require('pg')
const connection = new Pool(database)


const normalize = (obj) => (
  Object.keys(obj)
    .map(prop => ({ [prop]: obj[prop]}))
)

const userQuery = () => (
  knex('User')
    .returning('id')
    .insert({
      id: 'default',
      username: faker.internet.userName().substr(0, 19),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: 'default',
      updatedAt: null
    })
    .toString()
    .replace(/'default'/g, 'default')
)

const userInfoQuery = (idUser) => (
  knex('UserInfo')
    .returning('id', 'idUser')
    .insert({
      id: 'default',
      idUser,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      profileImage: faker.image.avatar(),
      about: faker.lorem.words(10),
      school: faker.company.companyName(),
      createdAt: 'default',
      updatedAt: null
    })
    .toString()
    .replace(/'default'/g, 'default')
)

let i = 0
for(; i < 5e3; i++) {
  connection.query(userQuery())
    .then(({ rows: [{ id }] }) => {
      console.log(id)
      return connection.query(userInfoQuery(id))
    })
    .then(({ rows: [item] }) => {
      console.log('Added', item)
    })
    .catch((err) => {
      console.log(err.message)
    })
}