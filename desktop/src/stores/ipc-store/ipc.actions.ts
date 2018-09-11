/**
 * A wrapper around electron's ipcRenderer listen api that can be
 * reused wherever listening to IPC from the main process is necessary.
 * @param  {string}   event    The event name this process listens to
 * @param  {Function} callback The event handler for incoming data
 * @return {Promise<boolean>}
 */
export async function listen (self, event, callback) {
  self.ipcRenderer.on(event, callback)
  return true
}

/**
 * A wrapper around electron's ipcRenderer send api that can be
 * reused wherever IPC to the main process is necessary.
 * @param  {string} event   The event name the main process listens to
 * @param  {string} listenTo  (optional) The response event name this process listens to
 * @param  {*}      payload The data sent over IPC
 * @return {Promise<Object>}
 */
export async function send(self, event, listenTo, payload) {
  return new Promise((resolve, reject) => {
    self.ipcRenderer.send(event, payload)
    if (!listenTo) { return resolve() }
    self.ipcRenderer.once(listenTo, (e, arg) => {
      if (arg.err) {
        reject(arg.err)
      } else {
        resolve(arg.response)
      }
    })
  })
}

/***
 * sendIpc
 * Helper function
 */
export async function sendIpc(self, event, listenTo, method, body) {
  console.tron.log('Sending IPC event: ' + event + ', listening to: ' + listenTo)
  listenTo = method ? `${listenTo}_${method}` : listenTo
  return self.send(event, listenTo, { method, body })
}
