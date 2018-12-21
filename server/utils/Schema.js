import Knex from 'knex'

const knex = Knex({ client: 'pg' })

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
      maxLength: 100,
      minLength: 30,
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
        return prop.length < 30
      },
    }
  },
  options: {
    allowRead: true,
    allowCreate: true,
    allowUpdate: true,
    allowDelete: true
  }
}

module.exports = function Schema(name, { table, primaryKey, fields, options }) {
  const proxy = Object.keys(fields).reduce(
    (obj, prop) => {
      obj[prop] = null
      return obj
    },
    {}
  )

  const Schema = class {
    constructor(data, validate = true) {
      const obj = Object.assign({}, proxy)

      this.data = new Proxy(validate ? obj : data, () => ({
        set: function (obj, prop, value) {
          // Null || Undefined
          if ((value === undefined || value === null) & !fields[obj].allowNull) {
            throw new Exception(`Campo ${prop} no puede ser null`)
          } else {
            value = null
          }

          // Format Lowercase, Uppercase, minLength, maxLength, trim
          switch(fields[obj].type) {
            case String:
              if (fields[obj].trim) value = value.trim()
    
              if (fields[obj].maxLength && value.length > fields[obj].maxLength) {
                throw new Exception(`El Campo ${prop} debera ser de longitud menor a ${fields[obj].maxLength}`)
              }
    
              if (fields[obj].minLength && value.length < fields[obj].minLength) {
                throw new Exception(`Campo ${prop} debera ser de longitud mayor a ${fields[obj].minLength}`)
              }
    
              if (fields[obj].lowercase) value = value.toLowerCase()
              if (fields[obj].uppercase) value = value.toUpperCase()
            break

            case Number:
              if (fields[obj].min && value > fields[obj].max) {
                throw new Exception(`Campo ${prop} debera ser menor a ${fields[obj].max}`)
              }
    
              if (fields[obj].max && value < fields[obj].max) {
                throw new Exception(`Campo ${prop} debera ser mayor a ${fields[obj].max}`)
              }
            break
          }

          if(fields[obj].validation) {
            if (!fields[obj].validation(value)) throw new Exception(`Campo ${prop} invalido`)
          }

          obj[prop] = value
        }
        // Next Feacture Time
      }))

      if (validate) {
        for (const prop in fields) {
          if (data[prop]) {
            this.data[prop] = data[prop]
          } else {
            if (fields[prop].default || fields[prop].allowNull) {
              data[prop] = fields[prop].default || null
            }
          }
        }
      }
    }

    save () {
      return knex(table).insert(this.data)
    }

    update () {

    }

    static update () {

    }

    delete () {

    }

    static delete () {

    }


    static find (_options, plain = true) {
      const { where, _orderBy: orderBy, _order: order, groupBy: _groupBy } = _options
    }

    static findOne(_options, plain = true) {

    }
  }

  Object.defineProperty (Schema, 'name', {value: name})
  return Schema
}
