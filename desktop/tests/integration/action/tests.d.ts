export { }

interface wat {
  clear: any,
  configure: any,
  connect: any,
  display: any,
  error: any,
  image: any,
  log: any,
  logImportant: any,
  use: any,
  useReactNative: any
}

declare global {
  interface Console {
    /**
     * Hey, it's Reactotron if we're in dev, and no-ops if we're in prod.
     */
    tron: wat
  }
}
