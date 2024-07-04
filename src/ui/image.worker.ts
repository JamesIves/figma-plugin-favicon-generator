/**
 * @description This is a web worker that creates a URL blob from a selection. This is used to speed up the process of creating a preview of the image.
 */
export default () => {
  self.addEventListener('message', e => {
    const {selection} = e.data

    const blob = new Blob([new Uint8Array(selection)])
    const blobUrl = URL.createObjectURL(blob)

    postMessage({blobUrl})
  })
}
