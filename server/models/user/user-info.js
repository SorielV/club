const Model = {
  table: 'UserInfo',
  primaryKey: ['id'],
  fields: {
    id: {
      type: Number,
      required: false,
      allowNull: true,
      default: 'default'
    },
    idUser: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      allowNull: true,
      trim: true,
      maxLength: 255
    },
    lastName: {
      type: Date,
      allowNull: true,
      trim: true,
      maxLength: 255
    },
    profileImage: {
      type: String,
      allowNull: true,
      trim: true,
      maxLength: 255
    },
    createdAt: {
      type: Date,
      allowNull: true
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

export default Model
