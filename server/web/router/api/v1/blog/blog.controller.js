import Knex from 'knex'
const knex = Knex({ client: 'pg' })

import { Blog, BlogTag, BlogTopic } from './../../../../../models/blog'
import { likeness, include, exclude, formatAllowedOptions, knexMethod, pageOptions, whereOptions } from './../../../../../utils/format'
import Tag from '../../../../../models/blog/tag';

const whereEquals = (obj, table) => obj.keys(obj).reduce(prop => `"${table}"."${prop}" = '${obj[prop]}'`)

const Visibility = {
  PUBLIC: 0,
  PRIVATE: 1,
  UNPUBLISHED: 2,
}

// Busquedas solo por idTag, idTopic, slug, title, 
// Busquedas en sitio solo por keywords

const VClub = {
  table: 'VClub',
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

const getBlogInfoQuery = () => {
  const { ...options } = formatAllowedOptions(
    _options,
    {
      table: VClub.table,
      allowed: VClubInfo.allowedFilter
    }
  )

  return Object.keys(options)
    .reduce(
      (query, option) => knexMethod(query, option, options), knex
    )
    .toString()
}

/**
 // Excepted
 select 
  "Blog"."id","Blog"."idClub","Blog"."idUser","Blog"."title","Blog"."slug","Blog" ...
  "VBlogTag"."id" as "tag.id","VBlogTag"."tag" as "tag.tag","VBlogTag"."slug" as "tag.slug",
  "VBlogTopic"."id" as "tag.id","VBlogTopic"."topic" as "tag.topic","VBlogTopic"."slug" as "tag.slug"
  from Blog
    left join "VBlogTopic" on "VBlogTopic"."idBlog" = "Blog".id
    left join "VBlogTag" on "VBlogTag"."idBlog" = "Blog".id
 */
const getBlogCompleteQuery = () => {
  const query = `select 
    ${[
      ...exclude.apply(Blog.fieldsName, [Blog.table, 'content']), 
      ...exclude.apply(Object.keys(VBlogTag.fields), [VBlogTag.table, 'idBlog', 'tag']),
      ...exclude.apply(Object.keys(VBlogTopic.fields), [VBlogTopic.table, 'idBlog', 'tag'])
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

const API = {
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
      member
    } = req

    if (!idClub) {
      // TODO: Personal Blogs
      const items = await (format === 'simple'
        ? Blog.query(getBlogInfoQuery({ visibility: Visibility.PUBLIC }))
        : Blog.query(getBlogCompleteQuery(whereEquals({ visibility: Visibility.PUBLIC }, 'Blog')))
      )

      return res
        .status(200)
        .json({ data: items })
        .end()
    }

    if (req.params.id && member) {
      const items = await (format === 'simple' 
        ? Blog.query(
            getBlogInfoQuery({ id: req.params.id, idClub  })
          )
        : Blog.query(
            getBlogCompleteQuery(
              whereEquals({ id: req.params.id, idClub }, 'Blog')
            )
          )
      )

      return res
        .status(200)
        .json({ data: items })
        .end()
    }

    // Opciones permitidas 
    /**
      page, perPage, [offset, limit]
      ['idClub', 'idBlog'] ['idUser', 'title', 'slug'] 'simple'
      ['idClub', 'idBlog'] ['idUser', 'title', 'slug', ['tag', 'topic']] 'complete'

    */

    const pagination = pageOptions(options)
    const whereoptions = whereOptions(option, [''])

    const query = [getBlogCompleteQuery(), 'where']

    if (tag) {

    } else if (topic) {

    } else {

    }
  },
  getTag: async (req, res, next) => {

  },
  getTopic: async (req, res, next) => {

  },
  // Blog update
  update: async (req, res, next) => {
    const item = Blog.update(req.body, { id: req.params.id })
  } 
}

/*console.log(getBlogCompleteQuery())
console.log(whereTag([1, 2]))
console.log(whereTopic([1, 2]))
*/

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

const y = function() {
  console.time('y')
  const query = getBlogCompleteQuery()
  console.timeEnd('y')
  return query
}