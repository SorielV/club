import Knex from 'knex'

import { 
  Blog,
  BlogTag,
  BlogTopic
} from './../../../../../models/blog'

import { 
  include,
  exclude,
  formatAllowedOptions,
  knexMethod,
  pageOptions,
  whereOptions,
  castObjectfromCollectionWithIndex,
  castObjectfromArraywithIndex,
  groupBy
} from './../../../../../utils/format'

import Tag from '../../../../../models/blog/tag';
import { isNullOrUndefined } from 'util';

const knex = Knex({ client: 'pg' })
const whereEquals = (obj, table) => obj.keys(obj).reduce(prop => `"${table}"."${prop}" = '${obj[prop]}'`)

const Visibility = {
  PUBLIC: 0,
  PRIVATE: 1,
  UNPUBLISHED: 2,
}

const processRow = ({ rows, fields }, index) => {
  if (isNullOrUndefined(rows) || rows.length === 0) {
    return {}
  }

  console.log(rows)
  return castObjectfromArraywithIndex(
    rows,
    fields.map(({ name }) => name),
    index
  )
}

const processRows = ({ rows, fields }, index) => {
  if (isNullOrUndefined(rows) || rows.length === 0) {
    return []
  }

  return castObjectfromCollectionWithIndex(
    groupBy(rows, ([id]) => id),
    fields.map(({ name }) => name),
    index
  )
}

