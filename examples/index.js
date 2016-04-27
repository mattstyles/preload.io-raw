
import 'regenerator/runtime'
import 'whatwg-fetch'

import Preloader from 'preload.io'
import { EVENTS } from 'preload.io'
import JSONLoader from '../lib'

let preloader = new Preloader()
preloader.register( new JSONLoader())

preloader.load( './foo.json' )

preloader.on( EVENTS.LOAD, event => {
  console.log( event )

  let code = document.createElement( 'code' )
  code.style[ 'white-space' ] = 'pre'
  code.innerHTML = JSON.stringify( event.res, null, '  ' )
  document.body.appendChild( code )
})
preloader.on( EVENTS.LOAD_ERROR, event => {
  console.error( event )
})
preloader.on( EVENTS.COMPLETE, res => {
  console.log( '-- COMPLETE' )
  console.log( res )
})
