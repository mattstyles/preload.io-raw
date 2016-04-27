
import 'regenerator/runtime'
import 'whatwg-fetch'

import Preloader from 'preload.io'
import { EVENTS } from 'preload.io'
import RawLoader from '../lib'

let preloader = new Preloader()
preloader.register( new RawLoader() )

preloader.load( '/examples/foo.txt' )

preloader.on( EVENTS.LOAD, event => {
  console.log( event )

  let code = document.createElement( 'code' )
  code.style[ 'white-space' ] = 'pre'
  code.innerHTML = event.res
  document.body.appendChild( code )
})
preloader.on( EVENTS.LOAD_ERROR, event => {
  console.error( event )
})
preloader.on( EVENTS.COMPLETE, res => {
  console.log( '-- COMPLETE' )
  console.log( res )
})
