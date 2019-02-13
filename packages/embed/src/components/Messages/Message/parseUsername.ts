const DEFAULT = 'Discord user#0000'

const parseUsername = (username: string) => {
  if (!username) username = DEFAULT

  let name = username
  let discriminator = '0000'
  if (username.includes('#')) {
    const split = username.split('#')
    name = split.slice(0, -1).join('#')
    discriminator = split.slice(-1)[0]
  }
  return { name, discriminator }
}

export default parseUsername
