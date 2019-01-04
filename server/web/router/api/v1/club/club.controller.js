import Knex from 'knex'
const knex = Knex({ client: 'pg' })
import { Club } from './../../../../../models/club/'
import ClubInfo from './../../../../../models/club/club-info'

const UserClub = {
  table: 'Club',
  fields: {
    idUser: null,
    username: null,
    ClubImage: null,
    firstName: null
  }
}

const ClubInfo = {
  table: 'UserClubInfo',
  fields: {
    idUser: null,
    username: null,
    ClubImage: null,
    firstName: null,
    lastName: null,
    about: null,
    school: null
  }
}

// TODO: Change knewMethods (bind) 'r'

/**
 * API
 * Endpoints
 * .../Club/[Username|idUser] => get
 * .../Club[/[id]] => post, put, delete
*/
const getClubQuery = (_options) => {
  const { ...options } = formatAllowedOptions(
    _options,
    {
      table: UserClub.table,
      allowed: Object.keys(UserClub.fields)
    }
  )

  return query = knexMethod(
    Object.keys(options).reduce(
      (query, option) => knexMethod(query, option, options), knex
    )
  ).toString()
}

const getClubInfoQuery = (_options) => {
  const { ...options } = formatAllowedOptions(
    _options,
    {
      table: UserClubInfo.table,
      allowed:  Object.keys(UserClubInfo.fields)
    }
  )

  return query = knexMethod(
    Object.keys(options).reduce(
      (query, option) => knexMethod(query, option, options), knex
    )
  ).toString()
}

Club.prototype.getClubs = async function(_options) {
  const { where, ...options } = formatAllowedOptions(
    { ..._options, _fields: include.apply(Club) },
    { table: Schema.table, allowed: Club.fieldsName }
  )


  const query = knexMethod(
    Object.keys(options).reduce(
      (query, option) => knexMethod(query, option, options), knex
    ),
    where,
  ).innerJoin()

  const { rows } = await Club.query(query)
  return rows || []
}

export default User
