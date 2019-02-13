import pipe from 'function-pipe'

import mentions from './mentions'

const enrich: (message: string) => string = pipe(mentions)

export default enrich
