import { isNullOrUndefined } from 'util'

// Include fields
const formatNested = (...words) =>
  words.reduce(word => `"${word}"`, []).join('.')

export const mergeObjectWithReference = (object, target) => {
  for (const key in object) {
    target[key] = object[key]
  }
}

export const groupBy = (arr, fn) => {
  let currentId = arr[0][0]
  let pos = 0
  return arr
    .map(typeof fn === 'function' ? fn : val => val[fn])
    .reduce((acc, val, i) => {
      if (arr[i][0] === currentId) {
        acc[pos] = acc[pos] || []
        acc[pos].push(arr[i])
      } else {
        acc[++pos] = acc[pos] || []
        acc[pos].push(arr[i])
        currentId = arr[i][0]
      }

      return acc
    }, [])
}

/**
 *
 * @param {page, perPage} param0
 * @return {page, perPage, offset}
 */
export const pageOptions = ({ page = 1, perPage = 12 }) => {
  // Page (perPage * limit), perPage (limit)
  const obj = {
    page: isNaN(page) ? 1 : Number.parseInt(page <= 0 ? 1 : page),
    perPage: isNaN(perPage) ? 12 : Number.parseInt(perPage <= 0 ? 1 : perPage),
    limit: 12,
    offet: 0
  }

  obj.offset = (obj.page - 1) * perPage
  obj.limit = obj.perPage
  return obj
}

export const likeness = (a, b) => {
  const arr = new Set(b)
  return a.filter(el => arr.has(el))
}

export const diff = (a, b) => {
  const arr = new Set(b)
  return a.filter(el => arr.has(el))
}

export const include = function(table, fields, nestedName = null) {
  return !fields || fields === '*'
    ? this.map(formatNested)
    : [].concat(fields).reduce((arr, field) => {
        if (this.includes(field)) {
          const fieldName =
            `"${table}"."${field}"` + nestedName
              ? ` as "${nestedName.toLowerCase()}.${field}"`
              : ''
          arr.push(fieldName)
        }
        return arr
      }, [])
}

// Exclude fields
export const exclude = function(table, _fields, nestedName = false) {
  const fields = [].concat(_fields)
  return this.reduce((arr, field) => {
    if (!fields.includes(field)) {
      const fieldName =
        `"${table}"."${field}"` +
        (nestedName ? ` as "${nestedName.toLowerCase()}.${field}"` : '')
      arr.push(fieldName)
    }
    return arr
  }, [])
}

export const formatFields = data => {
  return !data.includes('(')
    ? data.split(',')
    : data.split(',').reduce((arr, field) => {
        const nestedIndex = field.indexOf('(')
        if (nestedIndex === -1) {
          arr.push(field)
        } else {
          const prop = field.substr(0, nestedIndex)
          arr.push(
            ...field
              .substring(nestedIndex + 1, field.length - 1)
              .split('.')
              .map(field => prop + '.' + field)
          )
        }
        return arr
      }, [])
}

export const formatAllowedOptions = (
  {
    _sort = '',
    _perPage = null,
    _offset = null,
    _page = null,
    _fields = '',
    ..._where
  } = {},
  { table = '', allowNested = false, allowed = ['id'] } = {}
) => {
  const fields = [].concat(
    _fields.trim()
      ? allowNested
        ? formatFields(_fields)
        : _fields.split(',')
      : []
  )

  const orderBy = []
    .concat(_sort.trim() ? _sort.trim().split(',') : [])
    .reduce((obj, prop) => {
      if (!prop) {
        return obj
      }

      const hasOrder = !Boolean(prop[0].match(/[-+]/))
      if (hasOrder) {
        obj.push({
          column: prop.substr(1),
          order: prop[0] === '-' ? 'desc' : 'asc'
        })
      }
      return obj
    }, [])

  const where = Object.keys(_where).reduce((obj, prop) => {
    const simbol = prop[prop.length - 1]
    const hasOperator = !Boolean(simbol.match(/[\w\d]/))

    const field = hasOperator ? prop.substring(0, prop.length - 1) : prop

    if (allowed.length) {
      if (!allowed.includes(field)) return obj
    }

    if (!hasOperator) {
      obj.push([field, _where[prop]])
    } else if (simbol.match(/[<>]/)) {
      obj.push([field, simbol, _where[prop]])
    } else if (simbol.match(/[!~]/)) {
      obj.push([field, simbol === '!' ? '!=' : 'like', _where[prop]])
    }

    return obj
  }, [])

  let result = {}

  result.select = fields
  result.from = table

  if (where.length) result.where = where
  if (orderBy.length) result.orderBy = orderBy
  if (_perPage) result.limit = Number.parseInt(_perPage)
  if (_offset) result.offset = Number.parseInt((_page || 15) * _perPage)

  return result
}

export const createObjectFromArray = (values, keys) =>
  keys.reduce((acc, key, i) => {
    acc[key] = values[i]
    return acc
  }, {})

export const mergeObject = (target, { ...object }) => {
  for (let prop in object) {
    if (object.hasOwnProperty(prop)) {
      target[prop] = object[prop]
    }
  }
  return target
}

// TODO: A best way of clone object
export const cloneObject = object => JSON.parse(JSON.stringify(object))

/* 
Alternative https://hashrocket.com/blog/posts/faster-json-generation-with-postgresql
[Postgres Only]
*/

/**
 * @param {array}
 * @param {*} properties
 * @param {*} index
 */
