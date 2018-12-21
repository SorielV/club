const Knex = require('knex')
const knex = Knex({ client: 'pg' })

const getProperties = (data, props) => (
  [].concat(props).reduce((obj, prop) => {
    obj[prop] = data[prop]
    return obj
  } , {})
)

const Model = {
  table: 'Users',
  primaryKey: 'id',
  fields: {
    id: {
      type: Number,
      required: false,
      allowNull: true,
      default: null
    },
    name: {
      type: String,
      required: true,
      allowNull: false,
      lowercase: true,
      maxLength: 100,
      minLength: 2,
    },
    birthDate: {
      type: Date,
      required: true
    },
    ocupacion: {
      type: String,
      required: true,
      lowercase: true,
      validation(prop) {
        return prop.length < 6
      },
    }
  },
  validation: false,
  options: {
    allowRead: true,
    allowCreate: true,
    allowUpdate: true,
    allowDelete: true
  }
}

function Schema(name, { table, primaryKey, fields, options, validation }) {

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
      throw `Campo ${prop} no puede ser null`
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
          throw `El Campo ${prop} debera ser de longitud menor a ${fields[prop].maxLength}`
        }

        if (fields[prop].minLength && value.length <= fields[prop].minLength) {
          throw `Campo ${prop} debera ser de longitud mayor a ${fields[prop].minLength}`
        }

        if (fields[prop].lowercase) value = value.toLowerCase()
        if (fields[prop].uppercase) value = value.toUpperCase()
      break

      case Number:
        if (fields[prop].min && value > fields[prop].max) {
          throw `Campo ${prop} debera ser menor a ${fields[prop].max}`
        }

        if (fields[prop].max && value < fields[prop].max) {
          throw `Campo ${prop} debera ser mayor a ${fields[prop].max}`
        }
      break
    }

    if (fields[prop].validation) {
      if (!fields[prop].validation(value)) throw `Campo ${prop} invalido`
    }

    return value
  }

  const Schema = class {
    constructor(data, validate = true) {
      const obj = Object.assign({}, proxy)

      // State Pre-Properties
      this._isSet = false
      this.changedProperties = []

      // Proxy
      this.data = new Proxy(validate ? obj : data, {
        set: (obj, prop, _value) => {
          const currentValue = obj[prop]
          const value = validateProp(obj, prop, _value)

          if (value != currentValue) {
            if (this._isSet) {
             if (validation && !validation.apply(obj, null)) {
               throw `Inconsistencia en la informacion`
             }
             if (this.changedProperties.indexOf(prop) === -1) { 
               this.changedProperties.push(prop)
             }
            }
          }

          obj[prop] = value
          return true
        }
        // Next Feacture Time | Datetime | Timestamps
      })

      if (validate) {
        for (const prop in fields) {
          if (data[prop] === null || data[prop] === undefined) {
            if (fields[prop].default || fields[prop].allowNull) {
              this.data[prop] = fields[prop].default || null
            } else {
              throw `El campo ${prop} es requirido`
            }
          } else {
            this.data[prop] = data[prop]
          }
        }
      }

      if (validation) {
        if (!validation.apply(obj, null)) throw `Inconsistencia en la informacion`
      }

      // State Post-Properties
      this._isSet = true
    }

    save () {
      return knex(table).insert(this.data).toString()
    }

    update (data) {
      if (data) {
        for (const prop in data) {
          if (fields[prop]) {
            this.data[prop] = data[prop]
          }
        }

        if (validation) {
          if (!validation.apply(obj, null)) throw `Inconsistencia en la informacion`
        }
      }

      return knex(table)
        .where(getProperties(this.data, primaryKey))
        .update(getProperties(this.data, this.changedProperties))
        .toString()
    }

    // knex.select().from(table).where(where).limit(1).toString()
    static async update (data = {}, where = {}, plain = true) {
      if (!data || typeof data !== 'object') throw new Error('No hay datos')

      const item = await this.findOne(where)
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
      
      return knex(table)
        .where(getProperties(item.data, primaryKey))
        .update(getProperties(item.data, item.changedProperties))
        .toString()
    }

    // TODO: Delete Method
    delete () {

    }

    // TODO: Delete Static Method
    static delete () {

    }


    static find (_options, plain = true) {
      const { where, _orderBy: orderBy, _order: order, groupBy: _groupBy } = _options
    }

    static findOne(_options, plain = true) {

    }
  }

  Object.defineProperty (Schema, 'name', {value: name})
  console.log(`------${name} Creado------`)
  return Schema
}

const User = new Schema('Users', Model)
try {
  const user = new User({
    id: 1,
    name: 'Nombre',
    birthDate: 'Cumpleanios',
    ocupacion: '12345'
  }) 
  user.data.name = "Juana"
  console.log(user.update())
} catch (err) {
  console.log('Error')
  console.log(err)
}
