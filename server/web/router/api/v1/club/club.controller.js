import Knex from 'knex'
const knex = Knex({ client: 'pg' })

import { Club, ClubInfo, ClubMember } from './../../../../../models/club'
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
    id: null,
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
    id: null,
    identifier: null,
    idUser: null,
    username: null
  }
}

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


/**
 * API
 * Endpoints
 * .../Club/[Username|idUser] => get
 * .../Club[/[id]] => post, put, delete
*/
const API = {
  createClub: async (req, res, next) => {
    console.log(req.user)
    const { id: idUser } = req.user
    const item = await new Club({ ...req.body, idUser }).save()
    const member = await new ClubMember({ idClub: item.id, idUser }).save()

    return res
      .status(201)
      .json({ data: item })
      .end()
  },
  getClub: async (req, res, next) => {
    if (isNaN(req.params.id)) {
      throw new Error('Formate campo Id no valido')
    }

    const format = req.query.format && req.query.format === 'simple'
    const items = await Club.getClub({ id: Number.parseInt(req.params.id) }, format)
    return res
      .status(200)
      .json({ data: items })
      .end()
  },
  getClubs: async (req, res, next) => {
    const format = req.query.format && req.query.format === 'simple'
    const items = await Club.getClubs(req.query, format)
    return res
      .status(200)
      .json({ data: items })
      .end()
  },
  updateClub: async (req, res, next) => {
    const item = await Club.update(req.body, { id: req.params.id })
    return res
      .status(200)
      .json({ data: item })
      .end()
  },
  updateClubInfo: async (req, res, next) => {
    const item = await ClubInfo.update(req.body, { id: req.params.id })
    return res
      .status(200)
      .json({ data: item })
      .end()
  },
  deleteClub: async (req, res, next) => {
    const idClub = Number.parseInt(req.params.id)
    await Club.delete({ id: idClub })
    await ClubInfo.delete({ idClub })
    return res
      .status(200)
      .end()
  }
}

export { Club, ClubInfo, ClubMember }
export default API
