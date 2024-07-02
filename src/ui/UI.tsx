import {useEffect, useState} from 'react'
import Footer from './components/Footer/Footer'
import Toggle from './components/Toggle/Toggle'
import ImageGrid from './components/ImageGrid/ImageGrid'
import ColorPicker from './components/ColorPicker/ColorPicker'
import TextInput from './components/TextInput/TextInput'
import Button from './components/Button/Button'
import {downloadResizedImagesAsZip, generateCodeSample} from './util'
import {
  faviconIcons,
  webAppManifestIcons,
  appleTouchIcons,
  UserOptions
} from './constants'
import imageWorkerScript from './image.worker'

/**
 * @name UI
 * @description The main UI component for the plugin. This component is responsible for rendering the plugin UI and handling user interactions.
 */
const UI: React.FC<{}> = () => {
  /**
   * Holds the URL blob of the favicon image.
   */
  const [favicon, setFavicon] = useState<string | null>(null)

  /**
   * State to control the post-download screen visibility.
   */
  const [showPostDownloadScreen, setShowPostDownloadScreen] =
    useState<boolean>(false)

  /**
   * State to control the user selected options for generating the output.
   */
  const [options, setOptions] = useState<UserOptions>({
    includeAppleTouchIcons: false,
    includeWebAppManifest: false,
    siteName: '',
    themeColor: '#FFFFFF'
  })

  /**
   * Create a new favicon zip file with the selected options.
   */
  const create = async () => {
    if (!favicon) {
      return
    }

    const sizes = faviconIcons

    if (options.includeAppleTouchIcons) {
      sizes.push(...appleTouchIcons)
    }

    if (options.includeWebAppManifest) {
      sizes.push(...webAppManifestIcons)
    }

    await downloadResizedImagesAsZip({
      favicon,
      sizes,
      options
    })

    setShowPostDownloadScreen(true)
  }

  /**
   * Cancel the plugin operation.
   */
  const cancel = () => {
    window.parent.postMessage({pluginMessage: {type: 'cancel'}}, '*')
  }

  /**
   * 💡 Handles the loading of the web worker script.
   * As the plugin is running in a sandboxed environment, we need to load the web worker script in a way that it can be executed without an external file.
   */
  const loadWebWorker = (script: {(): void; toString?: any}) => {
    const scriptStr = script.toString()
    return new Worker(URL.createObjectURL(new Blob([`(${scriptStr})()`])))
  }

  /**
   * Binds the web worker to the plugin UI and listens for messages from the plugin.
   */
  useEffect(() => {
    const worker = loadWebWorker(imageWorkerScript)

    const handleWorkerMessage = (e: {data: {blobUrl: string}}) => {
      const {blobUrl} = e.data
      setFavicon(blobUrl)
    }

    const handleFigmaMessage = (event: {
      data: {
        pluginMessage: {
          type: 'selection'
          data: ArrayBuffer
        }
      }
    }) => {
      const message = event.data.pluginMessage
      if (message && message.type === 'selection') {
        const selection = message.data

        if (!selection) {
          setFavicon(null)

          return
        }

        worker.postMessage({selection})
      }
    }

    worker.addEventListener('message', handleWorkerMessage)
    window.addEventListener('message', handleFigmaMessage)

    return () => {
      window.removeEventListener('message', handleFigmaMessage)
      worker.removeEventListener('message', handleWorkerMessage)
      worker.terminate()
    }
  }, [])

  return (
    <section className="flex flex-col gap-4 justify-center p-6">
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <div className="section-title !pl-0">
            <div className="icon icon--key icon--purple"></div> Metadata
          </div>

          <TextInput
            label="Site Name"
            value={options.siteName}
            placeholder="Enter site name"
            onChange={e => setOptions({...options, siteName: e.target.value})}
            id="site-name"
          />

          <ColorPicker
            label="Theme Color"
            value={options.themeColor}
            onChange={e => setOptions({...options, themeColor: e.target.value})}
            id="hs-color-input"
          />

          <div className="section-title !pl-0">
            <div className="icon icon--adjust icon--purple"></div> Options
          </div>

          <Toggle
            label="Include Apple Touch Icons"
            id="apple-touch"
            checked={options.includeAppleTouchIcons}
            onChange={() =>
              setOptions({
                ...options,
                includeAppleTouchIcons: !options.includeAppleTouchIcons
              })
            }
          />

          <Toggle
            label="Include Web App Manifest"
            id="webapp-manifest"
            checked={options.includeWebAppManifest}
            onChange={() =>
              setOptions({
                ...options,
                includeWebAppManifest: !options.includeWebAppManifest
              })
            }
          />

          <div className="flex gap-4">
            <Button onClick={create} isDisabled={!favicon}>
              Create
            </Button>
            <Button onClick={cancel} isSecondary isDestructive>
              Cancel
            </Button>
          </div>
        </div>

        <ImageGrid favicon={favicon} />
      </div>

      {showPostDownloadScreen && (
        <div className="flex flex-col gap-4 slide-down bg-white shadow-lg w-full h-full p-12">
          <div className="icon icon--resolve-filled icon--green !w-full bg-no-repeat"></div>
          <p className="type text-center type--bold">
            Copy the following into the head of your HTML document and place the
            icons alongside it. You may need to adjust the paths based on how
            your application is setup.
          </p>
          <textarea className="textarea" rows={8}>
            {generateCodeSample(options)
              .split('\n')
              .map(line => line.trim())
              .join('\n')
              .trim()}
          </textarea>
          <div className="flex justify-center gap-4">
            <Button
              isSecondary
              onClick={() => setShowPostDownloadScreen(false)}
            >
              Create Another
            </Button>
          </div>
        </div>
      )}

      <Footer />
    </section>
  )
}

export default UI
