import Schemata from './../../utils/Schema'

export const Model = {
  table: 'Tag',
  primaryKey: ['id'],
  fields: {
    id: {
      type: Number,
      required: false,
      default: 'default'
    },
    tag: {
      type: String,
      required: true,
      maxLength: 20
    },
    slug: {
      type: String,
      required: true,
      maxLength: 20
    }
  }
}

const TagSchema = new Schemata('Tag', Model)

export const Schema = TagSchema
export default Schema
