import Schemata from './../../../utils/Schema'

export const Model = {
  table: 'Event',
  primaryKey: ['id'],
  fields: {
    id: {
      type: Number,
      required: false,
      default: 'default'
    },
    calendarId: {
      type: Number,
      required: true,
    },
    cludId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxLength: 100
    },
    body: {
      type: String,
      required: false,
      default: null,
      maxLength: 250
    },
    category: {
      type: String,
      required: false,
      default: 'time'
    },
    visibility: {
      type: Number,
      required: false,
      min: 0,
      max: 5
    },
    location: {
      type: String,
      required: false,
      default: null
    },
    start: {
      type: Date,
      requied: true
    },
    end: {
      type: String,
      requied: true
    },
    color: {
      type: String,
      required: false,
      default: null
    },
    bgColor: {
      type: String,
      required: false,
      default: null
    },
    createdAt: {
      type: Date,
      rquired: false,
      default: 'default'
    },
    updatedAt: {
      type: Date,
      required: false,
      default: null
    }
  },
  options: {
    debug: true
  }
}

const EventSchema = new Schemata('Event', Model)

export const Schema = EventSchema
export default Schema
