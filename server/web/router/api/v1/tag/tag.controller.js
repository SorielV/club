import Model from './../../../../../models/tag'
import { isNullOrUndefined } from 'util';

export const TagAPI = {
  async create(req, res, next) {
    const item = await new Model(req.body).save()
    return res
      .status(201)
      .json({ data: item })
      .end()
  },
  async get(req, res, next) {
    const { id } = req.params
    const options = req.query
    let item

    console.log(options)

    if (isNullOrUndefined(id)) {
      item = await Model.get({ ...req.body, ...options })
    } else {
      if (isNaN(id)) {
        throw new Error('Parametro \'id\' no valido')
      }
      item = await Model.getOne({ id: Number.parseInt(id)})
    }
    
    return res
      .status(200)
      .json({ data: item })
      .end()
  },
  async update(req, res, next) {
    const { id } = req.params
    if (isNullOrUndefined(id) || isNaN(id)) {
      throw new Error('Parametro \'id\' no valido')
    }

    const item = await Model.update(req.body, { id: Number.parseInt(id)})
    return res
      .status(200)
      .json({ data: item })
      .end()
  },
  async delete(req, res, next) {
    const { id } = req.params
    if (isNullOrUndefined(id) || isNaN(id)) {
      throw new Error('Parametro \'id\' no valido')
    }

    await Model.delete({ id: Number.parseInt(id) })

    return res
      .status(204)
      .end()
  }
}

export default TagAPI
