import Schemata from './../../utils/Schema'

export const Model = {
  table: 'Calendar',
  primaryKey: ['id'],
  foreingKey: {
    idClub: {
      ref: 'Club'
    }
  },
  fields: {
    id: {
      type: Number,
      required: false,
      default: 'default'
    },
    idClub: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: false,
      default: 'default'
    }
  }
}

const EventSchema = new Schemata('Calendar', Model)

export const Schema = EventSchema
export default Schema