export const castObjectfromArraywithIndex = (
  [...samples],
  [...props],
  index
) => {
  console.time('castObjectfromArraywithIndex')
  const template = {}
  let startIndex = 0

  if (index[0] === 0) {
    Object.assign(
      template,
      createObjectFromArray(samples[0], props.slice(0, index[1] + 1))
    )
    startIndex = 1
  }

  // Utils Generales
  const keysOfArrayProperties = index
    .slice(startIndex, index.length - 1)
    .map(index => props[index + 1].split('.')[0])

  const properties = props.map(prop => {
    if (prop.includes('.')) {
      const [, key] = prop.split('.')
      return key
    }
    return prop
  })

  const arrayProperties = keysOfArrayProperties.reduce((obj, key) => {
    obj[key] = []
    return obj
  }, {})

  const arrLimits = keysOfArrayProperties.map((v, i) => [
    index[startIndex + i] + 1,
    index[startIndex + i + 1] + 1
  ])
  const arrProps = arrLimits.map(limit => properties.slice(...limit))

  Object.assign(template, cloneObject(arrayProperties))
  const keys = cloneObject(arrayProperties)

  for (let i = 0; i < samples.length; i++) {
    const sample = samples[i]
    keysOfArrayProperties.map((key, i) => {
      const idKey = sample[arrLimits[i][0]]
      if (!isNullOrUndefined(idKey)) {
        if (!keys[key].includes(idKey)) {
          keys[key].push(idKey)
          template[key].push(
            createObjectFromArray(sample.slice(...arrLimits[i]), arrProps[i])
          )
        }
      }
    })
  }

  console.timeEnd('castObjectfromArraywithIndex')
  return template
}

export const castObjectfromCollectionWithIndex = (
  [...collection],
  [...props],
  index
) => {
  console.time('castObjectfromCollectionWithIndex')

  const template = {}
  let startIndex = 0

  if (index[0] === 0) {
    Object.assign(
      template,
      createObjectFromArray(
        new Array(index[1] + 1).fill(null),
        props.slice(0, index[1] + 1)
      )
    )
    startIndex = 1
  }

  // Utils Generales
  const keysOfArrayProperties = index
    .slice(startIndex, index.length - 1)
    .map(index => props[index + 1].split('.')[0])

  const properties = props.map(prop => {
    if (prop.includes('.')) {
      const [, key] = prop.split('.')
      return key
    }
    return prop
  })

  const arrayProperties = keysOfArrayProperties.reduce((obj, key) => {
    obj[key] = []
    return obj
  }, {})

  const arrLimits = keysOfArrayProperties.map((v, i) => [
    index[startIndex + i] + 1,
    index[startIndex + i + 1] + 1
  ])
  const arrProps = arrLimits.map(limit => properties.slice(...limit))
  Object.assign(template, cloneObject(arrayProperties))

  const items = collection.map(([...samples]) => {
    const item = cloneObject(template)
    mergeObjectWithReference(
      createObjectFromArray(samples[0], props.slice(0, index[1] + 1)),
      item
    )

    const keys = cloneObject(arrayProperties)

    for (let i = 0; i < samples.length; i++) {
      const sample = samples[i]
      keysOfArrayProperties.forEach((key, i) => {
        const idKey = sample[arrLimits[i][0]]
        if (!isNullOrUndefined(idKey)) {
          if (!keys[key].includes(idKey)) {
            keys[key].push(idKey)
            item[key].push(
              createObjectFromArray(sample.slice(...arrLimits[i]), arrProps[i])
            )
          }
        }
      })
    }
    return item
  })

  console.timeEnd('castObjectfromCollectionWithIndex')
  console.log(items)
  return items
}

export const getProperties = (data, props) =>
  [].concat(props).reduce((obj, prop) => {
    obj[prop] = data[prop]
    return obj
  }, {})

/**
 * https://gist.github.com/mathewbyrne/1280286
 * @Author {mathewbyrne}
 */
export const slugify = text => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

export const knexMethod = (query, option, options = {}) => {
  if (options[option] === null || options[option] === undefined) {
    return query
  }

  if (!Array.isArray(options[option])) {
    // Should be array of array
    return query[option](options[option])
  }

  return options[option].reduce(
    (query, value) => query[option](...value),
    query
  )
}

/*
const formatOptions = ({
  _sort,
  _limit = 50,
  _offset = 100,
  _page = 1,
  _fields = '',
  ..._where
}) => {
  const fields = [].concat(_fields.trim() ? _fields.trim().split(',') : []).reduce(
    (obj, prop) => {
      const nested = prop.indexOf('(')

      if (nested !== -1) {
        obj.push(
          ...prop
            .substring(nested + 1, prop.length - 1)
            .split(',').map(
              nestedProp => {
                return prop + '.' + nestedProp
              }
            )
        )
      }
    },
    []
  )

  const where = Object.keys(_where).reduce(
    (obj, prop) => {
      const simbol = prop[prop.length - 1]

      if (simbol.match(/[\w\d]/)) {
        obj.push([prop, _where[prop]])
      } else if (simbol.match(/[<>]/)) {
        obj.push([
          prop.substr(0, prop.length - 1),
          simbol,
          _where[prop]
        ])
      } else if (simbol.match(/[!~]/)) {
        obj.push([
          prop.substr(0, prop.length - 1),
          simbol === '!' ? '!=' : 'like',
          _where[prop.slice(prop)]]
        )
      }
      return obj
    },
    []
  )

  return {
    limit: _limit,
    offset: _offset,
    sort: _sort,
    page: _page,
    select,
    where
  }
}
*/
