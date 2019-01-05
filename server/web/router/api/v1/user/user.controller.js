import Knex from 'knex'
const knex = Knex({ client: 'pg' })

import { User } from './../../../../../models/user/'
import { formatAllowedOptions, knexMethod }  from './../../../../../utils/format'

const UserProfile = {
  table: 'UserProfile',
  fields: {
    idUser: null,
    username: null,
    profileImage: null,
    firstName: null
  },
  allowedFilter: {
    idUser: null,
    username: null
  }
}

const UserProfileInfo = {
  table: 'UserProfileInfo',
  fields: {
    idUser: null,
    username: null,
    profileImage: null,
    firstName: null,
    lastName: null,
    about: null,
    school: null
  },
  allowedFilter: {
    idUser: null,
    username: null
  }
}

// TODO: Change knewMethods (bind) 'r'

/**
 * API
 * Endpoints
 * .../profile/[Username|idUser] => get
 * .../user[/[id]] => post, put, delete
*/
const getProfileQuery = (_options) => {
  const { ...options } = formatAllowedOptions(
    _options,
    {
      table: UserProfile.table,
      allowed: Object.keys(UserProfile.fields)
    }
  )

  return Object.keys(options)
    .reduce(
      (query, option) => knexMethod(query, option, options), knex
    )
    .toString()
}

const getProfileInfoQuery = (_options) => {
  const { ...options } = formatAllowedOptions(
    _options,
    {
      table: UserProfileInfo.table,
      allowed:  Object.keys(UserProfileInfo.fields)
    }
  )

  return Object.keys(options)
    .reduce(
      (query, option) => knexMethod(query, option, options), knex
    )
    .toString()
}

User.getProfile = async function(options, short = true) {
  const { rows: [item] } = await User.query(
    short
      ? getProfileQuery({ ...options, limit: 1 })
      : getProfileInfoQuery({ ...options, limit: 1 })
  )
  return item || {}
}

User.getProfiles = async function(options, short = true) {
  const { rows } = await User.query(
    short
      ? getProfileQuery(options)
      : getProfileInfoQuery(options)
  )
  return rows || []
}

User.getProfiles({ username: 'Soriel' })
  .then(console.log)
  .catch(console.error)

export default User