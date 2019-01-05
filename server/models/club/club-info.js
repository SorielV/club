import Schemata from './../../utils/Schema'

export const Model = {
  table: 'ClubInfo',
  primaryKey: ['id'],
  fields: {
    id: {
      type: Number,
      required: false,
      allowNull: true,
    },
    idClub: {
      type: Number,
      required: true
    },
    idUser: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      allowNull: true,
      maxLength: 1200
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

const ClubInfo = new Schemata('ClubInfo', Model)

export const Schema = ClubInfo
export default ClubInfo
