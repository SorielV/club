import Schemata from './../../../utils/Schema'

export const Model = {
  table: 'ClubMember',
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
    rol: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0
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


const MemberSchema = new Schemata('Memeber', Model)

export const Schema = MemberSchema
export default MemberSchema
