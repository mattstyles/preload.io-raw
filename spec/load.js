
import tape from 'tape'

import Preloader from 'preload.io'
import { EVENTS } from 'preload.io'
import RawLoader from '../lib'

tape( 'Should expose RawLoader as the name of the module loader', t => {
  t.plan( 1 )

  let rawLoader = new RawLoader()

  t.equal( rawLoader.name, 'RawLoader' )
})
