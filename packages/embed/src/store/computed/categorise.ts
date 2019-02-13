import { Category } from '../../types/category'
import { Channels } from '../../types/responses'

const Categorise = (channels: Channels): Category[] => {
  let indexes = new Map<string, number>()
  let categorised = [] as Category[]

  channels.forEach((channel, i) => {
    const newCategory = {
      name: channel.category,
      channels: [channel]
    }

    if (channel.category) {
      // The channel belongs in a named category
      let index = indexes.get(channel.category)

      // If the category already exists
      if (typeof index === 'number') {
        // Push the channel
        categorised[index].channels.push(channel)
      } else {
        // Create a new category
        index = categorised.push(newCategory) - 1
        indexes.set(channel.category, index)
      }
    } else {
      // The channel doesn't belong in a named category
      const lastCategory = categorised[categorised.length - 1]

      // If the last category was unamed, then insert
      // this channel into it
      if (lastCategory && !lastCategory.name) {
        lastCategory.channels.push(channel)
      } else {
        categorised.push(newCategory)
      }
    }
  })

  return categorised
}

export default Categorise
