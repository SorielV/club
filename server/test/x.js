const createObjectFromArray = (values, keys) =>
  keys.reduce((acc, key, i) => {
    acc[key] = values[i]
    return acc
  }, {});

const mergeObject = (object)  => {
  let target = {}
  for (let prop in object) {
    if (object.hasOwnProperty(prop)) {
      target[prop] = object[prop]
    }
  }
  return target
}

function castObjectfromArraywithIndex([...rows], [...props], index) {
  let startIndex = 0
  const head = rows[0],
    obj = {}

  // Base Object
  if (index[0] === 0) {
    Object.assign(obj, createObjectFromArray(head, props.slice(0, index[1])))
    startIndex = 1
  } else {
    tail.push(head)
  }

  // Keys reales
  const nestedKeys = index
    .slice(startIndex, index.length - 1)
    .map(index => props[index].split(".")[0])

  // Prop omitio nestedKey
  const _props = props.map(prop => {
    if (prop.includes(".")) {
      const [, key] = prop.split(".")
      return key
    }
    return prop
  })

  // Agregar Set sobre nested properties
  Object.assign(
    obj,
    nestedKeys.reduce((obj, key) => {
      obj[key] = []
      return obj
    }, {})
  )

  const keys = nestedKeys.reduce((obj, key) => {
    obj[key] = []
    return obj
  }, {})

  keys.cutro = []

  rows.forEach(row => {
    nestedKeys.map((key, i) => {
      const limit = [index[startIndex + i], index[startIndex + i + 1] + 1]
      const idKey = row[limit[0]]
      const isUnique = !keys[key].includes(idKey)

      if (isUnique) {
        obj[key].push(
          createObjectFromArray(row.slice(...limit), _props.slice(...limit))
        )
        keys[key].push(idKey)
      }
    })
  })

  return obj
}

function castObjectfromCollectionWithIndex([...collection], [...props], index) {
  const sample = collection[0][0]
  const template = {}

  let startIndex = 0

  if (index[0] === 0) {
    Object.assign(template, createObjectFromArray(sample, new Array(index[1]).fill(null)))
    startIndex = 1
  }

  // Utils Generales 
  const keysOfArrayProperties = index
    .slice(startIndex, index.length - 1)
    .map(index => props[index].split(".")[0])

  const properties = props.map(prop => {
    if (prop.includes(".")) {
      const [, key] = prop.split(".")
      return key
    }
    return prop
  })

  const arrayProperties = keysOfArrayProperties.reduce((obj, key) => {
    obj[key] = []
    return obj
  }, {})

  // Template Complete
  template.assign(arrayProperties)

  return collection.map(([samples]) => {
    const item = Object.assign(obj, createObjectFromArray(samples[0], props.slice(0, index[1])))
  })

}

const { rows, fields } = {
  command: "SELECT",
  rowCount: 4,
  oid: null,
  rows: [
    [
      1,
      1,
      1,
      "ES6",
      "es6",
      "EcmaScript6",
      0,
      "2019-01-08T00:00:00.000Z",
      null,
      1,
      "Javascript",
      "javascript",
      2,
      "Javascript",
      "javascript"
    ],
    [
      1,
      1,
      1,
      "ES6",
      "es6",
      "EcmaScript6",
      0,
      "2019-01-08T00:00:00.000Z",
      null,
      1,
      "Javascript",
      "javascript",
      1,
      "Tecnologia",
      "tecnologia"
    ],
    [
      1,
      1,
      1,
      "ES6",
      "es6",
      "EcmaScript6",
      0,
      "2019-01-08T00:00:00.000Z",
      null,
      2,
      "Programacion",
      "programacion",
      2,
      "Javascript",
      "javascript"
    ],
    [
      1,
      1,
      1,
      "ES6",
      "es6",
      "EcmaScript6",
      0,
      "2019-01-08T00:00:00.000Z",
      null,
      2,
      "Programacion",
      "programacion",
      1,
      "Tecnologia",
      "tecnologia"
    ]
  ],
  fields: [
    {
      name: "id",
      tableID: 17048,
      columnID: 1,
      dataTypeID: 23,
      dataTypeSize: 4,
      dataTypeModifier: -1,
      format: "text"
    },
    {
      name: "idClub",
      tableID: 17048,
      columnID: 2,
      dataTypeID: 23,
      dataTypeSize: 4,
      dataTypeModifier: -1,
      format: "text"
    },
    {
      name: "idUser",
      tableID: 17048,
      columnID: 3,
      dataTypeID: 23,
      dataTypeSize: 4,
      dataTypeModifier: -1,
      format: "text"
    },
    {
      name: "title",
      tableID: 17048,
      columnID: 4,
      dataTypeID: 1043,
      dataTypeSize: -1,
      dataTypeModifier: 24,
      format: "text"
    },
    {
      name: "slug",
      tableID: 17048,
      columnID: 5,
      dataTypeID: 1043,
      dataTypeSize: -1,
      dataTypeModifier: 24,
      format: "text"
    },
    {
      name: "description",
      tableID: 17048,
      columnID: 6,
      dataTypeID: 1043,
      dataTypeSize: -1,
      dataTypeModifier: 259,
      format: "text"
    },
    {
      name: "visibility",
      tableID: 17048,
      columnID: 8,
      dataTypeID: 21,
      dataTypeSize: 2,
      dataTypeModifier: -1,
      format: "text"
    },
    {
      name: "createdAt",
      tableID: 17048,
      columnID: 9,
      dataTypeID: 1082,
      dataTypeSize: 4,
      dataTypeModifier: -1,
      format: "text"
    },
    {
      name: "updatedAt",
      tableID: 17048,
      columnID: 10,
      dataTypeID: 1082,
      dataTypeSize: 4,
      dataTypeModifier: -1,
      format: "text"
    },
    {
      name: "tag.id",
      tableID: 17036,
      columnID: 2,
      dataTypeID: 23,
      dataTypeSize: 4,
      dataTypeModifier: -1,
      format: "text"
    },
    {
      name: "tag.tag",
      tableID: 17036,
      columnID: 3,
      dataTypeID: 1043,
      dataTypeSize: -1,
      dataTypeModifier: 24,
      format: "text"
    },
    {
      name: "tag.slug",
      tableID: 17036,
      columnID: 4,
      dataTypeID: 1043,
      dataTypeSize: -1,
      dataTypeModifier: 24,
      format: "text"
    },
    {
      name: "topic.id",
      tableID: 17075,
      columnID: 2,
      dataTypeID: 23,
      dataTypeSize: 4,
      dataTypeModifier: -1,
      format: "text"
    },
    {
      name: "topic.topic",
      tableID: 17075,
      columnID: 3,
      dataTypeID: 1043,
      dataTypeSize: -1,
      dataTypeModifier: 24,
      format: "text"
    },
    {
      name: "topic.slug",
      tableID: 17075,
      columnID: 4,
      dataTypeID: 1043,
      dataTypeSize: -1,
      dataTypeModifier: 24,
      format: "text"
    }
  ]
}


console.log(
  castObjectfromArraywithIndex(
    rows,
    fields.map(({ name }) => name),
    [0, 9, 12, 14]
  )
)
