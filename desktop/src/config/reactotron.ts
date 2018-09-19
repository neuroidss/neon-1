import { mst } from 'reactotron-mst'
import Reactotron from 'reactotron-react-js'

declare global {
  interface Console {
    /**
     * Hey, it's Reactotron if we're in dev, and no-ops if we're in prod.
     */
    tron: typeof Reactotron
  }
}

/** Do Nothing. */
const noop = () => undefined

// in dev, we attach Reactotron, in prod we attach a interface-compatible mock.
if (process.env.NODE_ENV === 'development') {
  console.tron = Reactotron // attach reactotron to `console.tron`
} else {
  // attach a mock so if things sneaky by our __DEV__ guards, we won't crash.
  console.tron = {
    clear: noop,
    configure: noop,
    connect: noop,
    display: noop,
    error: noop,
    image: noop,
    log: noop,
    logImportant: noop,
    use: noop,
    useReactNative: noop
  }
}

if (process.env.NODE_ENV === 'development') {
  Reactotron
    .configure()
    .use(mst())
    .connect()

  Reactotron.clear()

  console.tron.log('Connected')
}
