import Knex from 'knex'
const knex = Knex({ client: 'pg' })

import { Blog, BlogTag, BlogTopic } from './../../../../../models/blog'
import { formatAllowedOptions, knexMethod } from './../../../../../utils/format'
import Tag from '../../../../../models/blog/tag';

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
    'username',
    'title',
    'slug'
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

const getBlogCompleteQuery = () => {

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


