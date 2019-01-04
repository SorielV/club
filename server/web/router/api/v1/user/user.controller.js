import Knex from 'knex'
import { User } from './../../../../../models/user/'
import UserInfo from './../../../../../models/user/user-info'
import { include, exclude, formatAllowedOptions }  from './../../../../../utils/format'
const knex = Knex({ client: 'pg' })

const UserProfile = {
  table: 'UserProfile',
  fields: {
    idUser: null,
    username: null,
    profileImage: null,
    firstName: null
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

  return query = knexMethod(
    Object.keys(options).reduce(
      (query, option) => knexMethod(query, option, options), knex
    )
  ).toString()
}

const getProfileInfoQuery = (_options) => {
  const { ...options } = formatAllowedOptions(
    _options,
    {
      table: UserProfileInfo.table,
      allowed:  Object.keys(UserProfileInfo.fields)
    }
  )

  return query = knexMethod(
    Object.keys(options).reduce(
      (query, option) => knexMethod(query, option, options), knex
    )
  ).toString()
}


User.prototype.getProfile = async function(options, short = true) {
  const { rows: [item] } = await Club.query(
    short
      ? getProfileQuery({ ...options, limit: 1 })
      : getProfileInfoQuery({ ...options, limit: 1 })
  )
  return rows || [item]
}

User.prototype.getProfiles = async function(options, short = true) {
  const { rows } = await Club.query(
    short
      ? getProfileQuery(options)
      : getProfileInfoQuery(options)
  )
  return rows || []
}

export default User