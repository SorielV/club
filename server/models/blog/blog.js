import Schemata from './../../utils/Schema'

export const Model = {
  table: 'Blog',
  primaryKey: ['id'],
  fields: {
    id: {
      type:Number,
      required: false,
      default: 'default'
    },
    idClub: {
      type:Number,
      required: true,
    },
    idUser: {
      type:Number,
      required: true,
    },
    title: {
      type:String,
      allowNull: false,
      maxLength: 20,
      required: true
    },
    slug: {
      type:String,
      allowNull: false,
      maxLength: 20,
      required: true
    },
    description: {
      type:String,
      allowNull: false,
      maxLength: 255,
      required: true
    },
    content: {
      type:String,
      allowNull: false,
      required: true
    },
    visibility: {
      type:Number,
      min: 0,
      max: 5,
      default: 0
    },
    createdAt: {
      type: Date,
      required: false
    },
    updatedAt: {
      type: Date,
      required: false
    }
  },
  options: {
    debug: true
  }
}

const BlogSchema = new Schemata('Blog', Model)

export const Schema = BlogSchema
export default Schema
