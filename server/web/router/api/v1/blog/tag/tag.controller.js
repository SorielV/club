import { BlogTag } from './../../../../../../models/blog'

const BlogTagAPI = {
  async addBlogTag(req, res ,next) {
    const {
      query: { idClub = null }
    } = req

    const item = await new BlogTag({ ...req.body, idClub }).save()

    return res
      .status(201)
      .json({ data: item })
      .end()
  },
  async getBlogTag(req, res ,next) {
    const {
      params: { id = null },
      query: { idClub = null, ...options }
    } = req

    let items
    if (id) {
      items = await BlogTag.getOne({ id })
    } else {
      items = await BlogTag.get({ ...options, idClub })
    }

    return res
      .status(200)
      .json({ data: items })
      .end()
  },
  async deleteBlogTag(req, res ,next) {
    const {
      params: { id = null },
      query: { idClub = null }
    } = req

    await BlogTag.delete({ id, idClub })

    return res
      .status(204)
      .end()
  }
}

export default BlogTagAPI