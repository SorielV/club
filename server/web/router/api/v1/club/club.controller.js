import Knex from 'knex'
const knex = Knex({ client: 'pg' })

import { Club } from './../../../../../models/club/'
import { Model as ClubInfo } from './../../../../../models/club/club-info'
import { formatAllowedOptions, knexMethod } from './../../../../../utils/format'

// Vistas
const VClub = {
  table: 'VClub',
  fields: {
    id: null,
    identifier: null,
    description: null,
    idUser: null,
    username: null,
    firstName: null,
    profileImage: null,
    createdAt: null
  },
  allowedFilter: {
    identifier: null,
    idUser: null,
    username: null
  }
}

const VClubInfo = {
  table: 'VClubInfo',
  fields: {
    id: null,
    identifier: null,
    content: null,
    idUser: null,
    username: null,
    firstName: null,
    profileImage: null,
    createdAt: null
  },
  allowedFilter: {
    identifier: null,
    idUser: null,
    username: null
  }
}

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
      table: VClub.table,
      allowed: Object.keys(VClub.allowedFilter)
    }
  )

  return Object.keys(options)
    .reduce(
      (query, option) => knexMethod(query, option, options), knex
    )
    .toString()
}

const getClubInfoQuery = (_options) => {
  const { ...options } = formatAllowedOptions(
    _options,
    {
      table: VClubInfo.table,
      allowed:  Object.keys(VClubInfo.allowedFilter)
    }
  )

  return Object.keys(options)
    .reduce(
      (query, option) => knexMethod(query, option, options), knex
    )
    .toString()
}

Club.getClub = async function(options, short = true) {
  const { rows: [item] } = await Club.query(
    short
      ? getClubQuery({ ...options, limit: 1 })
      : getClubInfoQuery({ ...options, limit: 1 })
  )
  return item || {}
}

Club.getClubs = async function(options, short = true) {
  const { rows } = await Club.query(
    short
      ? getClubQuery(options)
      : getClubInfoQuery(options)
  )
  return rows || []
}

export default Club