import ClubModel from './club'
import Schema from './../../utils/Schema'

const Club = new Schema('Club', ClubModel)

const Model = {
  Club: ClubModel
}

export { Model, Club }
