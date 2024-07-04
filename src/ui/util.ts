import JSZip from 'jszip'
import {saveAs} from 'file-saver'
import {UserOptions} from '../constants'

/**
 * @description Resize an image to the target width and height.
 */
async function resizeImage({
  favicon,
  targetWidth,
  targetHeight
}: {
  favicon: string
  targetWidth: number
  targetHeight: number
}): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = favicon

    img.onload = () => {
      const imgAspectRatio = img.width / img.height
      const targetAspectRatio = targetWidth / targetHeight
      let sx = 0
      let sy = 0
      let sWidth = img.width
      let sHeight = img.height

      /**
       * Determine the best way to crop the image.
       * This is done to maintain the aspect ratio of the image so it matches the preview
       * used in the UI which uses background-size: cover.
       */
      if (imgAspectRatio > targetAspectRatio) {
        /**
         * Image is wider than the target, crop left and right
         */
        const newWidth = img.height * targetAspectRatio
        sx = (img.width - newWidth) / 2
        sWidth = newWidth
      } else if (imgAspectRatio < targetAspectRatio) {
        /**
         * Image is taller than the target, crop top and bottom
         */
        const newHeight = img.width / targetAspectRatio
        sy = (img.height - newHeight) / 2
        sHeight = newHeight
      }

      const canvas = document.createElement('canvas')
      canvas.width = targetWidth
      canvas.height = targetHeight

      const ctx = canvas.getContext('2d')
      ctx?.drawImage(
        img,
        sx,
        sy,
        sWidth,
        sHeight,
        0,
        0,
        targetWidth,
        targetHeight
      )
      canvas.toBlob(resolve, 'image/png')
    }
    img.onerror = reject
  })
}

/**
 * @description Generate a web app manifest for the user to download.
 */
async function generateWebAppManifest({
  siteName,
  description,
  themeColor
}: UserOptions) {
  const manifest = {
    name: siteName || '',
    short_name: siteName || '',
    description: description || '',
    start_url: '/',
    display: 'standalone',
    background_color: themeColor,
    theme_color: themeColor,
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }

  const blob = new Blob([JSON.stringify(manifest, null, 2)], {
    type: 'application/json'
  })

  return blob
}

/**
 * @description Download the resized images as a zip file.
 */
export async function downloadResizedImagesAsZip({
  favicon,
  sizes,
  options
}: {
  favicon: string
  sizes: {width: number; height: number; prefix: string}[]
  options: UserOptions
}) {
  const zip = new JSZip()

  for (const size of sizes) {
    const blob = await resizeImage({
      favicon,
      targetWidth: size.width,
      targetHeight: size.height
    })

    zip.file(`${size.prefix}-${size.width}x${size.height}.png`, blob as Blob, {
      binary: true
    })
  }

  const icoBlob = await resizeImage({
    favicon,
    targetWidth: 64,
    targetHeight: 64
  })

  zip.file(`favicon.ico`, icoBlob as Blob, {
    binary: true
  })

  if (options.includeWebAppManifest) {
    const manifestBlob = await generateWebAppManifest(options)

    zip.file('site.webmanifest', manifestBlob, {
      binary: true
    })
  }

  const content = await zip.generateAsync({type: 'blob'})
  saveAs(content, 'figma-favicon-generator.zip')
}

/**
 * @description Generate the code sample for the user to copy.
 * This code sample includes the meta tags and links for the favicon,
 * apple touch icons, and web app manifest. It will conditionally add the
 * expanded sizes and apple touch icons based on the user options.
 */
export function generateCodeSample(options: UserOptions) {
  return `
      <title>${options.siteName}</title>
      <meta name="description" content="${options.description}" />
      <meta property="og:title" content="${options.siteName}" />
      <meta property="og:description" content="${options.description}" />
      <meta name="theme-color" content="${options.themeColor}" />
      <meta name="application-name" content="${options.siteName}" />
      <link rel="icon" type="image/x-icon" href="favicon.ico" />
      ${
        options.includeExpandedSizes
          ? `<link rel="icon" type="image/png" href="favicon-196x196.png" sizes="196x196" />
      <link rel="icon" type="image/png" href="favicon-128x128.png" sizes="128x128" />
      <link rel="icon" type="image/png" href="favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/png" href="favicon-32x32.png" sizes="32x32" />
      <link rel="icon" type="image/png" href="favicon-16x16.png" sizes="16x16" />`
          : ``
      }
      ${
        options.includeAppleTouchIcons
          ? `
        <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="apple-touch-icon-192x192.png" />`
          : ``
      }
      ${
        options.includeAppleTouchIcons && options.includeExpandedSizes
          ? `
        <link rel="apple-touch-icon" sizes="57x57" href="apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="apple-touch-icon-152x152.png" />`
          : ``
      }
      ${options.includeWebAppManifest ? `<link rel="manifest" href="site.webmanifest" />` : ``}`
}
