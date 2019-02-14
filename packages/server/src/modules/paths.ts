import path from 'path'

export const data = path.join(process.env.PWD, 'data/')
export const embed = path.join(__dirname, '../../../embed/build/')
export const configurator = path.join(
  __dirname,
  '../../../configurator/public/'
)
