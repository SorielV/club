import Schemata from '../../../utils/Schema'

export const Model = {
  table: 'BlogTag',
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
    idTag: {
      type: Number,
      required: false,
      default: 'true'
    }
  }
}

const TagSchema = new Schemata('Tag', Model)

export const Schema = TagSchema
export default Schema
