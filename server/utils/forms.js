import { Model } from './../models/club/club'
import { isNullOrUndefined } from 'util';

const StringField = (label, { required = false, maxLength = null }) => {
  // Type [text, textarea]
  // Props [maxlength, has-counter] has-counter
  return `
    b-field(
      label="${label}"
    )
    b-input(
      placeholder='${label}'
      type="${maxLength > 100 ? 'textarea' : 'text'}"
      required="${Boolean(required)}"
      ${maxLength ? `maxLength="${maxLength}"` : ''}
      :has-counter="${Boolean(maxLength)}"
      v-model="${label}"
    )
  `
}

const NumberField = (label, { required = false, min = null, max = null }) => {
  // Type [number]
  return `
    b-field(
      label="${label}"
    )
    b-input(
      placeholder="${label}"
      type="number"
      required="${Boolean(required)}"
      ${!isNullOrUndefined(min) ? `min="${min}"` : ''}
      ${!isNullOrUndefined(max) ? `max="${max}"` : ''}
      v-model="${label}"
    )
  `
}

const DateField = (label, { required = false }) => {
  return `
    b-field(
      label="${label}"
    )
    b-datepicker(
      placeholder="${label}"
      type="number"
      required="${Boolean(required)}"
      icon='calendar-today'
      v-model="${label}"
    )
  `
}

// TODO: Form
const EnumField = () => {

}

const Field = (type, ...args) => {
  switch(type) {
    case String:
      return StringField(...args)
    case Number:
      return NumberField(...args)
    case Date:
      return DateField(...args)
    default:
      return StringField(...args)
  }
}

const Form = (model) => {
  console.table(Object.keys(model))
  const fields = Object.keys(model)
    .map(prop => (
      Field(model[prop].type, prop, model[prop])
    ))
  
  fields.forEach((field) => {
    console.log(field)
  })
}

Form(Model.fields)