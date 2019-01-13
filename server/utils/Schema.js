import Knex from 'knex'
import pool from './../config/database'
const knex = Knex({ client: 'pg' })

import {
  knexMethod,
  getProperties,
  formatOptions,
  formatAllowedOptions,
  slugify
} from './format'
import { userInfo } from 'os';

function Schema(name, { table, primaryKey, fields, options, validation }) {
  // Prevent
  ['update', 'delete', 'find', 'findOne', 'save'].forEach((method) => {
    if (fields[method]) {
      throw new Error(`El nombre ${method} no puede ser usado como campo C:`)
    }
  })

  const proxy = Object.keys(fields).reduce(
    (obj, prop) => {
      obj[prop] = null
      return obj
    },
    {}
  )

  const validateProp = (obj, prop, _value) => {
    // Null || Undefined
    let value = _value

    if ((value === undefined || value === null) & !fields[prop].allowNull) {
      throw new Error(`Campo ${prop} no puede ser null`)
    } else {
      value = value === undefined ? null : value
    }

    // Format Lowercase, Uppercase, minLength, maxLength, trim
    switch(fields[prop].type) {
      case String:
        if (typeof value !== 'string') {
          value = String(value)
        }

        if (fields[prop].trim) value = value.trim()

        if (fields[prop].maxLength && value.length >= fields[prop].maxLength) {
          throw new Error(
            `El Campo ${prop} debera ser de longitud menor a ${fields[prop].maxLength}`
          )
        }

        if (fields[prop].minLength && value.length <= fields[prop].minLength) {
          throw new Error(`Campo ${prop} debera ser de longitud mayor a ${fields[prop].minLength}`)
        }

        if (fields[prop].lowercase) value = value.toLowerCase()
        if (fields[prop].uppercase) value = value.toUpperCase()
      break

      case Number:
        if (fields[prop].min && value > fields[prop].max) {
          throw new Error(
            `Campo ${prop} debera ser menor a ${fields[prop].max}`
          )
        }

        if (fields[prop].max && value < fields[prop].max) {
          throw new Error(
            `Campo ${prop} debera ser mayor a ${fields[prop].max}`
          )
        }
      break
    }

    if (fields[prop].validation) {
      if (!fields[prop].validation(value)) throw new Error(`Campo ${prop} invalido`)
    }

    return value
  }

  function Schema(data, validate = true) {    
    for (const prop in validation ? proxy : data) {
      this[prop] = null
    }
    
    const self = new Proxy(this, {
      set: (obj, prop, _value) => {
        const currentValue = obj[prop]
        const value = validateProp(obj, prop, _value)

        if (value != currentValue) {
          if (this.constructor.prototype._isSet) {
           if (validation && !validation.apply(obj, null)) {
             throw `Inconsistencia en la informacion`
           }
           if (this.constructor.prototype._changedProperties.indexOf(prop) === -1) { 
             this.constructor.prototype._changedProperties.push(prop)
           }
          }
        }

        obj[prop] = value
        return true
      }
      // Next Feacture Time | Datetime | Timestamps
    })

    if (validate) {
      [].concat(primaryKey).forEach((prop) => {
        delete data[prop]
      })

      for (const prop in fields) {
        if (data[prop] === null || data[prop] === undefined) {
          if (fields[prop].default || fields[prop].allowNull) {
            this[prop] = fields[prop].default || null
          } else {
            throw `El campo ${prop} es requirido`
          }
        } else {
          this[prop] = data[prop]
        }
      }
    }

    if (validation) {
      if (!validation.apply(obj, null)) throw `Inconsistencia en la informacion`
    }

    this.constructor.prototype._isSet = true
    return self
  }

  const query = async (query, queryOptions = {}) => {
    if ((Schema.options && Schema.options.debug) || queryOptions.debug) {
      console.log(query)
    }
    // Should return {field, rows}
    return await Schema.pool.query({ text: query, ...queryOptions })
  }

  Schema.table  = table
  Schema.primaryKey  = [].concat(primaryKey)
  Schema.fields  = fields
  Schema.fieldsName = Object.keys(fields)
  Schema.validation  = validation
  Schema.options = options
  Schema.pool = pool
  Schema.query = query
  
  Schema.prototype.query = query
  Schema.prototype._isSet = false
  Schema.prototype._changedProperties = []

  Schema.prototype.save = async function() {
    const hasPk = [].concat(primaryKey).some(
      prop => {
        return this[prop] !== null && this[prop] !== undefined
      }
    )
    
    if (!hasPk) {
      const primaryKeys = [].concat(primaryKey).reduce(
        (obj, prop) => {
          obj[prop] = 'default'
          return obj
        }, {}
      )

      const { rows: [item] } = await this.query(knex(table)
        .insert({ ...this, ...primaryKeys })
        .returning('*')
        .toString()
        .replace('\'default\'', 'default')
      )

      // Reset Proxy
      this.constructor.prototype._isSet = false
      for(const prop in item) {
        if (this[prop] !== item[prop]) {
          this[prop] = item[prop]
        }
      }
      this.constructor.prototype._isSet = true

      return this
    } else {
      return this.update()
    }
  }

  Schema.prototype.update = async function(data = null) {
    if (data) {
      for (const prop in data) {
        if (fields[prop]) {
          this[prop] = data[prop]
        }
      }

      if (validation) {
        if (!validation.apply(obj, null)) throw `Inconsistencia en la informacion`
      }
    }

    const { rows: [item] } = await this.query(knex(table)
      .where(getProperties(this, primaryKey))
      .update(getProperties(this, this._changedProperties))
      .returning('*')
      .toString()
    )

    return this
  }

  Schema.getAll = async function(_options = {}) {
    const options =
      formatAllowedOptions(_options, { table: Schema.table })

    const query = ['select', 'from', 'orderBy'].reduce(
      (query, option) => knexMethod(query, option, options),
      knex
    ).toString()

    const { rows } = await Schema.query(query)
    return rows || []
  }

  Schema.get = async function(_options) {
    const options = formatAllowedOptions(
      _options,
      { table: Schema.table, allowed: Schema.fieldsName }
    )

    const query = Object.keys(options).reduce(
      (query, option) => knexMethod(query, option, options),
      knex
    ).toString()

    const { rows } = await Schema.query(query)
    return rows || []
  }

  Schema.find = async function(_options) {
    const options = formatAllowedOptions(
      _options, { table: Schema.table }
    )

    const query = Object.keys(options).reduce(
      (query, option) => knexMethod(query, option, options),
      knex
    ).toString()

    const { rows } = await Schema.query(query)
    return rows.map(data => new Schema(data, false))
  }

  Schema.getById = async function(primaryKeys) {
    const { rows: [item] } = await Schema.query()
    return item || null
  }

  Schema.findOne = async function(where) {
    const [item] = await Schema.get({ ...where, limit: 1 })
    return item
  }

  Schema.prototype.query = query

  Schema.update = async function(data = {}, where = {}, plain = true) {
    if (!data || typeof data !== 'object') throw new Error('No hay datos')

    const item = await Schema.findOne(where)
    if (!item) throw new Error('Concidencias no encontradas')

    const primaryKeys = [].concat(primaryKey).reduce(
      (obj, prop) => {
        obj[prop] = data[prop]
        delete data[prop]
        return obj
      }, {}
    )

    if (data) {
      for (const prop in data) {
        if (fields[prop]) item.data[prop] = data[prop]
      }

      if (validation) {
        if (!validation.apply(item.data, null)) throw `Inconsistencia en la informacion`
      }
    }

    const { rows: [result] } = await this.query(
      knex(table)
        .where(getProperties(item.data, primaryKey))
        .update(getProperties(item.data, item.changedProperties))
        .returning('*')
        .toString()
    )

    return result
  }

  Schema.delete = async function() {
    const result = await Schema.query(
      knex(table)
        .where(getProperties(where, primaryKey))
        .delete()
        .toString()
    )
    return Boolean(result)

  }

  return Schema
}

module.exports = Schema