const whereBlogBuilder = (table, where, allowed = []) => {
  const isAllOperatorsAllowed =
    isNullOrUndefined(allowed) || Array.isArray(allowed)

  return Object.keys(where).reduce(
    (obj, prop) => {
      const simbol = prop[prop.length - 1]
      const hasOperator = !Boolean(simbol.match(/[\w\d]/))

      const field = hasOperator
        ? prop.substring(0, prop.length - 1)
        : prop

      if (isNullOrUndefined(allowed)) {
        return obj
      } else {
        if (Array.isArray(allowed)) {
          if (!allowed.includes(field)) return obj
        } else {
          if (!allowed.hasOwnProperty(field)) return obj
        }
      }

      if (!isAllOperatorsAllowed & !allowed[field].includes(hasOperator ? simbol : '=')) {
        return obj
      }

      const propFormatted = typeof where[prop] === 'string'
        ? "'" + where[prop].replace(/'/g, "''") + "'"
        : where[prop]

      if (!hasOperator) {
        obj.push(`"${table}"."${field}" = ${propFormatted}`)
      } else if (simbol.match(/[<>]/)) {
        obj.push(`"${table}"."${field} ${simbol} ${where[prop]}`)
      } else if (simbol.match(/[!~]/)) {
        obj.push(`"${table}"."${field}" ${(simbol === '!' ? '!=' : 'like ')} ${propFormatted}`)
      }

      return obj
    },
    []
  )
}

// Busquedas solo por idTag, idTopic, slug, title, 
// Busquedas en sitio solo por keywords
const VBlog = {
  table: 'VBlog',
  fields: {
    id: Number,
    idClub: Number,
    idUser: Number,
    title: String,
    slug: String,
    description: String,
    visibility: Number,
    idUser: Number,
    username: String,
    firstName: String,
    profileImage: String,
    createdAt: Date
  },
  allowedFilter: [
    'idUser',
    'idClub',
    'username',
    'title',
    'slug'
  ]
}

const VBlogTopic = {
  table: "VBlogTopic",
  fields: {
    idBlog: Number,
    id: Number,
    topic: String,
    slug: String
  },
  allowedFilter: [
    'id',
  ]
}

const VBlogTag = {
  table: "VBlogTag",
  fields: {
    idBlog: Number,
    id: Number,
    tag: String,
    slug: String
  },
  allowedFilter: [
    'id',
  ]
}

const getTopicsQuery = (idBlog) => {
  // No search
  return `
    select * from "VBlogTopic"
    where "VBlogTag"."idBlog" = ${Number.parseInt(idBlog)};
  `
}

const getTagsQuery = (idBlog) => {
  // No search
  return `
    select * from "VBlogTag"
    where "VBlogTag"."idBlog" = ${Number.parseInt(idBlog)};
  `
}

const getBlogInfoQuery = (_options, allowed) => {
  console.log(VBlog.allowedFilter.concat(allowed))

  const options = formatAllowedOptions(
    _options,
    {
      table: VBlog.table,
      allowed: VBlog.allowedFilter.concat(allowed)
    }
  )

  return Object.keys(options)
    .reduce(
      (query, option) => knexMethod(query, option, options), knex
    )
    .toString()
}

const getBlogCompleteQuery = (blogExclude = 'content') => {
  const query = `select 
    ${[
      ...exclude.apply(Blog.fieldsName, [Blog.table, [].concat(blogExclude || [])]), 
      ...exclude.apply(Object.keys(VBlogTag.fields), [VBlogTag.table, 'idBlog', 'tag']),
      ...exclude.apply(Object.keys(VBlogTopic.fields), [VBlogTopic.table, 'idBlog', 'topic'])
      ].join(',')
    }
    from "${Blog.table}"
      left join "${VBlogTopic.table}" on "${VBlogTopic.table}"."idBlog" = "${Blog.table}".id
      left join "${VBlogTag.table}" on "${VBlogTag.table}"."idBlog" = "${Blog.table}".id
  `
  return query
}

const whereTag = (tags) => {
  const query = `
    "${Blog.table}"."id" in (
      select "${BlogTag.table}"."idBlog" as "id" from "${BlogTag.table}"
        where "${BlogTag.table}"."idTag" in (${[].concat(tags).join(',')})
      group by "${BlogTag.table}"."idBlog"
    )
  `
  return query
}

const whereTopic = (topics) => {
  const query = `
    "${Blog.table}"."id" in (
      select "${BlogTopic.table}"."idBlog" as "id" from "${BlogTopic.table}"
        where "${BlogTopic.table}"."idTopic" in (${[].concat(topics).join(',')})
      group by "${BlogTopic.table}"."idBlog"
    )
  `
  return query
}

export const BlogAPI = {
  create: async (req, res, next) => {
    const { id: idUser } = req.user
    const { tags , topics, ...blog } = req.body
    const item = await new Blog({ ...blog, idUser }).save()
    
    // Save tags and topics
    try {
      const tagItems = []
        .concat(tags)
        .slice(0, 5)
        .map(tag => new Tag(tag))

      const topicItems = []
        .concat(topics)
        .slice(0, 2)
        .map(topic => new BlogTopic(topic))

      return res
        .status(201)
        .json({
          data: {
            ...data,
            tags: tagItems,
            topics: topicItems
          }
        })
        .end()
    } catch (err) {
      return res
        .status(201)
        .json({
          data: item,
          messages: [{
            type: 'error',
            message: err.message  
          }]
        })
        .end()
    }
  },
  getBlog: async (req, res, next) => {
    const { 
      query: {
        format = 'simple', 
        idClub = null, // !
        ...options
      },
      member = null
    } = req

    if (req.params.id) {
      // Difentes where conditions
      let item
      let options = { id: Number.parseInt(req.params.id) }

      if (isNullOrUndefined(member)) 
        options.visibility = Visibility.PUBLIC // Solo blogs publicos
      else
        options.idClub = Number.parseInt(idClub) // Cualquier blos

      if (['info', 'blog'].includes(format)) {
        const data = await Blog.query(
          getBlogCompleteQuery(format === 'info' ? 'content' : 'description') + ' where ' +
            whereBlogBuilder(Blog.table, options, {
              id: '=',
              idClub: '=',
              visibility: '='
            })
            .join(' and '),
            { rowMode: 'array' }
        )
        item = processRow(data, [0, 8, 11, 14])
      } else if (format === 'simple') {
        const { rows } = await Blog.query(getBlogInfoQuery(options, ['visibility']))
        item = rows[0]
      } else {
        return res
        .status(401)
        .json({ message: 'Formato no valido' })
        .end()  
      }

      return res
        .status(200)
        .json({ data: item })
        .end()
    } else {
      // TODO: Personal Blogs
      // const { rows: items } = await (format === 'simple'
      let items
      const baseConditions = {}

      if (format === 'info' || format === 'blog') {
        const data = await Blog.query(
          getBlogCompleteQuery(format === 'info' ? 'content' : 'description') + ' where ' +
          whereBlogBuilder(Blog.table, { ...options, visibility: Visibility.PUBLIC }, {
            idUser: '=',
            idClub: '=',
            title: '=~',
            slug: '=~',
            visibility: '='
          }).join(' and '),
          { rowMode: 'array' }
        )
        items = processRows(data, [0, 8, 11, 14])
      } else if(format === 'simple') {
        const { rows } = await Blog.query(
          getBlogInfoQuery({ visibility: Visibility.PUBLIC })
        )
        items = rows
      } else {
        return res
        .status(401)
        .json({ message: 'Formato no valido' })
        .end()  
      }

      return res
        .status(200)
        .json({ data: items })
        .end()
    }

    /*
    const baseStatement = getBlogCompleteQuery()

    // TODO: EXPLAIN ANALYSE [Performance where order]
    const whereStatement = [
      whereBlogBuilder(Blog.table, { ...options, idClub }, {
        idUser: '=',
        idClub: '=',
        title: '=~',
        slug: '=~'
      }).join(' and ')
    ]

    if (!isNullOrUndefined(tag)) {
      whereStatement.push(whereTag(tag))
    } else if (!isNullOrUndefined(topic)) {
      whereStatement.push(whereTopic(topic))
    }

    const { limit, offset, pagination } = pageOptions(options || {})
    const paginationStatement = `limit ${limit} offset ${offset}` // order by, etc
  
    // ES6 => concat (+=) is better (more faster) that join ([])
    console.log(baseStatement + ' where ' + 
      whereStatement.join(' and ') + ' ' +
      paginationStatement
    )
    */
  },
  getTag: async (req, res, next) => {
    const { idClub }  = req.query
    const items = await Blog.query(getTagsQuery(idClub))
    return res
      .status(200)
      .json({ data: item })
      .end()
  },
  getTopic: async (req, res, next) => {
    const { idClub }  = req.query
    const items = await Blog.query(getTopicQuery(idClub))
    return res
      .status(200)
      .json({ data: item })
      .end()
  },
  // Blog update
  update: async (req, res, next) => {
    const item = Blog.update(req.body, { id: req.params.id })
  } 
}

/*
const x= function() {
  console.time('x')
  const query = knex.select([
  ...exclude.apply(Blog.fieldsName, [Blog.table, 'content']), 
  ...exclude.apply(Object.keys(VBlogTag.fields), [VBlogTag.table, 'idBlog', 'tag']),
  ...exclude.apply(Object.keys(VBlogTopic.fields), [VBlogTopic.table, 'idBlog', 'tag'])
  ])
  .from(`${Blog.table}`)
  .leftJoin(VBlogTag.table, `${VBlogTag.table}.idBlog`, `${Blog.table}.id`)
  .leftJoin(VBlogTopic.table, `${VBlogTopic.table}.idBlog`, `${Blog.table}.id`)
  .toString()
  return query
}
*/

export default BlogAPI
