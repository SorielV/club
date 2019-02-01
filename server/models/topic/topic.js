import Schemata from './../../utils/Schema'

export const Model = {
  table: 'Topic',
  primaryKey: ['id'],
  fields: {
    id: {
      type: Number,
      required: false,
      default: 'default'
    },
    topic: {
      type: String,
      required: true,
      maxLength: 20
    },
    slug: {
      type: String,
      required: true,
      maxLength: 20
    },
  }
}

const TopicSchema = new Schemata('Topic', Model)

export const Schema = TopicSchema
export default Schema
