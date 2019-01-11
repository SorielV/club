import { BlogTopic } from './../../../../../../models/blog'

const BlogTopicAPI = {
  async addBlogTopic(req, res ,next) {
    const {
      query: { idClub = null }
    } = req

    const item = await new BlogTopic({ ...req.body, idClub }).save()

    return res
      .status(201)
      .json({ data: item })
      .end()
  },
  async getBlogTopic(req, res ,next) {
    const {
      params: { id = null },
      query: { idClub = null, ...options }
    } = req

    let items
    if (id) {
      items = await BlogTopic.getOne({ id })
    } else {
      items = await BlogTopic.get({ ...options, idClub })
    }

    return res
      .status(200)
      .json({ data: items })
      .end()
  },
  async deleteBlogTopic(req, res ,next) {
    const {
      params: { id = null },
      query: { idClub = null }
    } = req

    await BlogTopic.delete({ id, idClub })

    return res
      .status(204)
      .end()
  }
}

export default BlogTopicAPI