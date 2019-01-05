import Schemata from './../../utils/Schema'

export const Model = {
  table: 'Clubs',
  primaryKey: ['id'],
  fields: {
    id: {
      type: Number,
      required: false,
      allowNull: true,
    },
    idUser: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      allowNull: true,
      trim: true,
      maxLength: 255
    },
    visibility: {
      type: Number,
      allowNull: false,
      min: 0,
      max: 4
    },
    createdAt: {
      type: Date,
      allowNull: true,
      trim: true,
      maxLength: 255
    },
    updatedAt: {
      type: Date,
      allowNull: true,
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

const ClubSchema = new Schemata('Club', Model)

export const Schema = ClubSchema
export default ClubSchema
