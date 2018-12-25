import Schema from './../../utils/Schema'

const Model = {
  table: 'Clubs',
  fields: {
    id: {
      type: Number,
      required: false,
      allowNull: true,
      default: null
    }
  },
  validation: false,
  options: {
    debug: true,
    allowRead: true,
    allowCreate: true,
    allowUpdate: true,
    allowDelete: true
  }
}

export default Schema
