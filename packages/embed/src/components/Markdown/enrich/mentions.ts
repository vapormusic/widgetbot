import controller from '../../../controllers/cerebral'

const mentions = (message: string) => {
  let result = message

  controller.state.channels
    .entries()
    .forEach(
      ([id, { name }]) => (result = result.split(`#${name}`).join(`<#${id}>`))
    )

  return result
}

export default mentions
