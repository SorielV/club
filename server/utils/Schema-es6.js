const Schema = class {
    static get table () { return table }
    static get primaryKey () { return [].concat(primaryKey) }
    static get fields () { return fields }
    static get validation () { return validation }
    static get pool() { return pool }

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
        [].concat(primaryKey).forEach((prop) => {
          delete data[prop]
        })

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

    static async query(query, queryOptions) {
      if (options.debug || queryOptions.debug) {
        console.log(query)
      }

      // Should return {field, rows}
      return await pool.query({ text: query, ...queryOptions })
    }

    async query (query, queryOptions = {}) {
      if (options.debug || queryOptions.debug) {
        console.log(query)
      }

      // Should return {field, rows}
      return await pool.query({ text: query, ...queryOptions })
    }

    async save () {
      const hasPk = [].concat(primaryKey).some(
        prop => {
          return this.data[prop] !== null && this.data[prop] !== undefined
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
          .insert({ ...this.data, ...primaryKeys })
          .returning('*')
          .toString()
          .replace('\'default\'', 'default')
        )

        // Reset Proxy
        // setData(this, item, false)
        this._isSet = false
        for(const prop in item) {
          if (this.data[prop] !== item[prop]) {
            this.data[prop] = item[prop]
          }
        }
        this._isSet = true

        return item
      } else {
        return this.update()
      }
    }

    async update (data) {
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

      const { rows: [item] } = await this.query(knex(table)
        .where(getProperties(this.data, primaryKey))
        .update(getProperties(this.data, this.changedProperties))
        .returning('*')
        .toString()
      )

      return item
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

      const { rows: [result] } = await this.query(
        knex(table)
          .where(getProperties(item.data, primaryKey))
          .update(getProperties(item.data, item.changedProperties))
          .returning('*')
          .toString()
      )

      return result
    }

    // TODO: Delete Method
    async delete () {
      const result = await this.query(
        knex(table)
        .where(getProperties(item.data, primaryKey))
        .delete()
        .toString()
      )
      return Boolean(result)
    }

    // TODO: Delete Static Method
    static async delete (where) {
      const result = await this.query(
        knex(table)
          .where(getProperties(where, primaryKey))
          .delete()
          .toString()
      )
      return Boolean(result)
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