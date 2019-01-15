export const genericController = (Model) => {
  return {
    async create (req, res, next) {
      const item = await new Model(req.body).save()
      return res
        .status(201)
        .json({ data: item })
        .end()
    },
    async get (req, res, next) {
      let items = null

      if (req.params.id) {
        if (isNaN(req.params.id))
          throw new Error('Formate de Parametro \'id\' no valido')
        items = await Model.getOne({ id: Number.parseInt(req.params.id) })
      } else {
        items = await Model.get(req.query)
      }

      return res
        .status(200)
        .json({ data: items })
        .end()
    },
    async update (req, res, next) {
      if (!req.params.id) {
        throw new Error('Formate de Parametro \'id\' requerido')
      } else if (isNaN(req.params.id)) {
        throw new Error('Formate de Parametro \'id\' no valido')
      }

      const item = await Model.update(req.body, { id: Number.parseInt(req.params.id) })

      return res
        .status(200)
        .json({ data: item })
        .end()
    },
    async delete (req, res, next) {
      if (!req.params.id) {
        throw new Error('Formate de Parametro \'id\' requerido')
      } else if (isNaN(req.params.id)) {
        throw new Error('Formate de Parametro \'id\' no valido')
      }

      await Model.delete({ id: Number.parseInt(req.params.id) })

      return res
        .status(204)
        .end()
    }
  }
}
