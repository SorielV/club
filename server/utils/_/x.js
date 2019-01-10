const axios = require('axios')
const axiosAPI = axios.create({ baseURL: 'http://localhost:3000/api/v1' })

const API = new Proxy({}, {
  get: (target, name) => (
    ['get', 'delete', 'head', 'post', 'put', 'patch']
      .reduce((object, method) => {
        object[method] = (path, ...args) => axiosAPI[method](name + path, ...args)
        return object
      }, {})
  )
})

API.blog.get('', { params: { idUser: 1 } })
  .then(({ data, request: { res: { responseUrl } } }) => {
    console.log({ responseUrl })
    console.log(data)
  })
  .catch(console.error)
