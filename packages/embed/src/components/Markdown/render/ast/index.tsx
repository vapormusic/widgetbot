import text from 'markdown/render/ast/text'
import SimpleMarkdown from 'simple-markdown'

import { animatedEmoji, customEmoji, emoji } from './emotes'

const baseRules = {
  newline: SimpleMarkdown.defaultRules.newline,
  paragraph: SimpleMarkdown.defaultRules.paragraph,
  escape: SimpleMarkdown.defaultRules.escape,
  link: SimpleMarkdown.defaultRules.link,
  autolink: {
    ...SimpleMarkdown.defaultRules.autolink,
    match: SimpleMarkdown.inlineRegex(/^<(https?:\/\/[^ >]+)>/)
  },
  url: SimpleMarkdown.defaultRules.url,
  strong: SimpleMarkdown.defaultRules.strong,
  em: SimpleMarkdown.defaultRules.em,
  u: SimpleMarkdown.defaultRules.u,
  br: SimpleMarkdown.defaultRules.br,
  inlineCode: SimpleMarkdown.defaultRules.inlineCode,
  emoticon: {
    order: SimpleMarkdown.defaultRules.text.order,
    match: source => /^(¯\\_\(ツ\)_\/¯)/.exec(source),
    parse: capture => ({ type: 'text', content: capture[1] })
  },
  codeBlock: {
    order: SimpleMarkdown.defaultRules.codeBlock.order,
    match: source => /^```(([A-z0-9-]+?)\n+)?\n*([^]+?)\n*```/.exec(source),
    parse: ([, , lang, content]) => ({
      lang: (lang || '').trim(),
      content: content || ''
    })
  },
  emoji,
  customEmoji,
  animatedEmoji,
  text,
  s: {
    order: SimpleMarkdown.defaultRules.u.order,
    match: SimpleMarkdown.inlineRegex(/^~~([\s\S]+?)~~(?!_)/),
    parse: SimpleMarkdown.defaultRules.u.parse
  }
}

export default baseRules
