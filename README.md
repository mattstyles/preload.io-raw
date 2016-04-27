# preload.io-raw

> Preload.io loader to expose the raw response body

## Installation

```sh
npm i preload.io-raw
```

## Polyfills

The loader requires a few polyfills to work everywhere, to give some flexibility they are not included by default.

```sh
npm i -S whatwg-fetch regenerator
```

```js
import 'regenerator/runtime'
import 'whatwg-fetch'
```

`Regenerator` is currently a requirement for the async stuff, but a version is included with `babel-polyfill` so if you’re using that then you’re good to go. Use whichever version of `fetch` you like, if necessary.

There will be a fairly obvious console error logged if these are omitted.


## Getting Started

Install [preload.io](https://github.com/mattstyles/preload.io) and register the raw loader with it

```js
import Preloader from 'preload.io'
import { EVENTS } from 'preload.io'
import RawLoader from 'preload.io-raw'

let preloader = new Preloader()
preloader.register( new RawLoader() )
```

Then just load the resource and listen for the response

```js
let id = preloader.load( 'https://example.com/example.txt' )

preloader.on( EVENTS.LOAD, event => {
  if ( event.id === id ) {
    console.log( event.res )
  }
})
```

## Passing options to fetch

`RawLoader` uses `fetch` to preload the resource, options you supply will be passed to `fetch`, in this order of precedence:

```js
preloader.load({
  resource: 'stuff.txt',
  options: {
    mode: 'no-cors'
  }
})
```

```js
const rawLoader = new RawLoader({
  mode: 'no-cors'
})
```

```js
const preloader = new Preloader({
  mode: 'no-cors'
})
```
