const Model = {
  table: 'User',
  primaryKey: ['id'],
  fields: {
    id: {
      type: Number,
      required: false,
      allowNull: true,
      default: 'default'
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      allowNull: true,
      trim: true,
      maxLength: 255
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

export default Model
