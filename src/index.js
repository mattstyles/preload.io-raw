
import { EVENTS } from 'preload.io'

class IOError extends Error {
  constructor( opts ) {
    super( opts.message )

    this.name = 'IOError'
    this.stack = ( new Error() ).stack

    Object.keys( opts ).forEach( key => {
      this[ key ] = opts[ key ]
    })
  }
}


export default class JSONLoader {
  constructor( opts ) {
    this.name = 'JSONLoader'
    this.match = /json$/
    this.opts = opts
  }

  async load( ctx, opts ) {
    let res = null
    let json = null
    try {
      res = await fetch( opts.resource, Object.assign( {}, this.opts, opts.options ) )
          .then( response => {
            if ( response.ok || response.type === 'opaque' ) {
              return response
            }

            throw new IOError({
              message: response.statusText,
              status: response.status
            })
          })
          .then( async response => {
            try {
              json = await response.json()
            } catch( err ) {
              throw new IOError({
                message: 'Error turning response into json',
                status: response.status
              })
            }
            return response
          })
    } catch( err ) {
      ctx.emit( EVENTS.LOAD_ERROR, {
        id: opts.id,
        status: err.status,
        res: err
      })
      return
    }

    ctx.emit( EVENTS.LOAD, {
      id: opts.id,
      status: res.status,
      res: json
    })
  }
}

module.exports = JSONLoader
