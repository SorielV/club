import Schemata from './../../../utils/Schema'

export const Model = {
  table: 'BlogTopic',
  primaryKey: ['id'],
  fields: {
    id: {
      type: Number,
      required: false,
      default: 'default'
    },
    idBlog: {
      type: Number,
      required: false,
      default: 'true'
    },
    idTopic: {
      type: Number,
      required: false,
      default: 'true'
    }
  },
  options: {
    debug: true
  }
}

const BlogTopicSchema = new Schemata('BlogTopic', Model)

export const Schema = BlogTopicSchema
export default Schema
