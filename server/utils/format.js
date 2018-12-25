const formatFields = (data) => {
  return !data.includes('(') 
    ? data.split(',')
    : data.split(',').reduce(
        (arr, field) => {
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
        },
        []
    )
}

const formatAllowedOptions = ({
  _sort = '',
  _limit = 0,
  _offset = 0,
  _page = 1,
  _fields = '',
  ..._where
} = {},
{ 
  table = '',
  allowNested = false,
  allowed = ['id']
} = {}
) => {
  const fields = [].concat(_fields.trim() 
    ? allowNested
      ? formatFields(_fields)
      : _fields.split(',')
    : [])

  const orderBy = [].concat(_sort.trim() ? _sort.trim().split(',') : []).reduce(
    (obj, prop) => {
      if (!prop) {
        return obj
      }

      const hasOrder = !Boolean(prop[0].match(/[-+]/))
      if (hasOrder) {
        obj.push({
          column: prop.substr(1),
          order: prop[0] === '-'
            ? 'desc'
            : 'asc'
        })
      }
      return obj
    },
    []
  )

  console.log(_where)

  const where = Object.keys(_where).reduce(
    (obj, prop) => {
      const simbol = prop[prop.length - 1]
      const hasOperator = !Boolean(simbol.match(/[\w\d]/))

      const field = hasOperator
        ? prop.substring(0, prop.length - 1)
        : prop

      if (allowed.length) {
        if (!allowed.includes(field)) return obj
      }

      if (!hasOperator) {
        obj.push([field, _where[prop]])
      } else if (simbol.match(/[<>]/)) {
        obj.push([
          field,
          simbol,
          _where[prop]
        ])
      } else if (simbol.match(/[!~]/)) {
        obj.push([
          field,
          simbol === '! ' ? '!=' : 'like',
          _where[prop]
        ])
      }

      return obj
    },
    []
  )

  const result = {}


  /**
   * select ...select  ...from ...where ...orderby limit offset
   */

  result.select = fields
  result.from = table

  console.log(where)

  if (where.length) result.where = where
  if (orderBy.length) result.orderBy = orderBy
  if (_limit) result.limit = Number.parseInt(_limit)
  if (_offset) result.offset = Number.parseInt(_offset)

  return result
}

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

const getProperties = (data, props) => (
  [].concat(props).reduce((obj, prop) => {
    obj[prop] = data[prop]
    return obj
  } , {})
)

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

export { getProperties, formatFields, formatOptions, formatAllowedOptions, slugify }